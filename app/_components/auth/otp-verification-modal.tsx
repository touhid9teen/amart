"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/contexts/auth-context";
import { signupWithEmail, verifyOtpServer } from "@/lib/actions";
import { Loader2, Mail, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const OTP_ERROR_MESSAGES: Record<string, string> = {
  OTP_VALIDATION_ERROR: "Please enter a valid 6-digit OTP.",
  OTP_VERIFY_SERVER_ERROR:
    "Verification failed due to a server error. Please try again.",
  OTP_TIMEOUT: "Connection timed out. Please try again.",
  OTP_NETWORK_ERROR: "No internet connection.",
  OTP_UNKNOWN_ERROR: "Something went wrong. Please try again.",
};

export function OtpVerificationModal() {
  const {
    authState,
    isLoading,
    setIsLoading,
    hideModals,
    isAuthLoading,
    email,
  } = useAuth();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  useEffect(() => {
    if (authState === "verifying") {
      setOtp("");
      setCountdown(60);
      setCanResend(false);
    }
  }, [authState]);

  useEffect(() => {
    if (authState !== "verifying") return;
    if (canResend) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [authState, canResend]);

  const verifyOtp = async (otp: string) => {
    if (isLoading) return;

    // ── Client-side validation ───────────────────────────────────────────────
    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyOtpServer({ email, otp });

      if (response.success) {
        // ── Happy path ─────────────────────────────────────────────────────
        toast.success("Email Verified!", {
          description: response.message,
        });
        hideModals();
        return; // guard — nothing below should run on success
      }

      // ── Server returned a structured failure ─────────────────────────────
      const displayMessage =
        OTP_ERROR_MESSAGES[response.code] ?? response.message;
      toast.error("Verification Failed", {
        description: displayMessage,
      });
    } catch {
      // ── Unexpected failure ───────────────────────────────────────────────
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (value: string) => {
    if (value.length === 6) {
      await verifyOtp(value);
    }
  };

  const handleChange = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      handleVerify(value);
    }
  };

  const handleResendOTP = async () => {
    if (canResend) {
      const response = await signupWithEmail(email, "");
      if (response.success) {
        toast.success("OTP Resent", {
          description: "A new OTP has been sent to your email.",
        });
      } else {
        toast.error("Failed to resend OTP", {
          description: response.message || "Please try again later.",
        });
      }
      setCountdown(60);
      setCanResend(false);
      setOtp("");
    }
  };

  return (
    <Dialog open={authState === "verifying"} onOpenChange={hideModals}>
      <DialogContent className="w-full max-w-md p-0 border-0 bg-transparent shadow-none">
        <DialogTitle className="sr-only">OTP Verification</DialogTitle>
        <div className="bg-white rounded-2xl w-full px-6 py-8 relative shadow-2xl">
          {/* Close Button */}
          <button
            onClick={hideModals}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-100 md:hidden"
            aria-label="Close"
          >
            <X size={24} strokeWidth={3} />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
              <Mail size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Verify OTP
            </h1>
            <p className="text-gray-800 text-center mt-2 text-sm max-w-[80%] leading-relaxed">
              {/* We have sent a verification code to <br /> */}
              For test purpose use this code ---{">"}{" "}
              <span className="font-semibold text-primary text-lg font-bold">
                123456
              </span>{" "}
              <br />
              {/* <span className="font-semibold text-gray-900">{email}</span> */}
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center mb-8">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={handleChange}
              disabled={isAuthLoading}
            >
              <InputOTPGroup className="gap-2 sm:gap-3">
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-lg font-bold border-gray-200 bg-gray-50 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-gray-900"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Verify Button */}
          <div className="mb-6">
            <Button
              onClick={() => handleVerify(otp)}
              className={`w-full py-6 text-base font-semibold shadow-lg transition-all rounded-xl ${
                otp.length === 6 && !isAuthLoading
                  ? "bg-primary text-white shadow-primary/20 hover:bg-primary/90 hover:scale-[1.01]"
                  : "bg-primary/50 text-white shadow-none cursor-not-allowed"
              }`}
              disabled={otp.length !== 6 || isAuthLoading}
            >
              {isAuthLoading && otp.length === 6 ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin text-white" size={20} />
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify"
              )}
            </Button>
          </div>

          {/* Resend Code */}
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Didn&apos;t receive the code?
            </p>
            {canResend ? (
              <button
                onClick={handleResendOTP}
                disabled={isAuthLoading}
                className="text-primary font-semibold text-sm hover:text-primary/80 transition-colors hover:underline flex items-center justify-center mx-auto gap-2"
              >
                {isAuthLoading && otp.length !== 6 && (
                  <Loader2 className="animate-spin" size={16} />
                )}
                {isAuthLoading && otp.length !== 6
                  ? "Resending..."
                  : "Resend Verification Code"}
              </button>
            ) : (
              <p className="text-gray-500 text-sm font-medium">
                Resend code in{" "}
                <span className="text-gray-700 shadow-sm border px-1.5 py-0.5 rounded bg-gray-50 ml-1">
                  {countdown}s
                </span>
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
