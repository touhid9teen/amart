"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { ChevronDown, User, LogOut, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginLogout() {
  const { authState, showLoginModal, logout, email } = useAuth();
  const router = useRouter();

  const handleOrdersClick = () => {
    router.push("/orders");
  };

  if (authState === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="
            flex items-center gap-2 px-3 py-2 rounded-lg
            text-sm font-medium text-gray-700 
            hover:bg-gray-100 hover:text-gray-900
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            transition-all duration-200
            sm:px-4 sm:py-2.5
          "
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
              <User className="h-4 w-4 text-primary" />
            </div>

            <ChevronDown className="h-3 w-3 opacity-60 hidden sm:block" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
          <div className="flex items-center gap-3 p-3 border-b">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Account</p>
              <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>
          </div>

          <div className="py-1">
            <DropdownMenuItem
              onClick={handleOrdersClick}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>My Orders</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <button
      onClick={showLoginModal}
      className="
        flex items-center gap-2 px-3 py-2 rounded-lg
        text-xl font-extrabold text-gray-900 
        hover:bg-primary/5 hover:text-primary
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        transition-all duration-200
        sm:px-4 sm:py-2.5
       
      "
    >
      <span className="hidden sm:inline">Login</span>
    </button>
  );
}
