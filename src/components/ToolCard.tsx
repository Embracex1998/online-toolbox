import Link from "next/link";
import type { Tool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={tool.path}
      className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-600"
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 font-mono text-sm font-bold text-blue-600 transition-colors group-hover:from-blue-100 group-hover:to-purple-100 dark:from-blue-950 dark:to-purple-950 dark:text-blue-400 dark:group-hover:from-blue-900 dark:group-hover:to-purple-900">
        {tool.icon}
      </div>
      <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
        {tool.name}
      </h3>
      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {tool.description}
      </p>
    </Link>
  );
}
