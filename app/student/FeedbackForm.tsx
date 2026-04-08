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
      setStatus("Please select a lecturer, class, and a star rating.");
      return;
    }

    setStatus("Submitting...");
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comments, lecturerId, classId, studentId }),
    });

    if (res.ok) {
      setStatus("Success! Feedback submitted anonymously to the admin.");
      setLecturerId("");
      setClassId("");
      setRating(0);
      setComments("");
      router.refresh();
    } else {
      setStatus("Error submitting feedback. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-lg bg-white p-6 shadow-md">
      {status && <p className={`text-center font-semibold ${status.includes("Success") ? "text-green-600" : "text-red-500"}`}>{status}</p>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Lecturer Dropdown */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Select Lecturer</label>
          <select value={lecturerId} onChange={(e) => setLecturerId(e.target.value)} className="w-full rounded-md border border-gray-300 p-2">
            <option value="">-- Choose Lecturer --</option>
            {lecturers.map((l: any) => (
              <option key={l.id} value={l.id}>{l.name} ({l.department})</option>
            ))}
          </select>
        </div>

        {/* Class Dropdown */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Select Class</label>
          <select value={classId} onChange={(e) => setClassId(e.target.value)} className="w-full rounded-md border border-gray-300 p-2">
            <option value="">-- Choose Class --</option>
            {classes.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Star Rating */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Rating</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-3xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Additional Comments</label>
        <textarea
          rows={4}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="How was the teaching style? Was the material clear?"
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <button type="submit" className="w-full rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Submit Feedback
      </button>
    </form>
  );
}