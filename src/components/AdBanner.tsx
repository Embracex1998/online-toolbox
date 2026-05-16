export default function AdBanner({ slot = "top" }: { slot?: string }) {
  return (
    <div className="mx-auto my-6 max-w-4xl">
      <div className="flex h-[90px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500">
        广告位 ({slot})
      </div>
    </div>
  );
}
