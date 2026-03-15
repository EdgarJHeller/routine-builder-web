import {useEffect, useRef} from "react";

export const useFocusTrap = (isOpen) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        if (!modalRef.current) return;

        const modalElement = modalRef.current;
        const focusableElements = modalElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTab = (e) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        firstElement?.focus();

        window.addEventListener("keydown", handleTab);
        return () => window.removeEventListener("keydown", handleTab);
    }, [isOpen]);

    return modalRef;
};