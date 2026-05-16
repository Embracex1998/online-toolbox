"use client";

import { useState } from "react";
import { tools } from "@/lib/tools";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof tools>([]);

  function search(q: string) {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const lower = q.toLowerCase();
    setResults(
      tools.filter(
        (t) =>
          t.name.toLowerCase().includes(lower) ||
          t.description.toLowerCase().includes(lower) ||
          t.id.toLowerCase().includes(lower)
      )
    );
  }

  return (
    <div className="relative mx-auto mb-8 max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => search(e.target.value)}
        placeholder="搜索工具..."
        className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm shadow-sm transition-shadow focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-blue-900"
      />
      {results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {results.map((tool) => (
            <a
              key={tool.id}
              href={tool.path}
              className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 font-mono text-xs font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                {tool.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{tool.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{tool.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
