// 回退配置 - 当 Supabase 不可用时使用
export const FALLBACK_CONFIG = {
  // 是否启用回退模式
  enableFallback: true,
  
  // 默认用户数据
  defaultUsers: [
    {
      id: '1',
      username: 'admin',
      email: 'admin@hfcloud.com',
      role: 'super_admin' as const,
      roleLabel: '超级管理员'
    },
    {
      id: '2',
      username: 'manager',
      email: 'manager@hfcloud.com',
      role: 'admin' as const,
      roleLabel: '管理员'
    },
    {
      id: '3',
      username: 'user1',
      email: 'user1@hfcloud.com',
      role: 'user' as const,
      roleLabel: '普通用户'
    }
  ],
  
  // 默认系统配置
  defaultSystemConfig: {
    systemName: 'HFCloud 边缘计算平台',
    logoUrl: '/logo.png',
    logoSize: 32,
    faviconUrl: '/favicon.ico',
    adminEmail: 'admin@hfcloud.com',
    announcement: '',
    maintenanceMode: false
  }
}

// 检查 Supabase 是否可用
export const isSupabaseAvailable = () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  
  return url && 
         key && 
         url !== 'your_supabase_project_url' && 
         key !== 'your_supabase_anon_key' &&
         url !== 'https://your-project.supabase.co' &&
         key !== 'your-anon-key'
}