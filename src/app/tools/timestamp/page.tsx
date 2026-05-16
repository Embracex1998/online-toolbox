"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TimestampPage() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [timestampInput, setTimestampInput] = useState("");
  const [dateOutput, setDateOutput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [tsOutput, setTsOutput] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  function tsToDate() {
    const ts = Number(timestampInput);
    if (isNaN(ts)) return;
    const d = ts > 1e12 ? new Date(ts) : new Date(ts * 1000);
    setDateOutput(
      d.toLocaleString("zh-CN", { hour12: false }) + "\n" + d.toISOString()
    );
  }

  function dateToTs() {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return;
    setTsOutput(String(Math.floor(d.getTime() / 1000)));
  }

  function setNowTs() {
    setTimestampInput(String(now));
    tsToDate();
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
        时间戳转换
      </h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        时间戳与日期互转
      </p>

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-sm text-gray-500 dark:text-gray-400">当前时间戳（秒）</p>
        <p className="mt-1 font-mono text-3xl font-bold text-blue-600 dark:text-blue-400">
          {now}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold">时间戳 → 日期</h2>
          <input
            type="text"
            className="mb-3 w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="输入时间戳（秒或毫秒）"
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={tsToDate}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              转换
            </button>
            <button
              onClick={setNowTs}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              使用当前时间
            </button>
          </div>
          {dateOutput && (
            <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-gray-50 p-3 font-mono text-sm dark:bg-gray-800">
              {dateOutput}
            </pre>
          )}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold">日期 → 时间戳</h2>
          <input
            type="datetime-local"
            className="mb-3 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <button
            onClick={dateToTs}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            转换
          </button>
          {tsOutput && (
            <div className="mt-3 flex items-center gap-2">
              <pre className="flex-1 rounded-lg bg-gray-50 p-3 font-mono text-sm dark:bg-gray-800">
                {tsOutput}
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(tsOutput)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:text-gray-300"
              >
                复制
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
