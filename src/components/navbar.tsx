"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { Logo } from "@/src/components/icons";
import { useUser } from "../context/user.provider";
import NavbarDropdown from "./NavbarDropdown";

export const Navbar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <NextUINavbar
      className="bg-primary dark:bg-default text-white"
      maxWidth="full"
      position="static"
    >
      {/* Left Side - Logo */}
      <NavbarContent className="basis-1/5" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">GreenSphere</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Center - Navigation Links */}
      <NavbarContent className="hidden lg:flex basis-3/5" justify="center">
        <ul className="flex gap-4 justify-center">
          {siteConfig.navItems.map((item) => {
            const isActive = pathname === item.href; // Check if the current route is active

            return (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "text-white font-medium px-3 py-2 rounded-md transition-all",
                    isActive
                      ? "border-b-2 border-white rounded-none"
                      : "border-none" // Active link background color
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            );
          })}
        </ul>
      </NavbarContent>

      {/* Right Side - Theme Switch */}
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full lg:me-6" justify="end">
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitch />
        </NavbarItem>

        {user?.email ? (
          <NavbarItem className="hidden lg:flex gap-2">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden lg:flex gap-2">
            <Link className="text-white font-medium py-2 rounded-md transition-all" href="/login">
              Login
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Mobile menu items */}
      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        {user?.email ? (
          <NavbarItem className=" lg:hidden gap-2">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className=" lg:hidden gap-2">
            <Link className="text-sm text-white py-2 rounded-md transition-all" href="/login">
              Login
            </Link>
          </NavbarItem>
        )}
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-gray-100 dark:bg-default">
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="text-black"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
