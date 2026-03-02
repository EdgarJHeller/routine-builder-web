export function formatDuration(exercises) {
    const total = exercises?.reduce((sum, ex) => sum + ex.durationSeconds, 0) || 0;
    if (total < 60) return `${total}s`;
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return seconds === 0 ? `${minutes} min` : `${minutes} min ${seconds}s`;
}