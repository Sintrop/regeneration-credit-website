import initTranslations from '../../i18n';
import TranslationsProvider from '@/components/TranslationsProvider';
import { Header } from '@/components/Header/Header';
import { Hero } from './_components/Hero';
import { WhatIsIt } from './_components/WhatIsIt';
import { RcToken } from './_components/RcToken';
import { Technology } from './_components/Technology';
import { Community } from './_components/Community';
import { Footer } from '@/components/Footer/Footer';

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

                <main>
                    <div className='container mx-auto px-5 lg:px-20'>
                        <WhatIsIt/>

                        <RcToken locale={locale} namespace={i18nNamespaces}/>
                    </div>

                    <Technology />

                    <div className='container mx-auto px-5 lg:px-20'>
                        <Community />
                    </div>
                </main>

                <Footer locale={locale} namespace={i18nNamespaces}/>
            </>
        </TranslationsProvider>
    );
}
