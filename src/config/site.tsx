export type SiteConfig = typeof siteConfig;
import { Bell, House, Images } from "lucide-react";
import { PiUsersThreeFill } from "react-icons/pi";


export const siteConfig = {
  name: "Green Sphere",
  description: "Connect with gardening enthusiasts.",
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
      label: "Notifications",
      icon: <Bell />,
      href: "/notifications",
    },
    {
      label: "Gallery",
      icon: <Images />,
      href: "/gallery",
    },
  ],
};
