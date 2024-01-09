import { adminDB } from "@/firebase-admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const categories = [
    "Famous People",
    "Movies & TV",
    "Musicians",
    "Games",
    "Animals",
    "Philosophy",
    "Scientist",
  ];

  const ref = adminDB.collection("category");

  try {
    for (const category of categories) {
      ref.add({ name: category });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Promise.rejected: ", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
