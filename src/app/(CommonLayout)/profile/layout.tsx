"use client";

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {

  return (
      <div className="px-1 flex flex-col md:flex-row w-full md:gap-12">
        <div className="w-full md:w-4/5 my-3">{children}</div>
      </div>
  );
}
