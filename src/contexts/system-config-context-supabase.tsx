import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ConfigService } from '@/services/database'
import { useAuth } from './auth-context-supabase'

// 系统配置接口
export interface SystemConfig {
  systemName: string
  logoUrl: string
  logoSize: number
  faviconUrl: string
  adminEmail: string
  announcement: string
  maintenanceMode: boolean
}

// 默认配置
const defaultConfig: SystemConfig = {
  systemName: 'HFCloud 系统',
  logoUrl: '/logo.png',
  logoSize: 32,
  faviconUrl: '/favicon.ico',
  adminEmail: 'admin@example.com',
  announcement: '',
  maintenanceMode: false
}

// 上下文接口
interface SystemConfigContextType {
  config: SystemConfig
  updateConfig: (updates: Partial<SystemConfig>) => void
  saveConfig: () => Promise<void>
  isLoading: boolean
  error: string | null
}

// 创建上下文
const SystemConfigContext = createContext<SystemConfigContextType | undefined>(undefined)

// 配置提供者组件
export const SystemConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SystemConfig>(defaultConfig)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  // 从Supabase加载配置
  useEffect(() => {
    loadConfig()
  }, [])

  // 加载配置
  const loadConfig = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // 首先尝试从数据库加载配置
      try {
        const savedConfig = await ConfigService.getSystemConfig()
        if (savedConfig) {
          setConfig(savedConfig)
          return
        }
      } catch (dbError) {
        console.warn('数据库配置加载失败，使用默认配置:', dbError)
      }
      
      // 如果数据库加载失败，尝试从localStorage加载
      const localConfig = localStorage.getItem('systemConfig')
      if (localConfig) {
        try {
          const parsedConfig = JSON.parse(localConfig)
          const migratedConfig = { ...defaultConfig, ...parsedConfig }
          setConfig(migratedConfig)
          return
        } catch (parseError) {
          console.error('解析本地配置失败:', parseError)
        }
      }
      
      // 如果都失败了，使用默认配置
      console.log('使用默认系统配置')
      setConfig(defaultConfig)
      
    } catch (err) {
      console.error('加载系统配置失败:', err)
      // 即使出错也使用默认配置，确保应用能正常运行
      setConfig(defaultConfig)
      setError(null) // 不显示错误，静默处理
    } finally {
      setIsLoading(false)
    }
  }

  // 更新页面标题
  useEffect(() => {
    document.title = config.systemName
  }, [config.systemName])

  // 更新favicon
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
    if (favicon && config.faviconUrl) {
      favicon.href = config.faviconUrl
    }
  }, [config.faviconUrl])

  // 更新配置
  const updateConfig = (updates: Partial<SystemConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  // 保存配置到Supabase
  const saveConfig = async (): Promise<void> => {
    if (!user) {
      throw new Error('用户未登录，无法保存配置')
    }

    if (user.role !== 'admin' && user.role !== 'super_admin') {
      throw new Error('权限不足，只有管理员可以修改系统配置')
    }

    try {
      setError(null)
      
      // 保存到Supabase数据库
      const success = await ConfigService.updateSystemConfig(config, user.id)
      
      if (!success) {
        throw new Error('保存配置到数据库失败')
      }

      // 同时保存到localStorage作为备份
      localStorage.setItem('systemConfig', JSON.stringify(config))
      
      console.log('系统配置已保存:', config)
    } catch (err) {
      console.error('保存系统配置失败:', err)
      setError('保存系统配置失败')
      
      // 如果数据库保存失败，至少保存到localStorage
      try {
        localStorage.setItem('systemConfig', JSON.stringify(config))
        console.log('配置已保存到本地存储')
      } catch (localError) {
        console.error('保存到本地存储也失败:', localError)
      }
      
      throw err
    }
  }

  return (
    <SystemConfigContext.Provider value={{ 
      config, 
      updateConfig, 
      saveConfig, 
      isLoading, 
      error 
    }}>
      {children}
    </SystemConfigContext.Provider>
  )
}

// 使用配置的Hook
export const useSystemConfig = () => {
  const context = useContext(SystemConfigContext)
  if (context === undefined) {
    throw new Error('useSystemConfig must be used within a SystemConfigProvider')
  }
  return context
}