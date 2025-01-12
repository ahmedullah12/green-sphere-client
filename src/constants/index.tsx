import { LayoutDashboard } from "lucide-react";
import { BsFillPostcardHeartFill, BsPostcard } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";

export const POST_CATEGORY = {
  Gardening: "GARDENING",
  Vegetable: "VEGETABLE",
  Flower: "FLOWER",
  Herb: "HERB",
  Fruit: "FRUIT",
  Landscaping: "LANDSCAPING",
  Greenhouses: "GREENHOUSES",
  Seasonal_Gardening: "SEASONAL_GARDENING",
  Garden_Tools: "GARDEN_TOOLS",
  Indoor_Gardening: "INDOOR_GARDENING",
} as const;

export const galleryImages = [
  "https://res.cloudinary.com/drg8g1xpx/image/upload/v1728151657/sandie-clarke-q13Zq1Jufks-unsplash-min_hw8rmx.jpg",

  "https://res.cloudinary.com/drg8g1xpx/image/upload/v1728151652/oppo-find-x5-pro-Nc-hc5g5yhw-unsplash-min_kn4uuh.jpg",

  "https://res.cloudinary.com/drg8g1xpx/image/upload/v1728151650/zoe-schaeffer-D_VjFp1ds1Y-unsplash-min_env71g.jpg",

  "https://res.cloudinary.com/drg8g1xpx/image/upload/v1728151642/michael-kahn-xWAsrLw_1hk-unsplash-min_c6vzhf.jpg",

  "https://res.cloudinary.com/drg8g1xpx/image/upload/v1728151643/jonathan-kemper-VTXw4_5SsNA-unsplash-min_qqhaup.jpg",

  "https://res.cloudinary.com/drg8g1xpx/image/upload/v1728151643/dan-gold-4LiUI-Y2mI8-unsplash-min_mqtq7z.jpg",

  "https://res.cloudinary.com/drg8g1xpx/image/upload/v1728151645/devon-mackay-N98hZJHFwGY-unsplash-min_ghlgam.jpg",

  "https://res.cloudinary.com/drg8g1xpx/image/upload/v1728151647/bermix-studio-XRnWMkeN5fM-unsplash-min_ej1mac.jpg",

  "https://res.cloudinary.com/drg8g1xpx/image/upload/v1728151649/neslihan-gunaydin-BduDcrySLKM-unsplash-min_di6s7m.jpg",

  "https://res.cloudinary.com/drg8g1xpx/image/upload/v1728151649/oppo-find-x5-pro-xLKVD1dXFdc-unsplash-min_kczzao.jpg",
];

export const userSidebarItems = [
  { name: "Posts", link: "/user-dashboard", icon: <BsFillPostcardHeartFill /> },
  { name: "Followers", link: "/user-dashboard/followers", icon: <FaUser /> },
  {
    name: "Following",
    link: "/user-dashboard/following",
    icon: <FaUser />,
  },
];
export const adminSidebarItems = [
  {
    name: "Dashboard",
    link: "/admin-dashboard",
    icon: <LayoutDashboard />,
  },
  { name: "All Posts", link: "/admin-dashboard/posts", icon: <BsPostcard /> },
  { name: "All Users", link: "/admin-dashboard/users", icon: <FaUser /> },
  {
    name: "Payments",
    link: "/admin-dashboard/payments",
    icon: <MdOutlinePayment />,
  },
];
