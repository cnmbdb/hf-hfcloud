import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  UserRole, 
  validateUserCredentials, 
  updateUserPassword, 
  getUserById 
} from '@/utils/user-data'

export interface User {
  id: string
  username: string
  email: string
  role: UserRole
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

// 生成会话ID
const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
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
      setUser(JSON.parse(savedUser))
      setCurrentSessionId(savedSessionId)
    }
    setIsLoading(false)
  }, [])

  // 获取用户的活跃会话
  const getUserSessions = (userId: string): LoginSession[] => {
    const sessions = localStorage.getItem(`hfcloud_sessions_${userId}`)
    return sessions ? JSON.parse(sessions) : []
  }

  // 保存用户会话
  const saveUserSessions = (userId: string, sessions: LoginSession[]) => {
    localStorage.setItem(`hfcloud_sessions_${userId}`, JSON.stringify(sessions))
  }

  // 清理过期会话（24小时未活动）
  const cleanExpiredSessions = (sessions: LoginSession[]): LoginSession[] => {
    const now = Date.now()
    const twentyFourHours = 24 * 60 * 60 * 1000
    return sessions.filter(session => now - session.lastActivity < twentyFourHours)
  }

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 使用共享的用户数据验证凭据
      const foundUser = validateUserCredentials(username, password)
      
      if (!foundUser) {
        setIsLoading(false)
        return { success: false, error: '用户名或密码错误' }
      }

      // 检查账户状态
      if (foundUser.status === 'disabled') {
        setIsLoading(false)
        return { success: false, error: '该账户已被停用，请联系管理员' }
      }

      // 检查设备在线限制
      const existingSessions = cleanExpiredSessions(getUserSessions(foundUser.id))
      const deviceLimit = DEVICE_LIMITS[foundUser.role]
      
      if (existingSessions.length >= deviceLimit) {
        setIsLoading(false)
        return { 
          success: false, 
          error: `${foundUser.roleLabel}最多允许${deviceLimit}台设备同时在线，请先退出其他设备` 
        }
      }

      // 创建新会话
      const sessionId = generateSessionId()
      const newSession: LoginSession = {
        sessionId,
        userId: foundUser.id,
        loginTime: Date.now(),
        lastActivity: Date.now(),
        deviceInfo: getDeviceInfo()
      }

      // 保存会话信息
      const updatedSessions = [...existingSessions, newSession]
      saveUserSessions(foundUser.id, updatedSessions)

      const userInfo: User = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
        roleLabel: foundUser.roleLabel
      }

      setUser(userInfo)
      setCurrentSessionId(sessionId)
      localStorage.setItem('hfcloud_user', JSON.stringify(userInfo))
      localStorage.setItem('hfcloud_session_id', sessionId)
      
      setIsLoading(false)
      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: '登录过程中发生错误' }
    }
  }

  const changePassword = async (oldPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: '用户未登录' }
    }

    setIsLoading(true)
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 使用共享的用户数据验证旧密码
    const foundUser = validateUserCredentials(user.username, oldPassword)
    if (!foundUser) {
      setIsLoading(false)
      return { success: false, error: '原密码错误' }
    }

    // 更新密码
    const success = updateUserPassword(user.id, newPassword)
    if (!success) {
      setIsLoading(false)
      return { success: false, error: '密码更新失败' }
    }

    // 修改密码后自动退出登录
    logout()
    
    setIsLoading(false)
    return { success: true }
  }

  const logout = () => {
    if (user && currentSessionId) {
      // 移除当前会话
      const sessions = getUserSessions(user.id)
      const updatedSessions = sessions.filter(s => s.sessionId !== currentSessionId)
      saveUserSessions(user.id, updatedSessions)
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