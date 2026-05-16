"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function ImageCompressPage() {
  const [original, setOriginal] = useState<{ url: string; size: number; name: string } | null>(null);
  const [compressed, setCompressed] = useState<{ url: string; size: number } | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [maxWidth, setMaxWidth] = useState(1920);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginal({ url: URL.createObjectURL(file), size: file.size, name: file.name });
    compress(file);
  }

  function compress(file: File) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let w = img.width;
      let h = img.height;
      if (w > maxWidth) {
        h = (maxWidth / w) * h;
        w = maxWidth;
      }
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressed({ url: URL.createObjectURL(blob), size: blob.size });
          }
        },
        "image/jpeg",
        quality
      );
    };
    img.src = URL.createObjectURL(file);
  }

  function download() {
    if (!compressed || !original) return;
    const a = document.createElement("a");
    a.href = compressed.url;
    a.download = `compressed_${original.name}`;
    a.click();
  }

  function formatSize(bytes: number) {
    return bytes > 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
      : `${(bytes / 1024).toFixed(1)} KB`;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
        &larr; 返回首页
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">图片压缩</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">在线压缩图片</p>

      <div className="mb-4 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        <button onClick={() => fileRef.current?.click()} className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
          选择图片
        </button>
        <p className="mt-2 text-sm text-gray-500">支持 PNG、JPG、WebP</p>
      </div>

      <div className="mb-4 flex gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">质量: {Math.round(quality * 100)}%</label>
          <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-40" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">最大宽度: {maxWidth}px</label>
          <input type="range" min={320} max={4096} step={128} value={maxWidth} onChange={(e) => setMaxWidth(Number(e.target.value))} className="w-40" />
        </div>
      </div>

      {original && compressed && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <p className="mb-2 text-sm font-medium">原图 - {formatSize(original.size)}</p>
            <img src={original.url} alt="原图" className="w-full rounded-lg" />
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <p className="mb-2 text-sm font-medium">
              压缩后 - {formatSize(compressed.size)}
              <span className="ml-2 text-green-600">
                (-{Math.round((1 - compressed.size / original.size) * 100)}%)
              </span>
            </p>
            <img src={compressed.url} alt="压缩后" className="w-full rounded-lg" />
          </div>
          <button onClick={download} className="md:col-span-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700">
            下载压缩后的图片
          </button>
        </div>
      )}
    </div>
  );
}
