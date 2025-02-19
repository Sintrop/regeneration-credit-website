import initTranslations from '../../i18n';
import TranslationsProvider from '@/components/TranslationsProvider';
import { Header } from '@/components/Header/Header';
import { Hero } from './_components/Hero';
import { WhatIsIt } from './_components/WhatIsIt';
import { RcToken } from './_components/RcToken';
import { Technology } from './_components/Technology';
import { Community } from './_components/Community';
import { Footer } from '@/components/Footer/Footer';
import type { Metadata } from 'next';

const i18nNamespaces = ['home'];

type Props = {
    params: Promise<{ locale: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const locale = (await params).locale;
    const { t } = await initTranslations(locale, i18nNamespaces);

    return {
        title: 'title',
        description: 'teste description novo'
    }
}

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
        >
            <div className='bg-back-home w-full flex flex-col bg-cover bg-center'>
                <Header t={t} />

                <Hero t={t} />
            </div>

            <main>
                <div className='container mx-auto px-5 lg:px-20'>
                    <WhatIsIt t={t} />

                    <RcToken t={t} />
                </div>

                <Technology t={t} />

                <div className='container mx-auto px-5 lg:px-20'>
                    <Community t={t} />
                </div>
            </main>

            <Footer t={t} />
        </TranslationsProvider>
    );
}
