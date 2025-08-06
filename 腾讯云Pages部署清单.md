# 腾讯云Pages部署最终清单

## 🎯 项目准备状态
- ✅ 代码已推送到Git仓库：`cnmbdb/hf-hfcloud`
- ✅ 项目路径：`hfcloud-website/hfcloud-website`
- ✅ 构建配置：`.edgeonerc` 已配置
- ✅ 路由重定向：`public/_redirects` 已配置
- ✅ Supabase配置：最新API密钥已更新
- ✅ 数据库脚本：`supabase-setup.sql` 已准备

## 🚀 腾讯云Pages部署步骤

### 步骤1：Supabase数据库初始化
1. **访问Supabase控制台**：https://supabase.com/dashboard
2. **选择项目**：`jtqcygcfqtfjfuythgdl`
3. **进入SQL编辑器**：左侧菜单 → SQL Editor
4. **执行初始化脚本**：
   - 复制 `supabase-setup.sql` 文件内容
   - 粘贴到SQL编辑器
   - 点击"Run"执行

### 步骤2：腾讯云Pages项目创建
1. **访问控制台**：https://console.cloud.tencent.com/webify
2. **新建项目**：
   - 点击"新建项目"
   - 选择"从Git导入"
   - 授权连接GitHub（如果首次使用）

### 步骤3：仓库配置
```
Git仓库: cnmbdb/hf-hfcloud
分支: main
根目录: hfcloud-website/hfcloud-website
```

### 步骤4：构建配置
```
项目名称: hfcloud-website
构建命令: npm run build
输出目录: dist
Node.js版本: 18.x
安装命令: npm install
```

### 步骤5：环境变量配置
在"环境变量"部分添加以下两个变量：

**变量1：**
```
名称: VITE_SUPABASE_URL
值: https://jtqcygcfqtfjfuythgdl.supabase.co
```

**变量2：**
```
名称: VITE_SUPABASE_ANON_KEY
值: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cWN5Z2NmcXRmamZ1eXRoZ2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MDc1MDIsImV4cCI6MjA3MDA4MzUwMn0.hBx3Nzza6kz4ScUhNrj6MxelF3fB07YUP9eMFL9PXfg
```

### 步骤6：开始部署
1. **检查配置**：确认所有设置正确
2. **点击部署**：开始构建过程
3. **等待完成**：通常需要2-5分钟

## 🧪 部署后测试

### 测试账户
部署完成后，使用以下账户测试系统功能：

| 用户名 | 密码 | 角色 | 权限范围 |
|--------|------|------|----------|
| admin | admin123 | 超级管理员 | 所有功能模块 |
| manager | admin123 | 管理员 | 管理功能模块 |
| user1 | admin123 | 普通用户 | 基础功能模块 |

### 功能验证清单
请逐一验证以下功能：

#### 基础功能
- [ ] 网站首页正常加载
- [ ] 登录页面显示正常
- [ ] 用户登录功能正常
- [ ] 登出功能正常

#### 数据库连接
- [ ] 用户认证连接Supabase成功
- [ ] 用户信息正确显示
- [ ] 会话管理正常工作

#### 页面导航
- [ ] 主导航菜单正常
- [ ] 页面间跳转正常
- [ ] 浏览器前进后退正常
- [ ] 直接访问URL正常（无404错误）

#### 权限控制
- [ ] 不同角色看到不同菜单
- [ ] 权限控制正常工作
- [ ] 未授权访问被正确拦截

#### 响应式设计
- [ ] 桌面端显示正常
- [ ] 平板端显示正常
- [ ] 手机端显示正常
- [ ] 各种屏幕尺寸适配良好

## 🔧 故障排除

### 常见问题及解决方案

#### 1. 构建失败
**症状**：部署过程中构建失败
**可能原因**：
- Node.js版本不匹配
- 依赖安装失败
- 根目录路径错误

**解决方案**：
- 确保Node.js版本设置为18.x
- 检查根目录设置：`hfcloud-website/hfcloud-website`
- 查看构建日志获取详细错误信息

#### 2. 环境变量问题
**症状**：登录失败或数据库连接错误
**可能原因**：
- 环境变量配置错误
- API密钥无效

**解决方案**：
- 确保环境变量名称使用`VITE_`前缀
- 检查API密钥是否正确复制
- 验证Supabase项目状态

#### 3. 路由404错误
**症状**：刷新页面或直接访问URL出现404
**可能原因**：
- 重定向规则未生效
- 输出目录配置错误

**解决方案**：
- 确认`public/_redirects`文件存在
- 检查输出目录设置为`dist`
- 验证腾讯云Pages识别了重定向规则

#### 4. 数据库连接失败
**症状**：登录时提示数据库错误
**可能原因**：
- Supabase初始化脚本未执行
- RLS策略配置问题

**解决方案**：
- 在Supabase中执行`supabase-setup.sql`
- 检查数据库表是否正确创建
- 验证RLS策略是否生效

## 🎉 部署成功后的操作

### 1. 域名配置（可选）
- 在腾讯云Pages控制台绑定自定义域名
- 配置DNS解析
- 启用HTTPS证书

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
- 配置安全响应头
- 设置访问频率限制

## 📞 技术支持

如果在部署过程中遇到问题：

1. **查看构建日志**：获取详细错误信息
2. **检查浏览器控制台**：查看前端错误
3. **验证Supabase连接**：确认数据库状态
4. **检查环境变量**：确认配置正确

## 🏁 部署完成确认

当以下所有项目都完成时，部署即为成功：

- [ ] 腾讯云Pages构建成功
- [ ] 网站可以正常访问
- [ ] 测试账户可以正常登录
- [ ] 所有功能模块正常工作
- [ ] 移动端适配正常
- [ ] 数据库连接稳定

---

**🎊 恭喜！您的HFCloud系统已成功部署到腾讯云Pages！**

现在您可以开始使用这个功能完整的企业级管理系统了。