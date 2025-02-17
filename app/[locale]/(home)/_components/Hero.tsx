import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="container mx-auto flex flex-col gap-10 px-5 pb-10 lg:pt-20 lg:px-20 lg:pb-36">
            <h2 className="text-white text-3xl text-center font-bold lg:max-w-[40%] lg:text-4xl lg:text-start">
                A Peer-to-Peer Nature Regeneration System
            </h2>

            <h3 className="text-white text-center lg:text-start lg:text-2xl lg:max-w-[50%]">
                We introduce the Regeneration Credit, a funding mechanism for environmental service and a smart contract certification system.
            </h3>

            <div className="flex flex-col items-center gap-5 md:gap-10 md:flex-row">
                <Button
                    className="bg-blue-primary rounded-[40px] h-[50px] w-full md:w-[295px]"
                >
                    Download Whitepaper
                </Button>

                <Button
                    className="border-2 border-white rounded-[40px] h-[50px] bg-transparent flex items-center justify-between pr-1 font-semibold gap-5 w-full md:w-auto"
                >
                    Get started

                    <div className="h-[40px] w-[40px] rounded-full bg-blue-primary items-center justify-center">

                    </div>
                </Button>
            </div>
        </section>
    )
}