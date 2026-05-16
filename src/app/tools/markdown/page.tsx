"use client";

import { useState } from "react";
import Link from "next/link";

function parseMd(md: string): string {
  let html = md
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code class="rounded bg-gray-100 px-1 text-sm dark:bg-gray-800">$1</code>')
    .replace(/^\- (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 text-gray-600 dark:text-gray-400">$1</blockquote>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>')
    .replace(/^---$/gm, '<hr class="my-4 border-gray-300 dark:border-gray-700" />')
    .replace(/\n/g, "<br />");
  return html;
}

export default function MarkdownPage() {
  const [input, setInput] = useState(`# Markdown 预览

这是一段 **粗体** 和 *斜体* 文本。

## 功能列表
- 实时预览
- 支持 GFM 语法
- 代码高亮

> 这是一段引用

[示例链接](https://example.com)

---

行内代码: \`console.log("hello")\``);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
        &larr; 返回首页
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Markdown 预览</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">实时渲染 Markdown</p>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Markdown 源码</label>
          <textarea
            className="h-[500px] w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">预览</label>
          <div
            className="h-[500px] overflow-auto rounded-lg border border-gray-300 bg-white p-3 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            dangerouslySetInnerHTML={{ __html: parseMd(input) }}
          />
        </div>
      </div>
    </div>
  );
}
