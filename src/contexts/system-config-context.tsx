import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

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
}

// 创建上下文
const SystemConfigContext = createContext<SystemConfigContextType | undefined>(undefined)

// 配置提供者组件
export const SystemConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SystemConfig>(defaultConfig)

  // 从localStorage加载配置
  useEffect(() => {
    const savedConfig = localStorage.getItem('systemConfig')
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig)
        setConfig({ ...defaultConfig, ...parsedConfig })
      } catch (error) {
        console.error('Failed to parse saved config:', error)
      }
    }
  }, [])

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

  // 保存配置到localStorage
  const saveConfig = async (): Promise<void> => {
    try {
      localStorage.setItem('systemConfig', JSON.stringify(config))
      // 这里可以添加API调用来保存到后端
      console.log('Config saved:', config)
    } catch (error) {
      console.error('Failed to save config:', error)
      throw error
    }
  }

  return (
    <SystemConfigContext.Provider value={{ config, updateConfig, saveConfig }}>
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