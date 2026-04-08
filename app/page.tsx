import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-sm">
        <div className="text-xl font-bold text-blue-600">Feedback System</div>
        <Link 
          href="/login" 
          className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
          Empowering Voices, <br className="hidden md:block" />
          <span className="text-blue-600">Improving Education.</span>
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-gray-600">
          A secure, anonymous, and easy-to-use college feedback system. Help us maintain the highest standards of teaching by sharing your valuable insights.
        </p>
        
        <div className="flex space-x-4">
          <Link 
            href="/login" 
            className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-blue-700"
          >
            Student Portal
          </Link>
          <Link 
            href="/login" 
            className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-lg font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Admin Access
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-sm text-gray-500 border-t border-gray-200">
        &copy; {new Date().getFullYear()}Feedback System. All rights reserved.
      </footer>
    </div>
  );
}