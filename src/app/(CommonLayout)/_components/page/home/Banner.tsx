import Image from "next/image"; // Importing Next.js image component for optimization
import bannerImg from "@/src/assets/banner.jpg"; // Adjust the path according to your folder structure

const Banner = () => {
  return (
    <div className="relative h-[500px] w-full flex justify-center">
        {/* bg image */}
      <Image
        src={bannerImg}
        alt="Banner background"
        fill
        style={{ objectFit: "cover" }}
        priority
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"/>

      <div className=" absolute inset-0 flex flex-col justify-center items-center text-center text-white">
       <div className="max-w-[400px]">
       <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-base md:text-lg">
          Discover the best products with us. Quality, affordability, and satisfaction guaranteed.
        </p>
       </div>
      </div>
    </div>
  );
};

export default Banner;
