import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteConfirmModal from '../../components/common/DeleteConfirmModal.jsx';

describe('DeleteConfirmModal', () => {
    it('renders nothing when exerciseName is null', () => {
        const { container } = render(
            <DeleteConfirmModal
                exerciseName={null}
                onCancel={vi.fn()}
                onConfirm={vi.fn()}
            />
        );
        expect(container).toBeEmptyDOMElement();
    });

    it('renders the exercise name when provided', () => {
        render(
            <DeleteConfirmModal
                exerciseName="Push-ups"
                onCancel={vi.fn()}
                onConfirm={vi.fn()}
            />
        );
        expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });

    it('calls onCancel when cancel button is clicked', async () => {
        const onCancel = vi.fn();
        render(
            <DeleteConfirmModal
                exerciseName="Push-ups"
                onCancel={onCancel}
                onConfirm={vi.fn()}
            />
        );
        await userEvent.click(screen.getByText('editor.cancel'));
        expect(onCancel).toHaveBeenCalledOnce();
    });

    it('calls onConfirm when delete button is clicked', async () => {
        const onConfirm = vi.fn();
        render(
            <DeleteConfirmModal
                exerciseName="Push-ups"
                onCancel={vi.fn()}
                onConfirm={onConfirm}
            />
        );
        await userEvent.click(screen.getByText('editor.deleteButton'));
        expect(onConfirm).toHaveBeenCalledOnce();
    });

    it('does not call onConfirm when cancel is clicked', async () => {
        const onConfirm = vi.fn();
        render(
            <DeleteConfirmModal
                exerciseName="Push-ups"
                onCancel={vi.fn()}
                onConfirm={onConfirm}
            />
        );
        await userEvent.click(screen.getByText('editor.cancel'));
        expect(onConfirm).not.toHaveBeenCalled();
    });
});