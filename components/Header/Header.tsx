import Link from "next/link";
import Image from "next/image";
import ImageRc from "@/public/assets/img/rc.png";
import { TType } from "@/types/t";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { NavMenuMobile } from "./components/NavMenuMobile";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";

interface Props {
  t: TType;
}
export async function Header({ t }: Props) {
  const links = [
    { href: "/", label: t("home") },
    { href: "/resources", label: t("resources") },
    { href: "/download", label: t("app") },
    { href: "/network", label: t("network") },
    { href: "/tutorials", label: t("tutorials") },
  ];

  return (
    <header className="container mx-auto px-5 lg:px-20 py-6 flex items-center justify-between">
      <Link className="flex items-center gap-3" href="/">
        <Image
          src={ImageRc}
          alt="Regeneration Credit"
          quality={100}
          className="w-9 h-9 md:w-10 md:h-10 object-contain"
        />

        <span className="font-anta text-white uppercase tracking-wide text-sm md:text-base">
          {t("regenerationCredit")}
        </span>
      </Link>

      <nav className="hidden lg:flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white/80 text-sm font-medium transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger aria-label="Open menu">
            <HiOutlineBars3BottomRight size={26} color="white" />
          </SheetTrigger>
          <NavMenuMobile t={t} />
        </Sheet>
      </div>
    </header>
  );
}
