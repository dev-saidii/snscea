"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import GlobalRipple from "@/components/ui/GlobalRipple";
import { Suspense } from "react";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isDashboardRoute = pathname.startsWith("/dashboard");

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>


                {!isDashboardRoute && <Header />}
                <div>
                    <CustomCursor />
                    <GlobalRipple />
                    {children}
                </div>

                {!isDashboardRoute && <Footer />}
            </Suspense>
        </>
    );
}
