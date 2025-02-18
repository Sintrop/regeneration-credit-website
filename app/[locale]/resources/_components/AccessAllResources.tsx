import { CardInfoWithLink } from "@/components/CardInfoWithLink/CardInfoWithLink";
import { TType } from "@/types/t"

interface Props {
    t: TType;
}
export function AccessAllResources({ }: Props) {
    return (
        <section className="w-full bg-[#08514C] rounded-[40px] px-2 py-10 lg:px-20 lg:py-20 mt-20">
            <h3 className="font-bold text-white text-3xl">Accesse todos os recursos</h3>

            <div className="flex flex-wrap mt-10 gap-10">
                <CardInfoWithLink
                    title="Whitepapper"
                    description="Code open source and community developed."
                    link="https://google.com"
                />

                <CardInfoWithLink
                    title="Github"
                    description="Code open source and community developed."
                    link="https://github.com/sintrop"
                />

                <CardInfoWithLink
                    title="Documentation"
                    description="Code open source and community developed."
                    link="https://github.com/sintrop"
                />
            </div>
        </section>
    )
}