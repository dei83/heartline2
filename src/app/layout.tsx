import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        {/* TEMPORARILY DISABLED FOR DEBUGGING */}
        {/* <AuthProvider> */}
        {/* <Toaster position="top-center" richColors /> */}
        {/* <Header /> */}
        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t py-8 mt-12 bg-gray-50 dark:bg-zinc-900">
          <div className="container mx-auto px-4 text-center">
            Debug Mode Active
          </div>
        </footer>
        {/* </AuthProvider> */}
      </body>
    </html >
  );
}
