import '@testing-library/jest-dom';
import {vi} from 'vitest';

vi.mock('react-i18next', () => ({
    useTranslation: vi.fn(() => ({
        t: (key) => key,
        i18n: {
            language: 'en',
            changeLanguage: vi.fn(),
        },
    })),
}));