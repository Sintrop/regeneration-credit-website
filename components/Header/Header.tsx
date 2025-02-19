import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import ImageRc from '@/public/assets/img/rc.png';
import { TType } from "@/types/t";
import {Sheet, SheetTrigger} from '@/components/ui/sheet';
import { NavMenuMobile } from "./components/NavMenuMobile";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";

interface Props{
    t: TType;
}
export async function Header({t}: Props){
    return(
        <header
            className="container mx-auto py-10 flex items-center justify-between px-5"
        >
            <Link
                className="flex items-center gap-3"
                href="/"
            >
                <Image
                    src={ImageRc}
                    alt="Regeneration credit icon"
                    quality={100}
                    className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] object-contain"
                />

                <h1 className="text-white font-bold uppercase text-sm md:text-xl">{t('regenerationCredit')}</h1>
            </Link>

            <section className="items-center gap-5 hidden lg:flex">
                <nav className="flex items-center gap-10 rounded-button bg-white/50 px-10 h-[60px]">
                    <Link 
                        href="/"
                        className="text-white"
                    >
                        {t('home')}
                    </Link>
                    <Link 
                        href="/resources"
                        className="text-white"
                    >
                        {t('resources')}
                    </Link>
                </nav>

                <Button
                    className="px-10 h-[50px] rounded-[40px] bg-blue-primary text-white text-semibold"
                >
                    {t('launchApp')}
                </Button>
            </section>

            <div className="lg:hidden">
                <Sheet>
                    <SheetTrigger>
                        <HiOutlineBars3BottomRight size={25} color='white'/>
                    </SheetTrigger>
                    <NavMenuMobile t={t} />
                </Sheet>
            </div>
        </header>
    )
}