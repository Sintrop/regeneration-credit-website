import Link from "next/link";

interface Props{
    title: string;
    description: string;
    link: string;
}
export async function CardTechnologyInfo({description, link, title}: Props){
    return(
        <div className="lg:w-[31%] h-[380px] bg-white rounded-[30px] p-10 gap-10 flex flex-col">
            <h4 className="font-bold text-2xl">{title}</h4>
            <p className="text-gray-400">{description}</p>

            <Link
                href={link}
                target="_blank"
                className="underline"
            >
                Link to more information
            </Link>
        </div>
    )
}