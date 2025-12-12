import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";
import Logo from "../../components/Logo";

export default function Error() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-amber-200 to-green-300 p-6">
      {/* Icon */}
      <div className="bg-white p-5 rounded-full shadow-lg mb-6">
        <AlertTriangle className="w-14 h-14 text-red-500" />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-black text-black mb-3">404</h1>
      <p className="text-xl text-amber-700 mb-6 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Description */}
      <p className="text-gray-800 mb-8 text-center max-w-md">
        It seems you’ve reached a page that has been moved, deleted, or never
        existed. Don’t worry, you can get back on track!
      </p>

      {/* Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
      >
        Go Back Home
      </Link>

      {/* Footer */}
      <div className="mt-10 text-gray-500 text-base flex justify-center items-center">
        © {new Date().getFullYear()} <Logo/>  — All Rights Reserved
      </div>
    </div>
  );
}
