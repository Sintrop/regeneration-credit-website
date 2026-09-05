"use client";
import MMIcon from "@/public/assets/icons/metamask.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  networkPage?: boolean;
}
export function AddToMetamask({ networkPage }: Props) {
  const { t } = useTranslation();
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);

  useEffect(() => {
    setHasProvider(typeof window !== "undefined" && !!window.ethereum);
  }, []);

  async function handleAddChain() {
    if (typeof window === "undefined" || !window.ethereum) return;

    const networkParams = {
      chainId: "0x3D171",
      chainName: "Sintrop",
      nativeCurrency: {
        name: "SINTROP",
        symbol: "SIN",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.sintrop.com"],
      blockExplorerUrls: ["https://explorer.sintrop.com"],
    };

    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [networkParams],
    });
  }

  if (networkPage) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-gray-500 text-sm">{t("youCanAddToMMDescription")}</p>
        {hasProvider === false ? (
          <p className="text-red-500">
            {t("youNeedAMetamaskExtensionInstalled")}
          </p>
        ) : (
          <button
            onClick={handleAddChain}
            disabled={hasProvider === null}
            className="w-full bg-green-700 gap-3 h-[50px] md:h-[60px] rounded-md text-white font-semibold md:w-[220px] flex items-center justify-center hover:cursor-pointer hover:bg-green-800 duration-200 disabled:opacity-60 disabled:cursor-default"
          >
            <Image
              alt="metamask icon"
              src={MMIcon}
              width={40}
              height={40}
              quality={100}
              className="object-contain"
            />

            {t("addToMetamask")}
          </button>
        )}
      </div>
    );
  }

  if (!hasProvider) {
    return null;
  }

  return (
    <button
      onClick={handleAddChain}
      className="w-full border-2 border-white gap-3 h-[50px] md:h-[60px] rounded-md text-white font-semibold md:w-[220px] flex items-center justify-center hover:cursor-pointer hover:bg-white hover:text-black duration-200"
    >
      <Image
        alt="metamask icon"
        src={MMIcon}
        width={40}
        height={40}
        quality={100}
        className="object-contain"
      />

      {t("addToMetamask")}
    </button>
  );
}
