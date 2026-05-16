"use client";

import { useState } from "react";
import Link from "next/link";

export default function NumberBasePage() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const [results, setResults] = useState<Record<number, string>>({});

  function convert() {
    try {
      const num = parseInt(input, fromBase);
      if (isNaN(num)) { setResults({}); return; }
      setResults({
        2: num.toString(2),
        8: num.toString(8),
        10: num.toString(10),
        16: num.toString(16).toUpperCase(),
      });
    } catch {
      setResults({});
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
        &larr; 返回首页
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">进制转换</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">二进制、八进制、十进制、十六进制互转</p>

      <div className="mb-4 flex gap-3">
        <input
          type="text" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="输入数值"
          className="flex-1 rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        <select value={fromBase} onChange={(e) => setFromBase(Number(e.target.value))} className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
          <option value={2}>二进制</option>
          <option value={8}>八进制</option>
          <option value={10}>十进制</option>
          <option value={16}>十六进制</option>
        </select>
        <button onClick={convert} className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">转换</button>
      </div>

      {Object.keys(results).length > 0 && (
        <div className="space-y-3">
          {([
            [2, "二进制 (BIN)"],
            [8, "八进制 (OCT)"],
            [10, "十进制 (DEC)"],
            [16, "十六进制 (HEX)"],
          ] as const).map(([base, label]) => (
            <div key={base} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <span className="w-32 text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
              <code className="flex-1 break-all font-mono text-sm">{results[base]}</code>
              <button onClick={() => navigator.clipboard.writeText(results[base])} className="text-sm text-blue-600 hover:text-blue-700">复制</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
