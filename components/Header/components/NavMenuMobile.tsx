import { TType } from "@/types/t";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import ImageRc from "@/public/assets/img/rc.png";
import Link from "next/link";

interface Props {
  t: TType;
}
export function NavMenuMobile({ t }: Props) {
  const links = [
    { href: "/", label: t("home") },
    { href: "/resources", label: t("resources") },
    { href: "/download", label: t("app") },
    { href: "/network", label: t("network") },
    { href: "/faq", label: t("faq") },
  ];

  return (
    <SheetContent>
      <SheetHeader>
        <Link className="flex items-center gap-3" href="/">
          <Image
            src={ImageRc}
            alt="Regeneration Credit"
            quality={100}
            className="w-8 h-8 object-contain"
          />

          <SheetTitle className="font-anta text-ink uppercase tracking-wide text-sm">
            {t("regenerationCredit")}
          </SheetTitle>
        </Link>
      </SheetHeader>

      <nav className="flex flex-col mt-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="py-3 border-b border-line text-ink font-medium transition-colors hover:text-brand"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/download"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-brand px-7 h-12 font-semibold text-white transition-colors hover:bg-brand-deep"
      >
        {t("getStarted")}
      </Link>
    </SheetContent>
  );
}
