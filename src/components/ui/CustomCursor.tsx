'use client';

import { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };

        const addGrow = () => cursorRef.current?.classList.add('scale-125');
        const removeGrow = () => cursorRef.current?.classList.remove('scale-125');

        document.addEventListener('mousemove', moveCursor);
        document.querySelectorAll('a,button,.ripple').forEach(el => {
            el.addEventListener('mouseenter', addGrow);
            el.addEventListener('mouseleave', removeGrow);
        });

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            document.querySelectorAll('a,button,.ripple').forEach(el => {
                el.removeEventListener('mouseenter', addGrow);
                el.removeEventListener('mouseleave', removeGrow);
            });
        };
    }, []);

    return (
        <div ref={cursorRef} className="custom-cursor pointer-events-none transition-transform duration-150"></div>
    );
};

export default CustomCursor;
