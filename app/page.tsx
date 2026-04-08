import Link from "next/link";

export default function Home() {
  return (
    // 1. The Gradient Background covering the whole screen
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      
      {/* Navigation Bar - Made blurry and sticky */}
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-white/70 px-6 py-4 backdrop-blur-md border-b border-white/50 shadow-sm md:px-12">
        <div className="flex items-center space-x-2">
          {/* A simple icon to make the logo pop */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            E
          </div>
          <span className="text-xl font-extrabold text-slate-800 tracking-tight">Feedback System</span>
        </div>
        <Link 
          href="/login" 
          className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero Section - Centered and highly responsive */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center md:px-12">
        
        {/* A small "pill" badge for modern flair */}
        <div className="mb-6 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 shadow-sm">
          ✨ The new standard for campus feedback
        </div>

        {/* Responsive Typography: text-5xl on mobile, text-7xl on desktop */}
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl">
          Empowering Voices, <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Improving Education.
          </span>
        </h1>
        
        <p className="mb-10 max-w-2xl text-lg text-slate-600 md:text-xl leading-relaxed">
          A secure, anonymous, and intuitive feedback system. Help us maintain the highest standards of teaching by sharing your valuable insights today.
        </p>
        
        {/* Buttons stack on mobile (flex-col), sit side-by-side on desktop (sm:flex-row) */}
        <div className="flex w-full flex-col space-y-4 sm:w-auto sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link 
            href="/login" 
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 sm:w-auto"
          >
            Student Portal
          </Link>
          <Link 
            href="/login" 
            className="flex w-full items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:w-auto"
          >
            Admin Access
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm font-medium text-slate-500">
        &copy; {new Date().getFullYear()} Feedback System. All rights reserved.
      </footer>
    </div>
  );
}
