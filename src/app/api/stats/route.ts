import { Activities } from "@/app/domain/dto/actitivities";
import { DashboardStats as DashboardStats } from "@/app/domain/dto/dashboard_stats";
import { LearningMaterials } from "@/app/domain/dto/learning_materials";
import { Students } from "@/app/domain/dto/students";
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
    const rawResponseTeachers = await fetch(`${baseUrl}/api/teachers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const rawResponseStudents = await fetch(`${baseUrl}/api/students`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const rawResponseActivities = await fetch(`${baseUrl}/api/activities`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const rawResponseLearningMaterials = await fetch(
      `${baseUrl}/api/learning-materials`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    status =
      rawResponseTeachers.status ||
      rawResponseStudents.status ||
      rawResponseActivities.status ||
      rawResponseLearningMaterials.status;

    const resultTeachers: Teachers = await rawResponseTeachers.json();
    const resultStudents: Students = await rawResponseStudents.json();
    const resultActivities: Activities = await rawResponseActivities.json();
    const resultLearningMaterials: LearningMaterials =
      await rawResponseLearningMaterials.json();

    const data: DashboardStats = {
      data: [
        {
          title: "Teachers",
          label: "Users",
          total: resultTeachers.data.teachers.length,
          link: "/dashboard/teachers",
        },
        {
          title: "Students",
          label: "Users",
          total: resultStudents.data.students.length,
          link: "/dashboard/students",
        },
        {
          title: "Activities",
          label: "Assigned",
          total: resultActivities.data.activities.length,
          link: "/dashboard/activity",
        },
        {
          title: "Learning Materials",
          label: "Materials",
          total: resultLearningMaterials.data.length,
          link: "/dashboard/learning-materials",
        },
      ],
    };

    return NextResponse.json({
      ...data,
    });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: status });
  }
}
