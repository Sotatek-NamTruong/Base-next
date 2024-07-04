"use client";
import { PATH_ROUTER } from "@/constants/router";
import {
  useConnectWallet,
  useEagerConnect,
  useWalletListener,
} from "@/libs/web3/hooks";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainHeader = () => {
  const pathName = usePathname();
  const locale = useLocale();
  const t = useTranslations();

  const [activeUrl, setActiveUrl] = useState("");
  const { disconnectWallet } = useConnectWallet();

  const initialMenus = [];

  useEffect(() => {
    const active = pathName?.split(`/${locale}`)[1];
    setActiveUrl(active);
  }, [pathName, locale]);

  useWalletListener();
  useEagerConnect();

  return (
    <div className="bg-neutral-2">
      <div
        className="flex items-center justify-between h-[68px] px-[50px] py-6 2xl:container w-full m-auto
                    2xs:max-sm:py-4 2xs:max-sm:pl-4 2xs:max-sm:pr-0 2xs:max-sm:h-[54px]
                    sm:max-lg:px-[12px] lg:max-2xl:px-[30px]
        "
      >
        <Link href={PATH_ROUTER.DEFAULT} className="flex items-center ">
          <div className="flex gap-1 text-nowrap sm:max-md:hidden">
            <span className="text-[20px] font-bold text-neutral-white mr-[2px] sm:max-lg:text-xs 2xs:max-sm:text-base">
              BountyTemple
            </span>
            <span className="text-[20px] font-bold bg-main-1 bg-clip-text text-transparent sm:max-lg:text-xs 2xs:max-sm:text-base">
              Marketplace
            </span>
          </div>
        </Link>
        <div className="flex justify-between items-center">
          <div className="flex px-[12px] 2xs:max-sm:hidden 2xs:max-lg:px-1 lg:max-2xl:px-0"></div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
