export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  path: string;
}

export const categories = [
  { id: "all", name: "全部" },
  { id: "text", name: "文本处理" },
  { id: "encode", name: "编码转换" },
  { id: "dev", name: "开发工具" },
  { id: "generate", name: "生成工具" },
];

export const tools: Tool[] = [
  {
    id: "json",
    name: "JSON 格式化",
    description: "格式化、压缩、验证 JSON 数据，支持树形展示",
    category: "dev",
    icon: "{ }",
    path: "/tools/json",
  },
  {
    id: "base64",
    name: "Base64 编解码",
    description: "文本与 Base64 互转，支持文件转换",
    category: "encode",
    icon: "B64",
    path: "/tools/base64",
  },
  {
    id: "timestamp",
    name: "时间戳转换",
    description: "时间戳与日期互转，支持多种格式",
    category: "dev",
    icon: "CLK",
    path: "/tools/timestamp",
  },
  {
    id: "qrcode",
    name: "二维码生成",
    description: "输入文本或链接，生成高清二维码",
    category: "generate",
    icon: "QR",
    path: "/tools/qrcode",
  },
  {
    id: "color",
    name: "颜色转换",
    description: "HEX、RGB、HSL 颜色格式互转",
    category: "dev",
    icon: "RGB",
    path: "/tools/color",
  },
  {
    id: "url",
    name: "URL 编解码",
    description: "URL 编码与解码，处理特殊字符",
    category: "encode",
    icon: "URL",
    path: "/tools/url",
  },
  {
    id: "text-counter",
    name: "文本统计",
    description: "统计字符数、单词数、行数、字节数",
    category: "text",
    icon: "CNT",
    path: "/tools/text-counter",
  },
  {
    id: "password",
    name: "密码生成器",
    description: "生成安全的随机密码，自定义长度和规则",
    category: "generate",
    icon: "KEY",
    path: "/tools/password",
  },
  {
    id: "regex",
    name: "正则测试",
    description: "实时测试正则表达式，高亮匹配结果",
    category: "dev",
    icon: ".*",
    path: "/tools/regex",
  },
  {
    id: "hash",
    name: "Hash 计算",
    description: "计算文本的 MD5、SHA-1、SHA-256 哈希值",
    category: "dev",
    icon: "#",
    path: "/tools/hash",
  },
  {
    id: "text-diff",
    name: "文本对比",
    description: "对比两段文本差异，逐行高亮显示",
    category: "text",
    icon: "DIF",
    path: "/tools/text-diff",
  },
  {
    id: "markdown",
    name: "Markdown 预览",
    description: "实时渲染 Markdown，支持 GFM 语法",
    category: "text",
    icon: "MD",
    path: "/tools/markdown",
  },
  {
    id: "uuid",
    name: "UUID 生成器",
    description: "批量生成 UUID v4，一键复制",
    category: "generate",
    icon: "UID",
    path: "/tools/uuid",
  },
  {
    id: "number-base",
    name: "进制转换",
    description: "二进制、八进制、十进制、十六进制互转",
    category: "dev",
    icon: "HEX",
    path: "/tools/number-base",
  },
  {
    id: "image-compress",
    name: "图片压缩",
    description: "在线压缩图片，支持 PNG、JPG、WebP",
    category: "generate",
    icon: "IMG",
    path: "/tools/image-compress",
  },
  {
    id: "jwt",
    name: "JWT 解析",
    description: "解码和验证 JWT Token，展示载荷信息",
    category: "dev",
    icon: "JWT",
    path: "/tools/jwt",
  },
];
