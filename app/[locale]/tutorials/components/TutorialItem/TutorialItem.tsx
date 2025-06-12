import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { getContentMDFromGitHub } from "@/services/github";
import { TutorialProps } from "../../tutorialsList";
import { TType } from "@/types/t";
import Link from "next/link";

interface Props {
    item: TutorialProps
    t: TType;
    index: number
}
export async function TutorialItem({ item, t, index }: Props) {
    const htmlContent = await getContentMDFromGitHub({
        pathFile: item?.pathFile,
        repo: item?.repo,
        username: item?.username
    })

    return (
        <AccordionItem
            value={index.toString()}
            className="w-full bg-[#E9E9E9] rounded-md px-5"
        >
            <AccordionTrigger>{t(item?.title)}</AccordionTrigger>
            <AccordionContent
                className="bg-green-2 w-full p-5 rounded-md mb-5"
            >
                <div
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                    className="markdown-content"
                />

                <div className="flex items-center justify-center mt-5">
                    <Link
                        href={`/tutorials/${item?.id}`}
                        className="text-center text-blue-500 underline"
                    >
                        {t('seeMoreDetails')}
                    </Link>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}