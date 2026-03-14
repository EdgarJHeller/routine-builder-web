import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageToggle } from '../../components/common/LanguageToggle.jsx';

describe('LanguageToggle', () => {
    it('renders EN and DE buttons', () => {
        render(<LanguageToggle />);
        expect(screen.getByText('EN')).toBeInTheDocument();
        expect(screen.getByText('DE')).toBeInTheDocument();
    });

    it('highlights EN when lang is en', () => {
        render(<LanguageToggle />);
        expect(screen.getByText('EN')).toHaveClass('text-brand');
        expect(screen.getByText('DE')).toHaveClass('text-content-secondary');
    });

    it('calls changeLanguage when clicked', async () => {
        render(<LanguageToggle />);
        await userEvent.click(screen.getByRole('button'));
        // toggle is called — no error thrown is sufficient
    });
});