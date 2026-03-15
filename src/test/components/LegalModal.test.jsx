import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LegalModal from '../../components/common/LegalModal.jsx';

describe('LegalModal', () => {
    it('renders the title', () => {
        render(
            <LegalModal title="Impressum" backText="Back" onClose={vi.fn()}>
                <p>Content</p>
            </LegalModal>
        );
        expect(screen.getByText('Impressum')).toBeInTheDocument();
    });

    it('renders children', () => {
        render(
            <LegalModal title="Impressum" backText="Back" onClose={vi.fn()}>
                <p>Legal content here</p>
            </LegalModal>
        );
        expect(screen.getByText('Legal content here')).toBeInTheDocument();
    });

    it('renders back button with backText', () => {
        render(
            <LegalModal title="Impressum" backText="Back" onClose={vi.fn()}>
                <p>Content</p>
            </LegalModal>
        );
        expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    });

    it('calls onClose when back button is clicked', async () => {
        const onClose = vi.fn();
        render(
            <LegalModal title="Impressum" backText="Back" onClose={onClose}>
                <p>Content</p>
            </LegalModal>
        );
        await userEvent.click(screen.getByRole('button', { name: 'Back' }));
        expect(onClose).toHaveBeenCalledOnce();
    });

    it('calls onClose when Escape is pressed', async () => {
        const onClose = vi.fn();
        render(
            <LegalModal title="Impressum" backText="Back" onClose={onClose}>
                <p>Content</p>
            </LegalModal>
        );
        await userEvent.keyboard('{Escape}');
        expect(onClose).toHaveBeenCalledOnce();
    });

    it('has correct dialog role and aria-modal', () => {
        render(
            <LegalModal title="Impressum" backText="Back" onClose={vi.fn()}>
                <p>Content</p>
            </LegalModal>
        );
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveAttribute('aria-modal', 'true');
    });
});