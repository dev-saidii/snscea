import { FC, ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export const Card: FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-white shadow-md rounded-2xl overflow-hidden transition hover:shadow-lg ${className}`}>
            {children}
        </div>
    );
};

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export const CardContent: FC<CardContentProps> = ({ children, className = '' }) => {
    return (
        <div className={`p-5 ${className}`}>
            {children}
        </div>
    );
};
