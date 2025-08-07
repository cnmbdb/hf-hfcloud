<div align="center">
  <h1>🚀 HFCloud 边缘计算平台</h1>
  <p><em>现代化的边缘计算管理平台，提供CDN加速、安全防护、API加速等服务</em></p>
  
  ![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Supabase](https://img.shields.io/badge/Supabase-2.53.0-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
</div>

---

## 📋 目录

- [✨ 特性](#-特性)
- [🛠️ 技术栈](#️-技术栈)
- [🚀 快速开始](#-快速开始)
- [📁 项目结构](#-项目结构)
- [🔧 配置说明](#-配置说明)
- [📦 部署指南](#-部署指南)
- [🤝 贡献指南](#-贡献指南)
- [📄 许可证](#-许可证)

## ✨ 特性

<table>
  <tr>
    <td align="center">🎨</td>
    <td><strong>现代化UI设计</strong><br/>基于 Radix UI 和 Tailwind CSS 的精美界面</td>
  </tr>
  <tr>
    <td align="center">🔐</td>
    <td><strong>完整的用户系统</strong><br/>支持多角色权限管理和会话控制</td>
  </tr>
  <tr>
    <td align="center">⚡</td>
    <td><strong>边缘计算服务</strong><br/>CDN加速、安全防护、API加速等核心功能</td>
  </tr>
  <tr>
    <td align="center">📊</td>
    <td><strong>实时数据监控</strong><br/>流量统计、性能监控、告警系统</td>
  </tr>
  <tr>
    <td align="center">🌙</td>
    <td><strong>主题切换</strong><br/>支持明暗主题自由切换</td>
  </tr>
  <tr>
    <td align="center">📱</td>
    <td><strong>响应式设计</strong><br/>完美适配桌面端和移动端</td>
  </tr>
</table>

## 🛠️ 技术栈

### 前端框架
- **React 18.3.1** - 现代化的前端框架
- **TypeScript 5.0** - 类型安全的JavaScript超集
- **Vite 5.1.4** - 快速的构建工具

### UI组件库
- **Radix UI** - 无样式的可访问组件库
- **Tailwind CSS 3.4.17** - 实用优先的CSS框架
- **Lucide React** - 精美的图标库

### 状态管理与路由
- **React Router DOM 7.7.1** - 声明式路由
- **React Hook Form 7.54.1** - 高性能表单库

### 后端服务
- **Supabase 2.53.0** - 开源的Firebase替代方案
- **PostgreSQL** - 可靠的关系型数据库

### 数据可视化
- **Recharts 2.15.0** - React图表库

## 🚀 快速开始

### 环境要求

> **Node.js** >= 18.0.0  
> **npm** >= 8.0.0

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/cnmbdb/hf-hfcloud.git
   cd hf-hfcloud
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **环境配置**
   ```bash
   cp .env.example .env
   # 编辑 .env 文件，配置 Supabase 连接信息
   ```

4. **数据库初始化**
   ```bash
   # 在 Supabase 控制台中执行 SQL 脚本
   # 1. 运行 fixed-database-setup.sql
   # 2. 运行 add-projects-field.sql (如需要)
   ```

5. **启动开发服务器**
   ```bash
   npm run dev
   ```

6. **访问应用**
   
   打开浏览器访问 [http://localhost:5173](http://localhost:5173)

### 默认账户

| 用户名 | 密码 | 角色 | 权限 |
|--------|------|------|------|
| `admin` | `admin123` | 超级管理员 | 全部权限 |
| `manager` | `admin123` | 管理员 | 管理权限 |
| `user1` | `admin123` | 普通用户 | 基础权限 |

## 📁 项目结构

```
hf-hfcloud/
├── 📁 public/                 # 静态资源
├── 📁 src/                    # 源代码
│   ├── 📁 components/         # React组件
│   │   ├── 📁 ui/            # 基础UI组件
│   │   ├── 📁 layout/        # 布局组件
│   │   └── 📁 features/      # 功能组件
│   ├── 📁 pages/             # 页面组件
│   ├── 📁 hooks/             # 自定义Hooks
│   ├── 📁 lib/               # 工具库
│   ├── 📁 types/             # TypeScript类型定义
│   └── 📁 styles/            # 样式文件
├── 📄 *.sql                  # 数据库脚本
├── 📄 package.json           # 项目配置
└── 📄 README.md              # 项目说明
```

## 🔧 配置说明

### 环境变量

创建 `.env` 文件并配置以下变量：

```env
# Supabase 配置
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# 应用配置
VITE_APP_NAME=HFCloud 系统
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```

### 数据库配置

1. 在 Supabase 控制台创建新项目
2. 执行 `fixed-database-setup.sql` 初始化数据库
3. 根据需要执行其他SQL脚本

## 📦 部署指南

### 腾讯云Pages部署

1. **准备仓库**
   ```bash
   # 运行Git设置脚本
   chmod +x git-setup.sh
   ./git-setup.sh
   ```

2. **配置部署**
   - 仓库地址：`https://github.com/cnmbdb/hf-hfcloud`
   - 构建命令：`cd hfcloud-website/hfcloud-website && npm install && npm run build`
   - 输出目录：`hfcloud-website/hfcloud-website/dist`

3. **环境变量**
   ```env
   NODE_ENV=production
   VITE_APP_TITLE=HFCloud边缘计算平台
   ```

### 其他部署方式

<details>
<summary>点击展开更多部署选项</summary>

#### Vercel部署
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cnmbdb/hf-hfcloud)

#### Netlify部署
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/cnmbdb/hf-hfcloud)

</details>

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献

1. **Fork** 本仓库
2. **创建** 特性分支 (`git checkout -b feature/AmazingFeature`)
3. **提交** 更改 (`git commit -m 'Add some AmazingFeature'`)
4. **推送** 到分支 (`git push origin feature/AmazingFeature`)
5. **创建** Pull Request

### 开发规范

- 遵循 ESLint 规则
- 使用 TypeScript 进行类型检查
- 编写清晰的提交信息
- 添加必要的测试用例

## 📊 项目统计

![GitHub stars](https://img.shields.io/github/stars/cnmbdb/hf-hfcloud?style=social)
![GitHub forks](https://img.shields.io/github/forks/cnmbdb/hf-hfcloud?style=social)
![GitHub issues](https://img.shields.io/github/issues/cnmbdb/hf-hfcloud)
![GitHub license](https://img.shields.io/github/license/cnmbdb/hf-hfcloud)

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源协议。

---

<div align="center">
  <p>如果这个项目对您有帮助，请给我们一个 ⭐️</p>
  <p>Made with ❤️ by HFCloud Team</p>
</div>