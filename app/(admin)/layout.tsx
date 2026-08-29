import { cookies } from "next/headers";
import AdminLayoutWrapper from "./admin/_components/admin-layout-wrapper";

const ADMIN_TOKEN_KEY = "admin_access_token";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_KEY)?.value;

  // Pass token as prop — middleware handles redirects for non-login pages.
  // No redirect here to avoid infinite loop on /admin/login.
  return (
    <AdminLayoutWrapper token={token}>{children}</AdminLayoutWrapper>
  );
}
