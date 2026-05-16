# 在线工具箱 - 变现指南

## 项目概况

- 技术栈：Next.js 16 + TypeScript + Tailwind CSS
- 工具数量：16 个实用工具
- 部署方式：Vercel（免费）
- 特色：纯客户端运算，无需后端服务器

---

## 变现方案（目标：1000 元）

### 方案一：卖源码（最快回本）

**平台：闲鱼**
- 定价：99-199 元/份
- 预计销量：5-10 份 → 495-1990 元
- 标题参考：「Next.js16在线工具箱源码 | 16款工具 | 支持部署 | 含SEO」
- 卖点话术：
  1. 最新 Next.js 16 + TypeScript 技术栈
  2. 16 款实用工具开箱即用
  3. Vercel 一键免费部署
  4. 自带 SEO 优化（sitemap、robots.txt）
  5. 暗黑模式支持
  6. 响应式设计，手机端完美适配

**平台：CSDN**
- 定价：49-99 元（CSDN 积分下载）
- 写一篇项目介绍博文引流

**平台：源码之家 / 站长之家**
- 定价：99-199 元

### 方案二：部署后广告变现（持续收入）

1. 部署到 Vercel（免费）
2. 申请 Google AdSense 或百度联盟
3. 替换 AdBanner 组件中的广告位为真实广告代码
4. 通过 SEO 引流（工具类网站搜索量大）
5. 预计月收入：200-2000 元（取决于流量）

### 方案三：SaaS 会员制

1. 添加用户注册/登录（可用 NextAuth.js）
2. 基础工具免费，高级功能付费
3. 可收费的高级功能：
   - AI 工具（调用 ChatGPT/Claude API）
   - 批量处理
   - API 接口
4. 定价：9.9 元/月 或 99 元/年

---

## 部署步骤

### 1. Vercel 部署（推荐）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
cd toolbox
vercel
```

### 2. 自定义域名

1. 在 Vercel 控制台添加自定义域名
2. 推荐域名：toolhub.cn、onlinetools.cn 等
3. 在阿里云/腾讯云购买域名（约 10-50 元/年）

### 3. Google AdSense 接入

1. 访问 https://www.google.com/adsense/
2. 提交网站审核
3. 获取广告代码
4. 替换 `src/components/AdBanner.tsx` 中的占位内容

---

## 项目文件结构

```
toolbox/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 全局布局
│   │   ├── page.tsx            # 首页
│   │   ├── sitemap.ts          # SEO 站点地图
│   │   ├── robots.ts           # SEO robots
│   │   └── tools/
│   │       ├── json/           # JSON 格式化
│   │       ├── base64/         # Base64 编解码
│   │       ├── timestamp/      # 时间戳转换
│   │       ├── qrcode/         # 二维码生成
│   │       ├── color/          # 颜色转换
│   │       ├── url/            # URL 编解码
│   │       ├── text-counter/   # 文本统计
│   │       ├── password/       # 密码生成器
│   │       ├── regex/          # 正则测试
│   │       ├── hash/           # Hash 计算
│   │       ├── text-diff/      # 文本对比
│   │       ├── markdown/       # Markdown 预览
│   │       ├── uuid/           # UUID 生成器
│   │       ├── number-base/    # 进制转换
│   │       ├── image-compress/ # 图片压缩
│   │       └── jwt/            # JWT 解析
│   ├── components/
│   │   ├── Header.tsx          # 顶部导航
│   │   ├── Footer.tsx          # 底部版权
│   │   ├── ToolCard.tsx        # 工具卡片
│   │   ├── SearchBar.tsx       # 搜索栏
│   │   └── AdBanner.tsx        # 广告位
│   └── lib/
│       └── tools.ts            # 工具定义
```

---

## 快速变现清单

- [ ] 部署到 Vercel
- [ ] 绑定自定义域名
- [ ] 在闲鱼发布源码售卖信息（定价 99-199 元）
- [ ] 在 CSDN 写推广博文
- [ ] 替换广告位为 Google AdSense 代码
- [ ] 提交到搜索引擎（Google Search Console、百度站长）
