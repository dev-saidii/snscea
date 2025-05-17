import React, { ButtonHTMLAttributes, MouseEvent } from 'react';

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const RippleButton: React.FC<RippleButtonProps> = ({ children, className = '', ...props }) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const rect = button.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
        circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
        button.appendChild(circle);
        circle.classList.add('absolute', 'ripple', 'z-10');
        setTimeout(() => circle.remove(), 600);
    };

    return (
        <button
            {...props}
            className={`relative overflow-hidden ripple ${className}`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default RippleButton;
