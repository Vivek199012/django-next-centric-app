import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PageProvider } from "@/components/providers/page-provider";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="flex flex-col min-h-screen">
                        <Header />
                        <div className="flex flex-grow">{children}</div>
                        <Toaster />
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
