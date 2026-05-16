"use client";

import { useState } from "react";
import Link from "next/link";

export default function TextCounterPage() {
  const [text, setText] = useState("");

  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split("\n").length : 0;
  const bytes = new Blob([text]).size;
  const chinese = (text.match(/[一-鿿]/g) || []).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
        &larr; 返回首页
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">文本统计</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">统计字符数、单词数、行数等</p>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <textarea
            className="h-80 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            placeholder="在此输入或粘贴文本..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="space-y-3">
          {[
            { label: "字符数", value: chars },
            { label: "字符数（不含空格）", value: charsNoSpace },
            { label: "单词数", value: words },
            { label: "行数", value: lines },
            { label: "字节数", value: bytes },
            { label: "中文字数", value: chinese },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
              <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
