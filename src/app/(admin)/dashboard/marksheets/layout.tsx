"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Home, FilePlus, ClipboardList } from "lucide-react";

const navLinks = [
  { label: "Add Marksheet", href: "/dashboard/marksheets/add", icon: FilePlus },
  { label: "View All Marksheets", href: "/dashboard/marksheets/list", icon: ClipboardList },
];

const SIDEBAR_WIDTH = 256;
const TOPBAR_HEIGHT = 64;

const MarksheetLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const isDark = theme === "dark";

  return (
    <div
      className={`flex transition-colors duration-200 ${
        isDark
          ? "bg-gradient-to-br from-[#101e2a] to-[#1a2d3b]"
          : "bg-gradient-to-br from-[#eaf6fb] to-[#f6fbff]"
      }`}
      style={{ height: `calc(100vh - ${TOPBAR_HEIGHT}px)` }}
    >
      {/* Sidebar */}
      <aside
        className={`hidden md:flex flex-col shadow-lg py-8 px-4 z-30 border-r transition-colors duration-300
          ${isDark
            ? "bg-[#1a2d3b] border-[#22384a]"
            : "bg-gradient-to-br from-[#eaf6fb] to-[#f6fbff] border-gray-100"
          }`}
        style={{
          width: SIDEBAR_WIDTH,
          position: "fixed",
          top: TOPBAR_HEIGHT,
          left: 0,
          height: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
        }}
      >
        <h2 className={`text-2xl font-bold text-center mb-8 tracking-tight ${isDark ? "text-white" : "text-[#205D80]"}`}>
          Marksheets
        </h2>
        <nav className="flex-1">
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      active
                        ? "bg-[#205D80] text-white shadow-lg"
                        : isDark
                          ? "text-gray-300 hover:bg-[#22384a]"
                          : "text-[#205D80] hover:bg-[#eaf6fb]"
                    }`}
                  >
                    <link.icon
                      size={22}
                      className={`group-hover:scale-110 transition-transform ${
                        active
                          ? "text-white"
                          : isDark
                            ? "text-gray-400"
                            : "text-[#205D80]"
                      }`}
                      strokeWidth={active ? 2 : 1.5}
                    />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col relative"
        style={{
          marginLeft: SIDEBAR_WIDTH,
          marginTop: 0,
        }}
      >
        {/* Top Controls */}
        <div className="fixed z-40 flex py-3 justify-between w-[calc(100%-256px)]">
          <button
            onClick={() => router.back()}
            className={`flex cursor-pointer items-center gap-2 px-4 py-2 ml-6 rounded-full shadow-lg transition-transform hover:scale-105 ${
              isDark
                ? "bg-[#22384a] text-white hover:bg-[#2a4660]"
                : "bg-white text-[#205D80] hover:bg-[#eaf6fb]"
            }`}
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className={`flex cursor-pointer items-center gap-2 px-4 py-2 mr-6 rounded-full shadow-lg transition-transform hover:scale-105 ${
              isDark
                ? "bg-[#22384a] text-white hover:bg-[#2a4660]"
                : "bg-white text-[#205D80] hover:bg-[#eaf6fb]"
            }`}
          >
            <Home size={18} />
            <span className="text-sm font-medium">Dashboard</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          className="overflow-y-auto no-scrollbar px-4 md:px-8"
          style={{
            height: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
            paddingBottom: 32,
            marginTop: TOPBAR_HEIGHT,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MarksheetLayout;
