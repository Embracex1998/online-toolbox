"use client";

import { useState } from "react";
import Link from "next/link";

export default function JsonPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  function format() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  function compress() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  function copy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600"
      >
        &larr; 返回首页
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        JSON 格式化
      </h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        格式化、压缩、验证 JSON 数据
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            输入 JSON
          </label>
          <textarea
            className="h-80 w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            placeholder='{"key": "value"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            输出结果
          </label>
          <textarea
            className="h-80 w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            readOnly
            value={output}
          />
        </div>
      </div>

      {error && (
        <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={format}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          格式化
        </button>
        <button
          onClick={compress}
          className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          压缩
        </button>
        <button
          onClick={copy}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          复制结果
        </button>
        <select
          value={indent}
          onChange={(e) => setIndent(Number(e.target.value))}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
        >
          <option value={2}>2 空格缩进</option>
          <option value={4}>4 空格缩进</option>
          <option value={1}>1 空格缩进</option>
        </select>
      </div>
    </div>
  );
}
