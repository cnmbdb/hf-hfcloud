# HFCloud边缘计算平台

一个现代化的边缘计算服务平台，提供全球CDN加速、DDoS防护、智能DNS解析等服务。

## ✨ 项目特色

- 🎨 **现代化UI设计** - 采用深色主题，玻璃态效果和七彩渐变
- 🔐 **完整权限系统** - 基于角色的访问控制(RBAC)
- 🚀 **高性能架构** - React + TypeScript + Vite
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🔔 **美观通知系统** - 自定义Toast通知组件

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI组件**: Shadcn/ui + Radix UI
- **样式方案**: Tailwind CSS
- **路由管理**: React Router
- **图标库**: Lucide React
- **状态管理**: Context API

## 🚀 快速开始

### 环境要求

- Node.js 16+ (推荐18+)
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看项目

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── ui/             # UI基础组件
│   ├── navbar.tsx      # 导航栏
│   └── ...
├── pages/              # 页面组件
│   ├── home.tsx        # 首页
│   ├── login.tsx       # 登录页
│   ├── user-management.tsx  # 用户管理
│   └── ...
├── contexts/           # React Context
├── hooks/              # 自定义Hooks
├── utils/              # 工具函数
└── lib/                # 库文件
```

## 🔑 默认账户

- **管理员账户**: admin / admin
- **普通用户**: user / user

## 🎯 主要功能

### 用户管理系统
- ✅ 用户增删改查
- ✅ 权限控制（超级管理员/管理员/普通用户）
- ✅ 账户状态管理
- ✅ 密码修改功能
- ✅ 会话管理

### 界面特性
- ✅ 深色主题设计
- ✅ 玻璃态效果
- ✅ 七彩渐变动效
- ✅ 响应式布局
- ✅ 美观的Toast通知

### 核心页面
- ✅ 首页展示
- ✅ 解决方案页面
- ✅ 文档中心
- ✅ 定价页面
- ✅ 用户认证系统
- ✅ 控制台仪表板

## 🚀 部署指南

### 宝塔面板部署

详细的宝塔面板部署指南请参考项目根目录的 `HFCloud边缘计算平台.md` 文件。

### 其他部署方式

项目构建后生成的 `dist` 目录可以部署到任何静态文件服务器：

- Nginx
- Apache
- Vercel
- Netlify
- GitHub Pages

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题，请通过以下方式联系：

- 邮箱: [您的邮箱]
- GitHub: [您的GitHub用户名]

---

⭐ 如果这个项目对您有帮助，请给个Star支持一下！