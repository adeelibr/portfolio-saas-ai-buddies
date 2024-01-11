import { nextAuthOptions } from "@/auth";
import { adminDB } from "@/firebase-admin";
import { collection, doc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const session = await getServerSession(nextAuthOptions);
    const body = await req.json();

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

    if (!params.companionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Companion ID is required",
        },
        { status: 400 }
      );
    }

    if (
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !src ||
      !categoryId
    ) {
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
      .collection("companion")
      .doc(params.companionId);

    await companionCollectionRef.update({
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
        message: "Companion updated successfully",
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

export async function DELETE(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    if (!params.companionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Companion ID is required",
        },
        { status: 400 }
      );
    }

    const companionCollectionRef = adminDB
      .collection("users")
      .doc(session.user.id)
      .collection("companion")
      .doc(params.companionId);

    await companionCollectionRef.delete();

    return NextResponse.json(
      {
        success: true,
        message: "Companion deleted successfully",
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
