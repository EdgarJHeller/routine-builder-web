import {useTranslation} from 'react-i18next';
import {LANGUAGES} from '../../config/languages.js';

export function LanguageSelect() {
    const {i18n} = useTranslation();
    const lang = i18n.language?.slice(0, 2);

    return (
        <select
            value={lang}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-surface-subtle border border-stroke-default shadow-card
               rounded-icon text-[10px] font-bold text-content-secondary
               p-2 focus:ring-2 focus:ring-brand outline-none
               cursor-pointer"
            aria-label="Select language"
        >
            {LANGUAGES.map(({code, label}) => (
                <option key={code} value={code}>
                    {label}
                </option>
            ))}
        </select>
    );
}