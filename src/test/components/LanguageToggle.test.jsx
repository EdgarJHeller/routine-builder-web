import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageToggle } from '../../components/common/LanguageToggle.jsx';

describe('LanguageToggle', () => {
    it('renders EN and DE buttons', () => {
        render(<LanguageToggle lang="en" onToggle={vi.fn()} />);
        expect(screen.getByText('EN')).toBeInTheDocument();
        expect(screen.getByText('DE')).toBeInTheDocument();
    });

    it('highlights EN when lang is en', () => {
        render(<LanguageToggle lang="en" onToggle={vi.fn()} />);
        expect(screen.getByText('EN')).toHaveClass('text-brand');
        expect(screen.getByText('DE')).toHaveClass('text-content-secondary');
    });

    it('highlights DE when lang is de', () => {
        render(<LanguageToggle lang="de" onToggle={vi.fn()} />);
        expect(screen.getByText('DE')).toHaveClass('text-brand');
        expect(screen.getByText('EN')).toHaveClass('text-content-secondary');
    });

    it('calls onToggle when clicked', async () => {
        const onToggle = vi.fn();
        render(<LanguageToggle lang="en" onToggle={onToggle} />);
        await userEvent.click(screen.getByRole('button'));
        expect(onToggle).toHaveBeenCalledOnce();
    });
});