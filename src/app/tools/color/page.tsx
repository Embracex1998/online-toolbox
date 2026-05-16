"use client";

import { useState } from "react";
import Link from "next/link";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorPage() {
  const [hex, setHex] = useState("#3b82f6");
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  const presets = [
    "#ef4444", "#f97316", "#f59e0b", "#22c55e", "#3b82f6",
    "#8b5cf6", "#ec4899", "#06b6d4", "#14b8a6", "#6366f1",
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600"
      >
        &larr; 返回首页
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        颜色转换
      </h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        HEX、RGB、HSL 颜色格式互转
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div
            className="mb-4 h-40 rounded-lg border border-gray-200 dark:border-gray-700"
            style={{ backgroundColor: hex }}
          />
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-lg"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {presets.map((c) => (
              <button
                key={c}
                onClick={() => setHex(c)}
                className="h-8 w-8 rounded-lg border border-gray-200 transition hover:scale-110 dark:border-gray-700"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: "HEX", value: hex.toUpperCase() },
            { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
            { label: "RGBA", value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
            { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <span className="w-12 text-sm font-medium text-gray-500 dark:text-gray-400">
                {label}
              </span>
              <code className="flex-1 font-mono text-sm">{value}</code>
              <button
                onClick={() => copy(value)}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                复制
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
