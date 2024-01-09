import { nextAuthOptions } from "@/auth";
import { adminDB } from "@/firebase-admin";
import { collection, doc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(nextAuthOptions);
    const body = await req.json();

    console.log('body', body);

    const { name, description, instructions, seed, src, categoryId } = body;

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    if (!name || !description || !instructions || !seed || !src || !categoryId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const companionCollectionRef = adminDB
      .collection("users")
      .doc(session.user.id)
      .collection("companion");

    await companionCollectionRef.add({
      name,
      description,
      instructions,
      seed,
      src,
      categoryId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Companion added successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
