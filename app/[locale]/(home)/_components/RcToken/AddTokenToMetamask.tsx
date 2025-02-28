"use client"

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function AddTokenToMetamask() {
    const { t } = useTranslation();

    async function addToken() {
        if (typeof window !== "undefined") {
            if (!window.ethereum) return;
    
            await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: "ERC20",
                    options: {
                        address: process.env.NEXT_PUBLIC_ADDRESS_RCTOKEN,
                        symbol: process.env.NEXT_PUBLIC_RCTOKEN_SYMBOL,
                        decimals: 18,
                        image: process.env.NEXT_PUBLIC_RCTOKEN_IMAGE_URL
                    }
                }
            });
        }
    }

    if (typeof window !== "undefined") {
        if (!window.ethereum) {
            return <div />
        }
    }

    return (
        <Button
            className='border-green-primary'
            variant='outline'
            onClick={addToken}
        >
            {t('addToMetamask')}
        </Button>
    )
}