import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FeedbackForm from "./FeedbackForm";
import LogoutButton from "@/components/LogoutButton";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const lecturers = await prisma.lecturer.findMany();
  const classes = await prisma.class.findMany();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        {/* Modern Header */}
        <header className="mb-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-white/80 p-6 shadow-sm backdrop-blur-md border border-white/50 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 md:text-3xl">Student Portal</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Logged in as: <span className="text-blue-600">{(session.user as any).hallTicket}</span>
            </p>
          </div>
          <LogoutButton />
        </header>

        <main>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">Submit Anonymous Feedback</h2>
            <p className="text-sm text-slate-600 mt-1">Your identity is hidden. Please provide honest and constructive feedback.</p>
          </div>
          <FeedbackForm 
            lecturers={lecturers} 
            classes={classes} 
            studentId={(session.user as any).id} 
          />
        </main>
      </div>
    </div>
  );
}
