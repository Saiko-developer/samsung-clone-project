"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

const SearchContext = createContext(undefined);

export function SearchProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const cacheRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (cacheRef.current) {
      return cacheRef.current;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/data.json", { cache: "force-cache" });
      const data = await res.json();
      cacheRef.current = data;
      return data;
    } catch (err) {
      console.error("Failed to fetch search data:", err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const search = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHighlightedIndex(-1);
      return;
    }

    const q = searchQuery.toLowerCase();
    const data = await fetchData();

    const filtered = data.filter((item) => {
      const text = [item.title, item.description, item.category, ...(item.keywords || [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return text.includes(q);
    });

    setResults(filtered);
    setHighlightedIndex(filtered.length > 0 ? 0 : -1);
  }, [fetchData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 150);
    return () => clearTimeout(timer);
  }, [query, search]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
    setHighlightedIndex(-1);
  }, []);

  const clearQuery = useCallback(() => {
    setQuery("");
    setResults([]);
    setHighlightedIndex(-1);
  }, []);

  useEffect(() => {
    const onOpen = () => open();
    window.addEventListener("search:open", onOpen);
    return () => window.removeEventListener("search:open", onOpen);
  }, [open]);

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        open,
        close,
        query,
        setQuery,
        results,
        isLoading,
        highlightedIndex,
        setHighlightedIndex,
        clearQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return ctx;
}
