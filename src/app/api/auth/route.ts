import { AuthResult } from "@/app/domain/dto/auth_result";
import { JWT_TOKEN_KEY } from "@/constanta";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hello: "this is auth endpoint",
  });
}
export async function POST(req: Request) {
  let status;
  try {
    const { email, password } = await req.json();
    const baseUrl = process.env.BASE_URL;
    const rawResponse = await fetch(`${baseUrl}/api/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    status = rawResponse.status;
    if (status != 200) throw Error(rawResponse.statusText);
    const result: AuthResult = await rawResponse.json();

    if (result.data.role == "STUDENT") {
      status = 401;
      throw Error("User tidak ditemukan");
    }

    const cookieStore = cookies();
    cookieStore.set(JWT_TOKEN_KEY, `${result.data.token}`);

    return NextResponse.json({ data: result.data }, { status });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: status });
  }
}
