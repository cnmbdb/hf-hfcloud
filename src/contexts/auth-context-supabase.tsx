import React, { createContext, useContext, useState, useEffect } from 'react'
import { UserService, SessionService } from '@/services/database'

export interface User {
  id: string
  username: string
  email: string
  role: 'super_admin' | 'admin' | 'user'
  roleLabel: string
}

export interface LoginSession {
  sessionId: string
  userId: string
  loginTime: number
  lastActivity: number
  deviceInfo: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  changePassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
  isAuthenticated: boolean
  isLoading: boolean
  currentSessionId: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 设备在线限制配置
const DEVICE_LIMITS = {
  super_admin: 10,
  admin: 10,
  user: 1
}

// 生成设备信息
const getDeviceInfo = (): string => {
  const userAgent = navigator.userAgent
  const platform = navigator.platform
  return `${platform} - ${userAgent.substring(0, 50)}...`
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)

  useEffect(() => {
    // 检查本地存储中是否有用户信息和会话信息
    const savedUser = localStorage.getItem('hfcloud_user')
    const savedSessionId = localStorage.getItem('hfcloud_session_id')
    
    if (savedUser && savedSessionId) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      setCurrentSessionId(savedSessionId)
      
      // 更新会话活动时间
      SessionService.updateSessionActivity(savedSessionId)
    }
    setIsLoading(false)

    // 定期清理过期会话
    const cleanupInterval = setInterval(() => {
      SessionService.cleanExpiredSessions()
    }, 60 * 60 * 1000) // 每小时清理一次

    return () => clearInterval(cleanupInterval)
  }, [])

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    
    try {
      // 使用Supabase验证用户凭据
      const foundUser = await UserService.validateCredentials(username, password)
      
      if (!foundUser) {
        setIsLoading(false)
        return { success: false, error: '用户名或密码错误' }
      }

      // 检查设备在线限制
      const existingSessions = await SessionService.getUserActiveSessions(foundUser.id)
      const deviceLimit = DEVICE_LIMITS[foundUser.role]
      
      if (existingSessions.length >= deviceLimit) {
        setIsLoading(false)
        return { 
          success: false, 
          error: `${foundUser.roleLabel}最多允许${deviceLimit}台设备同时在线，请先退出其他设备` 
        }
      }

      // 创建新会话
      const sessionId = await SessionService.createSession(foundUser.id, getDeviceInfo())
      
      if (!sessionId) {
        setIsLoading(false)
        return { success: false, error: '创建会话失败，请重试' }
      }

      // 保存用户信息和会话ID
      setUser(foundUser)
      setCurrentSessionId(sessionId)
      localStorage.setItem('hfcloud_user', JSON.stringify(foundUser))
      localStorage.setItem('hfcloud_session_id', sessionId)
      
      setIsLoading(false)
      return { success: true }
    } catch (error) {
      console.error('登录失败:', error)
      setIsLoading(false)
      return { success: false, error: '登录过程中发生错误' }
    }
  }

  const changePassword = async (oldPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: '用户未登录' }
    }

    setIsLoading(true)
    
    try {
      // 使用Supabase更新密码
      const success = await UserService.updatePassword(user.id, oldPassword, newPassword)
      
      if (!success) {
        setIsLoading(false)
        return { success: false, error: '原密码错误或密码更新失败' }
      }

      // 修改密码后自动退出登录
      logout()
      
      setIsLoading(false)
      return { success: true }
    } catch (error) {
      console.error('修改密码失败:', error)
      setIsLoading(false)
      return { success: false, error: '修改密码过程中发生错误' }
    }
  }

  const logout = () => {
    if (currentSessionId) {
      // 结束当前会话
      SessionService.endSession(currentSessionId)
    }

    setUser(null)
    setCurrentSessionId(null)
    localStorage.removeItem('hfcloud_user')
    localStorage.removeItem('hfcloud_session_id')
  }

  const value = {
    user,
    login,
    logout,
    changePassword,
    isAuthenticated: !!user,
    isLoading,
    currentSessionId
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}