"use client";

import React from "react";

const items = [
  "Service 1",
  "Service 2",
  "Service 3",
  "Service 4",
  "Service 5",
  "Service 6",
  "Service 7",
  "Service 8",
];

export default function ReactDisplay({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className="w-full grid grid-cols-4 grid-rows-2 ">
      {items.map((item, index) => (
        <div
          key={index}
          className="m-4 p-6 bg-white rounded-lg shadow-md flex flex-col items-center"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
