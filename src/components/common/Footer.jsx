import {useTranslation} from 'react-i18next';

export function Footer({onOpenLegal}) {
    const {t} = useTranslation();

    return (
        <footer className="absolute bottom-8 w-full flex justify-center gap-6 text-content-secondary text-xs">
            <button onClick={() => onOpenLegal("impressum")}
                    className="hover:underline focus:ring-2 focus:ring-brand">
                {t('ui.imprint')}
            </button>
            <button onClick={() => onOpenLegal("privacy")}
                    className="hover:underline focus:ring-2 focus:ring-brand">
                {t('ui.privacy')}
            </button>
            <a href="https://github.com/EdgarJHeller/routine-builder-web"
               target="_blank"
               rel="noopener noreferrer"
               className="hover:underline focus:ring-2 focus:ring-brand">
                GitHub
            </a>
        </footer>
    );
}