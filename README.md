# AI 小说生成器


一个基于雪花写作法的 AI 小说创作工具，支持智能生成小说架构、角色体系、世界观和章节内容。

![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📸 截图

### 首页
![首页](./doc/home.png)

## ✨ 特性

- 📖 **雪花写作法** - 从核心种子开始，逐步扩展角色、世界观、情节架构
- 🎭 **角色弧光理论** - 设计具有动态变化潜力的角色，包含驱动力三角和关系冲突网
- 🌍 **世界观构建** - AI 自动生成符合故事背景的世界设定
- 📊 **悬念节奏曲线** - 智能规划章节节奏，保持读者阅读兴趣
- ✍️ **章节写作** - 基于大纲逐章生成小说内容，支持流式输出
- 🧭 **灵感罗盘** - 人物关系图谱可视化，支持逻辑审计
- 📤 **多格式导出** - 支持导出为 TXT 和 Markdown 格式
- 🌓 **深色/浅色主题** - 支持主题切换，保护眼睛
- 💾 **本地项目存储** - 项目数据本地持久化，支持多项目管理

## 🚀 快速开始

### 方式一：Docker 部署（推荐）

```bash
# 克隆项目
git clone https://github.com/chatfire-AI/huobao-novel.git
cd huobao-novel

# 使用 Docker Compose 启动
docker compose up --build

# 后台运行
docker compose up -d
```

访问 `http://localhost:3000`

### 方式二：本地开发

#### 环境要求

- Node.js >= 18
- pnpm / npm / yarn

#### 安装

```bash
# 克隆项目
git clone https://github.com/chatfire-AI/huobao-novel.git
cd huobao-novel

# 安装依赖
pnpm install
# 或
npm install

# 启动开发服务器
pnpm dev
# 或
npm run dev
```

#### 构建

```bash
pnpm build
# 或
npm run build
```

## ⚙️ API 配置

首次使用需要配置 API：

1. 点击右上角设置图标 ⚙️
2. 选择 API 渠道
3. 填入 API Key
4. 选择模型
5. 保存设置

### 支持的 API 渠道

| 渠道 | Base URL | 获取 API Key |
|------|----------|--------------|
| Chatfire | `https://api.chatfire.site/v1` | [获取 Key](https://api.chatfire.site/login) |
| NVIDIA NIM | `https://integrate.api.nvidia.com/v1` | [获取 Key](https://build.nvidia.com/) |
| OpenAI | `https://api.openai.com/v1` | [获取 Key](https://platform.openai.com/api-keys) |
| Anthropic | `https://api.anthropic.com/v1` | [获取 Key](https://console.anthropic.com/) |
| Google AI | `https://generativelanguage.googleapis.com/v1beta/openai` | [获取 Key](https://aistudio.google.com/apikey) |
| DeepSeek | `https://api.deepseek.com/v1` | [获取 Key](https://platform.deepseek.com/) |
| 自定义 | 自行填写 | - |

### 分环节模型配置

可为不同生成阶段指定不同模型：

| 阶段 | 说明 |
|------|------|
| 架构生成 | 生成核心种子、角色体系、世界观、情节架构 |
| 大纲生成 | 生成章节大纲 |
| 章节生成 | 生成章节正文 |
| 定稿处理 | 更新前文摘要、角色状态 |
| 章节扩写 | 扩写章节内容 |

## 📝 创作流程

| 步骤 | 描述 |
|------|------|
| **创建项目** | 设置小说标题、题材、章节数、每章字数等基本信息 |
| **生成架构** | AI 自动生成核心种子、角色动力学、世界观、情节架构 |
| **生成大纲** | 基于架构生成详细的章节大纲 |
| **章节写作** | 逐章生成小说内容，支持批量生成 |
| **灵感罗盘** | 可视化人物关系图谱，检测逻辑问题 |
| **导出小说** | 将完成的小说导出为 TXT 或 Markdown 文件 |

## 🐳 Docker 配置说明

项目包含以下 Docker 相关文件：

| 文件 | 说明 |
|------|------|
| `Dockerfile` | 多阶段构建：Node 构建 + Express 代理服务 |
| `docker-compose.yml` | Docker Compose 配置，端口 3000 |
| `nginx.conf` | Nginx 配置（已弃用，现使用 Express） |
| `server.js` | Express 代理服务器，处理 CORS |
| `.dockerignore` | 排除无关文件 |

### 代理服务说明

由于部分 API（如 NVIDIA NIM）不允许浏览器直接调用，项目内置了 Express 代理服务器：

- 代理 `/api/*` 请求到目标 API
- 自动添加 CORS 头
- 支持流式响应

## 🛠️ 技术栈

- **框架**: [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- **UI 组件**: [Naive UI](https://www.naiveui.com/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **图表**: [ECharts](https://echarts.apache.org/)
- **图标**: [@vicons/ionicons5](https://www.xicons.org/)
- **路由**: [Vue Router](https://router.vuejs.org/)
- **HTTP**: [Axios](https://axios-http.com/)
- **代理服务**: [Express](https://expressjs.com/) + [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

## 📁 项目结构

```
src/
├── api/                    # API 请求封装
│   ├── llm.js              # LLM API 服务
│   ├── generator.js        # 小说生成器
│   └── compass-generator.js # 灵感罗盘生成器
├── assets/                 # 静态资源
├── components/             # 组件
│   ├── ArchitecturePanel.vue       # 小说架构面板
│   ├── ChapterBlueprintPanel.vue   # 章节大纲面板
│   ├── ChapterWriterPanel.vue      # 章节写作面板
│   ├── CreateProjectDialog.vue     # 创建项目对话框
│   ├── ProjectCard.vue             # 项目卡片
│   ├── SettingsDialog.vue          # 设置对话框
│   └── compass/                    # 灵感罗盘组件
│       ├── InspirationCompass.vue  # 灵感罗盘主组件
│       ├── CompassGraph.vue        # 关系图谱
│       ├── CompassToolbar.vue      # 工具栏
│       └── ...
├── prompts/                # AI 提示词模板
│   ├── architecture.js     # 架构类提示词
│   ├── chapter.js          # 章节类提示词
│   ├── utility.js          # 工具类提示词
│   └── compass.js          # 灵感罗盘提示词
├── router/                 # 路由配置
├── stores/                 # 状态管理
│   ├── novel.js            # 小说项目状态
│   └── settings.js         # 设置状态
├── utils/                  # 工具函数
│   └── graph-helpers.js    # 图谱工具函数
├── views/                  # 页面视图
│   ├── HomeView.vue        # 首页
│   └── ProjectView.vue     # 项目详情页
└── main.js                 # 入口文件
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request


## 📄 License

[MIT](./LICENSE)
