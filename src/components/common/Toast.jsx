export function Toast({ message }) {
    if (!message) return null;

    return (
        <div className="absolute bottom-8 left-4 right-4 z-50
                        bg-content-primary text-surface-card
                        px-6 py-4 rounded-card shadow-card-lg
                        text-sm font-semibold text-center
                        animate-fade-in">
            {message}
        </div>
    );
}