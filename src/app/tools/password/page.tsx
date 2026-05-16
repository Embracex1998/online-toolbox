"use client";

import { useState } from "react";
import Link from "next/link";

function generatePassword(length: number, options: { upper: boolean; lower: boolean; digits: boolean; symbols: boolean }) {
  let chars = "";
  if (options.upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (options.lower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (options.digits) chars += "0123456789";
  if (options.symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
  if (!chars) return "";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => chars[n % chars.length]).join("");
}

export default function PasswordPage() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ upper: true, lower: true, digits: true, symbols: true });
  const [password, setPassword] = useState(() => generatePassword(16, { upper: true, lower: true, digits: true, symbols: true }));
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);

  function generate() {
    if (count === 1) {
      setPassword(generatePassword(length, options));
    } else {
      setPasswords(Array.from({ length: count }, () => generatePassword(length, options)));
    }
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
        &larr; 返回首页
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">密码生成器</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">生成安全的随机密码</p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">密码长度: {length}</label>
          <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {([["upper", "大写字母"], ["lower", "小写字母"], ["digits", "数字"], ["symbols", "特殊符号"]] as const).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={options[key]}
                onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                className="rounded"
              />
              {label}
            </label>
          ))}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">生成数量</label>
          <input
            type="number" min={1} max={50} value={count}
            onChange={(e) => setCount(Math.min(50, Math.max(1, Number(e.target.value))))}
            className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <button onClick={generate} className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
          生成密码
        </button>
      </div>

      <div className="mt-6 space-y-2">
        {count === 1 ? (
          password && (
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <code className="flex-1 break-all font-mono text-sm">{password}</code>
              <button onClick={() => copy(password)} className="shrink-0 text-sm text-blue-600 hover:text-blue-700">复制</button>
            </div>
          )
        ) : (
          passwords.map((pw, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <code className="flex-1 break-all font-mono text-sm">{pw}</code>
              <button onClick={() => copy(pw)} className="shrink-0 text-sm text-blue-600 hover:text-blue-700">复制</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
