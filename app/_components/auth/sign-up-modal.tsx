"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react"; // 👁️ import icons
import { useAuth } from "@/contexts/auth-context";
import Logo from "../header/logo";
import Link from "next/link";
import { ModalComponent } from "@/components/modal-component";

type LoginState = "initial" | "success";

export function SingUpModal() {
  const { authState, signup, hideModals, isLoading, showLoginModal } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginState, setLoginState] = useState<LoginState>("initial");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (isValidEmail) {
      setLoginState("success");
    } else {
      setLoginState("initial");
    }

    setEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail || password.length < 6) return;

    try {
      await signup(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signup failed:", error);
      // Optional: show toast or error message to user
    }
  };

  const handleClickSignup = () => {
    showLoginModal();
  };

  return (
    <ModalComponent open={authState === "signup"} onOpenChange={hideModals}>
      <div className="bg-white rounded-xl w-full px-4 py-6 sm:px-6 sm:py-8">
        {/* Top link */}
        <div className="flex justify-start">
          <p>Have an account?</p>
          <p
            className="pl-2 font-semibold text-primary underline cursor-pointer"
            onClick={handleClickSignup}
          >
            Login!
          </p>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center">
            <Logo />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-lg sm:text-xl font-extrabold text-gray-900 leading-snug">
            Join Amart and start shopping smarter
          </p>
          <h1 className="text-sm font-medium text-primary mb-1">
            Create Your Account
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <input
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="flex-1 py-3 px-3 text-sm font-extrabold h-auto border-none text-gray-600 focus:outline-none bg-transparent"
              type="email"
              autoComplete="email"
            />
          </div>

          {/* Password Input (eye icon on the left) */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="flex items-center justify-center w-14 bg-gray-100 py-3 text-gray-500 hover:text-primary transition focus:outline-none"
            >
              {showPassword ? (
                <EyeOff size={18} strokeWidth={2} />
              ) : (
                <Eye size={18} strokeWidth={2} />
              )}
            </button>

            <input
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="flex-1 py-3 px-3 text-sm font-extrabold h-auto border-none text-gray-600 focus:outline-none bg-transparent"
              type={showPassword ? "text" : "password"}
              aria-label="Password"
            />
          </div>

          {/* Continue Button */}
          <Button
            type="submit"
            className={`w-full ${
              loginState === "success" && password.length >= 6
                ? "bg-primary"
                : "bg-gray-400 hover:bg-gray-500"
            } text-white py-3 rounded-lg text-sm font-medium transition-colors h-auto`}
            disabled={
              (() => {
                const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                return isLoading || !isValidEmail || password.length < 6;
              })()
            }
          >
            {isLoading ? "Please wait..." : "Continue"}
          </Button>
        </form>

        {/* Terms */}
        <div className="text-center mt-6">
          <div className="text-xs text-gray-500 leading-snug">
            <div>By continuing, you agree to our </div>
            <div>
              <span className="text-gray-700 underline cursor-pointer">
                <Link
                  href="/terms&condition"
                  target="_blank"
                  className="text-primary"
                >
                  Terms of service
                </Link>
              </span>{" "}
              &{" "}
              <span className="text-gray-700 underline cursor-pointer">
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="text-primary"
                >
                  Privacy policy
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </ModalComponent>
  );
}
