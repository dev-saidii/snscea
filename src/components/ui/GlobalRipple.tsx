"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GlobalRipple() {
    const pathname = usePathname();
    const isDashboardRoute = pathname.startsWith("/dashboard");

    useEffect(() => {
        if (isDashboardRoute) return;

        const handleClick = (e: MouseEvent) => {
            // Do not ripple on buttons, links, or inputs
            const target = e.target as HTMLElement;
            const tagName = target.tagName.toLowerCase();

            if (["button", "a", "input", "textarea", "select", "svg"].includes(tagName)) return;

            const maxRipples = 5;

            for (let i = 0; i < maxRipples; i++) {
                const ripple = document.createElement("div");
                ripple.className = `global-ripple ripple-${i + 1}`;
                ripple.style.left = `${e.clientX}px`;
                ripple.style.top = `${e.clientY}px`;
                document.body.appendChild(ripple);

                ripple.addEventListener("animationend", () => {
                    ripple.remove();
                });
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [isDashboardRoute]);

    return null;
}
