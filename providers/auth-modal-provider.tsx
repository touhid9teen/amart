import { LoginModal } from "@/components/auth/login-modal";
import { OtpVerificationModal } from "@/components/auth/otp-verification-modal";
import { SingUpModal } from "@/components/auth/sign-up-modal";

export function AuthModalsProvider() {
  return (
    <>
      <LoginModal />
      <SingUpModal />
      <OtpVerificationModal />
    </>
  );
}
