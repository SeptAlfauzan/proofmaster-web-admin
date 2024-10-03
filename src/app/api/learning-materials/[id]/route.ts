import { DeleteLearningMaterialResult } from "@/app/domain/dto/delete_learning_materials_result";
import { EditLearingMaterialResponse } from "@/app/domain/dto/edit_learning_material";
import { LearningMaterial } from "@/app/domain/dto/learning_material";
import { JWT_TOKEN_KEY } from "@/constanta";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  let status: number = 500;

  try {
    const cookieStore = cookies();
    const token = cookieStore.get(JWT_TOKEN_KEY)?.value;
    const baseUrl = process.env.BASE_URL;
    const rawResponse = await fetch(
      `${baseUrl}/api/learning-materials/${params.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    status = rawResponse.status;
    const result: LearningMaterial = await rawResponse.json();
    return NextResponse.json({
      data: result.data,
    });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: status });
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let status = 200;
  try {
    const formDataClient = await req.formData();
    const baseUrl = process.env.BASE_URL;
    const file = formDataClient.get("file");
    const title = formDataClient.get("title");
    const icon = formDataClient.get("icon");
    const description = formDataClient.get("description");
    console.log("ASLKDASDJASLDJALSDJALSDKJ ASLKDJ");
    console.log(icon);
    console.log(file);

    const cookieStore = cookies();

    const token = cookieStore.get(JWT_TOKEN_KEY)?.value;

    const formData = new FormData();
    formData.append("file", file!);
    formData.append("title", title!);
    formData.append("description", description!);
    formData.append("icon", icon!);

    const rawResponse = await fetch(
      `${baseUrl}/api/learning-materials/${params.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    console.log("ASLKDASDJASLDJALSDJALSDKJ ASLKDJ");

    status = rawResponse.status;
    console.log(rawResponse);
    if (status != 200) throw Error(rawResponse.statusText);
    const result: EditLearingMaterialResponse = await rawResponse.json();

    return NextResponse.json({ result }, { status });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: e }, { status: status });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  let status = 200;
  try {
    const baseUrl = process.env.BASE_URL;
    const cookieStore = cookies();

    const token = cookieStore.get(JWT_TOKEN_KEY)?.value;

    const rawResponse = await fetch(
      `${baseUrl}/api/learning-materials/${params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    status = rawResponse.status;
    if (status != 200) throw Error(rawResponse.statusText);
    const result: DeleteLearningMaterialResult = await rawResponse.json();

    return NextResponse.json({ result }, { status });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: status });
  }
}
