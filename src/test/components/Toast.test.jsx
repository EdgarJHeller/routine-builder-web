import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Toast } from '../../components/common/Toast.jsx';

describe('Toast', () => {
    it('renders nothing when message is null', () => {
        const { container } = render(<Toast message={null} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders nothing when message is undefined', () => {
        const { container } = render(<Toast message={undefined} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders the message when provided', () => {
        render(<Toast message="Link copied!" />);
        expect(screen.getByText('Link copied!')).toBeInTheDocument();
    });

    it('renders a different message correctly', () => {
        render(<Toast message="Routine imported!" />);
        expect(screen.getByText('Routine imported!')).toBeInTheDocument();
    });
});