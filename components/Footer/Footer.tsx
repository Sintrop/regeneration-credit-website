import ImageRc from '@/public/assets/img/rc.png';
import initTranslations from '@/app/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';


interface Props {
    locale: string;
    namespace: string[];
}
export async function Footer({ locale, namespace }: Props) {
    const { t } = await initTranslations(locale, namespace);

    return (
        <footer className="bg-green-primary py-10 lg:py-20">
            <div className="container mx-auto flex flex-col gap-5">
                <section className="flex flex-col gap-5 items-center justify-around border-b border-white pb-10 lg:flex-row">
                    <section
                        className="flex items-center gap-4"
                    >
                        <Image
                            src={ImageRc}
                            alt="Regeneration credit icon"
                            quality={100}
                            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-contain"
                        />

                        <h4 className="text-white font-bold uppercase lg:text-xl">{t('regenerationCredit')}</h4>
                    </section>

                    <nav className="flex flex-col gap-5">
                        <Link
                            href="/"
                            className="text-white hover:underline"
                        >
                            - Home
                        </Link>
                        <Link
                            href="/resources"
                            className="text-white hover:underline"
                        >
                            - Resources
                        </Link>
                    </nav>

                    <Button
                        className="border-2 border-white rounded-[40px] h-[50px] bg-transparent flex items-center justify-between pr-1 font-semibold gap-5 w-fit md:w-auto"
                    >
                        Get started

                        <div className="h-[40px] w-[40px] rounded-full bg-blue-primary items-center justify-center">

                        </div>
                    </Button>
                </section>

                <p className='text-white text-center mt-5'>Copyright © Regeneration Credit</p>
            </div>
        </footer>
    )
}