import GardeningQuotes from "@/src/components/UI/GardeningQuotes";
import Banner from "../_components/page/home/Banner";

export default async function Home() {
  return (
    <div>
      <Banner/>
      <GardeningQuotes/>
    </div>
  );
}