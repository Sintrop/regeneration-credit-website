import { TType } from "@/types/t";
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import ImageRc from '@/public/assets/img/rc.png';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa6";

interface Props {
    t: TType;
}
export function NavMenuMobile({ t }: Props) {
    return (
        <SheetContent className="">
            <SheetHeader className="">
                <Link
                    className="flex justify-start items-center gap-3 w-[150px]"
                    href="/"
                >
                    <Image
                        src={ImageRc}
                        alt="Regeneration credit icon"
                        quality={100}
                        className="w-8 h-8 object-contain"
                    />

                    <SheetTitle className="text-black font-bold uppercase text-sm">{t('regenerationCredit')}</SheetTitle>
                </Link>
            </SheetHeader>

            <nav className="flex flex-col gap-5 mt-10">
                <Link
                    href="/"
                    className="text-black underline"
                >
                    - {t('home')}
                </Link>
                <Link
                    href="/resources"
                    className="text-black underline"
                >
                    - {t('resources')}
                </Link>
            </nav>

            <Button
                className="px-10 h-[50px] rounded-[40px] bg-blue-primary text-white text-semibold mt-10"
            >
                {t('launchApp')}
            </Button>

            <Button
                className="mt-5 border-2 border-blue-primary rounded-[40px] h-[50px] bg-transparent text-black flex items-center justify-between pr-1 font-semibold gap-5 w-fit"
            >
                {t('getStarted')}

                <div className="h-[40px] w-[40px] rounded-full bg-blue-primary flex items-center justify-center">
                    <FaPlay size={20} color='white' />
                </div>
            </Button>

        </SheetContent>
    )
}