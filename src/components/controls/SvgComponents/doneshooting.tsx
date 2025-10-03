import React from 'react';

interface droneShootingProps {
color?: string;
size?: number | string;
className?: string;
}

const droneShooting: React.FC<droneShootingProps> = ({
    color = "#0F0F0F",
    size = 24,
    className
    }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <path
                d="M12 2L12 22M12 22L6 16M12 22L18 16"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
    };

    export default droneShooting;