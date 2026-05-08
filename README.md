# 🦛 HEMAS · 河马智能体

> 河马·智能体中的007 —— 基于 Vue 3 + Vite 构建的 AI 智能体工作流平台前端

![Vue](https://img.shields.io/badge/Vue-3.x-42b883?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-8.x-646cff?logo=vite)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📖 项目简介

HEMAS（河马智能体）是一个面向个人和企业的 AI 智能体工作流平台，帮助用户通过自然语言描述创建、管理和运行 AI 工作流，实现"一个人就是一支团队"的超级个体能力。

**核心能力：**
- 💬 自然语言创建 AI 工作流
- 🤖 Agent 模板市场，开箱即用
- ⚡ Token 工场，灵活管理算力资源
- ⏰ 定时任务，自动化执行工作流
- 📱 云端 + 本地双部署模式

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Vue 3](https://vuejs.org/) | 3.x | 核心 UI 框架（Composition API） |
| [Vite](https://vitejs.dev/) | 8.x | 构建工具 + 开发服务器 |
| [Vue Router 4](https://router.vuejs.org/) | 4.x | 前端路由，页面跳转 |
| [Pinia](https://pinia.vuejs.org/) | 2.x | 全局状态管理 |
| [Axios](https://axios-http.com/) | 1.x | HTTP 请求（对接后端 API） |
| 原生 CSS | — | 样式系统，无额外 UI 库 |

---

## 📁 目录结构

```
hermes/
│
├── public/
│   ├── hemas_icon.png          # 河马图标
│   └── hermas_logo.png         # hermas 品牌 Logo
│
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── base.css        # 全局样式变量 & Reset
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.vue     # 左侧导航栏（全局共享）
│   │   │   └── NavItem.vue     # 单个导航菜单项
│   │   └── common/
│   │       └── Modal.vue       # 通用弹窗组件
│   │
│   ├── views/                  # 页面视图（对应路由）
│   │   ├── Home.vue            # 首页（聊天输入 + 工作流 + 模板市场）
│   │   ├── MyWork.vue          # 我的工作（工作流列表）
│   │   ├── MyAgentTemplate.vue # 我的 Agent 模板
│   │   ├── AgentStore.vue      # Agent 模板市场
│   │   ├── TokenFactory.vue    # Token 工场（G分余额 & 充值）
│   │   ├── Schedule.vue        # 定时任务
│   │   ├── Messages.vue        # 消息通知
│   │   ├── CloudDeploy.vue     # 云端运行 HEMAS
│   │   ├── LocalDownload.vue   # 本地下载 HEMAS
│   │   └── Login.vue           # 登录 / 注册
│   │
│   ├── stores/                 # Pinia 状态管理
│   │   ├── user.js             # 用户状态（登录信息、G分余额）
│   │   └── workflow.js         # 工作流数据（列表、新建）
│   │
│   ├── router/
│   │   └── index.js            # 路由配置表
│   │
│   ├── App.vue                 # 根组件（侧栏 + 路由出口）
│   └── main.js                 # 应用入口
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🗺️ 路由说明

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 聊天输入框、近期工作流、模板市场 |
| `/work` | 我的工作 | 管理已创建的工作流 |
| `/my-agent` | 我的 Agent 模板 | 已保存的模板 |
| `/agent-store` | Agent 模板市场 | 浏览和使用公开模板（12+） |
| `/token` | Token 工场 | G分余额查看与充值 |
| `/schedule` | 定时任务 | 创建和管理定时执行的工作流 |
| `/messages` | 消息 | 系统通知和消息中心 |
| `/cloud` | 云端运行 | 云端版 HEMAS 入口介绍 |
| `/download` | 本地下载 | Mac / Windows 客户端下载 |
| `/login` | 登录 | 用户登录 / 注册 |

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm >= 8

### 安装 & 运行

```bash
# 克隆项目
git clone https://github.com/angle89/hermes.git
cd hermes

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开浏览器访问：`http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `/dist` 目录，可直接部署到任意静态托管服务。

---

## 🧩 核心组件说明

### Sidebar.vue（左侧导航）
- 全局共享，所有页面都包含此组件
- 使用 `Vue Router` 的 `router-link` 实现路由跳转
- `active-class` 自动标记当前激活菜单项
- 底部显示用户登录状态（由 `userStore` 控制）

### Modal.vue（通用弹窗）
- 使用 `teleport to="body"` 挂载到 body，避免层级问题
- 支持 `title`、`width` 属性自定义
- 提供 `default` 和 `footer` 两个插槽
- 带渐入渐出过渡动画

### Pinia Store（全局状态）

```js
// 用户状态 - 跨页面共享登录信息
const userStore = useUserStore()
userStore.gPoints    // G分余额
userStore.isLoggedIn // 登录状态

// 工作流状态 - 首页和「我的工作」页共享同一份数据
const workflowStore = useWorkflowStore()
workflowStore.myList     // 全部工作流
workflowStore.recentList // 最近5条（首页展示）
```

---

## 📦 依赖说明

```json
{
  "dependencies": {
    "vue": "^3.x",
    "vue-router": "^4.x",
    "pinia": "^2.x",
    "axios": "^1.x"
  },
  "devDependencies": {
    "vite": "^8.x",
    "@vitejs/plugin-vue": "^5.x"
  }
}
```

---

## 🔮 后续规划

- [ ] 对接 HEMAS 后端 API（工作流真实执行）
- [ ] 用户登录接入真实认证系统
- [ ] 工作流编辑器（可视化节点拖拽）
- [ ] 深色模式完整实现
- [ ] GitHub Actions 自动部署到 GitHub Pages
- [ ] 移动端响应式适配

---


