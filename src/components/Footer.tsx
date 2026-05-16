export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} 工具箱 - 免费在线工具集合</p>
      </div>
    </footer>
  );
}
