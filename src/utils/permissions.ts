import { UserRole } from '@/utils/user-data'

// 权限等级定义
export const ROLE_LEVELS = {
  user: 1,
  admin: 2,
  super_admin: 3
} as const

// 权限检查函数
export const hasPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  return ROLE_LEVELS[userRole] >= ROLE_LEVELS[requiredRole]
}

// 检查是否为管理员（包括最高管理员）
export const isAdmin = (userRole: UserRole): boolean => {
  return hasPermission(userRole, 'admin')
}

// 检查是否为最高管理员
export const isSuperAdmin = (userRole: UserRole): boolean => {
  return userRole === 'super_admin'
}

// 获取角色标签
export const getRoleLabel = (role: UserRole): string => {
  const labels = {
    super_admin: '最高管理员',
    admin: '管理员',
    user: '普通用户'
  }
  return labels[role]
}

// 获取角色颜色
export const getRoleColor = (role: UserRole): string => {
  const colors = {
    super_admin: 'text-red-400',
    admin: 'text-blue-400',
    user: 'text-green-400'
  }
  return colors[role]
}

// 获取角色背景色
export const getRoleBgColor = (role: UserRole): string => {
  const colors = {
    super_admin: 'bg-red-500/10 border-red-500/20',
    admin: 'bg-blue-500/10 border-blue-500/20',
    user: 'bg-green-500/10 border-green-500/20'
  }
  return colors[role]
}

// 检查是否可以管理用户
export const canManageUsers = (role: UserRole): boolean => {
  return isAdmin(role)
}

// 检查是否可以访问用户管理页面
export const canAccessUserManagement = (role: UserRole): boolean => {
  // 所有用户都可以访问用户管理页面（普通用户只能管理自己）
  return true
}
