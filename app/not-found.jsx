import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-screen py-4 pt-26">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="text-center text-sm font-medium text-black/70">
        The page you are looking for does not exist.
      </p>
      <Link href="/">
        <button className="px-6 py-3 text-sm font-bold border-4 border-black bg-[#FFDC02] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-[#FFDC02]">
          Go Home
        </button>
      </Link>
    </div>
  );
}