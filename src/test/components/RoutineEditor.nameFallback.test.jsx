import {describe, expect, it, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import RoutineEditor from '../../components/routines/RoutineEditor.jsx';

const defaultProps = {
    exercises: [],
    routineName: 'My Routine',
    onUpdateRoutineName: vi.fn(),
    onBack: vi.fn(),
    addExercise: vi.fn(),
    deleteExercise: vi.fn(),
    moveExercise: vi.fn(),
    updateExercise: vi.fn(),
    onStart: vi.fn(),
    onOpenLegal: vi.fn(),
    theme: 'light',
    toggleTheme: vi.fn(),
};

describe('RoutineEditor — routine name fallback', () => {
    it('sets fallback name on blur when name is empty', () => {
        const onUpdateRoutineName = vi.fn();
        render(<RoutineEditor {...defaultProps} routineName="" onUpdateRoutineName={onUpdateRoutineName}/>);

        const input = screen.getByPlaceholderText('editor.routineNamePlaceholder');
        fireEvent.blur(input);

        expect(onUpdateRoutineName).toHaveBeenCalledWith('library.unnamedRoutine');
    });

    it('does not set fallback name on blur when name is set', () => {
        const onUpdateRoutineName = vi.fn();
        render(<RoutineEditor {...defaultProps} routineName="My Routine" onUpdateRoutineName={onUpdateRoutineName}/>);

        const input = screen.getByPlaceholderText('editor.routineNamePlaceholder');
        fireEvent.blur(input);

        expect(onUpdateRoutineName).not.toHaveBeenCalled();
    });

    it('sets fallback name on back when name is empty', () => {
        const onUpdateRoutineName = vi.fn();
        const onBack = vi.fn();
        render(<RoutineEditor {...defaultProps} routineName="" onUpdateRoutineName={onUpdateRoutineName} onBack={onBack}/>);

        fireEvent.click(screen.getByRole('button', {name: /back/i}));

        expect(onUpdateRoutineName).toHaveBeenCalledWith('library.unnamedRoutine');
        expect(onBack).toHaveBeenCalled();
    });

    it('does not set fallback name on back when name is set', () => {
        const onUpdateRoutineName = vi.fn();
        const onBack = vi.fn();
        render(<RoutineEditor {...defaultProps} routineName="My Routine" onUpdateRoutineName={onUpdateRoutineName} onBack={onBack}/>);

        fireEvent.click(screen.getByRole('button', {name: /back/i}));

        expect(onUpdateRoutineName).not.toHaveBeenCalled();
        expect(onBack).toHaveBeenCalled();
    });

    it('sets fallback name on back when name is only whitespace', () => {
        const onUpdateRoutineName = vi.fn();
        render(<RoutineEditor {...defaultProps} routineName="   " onUpdateRoutineName={onUpdateRoutineName}/>);

        fireEvent.click(screen.getByRole('button', {name: /back/i}));

        expect(onUpdateRoutineName).toHaveBeenCalledWith('library.unnamedRoutine');
    });
});