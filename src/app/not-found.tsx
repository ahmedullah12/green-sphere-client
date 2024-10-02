"use client"

import { Button } from "@nextui-org/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
        404
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Oops! The page you are looking for doesn&apos;t exist.
      </p>
      <Link href="/" passHref legacyBehavior>
        <Button as="a" color="primary" className="mt-4">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;