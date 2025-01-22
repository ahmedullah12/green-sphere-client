"use client";

import { Navbar } from "@/src/components/navbar";
import { useUser } from "@/src/context/user.provider";
import { IGroup } from "@/src/types";
import { cn } from "@nextui-org/theme";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Heart, Home, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
    label: "Upvoted Posts",
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

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setIsLoading } = useUser();

  const { data: myGroups } = useQuery({
    queryKey: ["GET_MY_GROUPS", user?._id],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}/groups/my-groups/${user?._id}`
      );

      return res.data;
    },
  });

  console.log(myGroups);

  useEffect(() => {
    if (!user) {
      return setIsLoading(true);
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen lg:grid lg:grid-cols-[280px,1fr] mt-16">
        {/* Sidebar */}
        <aside className="mt-[70px] fixed top-0 left-0 z-30 max-w-[320px] h-screen border-r dark:border-gray-800 bg-white dark:bg-gray-900 hidden lg:block">
          <div className="flex flex-col h-full px-4 py-8">
            {/* Navigation Links for large device */}
            <nav className="flex-1 space-y-1">
              {sidebarLinks.map((link) => (
                <SidebarLink key={link.href} {...link} />
              ))}
              {myGroups && myGroups?.data.length > 0 && (
                <div className="">
                  <h2 className="text-xl font-semibold mb-2">Your Groups</h2>
                  {myGroups?.data &&
                    myGroups?.data?.map((group: IGroup) => (
                     <div key={group._id} className="flex items-center gap-x-2 my-1">
                      <Image width={40} height={40} src={group.avatar} className="rounded-full" alt={group.name.slice(0, 3)}/>
                       <Link className="text-sm hover:underline" href={`/groups/${group._id}`}>
                        {group.name}
                      </Link>
                     </div>
                    ))}
                </div>
              )}
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
          <div className="container mx-auto px-1 md:ps-16 md:pe-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
