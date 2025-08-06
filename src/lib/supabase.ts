import { createClient } from '@supabase/supabase-js'

// Supabase配置 - 请替换为您的实际配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// 检查环境变量是否正确配置
if (supabaseUrl === 'https://your-project.supabase.co' || supabaseAnonKey === 'your-anon-key') {
  console.warn('⚠️ Supabase 环境变量未正确配置，请检查 .env 文件')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据库表结构类型定义
export interface DatabaseUser {
  id: string
  username: string
  email: string
  role: 'super_admin' | 'admin' | 'user'
  role_label: string
  status: 'active' | 'disabled'
  password_hash: string
  created_at: string
  updated_at: string
}

export interface DatabaseSystemConfig {
  id: string
  config_key: string
  config_value: any
  updated_by: string
  updated_at: string
}

export interface DatabaseUserSession {
  id: string
  user_id: string
  session_id: string
  device_info: string
  login_time: string
  last_activity: string
  is_active: boolean
}

// 数据库操作类型
export type Database = {
  public: {
    Tables: {
      users: {
        Row: DatabaseUser
        Insert: Omit<DatabaseUser, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<DatabaseUser, 'id' | 'created_at'>>
      }
      system_configs: {
        Row: DatabaseSystemConfig
        Insert: Omit<DatabaseSystemConfig, 'id' | 'updated_at'>
        Update: Partial<Omit<DatabaseSystemConfig, 'id'>>
      }
      user_sessions: {
        Row: DatabaseUserSession
        Insert: Omit<DatabaseUserSession, 'id'>
        Update: Partial<Omit<DatabaseUserSession, 'id'>>
      }
    }
  }
}