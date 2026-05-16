"use client";

import { useState } from "react";
import Link from "next/link";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 15) >> (c === "x" ? 0 : 2);
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidPage() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() => Array.from({ length: 5 }, uuidv4));
  const [format, setFormat] = useState<"lower" | "upper" | "noDash">("lower");

  function generate() {
    setUuids(Array.from({ length: count }, uuidv4));
  }

  function formatUuid(uuid: string) {
    if (format === "upper") return uuid.toUpperCase();
    if (format === "noDash") return uuid.replace(/-/g, "");
    return uuid;
  }

  function copyAll() {
    navigator.clipboard.writeText(uuids.map(formatUuid).join("\n"));
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
        &larr; 返回首页
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">UUID 生成器</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">批量生成 UUID v4</p>

      <div className="mb-4 flex flex-wrap items-end gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium">生成数量</label>
          <input
            type="number" min={1} max={100} value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
            className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <select value={format} onChange={(e) => setFormat(e.target.value as typeof format)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
          <option value="lower">小写</option>
          <option value="upper">大写</option>
          <option value="noDash">无连字符</option>
        </select>
        <button onClick={generate} className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">生成</button>
        <button onClick={copyAll} className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 dark:border-gray-600 dark:text-gray-300">复制全部</button>
      </div>

      <div className="space-y-2">
        {uuids.map((uuid, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
            <span className="w-8 text-xs text-gray-400">{i + 1}</span>
            <code className="flex-1 font-mono text-sm">{formatUuid(uuid)}</code>
            <button onClick={() => navigator.clipboard.writeText(formatUuid(uuid))} className="text-sm text-blue-600 hover:text-blue-700">复制</button>
          </div>
        ))}
      </div>
    </div>
  );
}
