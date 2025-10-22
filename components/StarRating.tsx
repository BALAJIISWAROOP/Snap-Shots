import React, { useState } from 'react';

interface StarRatingProps {
    count?: number;
    rating: number;
    onRate?: (rating: number) => void;
    readOnly?: boolean;
    size?: number;
}

const Star: React.FC<{ filled: boolean; onClick?: () => void; onMouseEnter?: () => void; onMouseLeave?: () => void; size: number; isButton: boolean }> = ({ filled, onClick, onMouseEnter, onMouseLeave, size, isButton }) => {
    const starPath = "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";
    const starClasses = `transition-colors duration-200 ${filled ? 'text-yellow-400' : 'text-zinc-600'} ${isButton ? 'hover:text-yellow-300' : ''}`;

    if (isButton) {
        return (
            <button
                type="button"
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={starClasses}
                style={{ width: size, height: size }}
                aria-label={`Rate ${filled ? 'filled' : 'empty'} star`}
            >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d={starPath} /></svg>
            </button>
        )
    }

    return (
        <span style={{ width: size, height: size }} className={starClasses}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d={starPath} /></svg>
        </span>
    );
};


const StarRating: React.FC<StarRatingProps> = ({ count = 5, rating = 0, onRate = (_) => {}, readOnly = false, size = 28 }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseEnter = (index: number) => {
        if (!readOnly) {
            setHoverRating(index);
        }
    };

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHoverRating(0);
        }
    };

    const handleClick = (index: number) => {
        if (!readOnly) {
            onRate(index);
        }
    };

    return (
        <div className="flex items-center" onMouseLeave={handleMouseLeave}>
            {Array.from({ length: count }, (_, i) => i + 1).map((index) => (
                <Star
                    key={index}
                    size={size}
                    isButton={!readOnly}
                    filled={hoverRating >= index || (!hoverRating && rating >= index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
};

export default StarRating;