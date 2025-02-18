import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import ImageRc from '@/public/assets/img/rc.png';
import { TType } from "@/types/t";

interface Props{
    t: TType;
}
export async function Header({t}: Props){
    return(
        <header
            className="container mx-auto py-10 flex items-center justify-between px-5"
        >
            <Link
                className="flex items-center gap-4"
                href="/"
            >
                <Image
                    src={ImageRc}
                    alt="Regeneration credit icon"
                    quality={100}
                    className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-contain"
                />

                <h1 className="text-white font-bold uppercase lg:text-xl">{t('regenerationCredit')}</h1>
            </Link>

            <section className="items-center gap-5 hidden lg:flex">
                <nav className="flex items-center gap-10 rounded-button bg-white/50 px-10 h-[60px]">
                    <Link 
                        href="/"
                        className="text-white"
                    >
                        Home
                    </Link>
                    <Link 
                        href="/resources"
                        className="text-white"
                    >
                        Resources
                    </Link>
                </nav>

                <Button
                    className="px-10 h-[50px] rounded-[40px] bg-blue-primary text-white text-semibold"
                >
                    Launch App
                </Button>
            </section>
        </header>
    )
}