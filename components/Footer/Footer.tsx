import ImageRc from "@/public/assets/img/rc.png";
import Image from "next/image";
import Link from "next/link";
import { TType } from "@/types/t";
import LanguageChanger from "../LanguageChanger";

interface Props {
  t: TType;
}
export async function Footer({ t }: Props) {
  const links = [
    { href: "/", label: t("home") },
    { href: "/resources", label: t("resources") },
    { href: "/download", label: t("app") },
    { href: "/network", label: t("network") },
    { href: "/faq", label: t("faq") },
  ];

  return (
    <footer className="bg-hero-forest text-white">
      <div className="container mx-auto px-5 lg:px-20 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <Link className="flex items-center gap-3" href="/">
            <Image
              src={ImageRc}
              alt="Regeneration Credit"
              quality={100}
              className="w-10 h-10 object-contain"
            />
            <span className="font-anta uppercase tracking-wide text-sm">
              {t("regenerationCredit")}
            </span>
          </Link>

          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 text-sm transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <LanguageChanger />
        </div>

        <p className="mt-12 pt-6 border-t border-white/15 text-xs text-white/60">
          {t("regenerationCredit")} · {t("descriptionHero")}
        </p>
      </div>
    </footer>
  );
}
