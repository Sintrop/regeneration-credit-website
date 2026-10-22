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
  const [hasProvider, setHasProvider] = useState(false);

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

  // Only offer the one-click flow to visitors who already run the extension.
  if (!hasProvider) return null;

  return (
    <button
      onClick={handleAddChain}
      className={
        networkPage
          ? "inline-flex h-12 items-center justify-center gap-3 rounded-full bg-brand px-6 font-semibold text-white transition-colors hover:bg-brand-deep"
          : "inline-flex h-12 items-center justify-center gap-3 rounded-md border-2 border-white px-6 font-semibold text-white transition-colors hover:bg-white hover:text-black"
      }
    >
      <Image
        alt=""
        src={MMIcon}
        width={24}
        height={24}
        quality={100}
        className="object-contain"
      />
      {t("addToMetamask")}
    </button>
  );
}
