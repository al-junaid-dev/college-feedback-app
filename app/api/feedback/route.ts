import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rating, comments, lecturerId, classId, studentId } = body;

    // Save the feedback to the database
    const newFeedback = await prisma.feedback.create({
      data: {
        rating: Number(rating),
        comments,
        lecturerId,
        classId,
        studentId,
      },
    });

    return NextResponse.json({ message: "Feedback submitted!", feedback: newFeedback }, { status: 201 });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}