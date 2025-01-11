export type SiteConfig = typeof siteConfig;
import { House, Images } from "lucide-react";
import { MdGroupAdd } from "react-icons/md";

export const siteConfig = {
  name: "Green Sphere",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: <House />,
      href: "/",
    },
    {
      label: <MdGroupAdd size={26}/>,
      href: "/groups",
    },
    {
      label: <Images />,
      href: "/gallery",
    },
  ],
  navMenuItems: [
    {
      label: <House />,
      href: "/",
    },
    {
      label: <MdGroupAdd />,
      href: "/groups",
    },
    {
      label: <Images />,
      href: "/gallery",
    },
  ],
};
