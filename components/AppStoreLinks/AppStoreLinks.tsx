import Image from "next/image";
import Link from "next/link";

const STORES = [
  {
    href: "https://play.google.com/store/apps/details?id=com.sintrop.activistapp",
    image: "https://www.sintrop.com/assets/google_play.png",
    alt: "Get it on Google Play",
  },
  {
    href: "https://apps.apple.com/br/app/regeneration-credit/id6475600488",
    image: "https://www.sintrop.com/assets/apple-store.png",
    alt: "Download on the App Store",
  },
];

export function AppStoreLinks() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {STORES.map((store) => (
        <Link
          key={store.href}
          href={store.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex transition-opacity hover:opacity-80"
        >
          <Image
            src={store.image}
            alt={store.alt}
            width={190}
            height={56}
            className="h-14 w-auto object-contain"
          />
        </Link>
      ))}
    </div>
  );
}
