"use client";

import { useState } from "react";
import Link from "next/link";

async function hash(algo: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashPage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function compute() {
    setLoading(true);
    try {
      const [md5, sha1, sha256, sha512] = await Promise.all([
        hash("MD5", input),
        hash("SHA-1", input),
        hash("SHA-256", input),
        hash("SHA-512", input),
      ]);
      setResults({ MD5: md5, "SHA-1": sha1, "SHA-256": sha256, "SHA-512": sha512 });
    } catch {
      setResults({ error: "浏览器不支持部分哈希算法" });
    }
    setLoading(false);
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
        &larr; 返回首页
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Hash 计算</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">计算文本的哈希值</p>

      <textarea
        className="h-40 w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        placeholder="输入要计算哈希的文本"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={compute} disabled={loading} className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50">
        {loading ? "计算中..." : "计算哈希"}
      </button>

      {Object.keys(results).length > 0 && !results.error && (
        <div className="mt-6 space-y-3">
          {Object.entries(results).map(([algo, value]) => (
            <div key={algo} className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">{algo}</div>
              <div className="flex items-center gap-2">
                <code className="flex-1 break-all font-mono text-xs">{value}</code>
                <button onClick={() => copy(value)} className="shrink-0 text-sm text-blue-600 hover:text-blue-700">复制</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
