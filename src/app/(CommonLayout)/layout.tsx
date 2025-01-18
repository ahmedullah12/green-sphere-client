"use client";

import { Navbar } from "@/src/components/navbar";
import { cn } from "@nextui-org/theme";
import { Home, Users, Heart, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLink {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
}

const sidebarLinks: SidebarLink[] = [
  {
    icon: Home,
    label: "News Feed",
    href: "/",
  },
  {
    icon: Users,
    label: "Friends",
    href: "/friends",
  },
  {
    icon: Heart,
    label: "Liked Posts",
    href: "/liked-posts",
  },
  {
    icon: Star,
    label: "Favorite Posts",
    href: "/favorite-posts",
  },
];

const SidebarLink = ({ icon: Icon, label, href }: SidebarLink) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          isActive && "bg-primary/10 text-primary"
        )}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
   <>
   <Navbar/>
   <div className="relative min-h-screen lg:grid lg:grid-cols-[280px,1fr] mt-16">
      {/* Sidebar */}
      <aside className="mt-[70px] fixed top-0 left-0 z-30 w-[280px] h-screen border-r dark:border-gray-800 bg-white dark:bg-gray-900 hidden lg:block">
        <div className="flex flex-col h-full px-4 py-8">
          
          
          {/* Navigation Links */}
          <nav className="flex-1 space-y-1">
            {sidebarLinks.map((link) => (
              <SidebarLink key={link.href} {...link} />
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t dark:border-gray-800 lg:hidden">
        <nav className="flex justify-around py-3">
          {sidebarLinks.map(({ icon: Icon, href }) => (
            <Link key={href} href={href} className="p-2">
              <Icon className="w-6 h-6" />
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="lg:col-start-2 mb-10">
        <div className="container mx-auto px-1 md:px-4 py-8">{children}</div>
      </main>
    </div>
   </>
  );
}