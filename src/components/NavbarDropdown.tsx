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
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavbarDropdown() {
  const { user, setIsLoading } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    router.refresh(); 
    router.push('/login');
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
        <DropdownItem onPress={handleLogout} key="delete">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}