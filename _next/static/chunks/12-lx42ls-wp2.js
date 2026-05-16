(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33267,e=>{"use strict";var r=e.i(43476),a=e.i(71645),l=e.i(22016);e.s(["default",0,function(){let[e,t]=(0,a.useState)(`# Markdown 预览

这是一段 **粗体** 和 *斜体* 文本。

## 功能列表
- 实时预览
- 支持 GFM 语法
- 代码高亮

> 这是一段引用

[示例链接](https://example.com)

---

行内代码: \`console.log("hello")\``);return(0,r.jsxs)("div",{className:"mx-auto max-w-6xl px-4 py-8 sm:px-6",children:[(0,r.jsx)(l.default,{href:"/",className:"mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600",children:"← 返回首页"}),(0,r.jsx)("h1",{className:"mb-2 text-3xl font-bold text-gray-900 dark:text-white",children:"Markdown 预览"}),(0,r.jsx)("p",{className:"mb-6 text-gray-500 dark:text-gray-400",children:"实时渲染 Markdown"}),(0,r.jsxs)("div",{className:"grid gap-4 md:grid-cols-2",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Markdown 源码"}),(0,r.jsx)("textarea",{className:"h-[500px] w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",value:e,onChange:e=>t(e.target.value)})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300",children:"预览"}),(0,r.jsx)("div",{className:"h-[500px] overflow-auto rounded-lg border border-gray-300 bg-white p-3 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",dangerouslySetInnerHTML:{__html:e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/^### (.+)$/gm,'<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>').replace(/^## (.+)$/gm,'<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>').replace(/^# (.+)$/gm,'<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>').replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/`([^`]+)`/g,'<code class="rounded bg-gray-100 px-1 text-sm dark:bg-gray-800">$1</code>').replace(/^\- (.+)$/gm,'<li class="ml-4">$1</li>').replace(/^\d+\. (.+)$/gm,'<li class="ml-4 list-decimal">$1</li>').replace(/^> (.+)$/gm,'<blockquote class="border-l-4 border-gray-300 pl-4 text-gray-600 dark:text-gray-400">$1</blockquote>').replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" class="text-blue-600 underline">$1</a>').replace(/^---$/gm,'<hr class="my-4 border-gray-300 dark:border-gray-700" />').replace(/\n/g,"<br />")}})]})]})]})}])}]);