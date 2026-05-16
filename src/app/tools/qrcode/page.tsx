"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import QRCode from "qrcode";

export default function QrcodePage() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!text || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, text, {
      width: size,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    }).catch(() => {});
  }, [text, size]);

  function download() {
    if (!canvasRef.current) return;
    const a = document.createElement("a");
    a.href = canvasRef.current.toDataURL("image/png");
    a.download = "qrcode.png";
    a.click();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600"
      >
        &larr; 返回首页
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        二维码生成
      </h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        输入文本或链接，生成二维码
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          内容
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入文本或链接"
          className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />

        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          尺寸: {size}px
        </label>
        <input
          type="range"
          min={128}
          max={512}
          step={32}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="mb-6 w-full"
        />

        <div className="flex flex-col items-center">
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <canvas ref={canvasRef} />
          </div>
          <button
            onClick={download}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            下载二维码
          </button>
        </div>
      </div>
    </div>
  );
}
