import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

interface Props{
    socialNetwork: SocialNetworkNames;
}
export function BtnSocialNetwork({socialNetwork}: Props){
    const Data = mapSocialNetworkToData[socialNetwork];

    return(
        <Link
            href={Data?.link}
            target="_blank"
            className="rounded-[40px] border-black border-2 border-b-4 border-r-4 p-3 bg-white flex items-center justify-between w-full lg:max-w-[48%]"
        >
            <div className="flex items-center gap-3">
                <Data.Icon size={30}/>
                <p className="font-semibold">{Data?.label}</p>
            </div>

            <FaArrowRight size={30}/>
        </Link>
    )
}

const mapSocialNetworkToData = {
    instagram: {
        link: 'https://google.com',
        Icon: FaInstagram,
        label: 'Instagram'
    },
    linkedin: {
        link: 'https://google.com',
        Icon: FaLinkedin,
        label: 'Linkedin'
    },
    facebook: {
        link: 'https://google.com',
        Icon: FaFacebook,
        label: 'Facebook'
    },
    youtube: {
        link: 'https://google.com',
        Icon: FaYoutube,
        label: 'Youtube'
    },
    x: {
        link: 'https://google.com',
        Icon: FaXTwitter,
        label: 'X'
    },
}

type SocialNetworkNames = keyof typeof mapSocialNetworkToData;