"use client";

import { useEffect } from "react";
import { Button } from "@nextui-org/button"; // NextUI Button for better styling

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100 dark:bg-gray-900 text-center px-4">
      <h1 className="text-5xl font-bold text-green-600 dark:text-red-400 mb-4">
        Oops!
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Something went wrong. Please try again.
      </p>
      <Button
        onClick={reset}
        color="primary"
        className="mt-4"
      >
        Try Again
      </Button>
    </div>
  );
}
