import initTranslations from '../../i18n';
import TranslationsProvider from '@/components/TranslationsProvider';
import { Header } from '@/components/Header/Header';
import { Hero } from './_components/Hero';
import { WhatIsIt } from './_components/WhatIsIt';

const i18nNamespaces = ['home'];

export default async function Home({params: {locale}} : {params : {locale: string}}) {
    const {t, resources} = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
        >
            <>
                <div className='bg-back-home w-full flex flex-col bg-cover bg-center'>
                    <Header locale={locale} namespace={i18nNamespaces} />

                    <Hero/>
                </div>

                <main className='container mx-auto px-5 lg:px-20'>
                    <WhatIsIt/>
                </main>
            </>
        </TranslationsProvider>
    );
}
