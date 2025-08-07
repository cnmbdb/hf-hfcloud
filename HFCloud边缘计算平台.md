# HFCloud边缘计算平台

## Core Features

- 全球CDN加速服务
- 智能DNS解析和流量调度
- DDoS防护和安全服务
- 实时监控和数据分析
- 域名管理和SSL配置
- 边缘计算函数部署
- 用户等级权限管理

## Tech Stack

```json
{
  "Web": {
    "arch": "react",
    "component": "shadcn",
    "styling": "tailwindcss",
    "build": "vite"
  },
  "Dependencies": {
    "UI": ["radix-ui", "lucide-react", "class-variance-authority"],
    "Routing": "react-router-dom",
    "Forms": "react-hook-form",
    "Charts": "recharts",
    "Notifications": "sonner"
  }
}
```

## Design

采用GitHub风格的深色主题，以纯黑色为主背景，搭配磨砂玻璃效果的卡片组件。首页英雄区域和导航栏都使用七彩渐变效果，包括标题、Logo图标和按钮组件。底部CTA区域也采用七彩渐变设计，包含丰富的数据展示和信任指标。登录页面也采用相同的七彩渐变设计风格。整体使用蓝色作为强调色，绿色表示成功状态。

### 核心页面与组件

- **响应式导航栏**：支持移动端和桌面端不同布局
- **英雄区域**：采用七彩渐变文字效果，包含主标题、副标题、CTA按钮和核心数据统计
- **功能展示卡片**：六个核心功能，每个功能配有彩色图标和详细描述
  - CDN 全球加速（蓝色）
  - DDoS 安全防护（绿色）
  - 智能 DNS 解析（紫色）
  - 实时数据分析（橙色）
  - SSL 证书管理（红色）
  - 边缘计算服务（青色）
- **增强的CTA区域**：包含渐变标题、描述文本、行动按钮、产品特性和信任指标
- **用户认证系统**：支持登录、注册和忘记密码功能
- **控制台仪表板**：数据统计卡片和可视化图表
- **全球节点地图**：展示全球分布的边缘节点
- **用户等级系统**：支持最高管理员、管理员、普通用户三种角色

### 视觉风格

- **主题色**：深色主题，纯黑色背景
- **强调色**：蓝色用于主要按钮，绿色表示成功状态
- **特效**：磨砂玻璃效果、七彩渐变、流畅动画
- **按钮**：主要按钮采用七彩渐变设计，次要按钮为透明边框样式
- **卡片**：黑色半透明背景配合磨砂玻璃效果，悬停时有轻微变化
- **图标**：彩色设计，每个功能模块使用不同颜色

## 项目统计

- 全球节点：200+ 个
- 服务客户：10K+ 家
- 数据传输：50TB+ /天
- 响应时间：<50ms 平均

## Plan

Note: 

- [ ] is holding
- [/] is doing
- [X] is done

---

[X] 创建React项目结构并配置Tailwind CSS和Shadcn UI

[X] 实现顶部导航栏组件，包含logo、菜单和用户操作区域

[X] 开发首页英雄区域，包含标题、描述和CTA按钮

[X] 创建功能展示卡片组件，实现磨砂玻璃效果

[ ] 实现全球节点地图展示组件

[X] 开发控制台布局，包含侧边导航和主内容区域

[X] 创建仪表板统计卡片和图表组件

[X] 实现域名管理页面，包含列表和详情功能

[X] 添加响应式设计和移动端适配

[X] 优化性能和用户体验细节

[X] 优化首页英雄区域视觉效果

[X] 优化导航栏和按钮的七彩渐变效果

[X] 优化底部CTA区域，增加丰富内容和视觉效果

[X] 实现用户认证系统和登录功能

[X] 创建路由保护和权限控制

[X] 优化登录界面，添加注册和忘记密码功能

[X] 实现用户等级系统和权限管理

[X] 创建用户管理页面和权限控制

[X] 创建解决方案、文档、定价三个核心页面

[X] 优化所有核心页面按钮为蓝色设计

[X] 优化解决方案、文档、定价页面图标为彩色设计

[X] 优化三个核心页面标题为七彩渐变律动效果

[X] 实现用户管理系统的完整功能

[X] 创建美观的Toast通知系统

[X] 优化用户体验和界面交互效果

## 最新功能更新

### 用户管理系统 (已完成)
- **完整的用户管理功能**：支持用户增删改查操作
- **权限控制系统**：基于角色的访问控制(RBAC)，支持超级管理员、管理员、普通用户三种角色
- **账户状态管理**：支持账户启用/禁用状态控制
- **密码管理**：安全的密码修改功能，修改后自动退出登录
- **会话管理**：设备登录限制（管理员10个设备，普通用户1个设备）
- **数据同步**：用户管理界面与认证系统实时数据同步

### Toast通知系统 (已完成)
- **美观的通知设计**：玻璃态背景效果，渐变边框
- **多种通知类型**：成功、错误、警告、信息四种类型
- **平滑动画效果**：滑入/淡出动画，专业的用户体验
- **自动消失功能**：3秒自动消失，支持手动关闭
- **替换原生alert**：完全替换丑陋的浏览器alert弹窗

### 技术架构优化
- **组件化设计**：模块化的组件架构，便于维护和扩展
- **TypeScript支持**：完整的类型安全保障
- **Context API状态管理**：统一的状态管理方案
- **自定义Hook**：代码复用和逻辑封装
- **响应式设计**：完美适配各种屏幕尺寸

## 宝塔面板部署指南

### 环境要求
- **服务器系统**：CentOS 7+ / Ubuntu 18+ / Debian 9+
- **宝塔面板版本**：7.0+ 
- **Node.js版本**：16+ (推荐18+)
- **内存要求**：至少1GB RAM
- **磁盘空间**：至少5GB可用空间

### 部署步骤

#### 1. 安装宝塔面板
```bash
# CentOS安装命令
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh

# Ubuntu/Debian安装命令
wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh
```

#### 2. 配置宝塔面板环境
1. 登录宝塔面板管理界面
2. 安装必要软件：
   - **Nginx** (推荐1.20+)
   - **Node.js** (选择18.x版本)
   - **PM2** (Node.js进程管理器)

#### 3. 上传项目文件
1. 在宝塔面板中创建网站目录：`/www/wwwroot/hfcloud`
2. 将项目文件上传到该目录
3. 或使用Git克隆项目：
```bash
cd /www/wwwroot
git clone [项目仓库地址] hfcloud
```

#### 4. 安装项目依赖
```bash
cd /www/wwwroot/hfcloud/hfcloud-website/hfcloud-website
npm install
```

#### 5. 构建生产版本
```bash
npm run build
```

#### 6. 配置Nginx
在宝塔面板中配置Nginx站点：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为您的域名
    root /www/wwwroot/hfcloud/hfcloud-website/hfcloud-website/dist;
    index index.html;

    # 启用gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # 处理React Router的路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 安全头设置
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

#### 7. SSL证书配置（推荐）
1. 在宝塔面板中申请Let's Encrypt免费SSL证书
2. 或上传自己的SSL证书
3. 开启强制HTTPS重定向

#### 8. 性能优化配置

**开启HTTP/2**：
```nginx
listen 443 ssl http2;
```

**配置缓存策略**：
```nginx
# 在server块中添加
location ~* \.(html)$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

**开启Brotli压缩**（如果支持）：
```nginx
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 部署后验证

#### 1. 功能测试清单
- [ ] 首页正常加载，七彩渐变效果显示正常
- [ ] 用户登录功能正常（admin/admin）
- [ ] 用户管理页面功能完整
- [ ] Toast通知系统工作正常
- [ ] 所有路由跳转正常
- [ ] 响应式设计在移动端正常显示

#### 2. 性能检查
- [ ] 页面加载速度 < 3秒
- [ ] 静态资源正确缓存
- [ ] Gzip/Brotli压缩生效
- [ ] SSL证书配置正确

#### 3. 安全检查
- [ ] HTTPS强制重定向生效
- [ ] 安全头配置正确
- [ ] 敏感文件无法直接访问

### 维护和监控

#### 1. 日志监控
- **Nginx访问日志**：`/www/wwwlogs/your-domain.com.log`
- **Nginx错误日志**：`/www/wwwlogs/your-domain.com.error.log`

#### 2. 性能监控
- 使用宝塔面板的监控功能查看服务器资源使用情况
- 定期检查网站访问速度和可用性

#### 3. 备份策略
- 定期备份网站文件和数据库
- 使用宝塔面板的自动备份功能
- 建议每日备份，保留7天

### 常见问题解决

#### 1. 页面刷新404错误
确保Nginx配置了`try_files $uri $uri/ /index.html;`

#### 2. 静态资源加载失败
检查文件路径和权限设置，确保www用户有读取权限

#### 3. 构建失败
检查Node.js版本是否符合要求，清除node_modules重新安装依赖

#### 4. 内存不足
增加服务器内存或配置swap交换空间

### 更新部署流程

当需要更新项目时：
1. 备份当前版本
2. 上传新版本代码
3. 重新构建：`npm run build`
4. 重启Nginx服务
5. 验证功能正常

---

## 项目特色

### 🎨 视觉设计
- **现代化UI**：采用最新的设计趋势，玻璃态效果和七彩渐变
- **深色主题**：护眼的深色界面，符合开发者审美
- **响应式布局**：完美适配桌面端和移动端

### 🔐 安全特性
- **权限控制**：基于角色的访问控制系统
- **会话管理**：安全的用户会话和设备限制
- **数据保护**：敏感信息加密存储

### 🚀 性能优化
- **快速加载**：优化的构建配置和资源压缩
- **缓存策略**：智能的静态资源缓存
- **SEO友好**：良好的搜索引擎优化

### 💡 用户体验
- **直观操作**：简洁明了的用户界面
- **即时反馈**：美观的Toast通知系统
- **流畅动画**：精心设计的交互动效

这个项目展现了现代Web应用的最佳实践，从技术架构到用户体验都达到了企业级标准。通过宝塔面板的部署，您可以轻松地将这个项目部署到生产环境中。
