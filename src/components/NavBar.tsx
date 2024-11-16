"use client";

import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";
import { WalletIcon } from "./WalletIcon";
import { SiteNav } from "./SiteNav";
import { APP_CONFIG } from "@/config/app";
import Image from "next/image";
import { useFundsBalance } from "@/hooks/useFundsBalance";
import { FundsManagementButton } from "./FundsManagementButton";

export const NavBar = () => {
  const { primaryWallet } = useDynamicContext();

  return (
    <div className="flex justify-end p-3 bg-gray-300 sticky top-0 z-60 height-32">
      {primaryWallet?.address && (
        <FundsManagementButton
          address={primaryWallet?.address as `0x${string}`}
        />
      )}
      <DynamicWidget />
    </div>
  );

  // return (
  //   <div className="flex flex-col">
  //     <div className="flex justify-between items-center p-3 bg-gray-300 sticky top-0 z-60">
  //       <div className="flex items-center gap-3">
  //         <div className="w-8 h-8">
  //           <Image
  //             src={APP_CONFIG.images.logo}
  //             alt={APP_CONFIG.name}
  //             width={42}
  //             height={42}
  //             priority
  //           />
  //         </div>
  //         <span className="text-xl font-bold">{APP_CONFIG.name}</span>
  //       </div>

  //       <WalletIcon
  //         isHovering={isHovering}
  //         isConnected={!!user}
  //         onMouseEnter={() => setIsHovering(true)}
  //         onMouseLeave={() => setIsHovering(false)}
  //         onClick={openPayPopup}
  //         balance={balance ? balance.toString() : "0"}
  //       />
  //     </div>
  //     <SiteNav />
  //   </div>
  // );
};
