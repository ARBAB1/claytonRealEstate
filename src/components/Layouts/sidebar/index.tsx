"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_DATA } from "./data";
import { cn } from "@/lib/utils";
import { FaBars } from "react-icons/fa";
import { useSidebarContext } from "./sidebar-context";
import Image from "next/image";

export function Sidebar() {
  const pathname = usePathname();
  const { isMobile, isOpen, setIsOpen, toggleSidebar } = useSidebarContext();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "border-r bg-[#fffafa] dark:bg-gray-dark dark:border-gray-800 transition-all duration-300",
          isMobile
            ? "fixed top-0 bottom-0 z-50 w-64"
            : collapsed
            ? "w-20"
            : "w-64",
          "h-screen"
        )}
      >
        {/* Header: Logo + Toggle */}
        <div className="flex items-center justify-between px-3 py-3 border-b border-gray-200">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/home/logo.png" // Make sure this path matches your uploaded logo
              alt="Logo"
              width={collapsed ? 40 : 100} // Adjust width based on collapsed state
              height={40}
              className={cn(
                "transition-all duration-300",
                collapsed ? "w-10 mx-auto" : "w-28"
              )}
            />
          </Link>

          {/* Hamburger Toggle */}
          {!isMobile && (
            <button
              onClick={handleToggle}
              className="text-gray-500 hover:text-red-600"
            >
              <FaBars size={18} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 px-3">
          {NAV_DATA.map((section) => (
            <div key={section.label} className="mb-4">
              {!collapsed && (
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  {section.label}
                </h2>
              )}

              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium",
                        pathname === item.url
                          ? "bg-[#FFF3F3] text-[#FC4341]"
                          : "text-gray-600 hover:text-[#FC4341]",
                        collapsed && "justify-center"
                      )}
                    >
                      <item.icon className="text-[#FC4341]" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
