"use client";

import { useState } from "react";
import Link from "next/link";

function diff(a: string, b: string) {
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const maxLen = Math.max(linesA.length, linesB.length);
  const result: { type: "same" | "add" | "del"; lineA: string; lineB: string; num: number }[] = [];

  for (let i = 0; i < maxLen; i++) {
    const la = linesA[i] ?? "";
    const lb = linesB[i] ?? "";
    if (la === lb) {
      result.push({ type: "same", lineA: la, lineB: lb, num: i + 1 });
    } else {
      if (la) result.push({ type: "del", lineA: la, lineB: "", num: i + 1 });
      if (lb) result.push({ type: "add", lineA: "", lineB: lb, num: i + 1 });
    }
  }
  return result;
}

export default function TextDiffPage() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [result, setResult] = useState<ReturnType<typeof diff>>([]);

  function compare() {
    setResult(diff(textA, textB));
  }

  const additions = result.filter((r) => r.type === "add").length;
  const deletions = result.filter((r) => r.type === "del").length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
        &larr; 返回首页
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">文本对比</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">对比两段文本差异</p>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">原始文本</label>
          <textarea
            className="h-60 w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            placeholder="输入原始文本"
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">修改文本</label>
          <textarea
            className="h-60 w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            placeholder="输入修改后的文本"
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
          />
        </div>
      </div>

      <button onClick={compare} className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
        对比
      </button>

      {result.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 flex gap-4 text-sm">
            <span className="text-green-600">+ {additions} 添加</span>
            <span className="text-red-600">- {deletions} 删除</span>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden dark:border-gray-800 dark:bg-gray-900">
            {result.map((r, i) => (
              <div
                key={i}
                className={`flex border-b border-gray-100 font-mono text-sm last:border-b-0 dark:border-gray-800 ${
                  r.type === "add" ? "bg-green-50 dark:bg-green-950" :
                  r.type === "del" ? "bg-red-50 dark:bg-red-950" : ""
                }`}
              >
                <span className="w-12 shrink-0 border-r border-gray-100 bg-gray-50 px-2 py-1 text-right text-xs text-gray-400 dark:border-gray-800 dark:bg-gray-800">
                  {r.num}
                </span>
                <span className="px-2 py-1">
                  {r.type === "del" ? "- " : r.type === "add" ? "+ " : "  "}
                  {r.type === "del" ? r.lineA : r.lineB}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
