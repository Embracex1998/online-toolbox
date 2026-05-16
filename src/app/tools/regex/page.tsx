"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function RegexPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("");
  const [error, setError] = useState("");

  const matches = useMemo(() => {
    if (!pattern || !testStr) return [];
    try {
      const regex = new RegExp(pattern, flags);
      const result: { text: string; index: number; groups: string[] }[] = [];
      if (flags.includes("g")) {
        const re = new RegExp(pattern, flags);
        let m: RegExpExecArray | null;
        const limit = 1000;
        let count = 0;
        while ((m = re.exec(testStr)) !== null && count < limit) {
          result.push({ text: m[0], index: m.index, groups: m.slice(1) });
          if (!m[0]) { re.lastIndex++; }
          count++;
        }
      } else {
        const m = regex.exec(testStr);
        if (m) result.push({ text: m[0], index: m.index, groups: m.slice(1) });
      }
      setError("");
      return result;
    } catch {
      setError("正则表达式语法错误");
      return [];
    }
  }, [pattern, flags, testStr]);

  const highlighted = useMemo(() => {
    if (!pattern || !testStr || error) return [{ text: testStr, highlight: false }];
    try {
      const re = new RegExp(`(${pattern})`, flags.includes("g") ? flags : flags + "g");
      const parts: { text: string; highlight: boolean }[] = [];
      let last = 0;
      let m: RegExpExecArray | null;
      const limit = 1000;
      let count = 0;
      while ((m = re.exec(testStr)) !== null && count < limit) {
        if (m.index > last) {
          parts.push({ text: testStr.slice(last, m.index), highlight: false });
        }
        parts.push({ text: m[1], highlight: true });
        last = re.lastIndex;
        if (!m[1]) { re.lastIndex++; }
        count++;
      }
      if (last < testStr.length) {
        parts.push({ text: testStr.slice(last), highlight: false });
      }
      return parts;
    } catch {
      return [{ text: testStr, highlight: false }];
    }
  }, [pattern, flags, testStr, error]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
        &larr; 返回首页
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">正则测试</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">实时测试正则表达式</p>

      <div className="mb-4 flex gap-3">
        <div className="flex-1">
          <input
            type="text" value={pattern} onChange={(e) => setPattern(e.target.value)}
            placeholder="输入正则表达式"
            className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <input
          type="text" value={flags} onChange={(e) => setFlags(e.target.value)}
          placeholder="标志 (gimsuy)"
          className="w-24 rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
      </div>

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <textarea
        className="h-48 w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        placeholder="输入测试文本"
        value={testStr}
        onChange={(e) => setTestStr(e.target.value)}
      />

      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">匹配预览</h3>
        <div className="whitespace-pre-wrap break-all font-mono text-sm">
          {highlighted.map((part, i) =>
            part.highlight ? (
              <mark key={i} className="rounded bg-yellow-200 px-0.5 dark:bg-yellow-800 dark:text-white">{part.text}</mark>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </div>
      </div>

      {matches.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            匹配结果 ({matches.length} 个)
          </h3>
          <div className="space-y-2">
            {matches.map((m, i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-white p-3 text-sm dark:border-gray-800 dark:bg-gray-900">
                <span className="text-gray-500 dark:text-gray-400">#{i + 1} 位置 {m.index}:</span>{" "}
                <code className="font-bold text-blue-600 dark:text-blue-400">&quot;{m.text}&quot;</code>
                {m.groups.length > 0 && (
                  <span className="ml-2 text-gray-400">
                    分组: {m.groups.map((g, j) => `$${j + 1}="${g}"`).join(", ")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
