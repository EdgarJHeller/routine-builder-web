import {useTranslation} from 'react-i18next';

export function Footer({onOpenLegal}) {
    const {t} = useTranslation();

    return (
        <footer className="absolute bottom-8 w-full flex justify-center gap-6 text-content-secondary text-xs">
            <button onClick={() => onOpenLegal("impressum")}
                    className="px-2 py-1 rounded-icon text-content-secondary
           hover:bg-surface-subtle hover:text-content-primary
           focus:ring-2 focus:ring-brand outline-none transition-colors">
                {t('footer.imprint')}
            </button>
            <button onClick={() => onOpenLegal("privacy")}
                    className="px-2 py-1 rounded-icon text-content-secondary
           hover:bg-surface-subtle hover:text-content-primary
           focus:ring-2 focus:ring-brand outline-none transition-colors">
                {t('footer.privacy')}
            </button>
            <a href="https://github.com/EdgarJHeller/routine-builder-web"
               target="_blank"
               rel="noopener noreferrer"
               className="px-2 py-1 rounded-icon text-content-secondary
           hover:bg-surface-subtle hover:text-content-primary
           focus:ring-2 focus:ring-brand outline-none transition-colors">
                GitHub
            </a>
        </footer>
    );
}