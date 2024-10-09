"use client";

import { useRef, useState } from "react";
import { Home, Menu, X } from "lucide-react";
import Link from "next/link";
import { Divider } from "@nextui-org/divider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Navbar */}
      <nav className="bg-accent shadow-md md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link
                  href="/"
                  className="text-2xl text-primary font-semibold italic"
                >
                  RoomReserve
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {showSidebar ? (
                  <X
                    color="black"
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                ) : (
                  <Menu
                    color="black"
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-30 w-64 md:w-80 bg-secondary overflow-y-auto transition-transform duration-300 ease-in-out 
        ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 flex flex-col justify-between min-h-screen`}
      >
        <div>
          <div className="p-4">
            <p className="mb-3 text-2xl text-primary italic font-bold">
              Dashboard
            </p>
            <Divider />
          </div>
          <div>
            {/* sidebar links */}
          </div> 
        </div>
        <div className="p-4">
          <Link
            href="/"
            className="flex items-center justify-center w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200"
          >
            <Home className="mr-2" size={20} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-grow overflow-auto p-4 ml-0 md:ml-80">
        {children}
      </div>
    </div>
  );
}
