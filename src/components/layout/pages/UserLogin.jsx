"use client"

import { X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const UserLogin = () => {
 const [ IsloginOpen, setIsLoginOpen ] = useState(true);
 const router = useRouter();

  const close = () => {
    setIsLoginOpen(false);
    router.push("/");
  };

  if (!IsloginOpen) return null;

  return (
    <div>
      <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition cursor-pointer"
              aria-label="Close login modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold font-mono">Welcome Back</h2>
              <p className="text-sm text-gray-500 mt-1">Sign in to your Samsung account</p>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                close();
              }}
              className="flex flex-col gap-4"
            >
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="login-email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label htmlFor="login-password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Forgot password link */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-500 hover:text-blue-700 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-600 transition cursor-pointer"
              >
                Sign In
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-500 hover:text-blue-700 hover:underline font-medium cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
    </div>
  )
}

export default UserLogin
