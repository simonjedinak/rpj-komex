"use client";

import React from "react";

export default function Display({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-t-[7rem] p-2 bg-[linear-gradient(150deg,#404040_0%,#888888_13%,#2d2c2c_22%,#171717_100%)]
        shadow-[0px_-4px_14px_2px_#000002] ${className}`}
    >
      <div className="bg-black rounded-t-[calc(7rem-8px)] py-20 px-10 w-full h-140">
        {/* Your content */}
      </div>
    </div>
  );
}
