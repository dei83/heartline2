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
        <AuthProvider>
          <Toaster position="top-center" richColors />
          <Header />
          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t py-8 mt-12 bg-gray-50 dark:bg-zinc-900">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
              <p>&copy; {new Date().getFullYear()} Heartline. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="/about" className="hover:underline">About</a>
                <a href="/privacy" className="hover:underline">Privacy Policy</a>
                <a href="/terms" className="hover:underline">Terms of Service</a>
                <a href="/contact" className="hover:underline">Contact</a>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html >
  );
}
