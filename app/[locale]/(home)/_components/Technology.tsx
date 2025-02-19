import { TType } from "@/types/t";
import { CardInfoWithLink } from "@/components/CardInfoWithLink/CardInfoWithLink";

interface Props{
    t: TType;
}
export async function Technology({t}: Props){
    return(
        <section className="w-full bg-back-home-2 py-10 lg:py-20 bg-cover bg-center bg-no-repeat">
            <div className="container mx-auto px-5 lg:px-20">
                <h3 className="font-bold text-white text-3xl">{t('technology')}</h3>

                <div className="flex flex-wrap justify-center gap-8 mt-20">
                    <CardInfoWithLink
                        title={t('openSource')}
                        description={t('descCardOpenSource')}
                        link="https://google.com"
                    />
                    <CardInfoWithLink
                        title={t('publicData')}
                        description={t('descCardPublicData')}
                        link="https://google.com"
                    />
                    <CardInfoWithLink
                        title={t('smartContracts')}
                        description={t('descCardSmartContracts')}
                        link="https://google.com"
                    />
                </div>
            </div>
        </section>
    )
}