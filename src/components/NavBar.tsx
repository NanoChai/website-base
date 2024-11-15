"use client";

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export const NavBar = () => {
  return (
    <div className="flex justify-end p-3 bg-gray-300 sticky top-0 z-60">
      <DynamicWidget />
    </div>
  );
};
