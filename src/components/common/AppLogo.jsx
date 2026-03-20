export const AppLogo = ({size = 64, className = ""}) => {
    const r = size * 0.34;
    const cx = size / 2;
    const cy = size / 2;
    const strokeWidth = size * 0.044;
    const fontSize = size * 0.35;

    const startX = cx;
    const startY = cy - r;
    const endAngle = 225 * (Math.PI / 180);
    const endX = cx + r * Math.cos(endAngle);
    const endY = cy + r * Math.sin(endAngle);

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Routine Editor"
            role="img"
        >
            <rect
                x="0" y="0"
                width={size} height={size}
                rx={size * 0.225}
                style={{fill: 'var(--color-brand, #2563eb)'}}
            />
            <circle
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke="white"
                strokeWidth={strokeWidth}
                strokeOpacity="0.2"
            />
            <path
                d={`M${startX},${startY} A${r},${r} 0 1,1 ${endX},${endY}`}
                fill="none"
                stroke="white"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
            <text
                x={cx + size * 0.006}
                y={cy + size * 0.088}
                fontSize={fontSize}
                fontWeight="500"
                fill="white"
                textAnchor="middle"
                fontFamily="var(--font-sans)"
            >
                R
            </text>
        </svg>
    );
};