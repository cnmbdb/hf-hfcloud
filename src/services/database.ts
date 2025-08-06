import { supabase, DatabaseUser, DatabaseSystemConfig, DatabaseUserSession } from '@/lib/supabase'
import { SystemConfig } from '@/contexts/system-config-context'
import { User, LoginSession } from '@/contexts/auth-context'

// 用户角色类型定义
export type UserRole = 'super_admin' | 'admin' | 'user'

// 用户状态类型定义
export type UserStatus = 'active' | 'disabled'

// 扩展的用户接口，用于用户管理
export interface ExtendedUser extends User {
  status: UserStatus
  lastLogin: string
  projects: string[]
  relatedProjects?: string[]
}

// 简化密码验证 - 使用预定义的测试账户
const TEST_ACCOUNTS = {
  'admin': {
    password: 'admin123',
    user: {
      id: '1',
      username: 'admin',
      email: 'admin@hfcloud.com',
      role: 'super_admin' as const,
      roleLabel: '超级管理员'
    }
  },
  'manager': {
    password: 'admin123',
    user: {
      id: '2',
      username: 'manager',
      email: 'manager@hfcloud.com',
      role: 'admin' as const,
      roleLabel: '管理员'
    }
  },
  'user1': {
    password: 'admin123',
    user: {
      id: '3',
      username: 'user1',
      email: 'user1@hfcloud.com',
      role: 'user' as const,
      roleLabel: '普通用户'
    }
  }
}

// 用户相关数据库操作
export class UserService {
  // 验证用户凭据 - 简化版本
  static async validateCredentials(username: string, password: string): Promise<User | null> {
    try {
      // 首先尝试从数据库查询用户
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('status', 'active')
        .single()

      if (error) {
        console.log('数据库查询失败，使用测试账户:', error.message)
        // 如果数据库查询失败，使用预定义的测试账户
        const testAccount = TEST_ACCOUNTS[username as keyof typeof TEST_ACCOUNTS]
        if (testAccount && testAccount.password === password) {
          return testAccount.user
        }
        return null
      }

      if (!user) {
        // 用户不存在，检查测试账户
        const testAccount = TEST_ACCOUNTS[username as keyof typeof TEST_ACCOUNTS]
        if (testAccount && testAccount.password === password) {
          return testAccount.user
        }
        return null
      }

      // 简化密码验证：直接比较明文密码（仅用于测试）
      if (password === 'admin123') {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          roleLabel: user.role_label
        }
      }

      return null
    } catch (error) {
      console.error('验证用户凭据失败:', error)
      // 发生异常时，尝试使用测试账户
      const testAccount = TEST_ACCOUNTS[username as keyof typeof TEST_ACCOUNTS]
      if (testAccount && testAccount.password === password) {
        return testAccount.user
      }
      return null
    }
  }

  // 更新用户密码 - 简化版本
  static async updatePassword(userId: string, oldPassword: string, newPassword: string): Promise<boolean> {
    try {
      // 先验证旧密码
      const { data: user, error } = await supabase
        .from('users')
        .select('username')
        .eq('id', userId)
        .single()

      if (error || !user) return false

      // 简化验证：检查旧密码是否为 admin123
      if (oldPassword !== 'admin123') return false

      // 简化更新：直接使用明文密码（仅用于测试）
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          password_hash: newPassword, // 简化：直接存储明文（仅用于测试）
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      return !updateError
    } catch (error) {
      console.error('更新密码失败:', error)
      return false
    }
  }

  // 获取用户信息
  static async getUserById(userId: string): Promise<User | null> {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error || !user) return null

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        roleLabel: user.role_label
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return null
    }
  }
}

// 会话相关数据库操作
export class SessionService {
  // 创建用户会话
  static async createSession(userId: string, deviceInfo: string): Promise<string | null> {
    try {
      const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2)
      const now = new Date().toISOString()

      const { error } = await supabase
        .from('user_sessions')
        .insert({
          user_id: userId,
          session_id: sessionId,
          device_info: deviceInfo,
          login_time: now,
          last_activity: now,
          is_active: true
        })

      if (error) {
        console.error('创建会话失败:', error)
        return null
      }

      return sessionId
    } catch (error) {
      console.error('创建会话失败:', error)
      return null
    }
  }

  // 获取用户活跃会话
  static async getUserActiveSessions(userId: string): Promise<LoginSession[]> {
    try {
      const { data: sessions, error } = await supabase
        .from('user_sessions')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('last_activity', { ascending: false })

      if (error) {
        console.error('获取用户会话失败:', error)
        return []
      }

      return sessions.map(session => ({
        sessionId: session.session_id,
        userId: session.user_id,
        loginTime: new Date(session.login_time).getTime(),
        lastActivity: new Date(session.last_activity).getTime(),
        deviceInfo: session.device_info
      }))
    } catch (error) {
      console.error('获取用户会话失败:', error)
      return []
    }
  }

  // 更新会话活动时间
  static async updateSessionActivity(sessionId: string): Promise<void> {
    try {
      await supabase
        .from('user_sessions')
        .update({ 
          last_activity: new Date().toISOString() 
        })
        .eq('session_id', sessionId)
    } catch (error) {
      console.error('更新会话活动时间失败:', error)
    }
  }

  // 结束会话
  static async endSession(sessionId: string): Promise<void> {
    try {
      await supabase
        .from('user_sessions')
        .update({ is_active: false })
        .eq('session_id', sessionId)
    } catch (error) {
      console.error('结束会话失败:', error)
    }
  }

  // 清理过期会话
  static async cleanExpiredSessions(): Promise<void> {
    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      
      await supabase
        .from('user_sessions')
        .update({ is_active: false })
        .lt('last_activity', twentyFourHoursAgo)
        .eq('is_active', true)
    } catch (error) {
      console.error('清理过期会话失败:', error)
    }
  }
}

// 系统配置相关数据库操作
export class ConfigService {
  // 获取系统配置
  static async getSystemConfig(): Promise<SystemConfig | null> {
    try {
      const { data: configs, error } = await supabase
        .from('system_configs')
        .select('*')

      if (error) {
        console.error('获取系统配置失败:', error)
        return null
      }

      // 将配置数组转换为配置对象
      const configObject: any = {}
      configs.forEach(config => {
        configObject[config.config_key] = config.config_value
      })

      return {
        systemName: configObject.systemName || 'HFCloud 系统',
        logoUrl: configObject.logoUrl || '/logo.png',
        logoSize: configObject.logoSize || 32,
        faviconUrl: configObject.faviconUrl || '/favicon.ico',
        adminEmail: configObject.adminEmail || 'admin@example.com',
        announcement: configObject.announcement || '',
        maintenanceMode: configObject.maintenanceMode || false
      }
    } catch (error) {
      console.error('获取系统配置失败:', error)
      return null
    }
  }

  // 更新系统配置
  static async updateSystemConfig(config: Partial<SystemConfig>, updatedBy: string): Promise<boolean> {
    try {
      const updates = Object.entries(config).map(([key, value]) => ({
        config_key: key,
        config_value: value,
        updated_by: updatedBy,
        updated_at: new Date().toISOString()
      }))

      // 使用upsert来插入或更新配置
      for (const update of updates) {
        const { error } = await supabase
          .from('system_configs')
          .upsert(update, { 
            onConflict: 'config_key',
            ignoreDuplicates: false 
          })

        if (error) {
          console.error('更新配置失败:', error)
          return false
        }
      }

      return true
    } catch (error) {
      console.error('更新系统配置失败:', error)
      return false
    }
  }
}