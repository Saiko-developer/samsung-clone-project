
import "../style/globals.css";
import { Toaster } from "sonner";
import Script from "next/script";
import { SearchProvider } from "@/context/SearchContext";
import GlobalSearch from "@/components/search/GlobalSearch";
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            try {
              const theme = localStorage.getItem('theme');
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            } catch(e) {}
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <SearchProvider>
          <GlobalSearch />
          <main>
            {children}
          </main>
          <Toaster richColors position="top-center" />
        </SearchProvider>
      </body>
    </html>
  );
}
