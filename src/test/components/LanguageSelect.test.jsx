import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
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

    it('has EN selected by default', () => {
        render(<LanguageSelect/>);
        expect(screen.getByRole('combobox')).toHaveValue('en');
    });
});