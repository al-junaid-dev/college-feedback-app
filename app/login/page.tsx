"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [hallTicket, setHallTicket] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      hallTicket,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid Hall Ticket or Password");
    } else {
      const session = await getSession();
      if ((session?.user as any)?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/student");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      {/* Glassmorphism Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-2xl backdrop-blur-xl border border-white/50 transition-all">
        
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white shadow-lg">
            E
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-1">Please sign in to your account</p>
        </div>
        
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Hall Ticket Number (or Admin ID)</label>
            <input
              type="text"
              required
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-800 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              value={hallTicket}
              onChange={(e) => setHallTicket(e.target.value)}
              placeholder="e.g. HT1001"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              required
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-800 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
