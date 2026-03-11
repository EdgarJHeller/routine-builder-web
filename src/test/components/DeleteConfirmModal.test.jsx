import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteConfirmModal from '../../components/common/DeleteConfirmModal.jsx';

const t = {
    ui: {
        deleteWarning: 'Are you sure you want to delete:',
        cancel: 'Cancel',
        deleteButton: 'Delete',
    }
};

describe('DeleteConfirmModal', () => {
    it('renders nothing when exerciseName is null', () => {
        const { container } = render(
            <DeleteConfirmModal
                exerciseName={null}
                t={t}
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
                t={t}
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
                t={t}
                onCancel={onCancel}
                onConfirm={vi.fn()}
            />
        );
        await userEvent.click(screen.getByText('Cancel'));
        expect(onCancel).toHaveBeenCalledOnce();
    });

    it('calls onConfirm when delete button is clicked', async () => {
        const onConfirm = vi.fn();
        render(
            <DeleteConfirmModal
                exerciseName="Push-ups"
                t={t}
                onCancel={vi.fn()}
                onConfirm={onConfirm}
            />
        );
        await userEvent.click(screen.getByText('Delete'));
        expect(onConfirm).toHaveBeenCalledOnce();
    });

    it('does not call onConfirm when cancel is clicked', async () => {
        const onConfirm = vi.fn();
        render(
            <DeleteConfirmModal
                exerciseName="Push-ups"
                t={t}
                onCancel={vi.fn()}
                onConfirm={onConfirm}
            />
        );
        await userEvent.click(screen.getByText('Cancel'));
        expect(onConfirm).not.toHaveBeenCalled();
    });
});