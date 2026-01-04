"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Lock, Mail, X } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import Logo from "../header/logo";
import Link from "next/link";
import { ModalComponent } from "@/components/modal-component";

export function LoginModal() {
  const { authState, login, hideModals, isLoading, showSignUpModal } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail || password.length < 6) return;

    try {
      await login(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isValidEmail && password.length >= 6;

  return (
    <ModalComponent open={authState === "login"} onOpenChange={hideModals}>
      <div className="bg-white w-full max-w-md mx-auto relative px-6 py-8">
        {/* Close Button */}
        <button
          onClick={hideModals}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-100 md:hidden"
          aria-label="Close"
        >
          <X size={24} strokeWidth={3} />
        </button>

        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-center mt-1 text-sm">
            Enter your details to sign in to your account
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-900 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
                <Mail size={18} />
              </div>
              <input
                value={email}
                onChange={handleInputChange}
                placeholder="hello@example.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                type="email"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-900 ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
                <Lock size={18} />
              </div>
              <input
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none p-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-xs font-semibold text-primary hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className={`w-full py-6 text-base font-semibold shadow-lg transition-all rounded-xl ${
              isFormValid && !isLoading
                ? "bg-primary text-white shadow-primary/20 hover:bg-primary/90 hover:scale-[1.01]"
                : "bg-primary/50 text-white shadow-none cursor-not-allowed"
            }`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin text-white" size={20} />
                <span>Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Footer / Switch Mode */}
        <div className="mt-8 text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500 font-medium">
                New to Amart?
              </span>
            </div>
          </div>
          
          <button
            onClick={showSignUpModal}
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors underline"
          >
            Create an account
          </button>
        </div>

        {/* Terms */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400 leading-relaxed px-4">
            By continuing, you agree to our{" "}
            <Link href="/terms&condition" target="_blank" className="text-primary hover:text-primary/80 underline decoration-dotted underline-offset-2">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" target="_blank" className="text-primary hover:text-primary/80 underline decoration-dotted underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </ModalComponent>
  );
}
