import { AuthResult } from "@/app/domain/dto/auth_result";
import { JWT_TOKEN_KEY } from "@/constanta";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hello: "this is logout endpoint",
  });
}
export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    cookieStore.delete(JWT_TOKEN_KEY);

    return NextResponse.json({ data: "success" });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
