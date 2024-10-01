import { LearningMaterials } from "@/app/domain/dto/learning_materials";
import { PostLearningMaterialResult } from "@/app/domain/dto/post_learning_material_result";
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
export async function POST(req: NextRequest) {
  let status = 200;
  try {
    const formDataClient = await req.formData();

    console.log(formDataClient);

    const baseUrl = process.env.BASE_URL;
    const file = formDataClient.get("file");
    const description = formDataClient.get("description");
    const title = formDataClient.get("title");
    const icon = formDataClient.get("icon");

    const cookieStore = cookies();
    const token = cookieStore.get(JWT_TOKEN_KEY)?.value;

    const formData = new FormData();
    formData.append("title", title!);
    formData.append("description", description!);
    formData.append("file", file!);
    formData.append("icon", icon!);

    const rawResponse = await fetch(
      `${baseUrl}/api/learning-materials/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    status = rawResponse.status;
    if (status != 200) throw Error(rawResponse.statusText);
    const result: PostLearningMaterialResult = await rawResponse.json();

    return NextResponse.json({ result }, { status });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: status });
  }
}
