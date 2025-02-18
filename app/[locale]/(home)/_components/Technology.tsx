import { TType } from "@/types/t";
import { CardInfoWithLink } from "@/components/CardInfoWithLink/CardInfoWithLink";

interface Props{
    t: TType;
}
export async function Technology({}: Props){
    return(
        <section className="w-screen bg-back-home-2 py-10 lg:py-20 bg-cover bg-center bg-no-repeat">
            <div className="container mx-auto px-5 lg:px-20">
                <h3 className="font-bold text-white text-3xl">Technology</h3>

                <div className="flex flex-wrap justify-center gap-8 mt-20">
                    <CardInfoWithLink
                        title="Open source"
                        description="Open source and community developed."
                        link="https://google.com"
                    />
                    <CardInfoWithLink
                        title="Public data"
                        description="Every data in the system is public and transparent to everyone"
                        link="https://google.com"
                    />
                    <CardInfoWithLink
                        title="Smart contracts"
                        description="The RC is a set of smart contracts that define the rules of the system without a trusted central authority."
                        link="https://google.com"
                    />
                </div>
            </div>
        </section>
    )
}