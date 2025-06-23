"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth-context";
import Logo from "../header/logo";

type LoginState = "initial" | "success";

export function LoginModal() {
  const { authState, login, hideModals, isLoading } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginState, setLoginState] = useState<LoginState>("initial");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits

    if (value.length >= 10) {
      setLoginState("success");
    } else {
      setLoginState("initial");
    }

    if (value.length <= 11) {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loginState !== "success" || phoneNumber.length < 10) return;

    try {
      await login(phoneNumber);
      setPhoneNumber(""); // Clear only after successful login
    } catch (error) {
      console.error("Login failed:", error);
      // Optional: show toast or error message to user
    }
  };

  return (
    <Dialog open={authState === "login"} onOpenChange={hideModals}>
      <DialogContent
        className="w-full max-w-[90vw] sm:max-w-sm border-0 p-0 rounded-xl"
        style={{ padding: 0 }}
      >
        <DialogTitle className="sr-only">Login or Sign Up</DialogTitle>
        <div className="bg-white rounded-xl w-full px-4 py-6 sm:px-6 sm:py-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
              <Logo />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-1 leading-snug">
              Need it now? Amart delivers.
            </h1>
            <p className="text-gray-600 text-sm font-semibold">
              Log in or Sign up
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <div className="flex items-center px-3 py-3 bg-gray-100">
                <span className="font-extrabold text-sm text-gray-600">
                  +880
                </span>
              </div>
              <input
                value={phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
                className="flex-1 py-3 px-3 text-sm font-extrabold h-auto border-none text-gray-600 focus:outline-none bg-transparent"
                type="tel"
                inputMode="numeric"
              />
            </div>

            <Button
              type="submit"
              className={`w-full ${
                loginState === "success"
                  ? "bg-primary"
                  : "bg-gray-400 hover:bg-gray-500"
              } text-white py-3 rounded-lg text-sm font-medium transition-colors h-auto`}
              disabled={isLoading || phoneNumber.length !== 11}
            >
              {isLoading ? "Please wait..." : "Continue"}
            </Button>
          </form>

          {/* Terms */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500 leading-snug">
              By continuing, you agree to our{" "}
              <span className="text-gray-700 underline cursor-pointer">
                Terms of service
              </span>{" "}
              &{" "}
              <span className="text-gray-700 underline cursor-pointer">
                Privacy policy
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
