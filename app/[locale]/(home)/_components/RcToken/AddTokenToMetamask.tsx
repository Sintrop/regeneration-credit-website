"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function AddTokenToMetamask() {
  const { t } = useTranslation();
  const [hasProvider, setHasProvider] = useState(false);

  useEffect(() => {
    setHasProvider(typeof window !== "undefined" && !!window.ethereum);
  }, []);

  async function addToken() {
    if (typeof window === "undefined" || !window.ethereum) return;

    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: process.env.NEXT_PUBLIC_RCTOKEN_ADDRESS,
          symbol: process.env.NEXT_PUBLIC_RCTOKEN_SYMBOL,
          decimals: 18,
          image: process.env.NEXT_PUBLIC_RCTOKEN_IMAGE_URL,
        },
      },
    });
  }

  if (!hasProvider) {
    return null;
  }

  return (
    <Button
      className="border-green-primary"
      variant="outline"
      onClick={addToken}
    >
      {t("addToMetamask")}
    </Button>
  );
}
