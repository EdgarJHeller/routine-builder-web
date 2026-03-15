import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {LanguageToggle} from '../../components/common/LanguageToggle.jsx';

describe('LanguageToggle', () => {
    it('renders all language options', () => {
        render(<LanguageToggle/>);
        expect(screen.getByText('EN')).toBeInTheDocument();
        expect(screen.getByText('DE')).toBeInTheDocument();
        expect(screen.getByText('FR')).toBeInTheDocument();
        expect(screen.getByText('ES')).toBeInTheDocument();
    });

    it('renders a select element', () => {
        render(<LanguageToggle/>);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('has EN selected by default', () => {
        render(<LanguageToggle/>);
        expect(screen.getByRole('combobox')).toHaveValue('en');
    });
});