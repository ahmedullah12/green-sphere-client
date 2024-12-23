"use client";

import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/AuthService";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "../constant";
import Link from "next/link";

export default function NavbarDropdown() {
  const router = useRouter();
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    setIsLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" src={user?.profilePhoto} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile">
          <Link href={"/profile"}>Profile</Link>
        </DropdownItem>
        <DropdownItem key={"dashboard"}>
          <Link
            href={
              user?.role === "USER" ? "/user-dashboard" : "/admin-dashboard"
            }
          >
            Dashboard
          </Link>
        </DropdownItem>
        <DropdownItem onClick={() => handleLogout()} key="delete">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
