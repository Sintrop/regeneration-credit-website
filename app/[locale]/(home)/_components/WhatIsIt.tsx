import { Button } from "@/components/ui/button";
import ImageRc from '@/public/assets/img/rc.png';
import { TType } from "@/types/t";
import Image from "next/image";

interface Props{
    t: TType;
}
export async function WhatIsIt({t}: Props) {
    return (
        <section
            className="flex flex-col items-center justify-between py-10 lg:py-20 lg:flex-row"
        >
            <div className="flex flex-col flex-1 gap-5 w-full lg:gap-10 lg:max-w-[50%]">
                <h3 className="font-bold text-4xl">{t('regenerateToEarn')}</h3>
                <p className="text-xl lg:max-w-[90%]">
                    {t('descWhatIsIt')}
                </p>

                <div className="flex flex-col gap-5 md:flex-row md:gap-10">
                    <Button
                        className="w-full h-[50px] rounded-[40px] bg-transparent border-2 border-green-primary text-black md:w-[200px]"
                    >
                        {t('downloadApp')}
                    </Button>

                    <Button
                        className="w-full h-[50px] rounded-[40px] bg-transparent border-2 border-green-primary text-black md:w-[200px]"
                    >
                        {t('webPlatform')}
                    </Button>
                </div>
            </div>

            <div className="hidden lg:flex w-full justify-center items-center max-w-[50%]">
                <div className="bg-network bg-contain bg-center flex items-center justify-center w-full h-[400px] bg-no-repeat">
                    <Image
                        src={ImageRc}
                        alt={t('altIconRC')}
                        quality={100}
                        className="w-[150px] h-[150px] object-contain"
                    />
                </div>
            </div>

        </section>
    )
}