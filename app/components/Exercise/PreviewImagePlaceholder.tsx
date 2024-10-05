import React from 'react';

export default function PreviewImagePlaceholder() {
    const strokeColor = 'var(--foreground)';

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 600"
            className="w-full h-full"
        >
            <line
                x1="150"
                y1="450"
                x2="650"
                y2="450"
                stroke={strokeColor}
                strokeWidth="3"
            />

            <g
                stroke={strokeColor}
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
            >
                <circle cx="350" cy="250" r="25"/>

                <line x1="350" y1="275" x2="370" y2="350"/>

                <line x1="350" y1="300" x2="280" y2="320"/>
                <line x1="350" y1="300" x2="420" y2="280"/>

                <path d="M370,350 Q400,380 450,450"/>
                <line x1="370" y1="350" x2="300" y2="450"/>
            </g>

            <g
                stroke={strokeColor}
                strokeWidth="2"
                strokeDasharray="8,4"
            >
                <path d="M280,320 Q260,330 250,320"/>
                <path d="M420,280 Q440,270 460,280"/>
            </g>

            <g
                stroke={strokeColor}
                strokeWidth="2"
            >
                <line
                    x1="460"
                    y1="260"
                    x2="480"
                    y2="260"
                    strokeDasharray="5,3"
                />
                <line
                    x1="470"
                    y1="280"
                    x2="490"
                    y2="280"
                    strokeDasharray="5,3"
                />
                <line
                    x1="480"
                    y1="300"
                    x2="500"
                    y2="300"
                    strokeDasharray="5,3"
                />
            </g>
        </svg>
    );
};