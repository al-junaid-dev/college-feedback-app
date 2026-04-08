import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FeedbackForm from "./FeedbackForm";
import LogoutButton from "@/components/LogoutButton";

export default async function StudentDashboard() {
  // 1. Check if the user is logged in
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // 2. Fetch data directly from PostgreSQL for the dropdowns
  const lecturers = await prisma.lecturer.findMany();
  const classes = await prisma.class.findMany();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold text-gray-800">Student Portal</h1>
    <p className="text-gray-600">Logged in as: {(session.user as any).hallTicket}</p>
  </div>
  <LogoutButton /> {/* Our new button is placed here! */}
</header>

        <main>
          <h2 className="text-xl font-semibold text-gray-700">Submit New Feedback</h2>
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