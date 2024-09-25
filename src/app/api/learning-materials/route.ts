import { LearningMaterials } from "@/app/domain/dto/learning_materials";
import { PostActivityResult } from "@/app/domain/dto/post_acitivity_result";
import { JWT_TOKEN_KEY } from "@/constanta";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  let status: number = 500;
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(JWT_TOKEN_KEY)?.value;
    const baseUrl = process.env.BASE_URL;
    const rawResponse = await fetch(`${baseUrl}/api/learning-materials`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    status = rawResponse.status;
    const result: LearningMaterials = await rawResponse.json();
    return NextResponse.json({
      data: result.data,
    });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: status });
  }
}
//TODO: replace with actual request body
export async function POST(req: NextRequest) {
  let status = 200;
  return NextResponse.json({ message: "not implemented yet!" }, { status });
  try {
    const formDataClient = await req.formData();
    const baseUrl = process.env.BASE_URL;
    const file = formDataClient.get("file");
    const name = formDataClient.get("name");
    const cookieStore = cookies();

    const token = cookieStore.get(JWT_TOKEN_KEY)?.value;

    const formData = new FormData();
    formData.append("file", file!);
    formData.append("name", name!);

    const rawResponse = await fetch(`${baseUrl}/api/activities/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    status = rawResponse.status;
    if (status != 200) throw Error(rawResponse.statusText);
    const result: PostActivityResult = await rawResponse.json();

    return NextResponse.json({ result }, { status });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: status });
  }
}
