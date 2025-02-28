import { Button } from "@/components/ui/button";
import { TType } from "@/types/t";
import { FaPlay } from "react-icons/fa6";

interface Props{
    t: TType;
}
export function Hero({t}: Props) {
    return (
        <section className="container mx-auto flex flex-col gap-10 px-5 pb-10 lg:pt-20 lg:px-20 lg:pb-36">
            <h2 className="text-white text-3xl text-center font-bold lg:max-w-[40%] lg:text-4xl lg:text-start">
                {t('titleHero')}
            </h2>

            <p className="text-white text-center lg:text-start lg:text-2xl lg:max-w-[50%]">
                {t('descriptionHero')}
            </p>

            <div className="flex flex-col items-center gap-5 md:gap-10 md:flex-row">
                <Button
                    className="bg-blue-primary w-full md:w-[295px]"
                >
                    {t('downloadWhitepaper')}
                </Button>

                <Button
                    className="border-2 border-white rounded-[40px] h-[50px] bg-transparent flex items-center justify-between pr-1 font-semibold gap-5 w-full md:w-auto"
                >
                    {t('getStarted')}

                    <div className="h-[40px] w-[40px] rounded-full bg-blue-primary flex items-center justify-center">
                        <FaPlay size={20} color='white'/>
                    </div>
                </Button>
            </div>
        </section>
    )
}