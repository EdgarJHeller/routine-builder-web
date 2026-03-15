import {describe, expect, it, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import {useTranslation} from 'react-i18next';
import {LanguageSelect} from '../../components/common/LanguageSelect.jsx';

describe('LanguageSelect', () => {
    it('renders all language options', () => {
        render(<LanguageSelect/>);
        expect(screen.getByText('EN')).toBeInTheDocument();
        expect(screen.getByText('DE')).toBeInTheDocument();
        expect(screen.getByText('FR')).toBeInTheDocument();
        expect(screen.getByText('ES')).toBeInTheDocument();
    });

    it('renders a select element', () => {
        render(<LanguageSelect/>);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('reflects the current i18n language', () => {
        render(<LanguageSelect/>);
        expect(screen.getByRole('combobox')).toHaveValue('en');
    });

    it('reflects German when i18n language is de', () => {
        vi.mocked(useTranslation).mockReturnValueOnce({
            t: (key) => key,
            i18n: {language: 'de', changeLanguage: vi.fn()},
        });
        render(<LanguageSelect/>);
        expect(screen.getByRole('combobox')).toHaveValue('de');
    });

    it('calls changeLanguage when selection changes', () => {
        const changeLanguage = vi.fn();
        vi.mocked(useTranslation).mockReturnValueOnce({
            t: (key) => key,
            i18n: {language: 'en', changeLanguage},
        });
        render(<LanguageSelect/>);
        fireEvent.change(screen.getByRole('combobox'), {target: {value: 'fr'}});
        expect(changeLanguage).toHaveBeenCalledWith('fr');
    });

    it('has an accessible aria-label', () => {
        render(<LanguageSelect/>);
        expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', 'Select language');
    });
});