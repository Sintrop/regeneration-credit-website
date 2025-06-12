import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/TranslationsProvider';
import { Header } from '@/components/Header/Header';
import { HeroTutorials } from '../components/HeroTutorials';
import { Footer } from '@/components/Footer/Footer';
import { LanguagesAvailablesForTutorials, tutorialsListPerLanguage } from '../tutorialsList';
import { redirect } from 'next/navigation';
import { getContentMDFromGitHub } from '@/services/github';
import type { Metadata } from 'next';

const i18nNamespaces = ['tutorials'];

type Props = {
    params: Promise<{ locale: LanguagesAvailablesForTutorials; id: string }>
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const {locale, id} = await params;
    const { t } = await initTranslations(locale, i18nNamespaces);

    const findTutorial = tutorialsListPerLanguage[locale].filter(item => item.id === id);
    const tutorial = findTutorial[0];

    return {
        title: t(tutorial?.title),
        description: t(tutorial?.description),
        openGraph: {
            type: "website",
            title: t(tutorial?.title) as string,
            description: t(tutorial?.description) as string,
            alternateLocale: ["en", "pt"],
            url: `https://sintrop.com/${locale}/tutorials/${tutorial?.id}`,
            locale,
            siteName: "Sintrop",
            images: "https://sintrop.com/assets/images/sintrop-og.png",
        },
        alternates: {
            canonical: `https://sintrop.com/tutorials/${tutorial?.id}`,
            languages: {
                "en": `https://sintrop.com/en/tutorials/${tutorial?.id}`,
                "pt": `https://sintrop.com/pt/tutorials/${tutorial?.id}`,
            }
        },
    }
}

export default async function Tutorial({ params }: Props) {
    const { id, locale } = await params;
    const { t, resources } = await initTranslations(locale, i18nNamespaces);
    const findTutorial = tutorialsListPerLanguage[locale].filter(item => item.id === id);

    if (findTutorial.length === 0) {
        return redirect('/tutorials');
    }

    const tutorial = findTutorial[0];

    const contentMDTutorial = await getContentMDFromGitHub({
        pathFile: tutorial.pathFile,
        repo: tutorial.repo,
        username: tutorial.username,
    });

    return (
        <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
        >
            <div className='bg-back-home w-full flex flex-col bg-cover bg-center'>
                <Header t={t} />
                <HeroTutorials t={t} title={tutorial.title} />
            </div>

            <main className='container mx-auto px-5 lg:px-20 my-10 lg:my-20'>
                <div
                    dangerouslySetInnerHTML={{ __html: contentMDTutorial }}
                    className="markdown-content"
                />
            </main>

            <Footer t={t} />
        </TranslationsProvider>
    )
}