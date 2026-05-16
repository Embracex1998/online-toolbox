"use client";

import { useState } from "react";
import Link from "next/link";

export default function UrlPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  function convert() {
    try {
      setOutput(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input));
    } catch {
      setOutput("转换失败");
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
        &larr; 返回首页
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">URL 编解码</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">URL 编码与解码</p>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">输入</label>
          <textarea
            className="h-48 w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            placeholder={mode === "encode" ? "输入要编码的 URL" : "输入已编码的 URL"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">输出</label>
          <textarea
            className="h-48 w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            readOnly
            value={output}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={convert} className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
          {mode === "encode" ? "编码" : "解码"}
        </button>
        <select value={mode} onChange={(e) => setMode(e.target.value as "encode" | "decode")} className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100">
          <option value="encode">编码模式</option>
          <option value="decode">解码模式</option>
        </select>
        <button onClick={() => navigator.clipboard.writeText(output)} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 dark:border-gray-600 dark:text-gray-300">
          复制结果
        </button>
      </div>
    </div>
  );
}
