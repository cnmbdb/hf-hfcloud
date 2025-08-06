#!/usr/bin/env node

// 腾讯云Pages部署前检查脚本
const fs = require('fs');
const path = require('path');

console.log('🔍 开始部署前检查...\n');

// 检查项目结构
const checkProjectStructure = () => {
  console.log('📁 检查项目结构...');
  
  const requiredFiles = [
    'package.json',
    'vite.config.ts',
    '.edgeonerc',
    'public/_redirects',
    'src/main.tsx',
    'supabase-setup.sql'
  ];
  
  const missingFiles = [];
  
  requiredFiles.forEach(file => {
    if (!fs.existsSync(path.join(__dirname, file))) {
      missingFiles.push(file);
    }
  });
  
  if (missingFiles.length > 0) {
    console.log('❌ 缺少必要文件:');
    missingFiles.forEach(file => console.log(`   - ${file}`));
    return false;
  }
  
  console.log('✅ 项目结构检查通过\n');
  return true;
};

// 检查环境变量
const checkEnvironmentVariables = () => {
  console.log('🔧 检查环境变量配置...');
  
  const requiredEnvVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];
  
  const missingEnvVars = [];
  
  requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      missingEnvVars.push(envVar);
    }
  });
  
  if (missingEnvVars.length > 0) {
    console.log('⚠️  缺少环境变量（部署时需要在腾讯云Pages控制台配置）:');
    missingEnvVars.forEach(envVar => console.log(`   - ${envVar}`));
  } else {
    console.log('✅ 环境变量配置完整');
  }
  
  console.log('');
  return true;
};

// 检查构建配置
const checkBuildConfig = () => {
  console.log('⚙️  检查构建配置...');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (!packageJson.scripts || !packageJson.scripts.build) {
      console.log('❌ package.json中缺少build脚本');
      return false;
    }
    
    const edgeonerc = JSON.parse(fs.readFileSync('.edgeonerc', 'utf8'));
    
    if (edgeonerc.build.output !== 'dist') {
      console.log('❌ .edgeonerc配置错误，输出目录应为dist');
      return false;
    }
    
    console.log('✅ 构建配置检查通过\n');
    return true;
  } catch (error) {
    console.log('❌ 构建配置文件读取失败:', error.message);
    return false;
  }
};

// 检查Supabase配置
const checkSupabaseConfig = () => {
  console.log('🗄️  检查Supabase配置...');
  
  try {
    const supabaseSetup = fs.readFileSync('supabase-setup.sql', 'utf8');
    
    if (!supabaseSetup.includes('CREATE TABLE') || !supabaseSetup.includes('users')) {
      console.log('❌ Supabase初始化脚本不完整');
      return false;
    }
    
    console.log('✅ Supabase配置检查通过\n');
    return true;
  } catch (error) {
    console.log('❌ Supabase配置文件读取失败:', error.message);
    return false;
  }
};

// 生成部署报告
const generateDeployReport = () => {
  console.log('📊 生成部署报告...\n');
  
  const report = {
    timestamp: new Date().toISOString(),
    projectName: 'hfcloud-website',
    buildCommand: 'npm run build',
    outputDir: 'dist',
    nodeVersion: '18.x',
    environmentVariables: [
      'VITE_SUPABASE_URL',
      'VITE_SUPABASE_ANON_KEY'
    ],
    testAccounts: [
      { username: 'admin', password: 'admin123', role: '超级管理员' },
      { username: 'manager', password: 'admin123', role: '管理员' },
      { username: 'user1', password: 'admin123', role: '普通用户' }
    ]
  };
  
  console.log('🎯 腾讯云Pages部署配置:');
  console.log(`   项目名称: ${report.projectName}`);
  console.log(`   构建命令: ${report.buildCommand}`);
  console.log(`   输出目录: ${report.outputDir}`);
  console.log(`   Node.js版本: ${report.nodeVersion}`);
  console.log(`   根目录: hfcloud-website/hfcloud-website`);
  console.log('');
  
  console.log('🔑 需要配置的环境变量:');
  report.environmentVariables.forEach(envVar => {
    console.log(`   - ${envVar}`);
  });
  console.log('');
  
  console.log('👤 测试账户:');
  report.testAccounts.forEach(account => {
    console.log(`   - ${account.username} / ${account.password} (${account.role})`);
  });
  console.log('');
};

// 主检查流程
const main = () => {
  let allChecksPassed = true;
  
  allChecksPassed &= checkProjectStructure();
  allChecksPassed &= checkEnvironmentVariables();
  allChecksPassed &= checkBuildConfig();
  allChecksPassed &= checkSupabaseConfig();
  
  generateDeployReport();
  
  if (allChecksPassed) {
    console.log('🎉 所有检查通过！项目已准备好部署到腾讯云Pages');
    console.log('');
    console.log('📝 下一步操作:');
    console.log('1. 在Supabase中执行 supabase-setup.sql 脚本');
    console.log('2. 在腾讯云Pages控制台创建项目');
    console.log('3. 配置构建设置和环境变量');
    console.log('4. 开始部署');
  } else {
    console.log('❌ 检查未通过，请修复上述问题后重试');
    process.exit(1);
  }
};

// 运行检查
main();