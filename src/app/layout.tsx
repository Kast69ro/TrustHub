import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { ReduxProvider } from "@/components/providers/redux/redux";
import { Navigation } from "@/components/shared/navigation/navigation";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrustHub – Discover Trusted Resources",
  description: "Curated and verified tools, platforms, and services for professionals.",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "64x64" },
      { url: "/logo.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180" },
    ],
  },
  openGraph: {
    title: "TrustHub – Discover Trusted Resources",
    description: "Verified tools and platforms curated by experts.",
    url: "https://trusthub.dev",
    siteName: "TrustHub",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "TrustHub",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrustHub – Discover Trusted Resources",
    description: "Verified tools and platforms curated by experts.",
    images: ["/logo.png"],
  },
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navigation/>
        <ReduxProvider>
            {children}
             <Toaster position="bottom-right" richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}
