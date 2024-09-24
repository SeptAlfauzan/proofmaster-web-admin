import { verifyIDToken } from "@/helper/verify_token";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    const decodeToken = await verifyIDToken(token);
    return NextResponse.json({ data: decodeToken });
  } catch (e) {
    console.log("ERROR NIH", e);
    return NextResponse.json({ message: e }, { status: 401 });
  }
}
