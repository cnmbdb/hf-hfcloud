# 腾讯云Pages部署完整配置

## 🎯 部署前准备清单

### 1. 代码仓库准备
- ✅ 代码已推送到Git仓库
- ✅ 项目结构：`hfcloud-website/hfcloud-website/`
- ✅ 构建配置文件：`.edgeonerc`
- ✅ 路由重定向：`public/_redirects`

### 2. Supabase数据库准备
- ✅ Supabase项目已创建
- ✅ 数据库初始化脚本：`supabase-setup.sql`
- ✅ API密钥已获取

## 🔧 腾讯云Pages控制台配置

### 基本信息
```
项目名称: hfcloud-website
描述: HFCloud企业级管理系统
```

### Git仓库配置
```
仓库地址: https://github.com/cnmbdb/hf-hfcloud.git
分支: main
根目录: hfcloud-website/hfcloud-website
```

### 构建配置
```
构建命令: npm run build
输出目录: dist
Node.js版本: 18.x
安装命令: npm install
```

### 环境变量配置
```
VITE_SUPABASE_URL=https://jtqcygcfqtfjfuythgdl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cWN5Z2NmcXRmamZ1eXRoZ2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5ODUyNzEsImV4cCI6MjA1MTU2MTI3MX0.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cWN5Z2NmcXRmamZ1eXRoZ2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5ODUyNzEsImV4cCI6MjA1MTU2MTI3MX0
```

## 📋 详细部署步骤

### 步骤1: 登录腾讯云控制台
1. 访问：https://console.cloud.tencent.com/webify
2. 使用腾讯云账号登录
3. 进入EdgeOne Pages服务

### 步骤2: 创建新项目
1. 点击"新建项目"按钮
2. 选择"从Git导入"
3. 授权连接GitHub账号（如果首次使用）

### 步骤3: 选择仓库和分支
1. 选择仓库：`cnmbdb/hf-hfcloud`
2. 选择分支：`main`
3. 设置根目录：`hfcloud-website/hfcloud-website`

### 步骤4: 配置构建设置
```
项目名称: hfcloud-website
构建命令: npm run build
输出目录: dist
Node.js版本: 18.x
安装命令: npm install
```

### 步骤5: 配置环境变量
在"环境变量"部分添加：
- `VITE_SUPABASE_URL`: `https://jtqcygcfqtfjfuythgdl.supabase.co`
- `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 步骤6: 开始部署
1. 检查所有配置
2. 点击"部署"按钮
3. 等待构建完成（通常2-5分钟）

## 🧪 部署后测试

### 测试账户
| 用户名 | 密码 | 角色 | 权限 |
|--------|------|------|------|
| admin | admin123 | 超级管理员 | 全部功能 |
| manager | admin123 | 管理员 | 管理功能 |
| user1 | admin123 | 普通用户 | 基础功能 |

### 功能验证清单
- [ ] 网站正常加载
- [ ] 登录功能正常
- [ ] 数据库连接正常
- [ ] 用户权限控制正常
- [ ] 页面路由正常
- [ ] 移动端适配正常
- [ ] 系统配置功能正常

## 🔍 故障排除

### 常见问题及解决方案

#### 1. 构建失败
**可能原因**：
- Node.js版本不匹配
- 依赖安装失败
- 根目录路径错误

**解决方案**：
- 确保Node.js版本设置为18.x
- 检查package.json依赖
- 确认根目录为：`hfcloud-website/hfcloud-website`

#### 2. 环境变量问题
**可能原因**：
- 环境变量名称错误
- API密钥过期或无效

**解决方案**：
- 确保使用`VITE_`前缀
- 重新获取Supabase API密钥
- 检查Supabase项目状态

#### 3. 路由404错误
**可能原因**：
- 重定向规则未生效
- 输出目录配置错误

**解决方案**：
- 确认`_redirects`文件存在
- 检查输出目录设置为`dist`

#### 4. 数据库连接失败
**可能原因**：
- Supabase项目未正确配置
- RLS策略问题

**解决方案**：
- 执行`supabase-setup.sql`脚本
- 检查Supabase项目状态
- 验证API密钥权限

## 🎉 部署成功后的操作

### 1. 域名配置
- 绑定自定义域名（可选）
- 配置SSL证书
- 设置DNS解析

### 2. 性能优化
- 启用CDN加速
- 配置缓存策略
- 启用Gzip压缩

### 3. 监控设置
- 配置访问统计
- 设置错误监控
- 配置告警通知

### 4. 安全配置
- 启用HTTPS强制跳转
- 配置安全头
- 设置访问控制

## 📞 技术支持

如果在部署过程中遇到问题：
1. 查看构建日志获取详细错误信息
2. 检查浏览器控制台错误
3. 验证Supabase数据库连接
4. 确认环境变量配置正确

---

**准备就绪！现在可以开始部署了** 🚀