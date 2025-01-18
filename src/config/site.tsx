export type SiteConfig = typeof siteConfig;
import { Bell, House, Images } from "lucide-react";
import { PiUsersThreeFill } from "react-icons/pi";

export const siteConfig = {
  name: "Green Sphere",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: <House />,
      href: "/",
    },
    {
      label: <PiUsersThreeFill size={26}/>,
      href: "/groups",
    },
    {
      label: <Bell />,
      href: "/notifications",
    },
    {
      label: <Images />,
      href: "/gallery",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      icon: <House />,
      href: "/",
    },
    {
      label: "Groups",
      icon: <PiUsersThreeFill size={24}/>,
      href: "/groups",
    },
    {
      label: "Gallery",
      icon: <Images />,
      href: "/gallery",
    },
  ],
};
