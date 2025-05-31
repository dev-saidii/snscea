import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import LayoutWrapper from "@/components/LayoutWrapper";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_INSTITUTE_NAME}`,
  description: `Official website of ${process.env.NEXT_PUBLIC_INSTITUTE_NAME}, Designed, Developed and maintained by ${process.env.NEXT_PUBLIC_DEVELOPMENT_INSTITUTE_NAME}`,
  keywords: ["sri neta ji subhash chandra education academy", "snscea", "Parsiya, Kharwaniya", "cbse", "Institute", "primary school", "Education", "school", "sant kabir nagar, santha",],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: `${process.env.NEXT_PUBLIC_INSTITUTE_NAME}`,
    description: `Developed by ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
    url: `${process.env.NEXT_PUBLIC_INSTITUTE_URL}`,
    siteName: `${process.env.NEXT_PUBLIC_INSTITUTE_NAME}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_INSTITUTE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Preview Image",
      },
    ],
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="google-site-verification" content="NzlkVWzCaGnJqI5xKXlbGvIIOc3n60jyF1I2RrOVX7c" />
      <body className="bg-white text-black dark:bg-[#121212] dark:text-white">
        <main role="main">
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <LayoutWrapper>{children}</LayoutWrapper>
          </ThemeProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
