import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { Header } from "@/components/Header/Header";
import { HeroResources } from "./_components/HeroResources";
import { AccessAllResources } from "./_components/AccessAllResources";
//import { SocialNetwork } from "./_components/SocialNetwork";
import { Footer } from "@/components/Footer/Footer";

const i18nNamespaces = ["resources"];

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Resources({ params }: Props) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="bg-back-home w-full flex flex-col bg-cover bg-center">
        <Header t={t} />

        <HeroResources t={t} />
      </div>

      <main>
        <div className="container mx-auto px-5 lg:px-20">
          <AccessAllResources t={t} />
        </div>

        {/* <SocialNetwork t={t} /> */}
      </main>

      <Footer t={t} />
    </TranslationsProvider>
  );
}
