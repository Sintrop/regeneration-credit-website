import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { Header } from "@/components/Header/Header";
import { HeroResources } from "./_components/HeroResources";

const i18nNamespaces = ['resources'];

export default async function Resources({ params: { locale } }: { params: { locale: string } }) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);
    return (
        <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
        >
            <>
                <div className='bg-back-home w-full flex flex-col bg-cover bg-center'>
                    <Header t={t} />

                    <HeroResources t={t}/>
                </div>
            </>
        </TranslationsProvider>
    )
}