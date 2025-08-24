import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Wallet from "@/models/Wallet";
import jwt from "jsonwebtoken";
import { WalletType } from "@/types/wallet";

function getTokenFromReq(req: Request): string | undefined {
    const cookie = req.headers.get("cookie") || "";
    const part = cookie.split("; ").find((c) => c.startsWith("token="));
    return part?.split("=")[1];
}

async function getUserIdOr401( req: Request): Promise<{ userId?: string; error?: Response }> {
    const token = getTokenFromReq(req);
    if (!token) {
        return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            userId?: string;
            id?: string;
        };
        const userId = decoded?.userId ?? decoded?.id;
        if (!userId) {
            return { error: NextResponse.json({ error: "Invalid token" }, { status: 401 }) };
        }
        return { userId };
    } catch {
        return { error: NextResponse.json({ error: "Invalid token" }, { status: 401 }) };
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const amount = Number(body?.amount ?? 0);

        if (!Number.isInteger(amount) || amount < 1) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        const { userId, error } = await getUserIdOr401(req);
        if (error) return error;

        const updatedWallet = await Wallet.findOneAndUpdate(
            { user: userId },
            {
                $inc: { balance: amount },
                $push: {
                    transactions: {
                        type: "credit",
                        amount,
                        status: "Success",
                        createdAt: new Date(),
                    },
                },
            },
            { upsert: true, new: true }
        ).lean<WalletType>();

        return NextResponse.json({ wallet: updatedWallet }, { status: 200 });
    } catch (err) {
        console.error("POST /api/wallet/add error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

