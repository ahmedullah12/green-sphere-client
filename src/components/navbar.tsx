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
import { useUser } from "../context/user.provider";
import NavbarDropdown from "./NavbarDropdown";
import logo from "../assets/logo2.png";
import Image from "next/image";
import { useNotifications } from "../context/notification.provider";

export const Navbar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const { notifications } = useNotifications();

  const unreadNotifications = notifications?.filter(
    (noti) => noti.read === false
  ).length;

  return (
    <>
      {/* Fixed wrapper */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NextUINavbar
          className="bg-primary dark:bg-default text-white"
          maxWidth="full"
        >
          {/* Left Side - Logo */}
          <NavbarContent className="basis-1/5" justify="start">
            <NavbarBrand as="li" className=" max-w-fit">
              <NextLink className="flex justify-start items-center" href="/">
                <Image className="w-[60px] md:w-[70px]" src={logo} alt="logo" />
                <p className="text-md md:text-xl font-bold text-inherit">
                  GreenSphere
                </p>
              </NextLink>
            </NavbarBrand>
          </NavbarContent>

          {/* Center - Navigation Links */}
          <NavbarContent className="hidden lg:flex basis-3/5" justify="center">
            <ul className="flex gap-4 justify-center">
              {siteConfig.navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <NavbarItem key={item.href}>
                    <NextLink
                      className={clsx(
                        linkStyles({ color: "foreground" }),
                        "text-white font-medium px-3 py-2 rounded-md transition-all relative",
                        isActive
                          ? "border-b-2 border-white rounded-none"
                          : "border-none"
                      )}
                      href={item.href}
                    >
                      {item.label}
                      {item.href === "/notifications" &&
                        unreadNotifications > 0 && (
                          <span className="absolute top-0 right-0 text-xs text-primary flex justify-center items-center  bg-white size-4 rounded-full ">
                            {unreadNotifications}
                          </span>
                        )}
                    </NextLink>
                  </NavbarItem>
                );
              })}
            </ul>
          </NavbarContent>

          {/* Right Side - Theme Switch */}
          <NavbarContent
            className="hidden sm:flex basis-1/5 sm:basis-full lg:me-6"
            justify="end"
          >
            <NavbarItem className="hidden lg:flex">
              <ThemeSwitch />
            </NavbarItem>

            {user?.email ? (
              <NavbarItem className="hidden lg:flex gap-2">
                <NavbarDropdown />
              </NavbarItem>
            ) : (
              <NavbarItem className="hidden lg:flex gap-2">
                <Link
                  className="text-white font-medium py-2 rounded-md transition-all"
                  href="/login"
                >
                  Login
                </Link>
              </NavbarItem>
            )}
          </NavbarContent>

          {/* Mobile menu items */}
          <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
            <ThemeSwitch />
            {user?.email ? (
              <NavbarItem className="lg:hidden gap-2">
                <NavbarDropdown />
              </NavbarItem>
            ) : (
              <NavbarItem className="lg:hidden gap-2">
                <Link
                  className="text-sm text-white py-2 rounded-md transition-all"
                  href="/login"
                >
                  Login
                </Link>
              </NavbarItem>
            )}
            <NavbarMenuToggle />
          </NavbarContent>

          {/* Mobile Menu */}
          <NavbarMenu className="bg-gray-100 text-black dark:bg-default">
            <div className="mx-4 mt-2 flex flex-col gap-2">
              {siteConfig.navMenuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    className="text-black flex gap-x-5"
                    href={item.href}
                    size="lg"
                  >
                    <span>{item.icon}</span>
                    <p>
                      {item.label}
                      {item.href === "/notifications" &&
                        unreadNotifications > 0 && (
                          <span className="">({unreadNotifications})</span>
                        )}
                    </p>
                  </Link>
                </NavbarMenuItem>
              ))}
            </div>
          </NavbarMenu>
        </NextUINavbar>
      </div>
    </>
  );
};
