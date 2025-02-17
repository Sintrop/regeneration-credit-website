import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="container mx-auto pt-20 px-20 pb-36 flex flex-col gap-10">
            <h2 className="text-white text-4xl font-bold max-w-[40%]">
                A Peer-to-Peer Nature Regeneration System
            </h2>

            <h3 className="text-white text-2xl max-w-[50%]">
                We introduce the Regeneration Credit, a funding mechanism for environmental service and a smart contract certification system.
            </h3>

            <div className="flex items-center gap-10">
                <Button
                    className="bg-blue-primary rounded-[40px] h-[50px] w-[295px]"
                >
                    Download Whitepaper
                </Button>

                <Button
                    className="border-2 border-white rounded-[40px] h-[50px] bg-transparent flex items-center justify-between pr-1 font-semibold gap-5"
                >
                    Get started

                    <div className="h-[40px] w-[40px] rounded-full bg-blue-primary items-center justify-center">

                    </div>
                </Button>
            </div>
        </section>
    )
}