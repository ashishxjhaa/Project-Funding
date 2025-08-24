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

async function getUserIdOr401(
  req: Request
): Promise<{ userId?: string; error?: Response }> {
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

export async function GET(req: Request) {
  try {
    await connectDB();
    const { userId, error } = await getUserIdOr401(req);
    if (error) return error;

    let wallet = await Wallet.findOne({ user: userId }).lean<WalletType | null>();

    if (!wallet) {
      wallet = { user: userId!, balance: 0, transactions: [] };
    }

    return NextResponse.json({ wallet }, { status: 200 });
  } catch (err) {
    console.error("GET /api/wallet error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
