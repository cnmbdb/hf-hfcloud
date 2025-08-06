-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('super_admin', 'admin', 'user')),
  role_label VARCHAR(50) DEFAULT '普通用户',
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建用户会话表
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id VARCHAR(100) UNIQUE NOT NULL,
  device_info TEXT,
  login_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- 创建系统配置表
CREATE TABLE IF NOT EXISTS system_configs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key VARCHAR(100) UNIQUE NOT NULL,
  config_value TEXT,
  updated_by VARCHAR(50),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入默认用户数据
INSERT INTO users (username, email, password_hash, role, role_label) VALUES
('admin', 'admin@hfcloud.com', 'admin123', 'super_admin', '超级管理员'),
('manager', 'manager@hfcloud.com', 'admin123', 'admin', '管理员'),
('user1', 'user1@hfcloud.com', 'admin123', 'user', '普通用户')
ON CONFLICT (username) DO NOTHING;

-- 插入默认系统配置
INSERT INTO system_configs (config_key, config_value, updated_by) VALUES
('systemName', 'HFCloud 系统', 'system'),
('logoUrl', '/logo.png', 'system'),
('logoSize', '32', 'system'),
('faviconUrl', '/favicon.ico', 'system'),
('adminEmail', 'admin@hfcloud.com', 'system'),
('announcement', '欢迎使用 HFCloud 系统', 'system'),
('maintenanceMode', 'false', 'system')
ON CONFLICT (config_key) DO NOTHING;

-- 启用行级安全策略 (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_configs ENABLE ROW LEVEL SECURITY;

-- 创建用户表的RLS策略
CREATE POLICY "用户可以查看自己的信息" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "管理员可以查看所有用户" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('super_admin', 'admin')
    )
  );

-- 创建会话表的RLS策略
CREATE POLICY "用户可以查看自己的会话" ON user_sessions
  FOR ALL USING (user_id::text = auth.uid()::text);

-- 创建系统配置表的RLS策略
CREATE POLICY "所有人可以查看系统配置" ON system_configs
  FOR SELECT USING (true);

CREATE POLICY "管理员可以修改系统配置" ON system_configs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('super_admin', 'admin')
    )
  );