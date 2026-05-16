"use client";

import { useState } from "react";
import Link from "next/link";

type JwtResult =
  | { header: Record<string, unknown>; payload: Record<string, unknown>; expired: boolean | null }
  | { error: string };

function decodeJwt(token: string): JwtResult {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return { error: "无效的 JWT 格式" };
    const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    const now = Math.floor(Date.now() / 1000);
    const expired = payload.exp ? payload.exp < now : null;
    return { header, payload, expired };
  } catch {
    return { error: "解析失败：请检查 JWT Token 是否正确" };
  }
}

export default function JwtPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<JwtResult | null>(null);

  function decode() {
    setResult(decodeJwt(input.trim()));
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
        &larr; 返回首页
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">JWT 解析</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">解码和查看 JWT Token</p>

      <textarea
        className="h-28 w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        placeholder="粘贴 JWT Token..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={decode} className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
        解析
      </button>

      {result && "error" in result && result.error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {result.error}
        </div>
      )}

      {result && "header" in result && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Header</h3>
            <pre className="overflow-auto rounded-lg bg-gray-50 p-3 font-mono text-xs dark:bg-gray-800">
              {JSON.stringify(result.header, null, 2)}
            </pre>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Payload
              {result.expired !== null && (
                <span className={`ml-2 text-xs ${result.expired ? "text-red-500" : "text-green-500"}`}>
                  {result.expired ? "已过期" : "未过期"}
                </span>
              )}
            </h3>
            <pre className="overflow-auto rounded-lg bg-gray-50 p-3 font-mono text-xs dark:bg-gray-800">
              {JSON.stringify(result.payload, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
