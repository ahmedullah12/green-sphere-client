import GardeningQuotes from "@/src/components/UI/GardeningQuotes";
import Banner from "../_components/page/home/Banner";
import LatestPosts from "../_components/page/home/LatestPosts";

export default function Home() {
  return <div>
    <Banner/>
    <GardeningQuotes/>
    <LatestPosts/>
  </div>;
}
