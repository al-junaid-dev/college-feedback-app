import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if ((session.user as any).role !== "ADMIN") {
    redirect("/student");
  }

  const feedbacks = await prisma.feedback.findMany({
    include: { lecturer: true, classObj: true, student: true },
    orderBy: { createdAt: "desc" },
  });

  const totalFeedback = feedbacks.length;
  const averageRating = totalFeedback > 0 
    ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / totalFeedback).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8 lg:p-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-white/80 p-6 shadow-sm backdrop-blur-md border border-white/50 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 md:text-3xl">Admin Dashboard</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Logged in as: <span className="text-blue-600">{(session.user as any).hallTicket}</span>
            </p>
          </div>
          <LogoutButton />
        </header>

        {/* Top Stat Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-md border border-white/50 transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 text-2xl">
                📥
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Total Submissions</h3>
                <p className="mt-1 text-4xl font-extrabold text-slate-900">{totalFeedback}</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-md border border-white/50 transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 text-2xl">
                ⭐
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">College Average</h3>
                <p className="mt-1 text-4xl font-extrabold text-blue-600">{averageRating} <span className="text-lg text-slate-400">/ 5.0</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table with Responsive Wrapper */}
        <div className="rounded-2xl bg-white/80 shadow-xl backdrop-blur-md border border-white/50 overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-bold text-slate-800">Recent Feedback Entries</h2>
          </div>
          
          {/* CRITICAL: overflow-x-auto allows swiping on mobile */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Lecturer</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Class</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Rating</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Comments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white/40">
                {feedbacks.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">No feedback submitted yet.</td>
                  </tr>
                ) : (
                  feedbacks.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-slate-50/80">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-600">
                        {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-slate-900">
                        {item.lecturer.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          {item.classObj.name}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
                          item.rating >= 4 ? 'bg-green-100 text-green-700' : item.rating === 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {item.rating} ★
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate md:max-w-md">
                        {item.comments || <span className="italic text-slate-400">No comment</span>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
