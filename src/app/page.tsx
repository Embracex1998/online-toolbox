import { tools, categories } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          免费在线工具箱
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-500 dark:text-gray-400">
          16+ 实用工具，开箱即用，无需注册。JSON 格式化、编码转换、二维码生成……
        </p>
      </section>

      <SearchBar />

      <AdBanner slot="top" />

      <nav className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:bg-blue-950 dark:hover:text-blue-400"
          >
            {cat.name}
          </a>
        ))}
      </nav>

      {categories
        .filter((c) => c.id !== "all")
        .map((cat) => {
          const catTools = tools.filter((t) => t.category === cat.id);
          return (
            <section key={cat.id} id={cat.id} className="mb-12">
              <h2 className="mb-5 text-xl font-semibold text-gray-800 dark:text-gray-200">
                {cat.name}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {catTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}

      <AdBanner slot="bottom" />

      <section className="mt-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-center text-white sm:p-12">
        <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
          所有工具完全免费
        </h2>
        <p className="mx-auto max-w-lg text-blue-100">
          无需注册，无需下载，打开即用。数据在浏览器本地处理，不会上传到服务器。
        </p>
      </section>
    </div>
  );
}
