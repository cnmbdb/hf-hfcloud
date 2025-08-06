-- HFCloud 数据库初始化脚本
-- 此脚本将创建完整的数据库结构和初始数据

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 删除现有表（如果存在）
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS system_configs CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 创建用户表
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('super_admin', 'admin', 'user')),
    role_label VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
    last_login TIMESTAMP WITH TIME ZONE,
    login_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建用户会话表
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    device_info TEXT,
    login_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours'),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建系统配置表
CREATE TABLE system_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT,
    config_type VARCHAR(20) DEFAULT 'string' CHECK (config_type IN ('string', 'number', 'boolean', 'json')),
    description TEXT,
    updated_by VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_session_id ON user_sessions(session_id);
CREATE INDEX idx_user_sessions_active ON user_sessions(is_active);
CREATE INDEX idx_system_configs_key ON system_configs(config_key);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为用户表创建更新时间触发器
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 为系统配置表创建更新时间触发器
CREATE TRIGGER update_system_configs_updated_at 
    BEFORE UPDATE ON system_configs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 插入初始用户数据
-- 注意：所有密码都是 'admin123' 的 bcrypt 哈希值
INSERT INTO users (username, email, password_hash, role, role_label, status) VALUES
('admin', 'admin@hfcloud.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin', '超级管理员', 'active'),
('manager', 'manager@hfcloud.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '管理员', 'active'),
('user1', 'user1@hfcloud.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user', '普通用户', 'active');

-- 插入初始系统配置
INSERT INTO system_configs (config_key, config_value, config_type, description, updated_by) VALUES
('systemName', 'HFCloud 边缘计算平台', 'string', '系统名称', 'system'),
('logoUrl', '/logo.png', 'string', '系统Logo URL', 'system'),
('logoSize', '32', 'number', 'Logo大小', 'system'),
('faviconUrl', '/favicon.ico', 'string', '网站图标URL', 'system'),
('adminEmail', 'admin@hfcloud.com', 'string', '管理员邮箱', 'system'),
('announcement', '', 'string', '系统公告', 'system'),
('maintenanceMode', 'false', 'boolean', '维护模式', 'system');

-- 禁用 RLS（行级安全）以便测试
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE system_configs DISABLE ROW LEVEL SECURITY;

-- 输出成功信息
DO $$
BEGIN
    RAISE NOTICE '数据库初始化成功完成！';
    RAISE NOTICE '已创建用户表、会话表和系统配置表';
    RAISE NOTICE '已插入初始用户数据：admin, manager, user1';
    RAISE NOTICE '所有用户的默认密码都是：admin123';
    RAISE NOTICE '已插入初始系统配置数据';
    RAISE NOTICE 'Database initialization completed successfully!';
END $$;