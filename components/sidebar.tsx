"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BarChart2, 
  ShoppingCart, 
  Package, 
  FileBarChart, 
  MessageSquare, 
  Settings, 
  LogOut 
} from "lucide-react";
import Image from "next/image";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: BarChart2,
  },
  {
    name: "Order",
    href: "/order",
    icon: ShoppingCart,
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
  },
  {
    name: "Sales Report",
    href: "/sales-report",
    icon: FileBarChart,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col bg-white border-r">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <Image
            src="/navlogo.png"
            width={50}
            height={50}
            alt="ReServe"/>
          <span className="font-bold text-lg">ReServe</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 gap-1">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-indigo-600",
                  pathname === item.href
                    ? "bg-indigo-600 text-white hover:text-white"
                    : "text-gray-500"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Link
          href="/sign-out"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-500 transition-all hover:text-indigo-600"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Link>
      </div>
      {/* <div className="p-4 bg-indigo-50 rounded-lg mx-4 mb-4">
        <div className="flex flex-col items-center text-center">
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center mb-2">
            <span className="text-white font-bold">D</span>
          </div>
          <h3 className="font-bold text-indigo-700">Dabang Pro</h3>
          <p className="text-xs text-gray-500 mt-1 mb-2">Get access to all features</p>
          <button className="bg-white text-indigo-600 border border-indigo-600 rounded-md px-4 py-1 text-sm font-medium">
            Get Pro
          </button>
        </div>
      </div> */}
    </div>
  );
}