-- 为用户表添加 projects 字段
-- 此脚本将为现有的用户表添加项目关联字段

-- 添加 projects 字段（JSON 数组类型）
ALTER TABLE users ADD COLUMN IF NOT EXISTS projects JSONB DEFAULT '[]'::jsonb;

-- 添加索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_users_projects ON users USING GIN (projects);

-- 为现有用户添加默认项目数据
UPDATE users SET projects = '["CDN加速", "安全防护"]'::jsonb WHERE username = 'admin';
UPDATE users SET projects = '["CDN加速"]'::jsonb WHERE username = 'manager';
UPDATE users SET projects = '["API加速"]'::jsonb WHERE username = 'user1';

-- 输出成功信息
DO $$
BEGIN
    RAISE NOTICE '已成功为用户表添加 projects 字段';
    RAISE NOTICE '已为现有用户设置默认项目关联';
    RAISE NOTICE 'Projects field added successfully!';
END $$;