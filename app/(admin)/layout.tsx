import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLayoutWrapper from "./admin/_components/admin-layout-wrapper";

const ADMIN_TOKEN_KEY = "admin_access_token";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_KEY)?.value;

  // Server-side auth check — if no token, redirect to login
  if (!token) {
    redirect("/admin/login");
  }

  // Token exists — pass it to the client component so it can verify profile
  return (
    <AdminLayoutWrapper token={token}>{children}</AdminLayoutWrapper>
  );
}
