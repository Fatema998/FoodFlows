
import React from "react";
import { router } from "@inertiajs/react";

interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

interface PaginationMeta {
  current_page: number;
  last_page: number;
  total: number;
}

interface Props {
  links: PaginationLinks;
  meta: PaginationMeta;
  pageTitle: string;
}

const Pagination: React.FC<Props> = ({ links, meta, pageTitle }) => {
  const handlePageChange = (page: number) => {
    if (page !== meta.current_page) router.visit(`?page=${page}`);
  };

  const handleDirectLink = (url: string | null) => {
    if (url) router.visit(url);
  };

  // Generate compact pagination with ellipsis (for large sets)
  const getPageNumbers = (): (number | string)[] => {
    const total = meta.last_page;
    const current = meta.current_page;
    const delta = 2; // number of pages to show around the current page
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number;

    // Generate base range (1 through total)
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    // Insert ellipsis between gaps
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i as number;
    }

    return rangeWithDots;
  };

  return (
    <div className="p-3 border-t border-gray-200 flex flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Info */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Page <span className="font-semibold">{meta.current_page}</span> of{" "}
        <span className="font-semibold">{meta.last_page}</span> — Total:{" "}
        <span className="font-semibold">{meta.total}</span> {pageTitle}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1 flex-wrap justify-center">
        {/* Prev Button */}
        <button
          onClick={() => handleDirectLink(links.prev)}
          disabled={!links.prev}
          className={`px-3 py-1.5 text-sm rounded-md border transition-all duration-150 ${
            links.prev
              ? "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              : "cursor-not-allowed opacity-50 text-gray-400 border-gray-200"
          }`}
        >
          ← Prev
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-gray-500 dark:text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(page as number)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-all duration-150 ${
                page === meta.current_page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border-gray-300"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          onClick={() => handleDirectLink(links.next)}
          disabled={!links.next}
          className={`px-3 py-1.5 text-sm rounded-md border transition-all duration-150 ${
            links.next
              ? "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              : "cursor-not-allowed opacity-50 text-gray-400 border-gray-200"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Pagination;