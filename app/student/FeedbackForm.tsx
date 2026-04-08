"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FeedbackForm({ lecturers, classes, studentId }: any) {
  const [lecturerId, setLecturerId] = useState("");
  const [classId, setClassId] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lecturerId || !classId || rating === 0) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comments, lecturerId, classId, studentId }),
    });

    if (res.ok) {
      setStatus("success");
      setLecturerId("");
      setClassId("");
      setRating(0);
      setComments("");
      router.refresh();
      // Clear success message after 3 seconds
      setTimeout(() => setStatus(""), 3000);
    } else {
      setStatus("server_error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 rounded-3xl bg-white/80 p-6 shadow-xl backdrop-blur-xl border border-white/50 md:p-10">
      
      {status === "error" && <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">Please select a lecturer, class, and a star rating.</p>}
      {status === "server_error" && <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">Error submitting feedback. Please try again.</p>}
      {status === "success" && <p className="rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">🎉 Success! Feedback submitted anonymously to the admin.</p>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Select Lecturer</label>
          <select 
            value={lecturerId} 
            onChange={(e) => setLecturerId(e.target.value)} 
            className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">-- Choose Lecturer --</option>
            {lecturers.map((l: any) => (
              <option key={l.id} value={l.id}>{l.name} ({l.department})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Select Class</label>
          <select 
            value={classId} 
            onChange={(e) => setClassId(e.target.value)} 
            className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">-- Choose Class --</option>
            {classes.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Overall Rating</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-4xl transition-all duration-200 hover:scale-110 ${rating >= star ? "text-yellow-400 drop-shadow-sm" : "text-slate-200 hover:text-yellow-200"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Additional Comments (Optional)</label>
        <textarea
          rows={4}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="How was the teaching style? Was the material clear?"
          className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      <button 
        type="submit" 
        disabled={status === "submitting"}
        className="w-full rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {status === "submitting" ? "Submitting securely..." : "Submit Feedback"}
      </button>
    </form>
  );
}
