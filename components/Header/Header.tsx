import Link from "next/link";
import { Button } from "../ui/button";

export function Header(){
    return(
        <header
            className="container mx-auto py-10 flex items-center justify-between"
        >
            <p>Imagem crédito</p>

            <section className="flex items-center gap-5">
                <nav className="flex items-center gap-10 rounded-button bg-white/50 px-10 h-[60px]">
                    <Link href="/">Home</Link>
                    <Link href="/resources">Resources</Link>
                </nav>

                <Button
                    className="px-10 h-[50px] rounded-button bg-blue-primary text-white text-semibold"
                >
                    Launch App
                </Button>
            </section>
        </header>
    )
}