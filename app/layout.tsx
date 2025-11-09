import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleAnalytics } from '@next/third-parties/google';
import portfolioConfig from "@/config/portfolio";
import { GlobalDockNav } from "@/components/navigation/dock-wrapper";
import { BackgroundBeams } from "@/components/ui/background-beams";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    preload: true,
    fallback: ['system-ui', 'arial'],
    adjustFontFallback: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ayushjaipuriyar.com";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: portfolioConfig.seo.title,
        template: `%s | ${portfolioConfig.personal.name}`,
    },
    description: portfolioConfig.seo.description,
    keywords: portfolioConfig.seo.keywords,
    authors: [{ name: portfolioConfig.personal.name, url: siteUrl }],
    creator: portfolioConfig.personal.name,
    publisher: portfolioConfig.personal.name,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        title: portfolioConfig.seo.title,
        description: portfolioConfig.seo.description,
        siteName: portfolioConfig.personal.name,
        images: [
            {
                url: portfolioConfig.seo.ogImage,
                width: 1200,
                height: 630,
                alt: `${portfolioConfig.personal.name} - Portfolio`,
                type: "image/jpeg",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: portfolioConfig.seo.title,
        description: portfolioConfig.seo.description,
        images: [portfolioConfig.seo.ogImage],
        creator: portfolioConfig.personal.social.twitter
            ? `@${portfolioConfig.personal.social.twitter.split('/').pop()}`
            : undefined,
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "48x48" },
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        ],
        shortcut: "/favicon.ico",
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
    },
    manifest: "/manifest.json",
    alternates: {
        canonical: siteUrl,
    },
    category: "technology",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // JSON-LD structured data for Person schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: portfolioConfig.personal.name,
        jobTitle: portfolioConfig.personal.tagline,
        description: portfolioConfig.personal.bio,
        url: siteUrl,
        email: portfolioConfig.personal.email,
        image: `${siteUrl}${portfolioConfig.personal.avatar}`,
        sameAs: [
            portfolioConfig.personal.social.github,
            portfolioConfig.personal.social.linkedin,
            portfolioConfig.personal.social.twitter,
        ].filter(Boolean),
        knowsAbout: portfolioConfig.skills.map(skill => skill.name),
    };

    const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${inter.className} bg-grid-pattern relative`}>
                <BackgroundBeams className="fixed inset-0 z-0" />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange={false}
                >
                    <div className="relative z-10">
                        <GlobalDockNav />
                        {children}
                    </div>
                </ThemeProvider>
                {gaId && <GoogleAnalytics gaId={gaId} />}
            </body>
        </html>
    );
}
