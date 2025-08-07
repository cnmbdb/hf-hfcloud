#!/bin/bash

# HFCloud项目Git提交脚本
echo "🚀 开始将HFCloud项目提交到GitHub..."

# 进入项目目录
cd "$(dirname "$0")"

# 初始化Git仓库（如果需要）
git init

# 添加所有文件
echo "📁 添加项目文件..."
git add .

# 提交更改
echo "💾 提交项目到本地仓库..."
git commit -m "完整HFCloud边缘计算平台项目

✅ React + TypeScript + Vite 现代化架构
✅ Supabase数据库集成和用户认证系统
✅ 完整的权限管理系统(RBAC)
✅ 响应式UI设计和深色主题
✅ 腾讯云Pages部署配置完成
✅ 完整的部署文档和操作指南

项目特性:
- 🎨 现代化UI设计(玻璃态效果+七彩渐变)
- 🔐 完整权限系统(超级管理员/管理员/普通用户)
- 🚀 高性能架构
- 📱 完美响应式设计
- 🔔 美观通知系统

技术栈:
- 前端: React 18 + TypeScript + Vite
- UI: Shadcn/ui + Radix UI + Tailwind CSS
- 数据库: Supabase (PostgreSQL)
- 部署: 腾讯云Pages

默认测试账户:
- admin/admin123 (超级管理员)
- manager/admin123 (管理员)  
- user1/admin123 (普通用户)"

# 设置远程仓库
echo "🔗 设置GitHub远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/cnmbdb/hf-hfcloud.git

# 设置主分支
git branch -M main

# 推送到GitHub
echo "⬆️ 推送到GitHub仓库..."
git push -u origin main

echo "✅ 项目已成功提交到GitHub!"
echo "🌐 仓库地址: https://github.com/cnmbdb/hf-hfcloud"
echo ""
echo "下一步: 可以在腾讯云Pages中使用此仓库进行部署"
echo "部署配置:"
echo "- 仓库: cnmbdb/hf-hfcloud"
echo "- 分支: main"
echo "- 根目录: hfcloud-website/hfcloud-website"
echo "- 构建命令: npm run build"
echo "- 输出目录: dist"