import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Heartline - Meaningful Messages & Relationship CRM",
    template: "%s | Heartline"
  },
  description: "Find the perfect words for every moment. Heartline helps you manage relationships, remember important dates, and send AI-crafted messages.",
  keywords: ["CRM", "Relationship Management", "Birthday Wishes", "Anniversary Messages", "Message Generator", "AI Messages"],
  authors: [{ name: "Heartline Team" }],
  creator: "Heartline",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://heartline.app",
    title: "Heartline - Meaningful Messages",
    description: "Connect meaningfully with AI-crafted messages and relationship management tools.",
    siteName: "Heartline",
    images: [
      {
        url: "/og-image.jpg", // Needs to be added to public folder
        width: 1200,
        height: 630,
        alt: "Heartline App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heartline - Meaningful Messages",
    description: "Connect meaningfully with AI-crafted messages.",
    creator: "@heartlineapp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <AuthProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t py-8 mt-12 bg-gray-50 dark:bg-zinc-900">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
              <p>&copy; {new Date().getFullYear()} Heartline. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="/privacy" className="hover:underline">Privacy Policy</a>
                <a href="/terms" className="hover:underline">Terms of Service</a>
                <a href="/contact" className="hover:underline opacity-50 cursor-not-allowed">Contact</a>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
