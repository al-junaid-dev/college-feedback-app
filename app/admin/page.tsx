import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminDashboard() {
  // 1. Authenticate and Authorize
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // If a student tries to access this page, kick them back to the student portal
  if ((session.user as any).role !== "ADMIN") {
    redirect("/student");
  }

  // 2. Fetch all feedback, INCLUDING the related lecturer and class data
  const feedbacks = await prisma.feedback.findMany({
    include: {
      lecturer: true,
      classObj: true,
      student: true,
    },
    orderBy: {
      createdAt: "desc", // Newest feedback first
    },
  });

  // 3. Calculate Quick Stats
  const totalFeedback = feedbacks.length;
  const averageRating = totalFeedback > 0 
    ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / totalFeedback).toFixed(1)
    : "N/A";

  // 4. Render the UI
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
       <header className="mb-8 flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
    <p className="text-gray-600">Logged in as: ADMIN-HOD</p>
  </div>
  <LogoutButton />
</header>

        {/* Top Stat Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Total Submissions</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{totalFeedback}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">College Average Rating</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{averageRating} / 5.0</p>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Lecturer</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Comments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No feedback submitted yet.</td>
                </tr>
              ) : (
                feedbacks.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {item.lecturer.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {item.classObj.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {item.rating} ★
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {item.comments || <span className="italic text-gray-400">No comment</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
