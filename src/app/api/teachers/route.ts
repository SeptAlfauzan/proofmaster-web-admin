import { Teachers } from "@/app/domain/dto/teachers";
import { JWT_TOKEN_KEY } from "@/constanta";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  let status: number = 500;
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(JWT_TOKEN_KEY)?.value;
    const baseUrl = process.env.BASE_URL;
    const rawResponse = await fetch(`${baseUrl}/api/teachers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    status = rawResponse.status;
    const result: Teachers = await rawResponse.json();
    return NextResponse.json({
      data: result.data,
    });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: status });
  }
}

export async function POST(req: Request) {
  let status;
  try {
    const { email, password, nim, name, role } = await req.json();
    const baseUrl = process.env.BASE_URL;
    console.log(role);
    const rawResponse = await fetch(`${baseUrl}/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        nim,
        name,
        role: "TEACHER",
      }),
    });

    status = rawResponse.status;
    if (status != 200) throw Error(rawResponse.statusText);
    const result = await rawResponse.json();

    return NextResponse.json({ data: result.data }, { status });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: e }, { status: status });
  }
}
