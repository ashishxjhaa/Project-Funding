import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Listing from "@/models/Listing";
import Fund from "@/models/Fund";
import Wallet from "@/models/Wallet";
import mongoose from "mongoose";
import { ListingType } from "@/types/listing";

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

export async function POST( req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { userId, error } = await getUserIdOr401(req);
        if (error) return error;

        const { id } = await context.params;
        const body = await req.json();
        const amount = Number(body?.amount ?? 0);

        if (!Number.isInteger(amount) || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        const session = await mongoose.startSession();

        try {
            if (process.env.NODE_ENV === "production") {
            session.startTransaction();
        }

        const walletQuery = Wallet.findOne({ user: userId });
        const wallet = process.env.NODE_ENV === "production"
        ? await walletQuery.session(session)
        : await walletQuery;

        if (!wallet || wallet.balance < amount) {
            if (process.env.NODE_ENV === "production") {
                await session.abortTransaction();
            }
            return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
        }

        wallet.balance -= amount;
        wallet.transactions.push({
            type: "debit",
            amount,
            status: "Success",
            createdAt: new Date(),
        });

        process.env.NODE_ENV === "production"
        ? await wallet.save({ session })
        : await wallet.save();

        process.env.NODE_ENV === "production"
        ? await Fund.create([{ listing: id, user: userId, amount }], { session })
        : await Fund.create([{ listing: id, user: userId, amount }]);

        const listingUpdate = { $inc: { funds: amount } };
        const listingQuery = Listing.findByIdAndUpdate(id, listingUpdate, { new: true }).lean<ListingType | null>();
        const updatedListing = process.env.NODE_ENV === "production"
        ? await listingQuery.session(session)
        : await listingQuery;

        if (updatedListing?.user) {
            const ownerWalletQuery = Wallet.findOneAndUpdate(
                { user: updatedListing.user },
                {
                    $inc: { balance: amount },
                    $push: {
                        transactions: {
                            type: "credit",
                            amount,
                            status: "Success",
                            createdAt: new Date(),
                            description: `Funding received for listing ${updatedListing.name}`,
                        },
                    },
                },
                { upsert: true, new: true }
            );

            process.env.NODE_ENV === "production"
                ? await ownerWalletQuery.session(session)
                : await ownerWalletQuery;
            }

            if (process.env.NODE_ENV === "production") {
                await session.commitTransaction();
            }

            return NextResponse.json({ success: true, funds: updatedListing?.funds ?? 0 });
        } catch (error) {
            console.error("Fund transaction failed:", error);
            if (process.env.NODE_ENV === "production") {
                await session.abortTransaction();
            }
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        } finally {
            session.endSession();
        }
    } catch (err) {
        console.error("POST /api/listings/[id]/fund error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
