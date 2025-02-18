import { TType } from "@/types/t"
import { BtnSocialNetwork } from "./BtnSocialNetwork";

interface Props{
    t: TType;
}
export function SocialNetwork({}: Props){
    return(
        <section className="bg-users-community py-10 lg:py-20 mt-10">
            <div className="container mx-auto px-5 lg:px-20">
                <h3 className="font-bold text-3xl text-center">Acompanhe nossas redes sociais</h3>

                <div className="mt-10 flex flex-wrap gap-5 lg:gap-10">
                    <BtnSocialNetwork socialNetwork="instagram"/>
                    <BtnSocialNetwork socialNetwork="linkedin"/>
                    <BtnSocialNetwork socialNetwork="youtube"/>
                    <BtnSocialNetwork socialNetwork="facebook"/>
                    <BtnSocialNetwork socialNetwork="x"/>
                </div>
            </div>
        </section>
    )
}