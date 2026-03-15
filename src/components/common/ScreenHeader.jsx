import {useTranslation} from 'react-i18next';
import {ArrowLeft} from 'lucide-react';
import {ThemeToggle} from './ThemeToggle.jsx';
import {LanguageSelect} from './LanguageSelect.jsx';

export function ScreenHeader({title, subtitle, onBack, theme, toggleTheme, children}) {
    const {t} = useTranslation();

    return (
        <div className="bg-surface-card border-b border-stroke-default px-6 pt-6 pb-8 mb-6">
            <div className="flex justify-between items-center mb-6">
                {onBack ? (
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-content-secondary font-bold
                                   hover:text-content-primary transition-colors
                                   focus:outline-none focus:ring-2 focus:ring-brand rounded-icon pr-2"
                    >
                        <ArrowLeft size={20}/>
                        {t('editor.back')}
                    </button>
                ) : (
                    <div/>
                )}
                <div className="flex items-center gap-2">
                    <ThemeToggle theme={theme} onToggle={toggleTheme}/>
                    <LanguageSelect/>
                </div>
            </div>

            <div>
                {children || (
                    <>
                        <h2 className="text-3xl font-extrabold text-content-primary">{title}</h2>
                        <p className="text-content-secondary mt-1">{subtitle}</p>
                    </>
                )}
            </div>
        </div>
    );
}