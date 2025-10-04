import { LoginModal } from "@/app/_components/auth/login-modal";
import { OtpVerificationModal } from "@/app/_components/auth/otp-verification-modal";
import { SingUpModal } from "@/app/_components/auth/sign-up-modal";

export function AuthModalsProvider() {
  return (
    <>
      <LoginModal />
      <SingUpModal />
      <OtpVerificationModal />
    </>
  );
}
