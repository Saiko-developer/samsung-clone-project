import "../style/globals.css";
import { Toaster } from "sonner";
import { SearchProvider } from "@/context/SearchContext";
import GlobalSearch from "@/components/search/GlobalSearch";
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 transition-colors duration-300">
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