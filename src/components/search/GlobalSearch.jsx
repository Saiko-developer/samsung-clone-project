"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/context/SearchContext";
import { Search, X, ArrowRight, Loader2, FileText, Command } from "lucide-react";

export default function GlobalSearch() {
  const router = useRouter();
  const {
    isOpen,
    close,
    query,
    setQuery,
    results,
    isLoading,
    highlightedIndex,
    setHighlightedIndex,
  } = useSearch();

  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (listRef.current && highlightedIndex >= 0) {
      const item = listRef.current.children[highlightedIndex];
      if (item) {
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [highlightedIndex]);

  const navigateToResult = useCallback(
    (item) => {
      close();
      router.push(item.filePath);
    },
    [close, router]
  );

  const handleClick = useCallback(
    (item) => {
      navigateToResult(item);
    },
    [navigateToResult]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        close();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : 0
        );
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : results.length - 1
        );
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (highlightedIndex >= 0 && results[highlightedIndex]) {
          navigateToResult(results[highlightedIndex]);
        }
        return;
      }
    },
    [results, highlightedIndex, close, navigateToResult, setHighlightedIndex]
  );

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          close();
        } else {
          window.dispatchEvent(new CustomEvent("search:open"));
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-999 bg-black/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-1000 flex items-start justify-center pt-[15vh] px-4"
        onKeyDown={handleKeyDown}
      >
        <div
          className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, docs, and more..."
              className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 text-lg outline-none placeholder:text-gray-400"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="max-h-[60vh] overflow-y-auto" ref={listRef}>
            {isLoading && (
              <div className="flex items-center justify-center gap-2 py-12 text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Searching...</span>
              </div>
            )}

            {!isLoading && query.trim() && results.length === 0 && (
              <div className="flex flex-col items-center py-12 text-gray-400">
                <FileText className="w-10 h-10 mb-3 opacity-50" />
                <p className="text-sm font-medium">No results found</p>
                <p className="text-xs mt-1">
                  No matches for &quot;{query}&quot;
                </p>
              </div>
            )}


            {results.length > 0 && (
              <ul className="py-2">
                {results.map((item, index) => (
                  <li
                    key={item.id}
                    onClick={() => handleClick(item)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors ${
                      index === highlightedIndex
                        ? "bg-blue-50 dark:bg-blue-900/30"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                        {item.description}
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-all ${
                        index === highlightedIndex
                          ? "text-blue-500 translate-x-0 opacity-100"
                          : "text-gray-300 dark:text-gray-600 -translate-x-1 opacity-0"
                      }`}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>


        </div>
      </div>
    </>
  );
}

