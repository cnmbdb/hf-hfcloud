// 用户数据管理工具
export interface UserData {
  id: string
  username: string
  email: string
  role: 'super_admin' | 'admin' | 'user'
  roleLabel: string
  status: 'active' | 'disabled'
  lastLogin?: string
  relatedProjects?: string[]
}

// 模拟用户数据
const mockUsers: UserData[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@hfcloud.com',
    role: 'super_admin',
    roleLabel: '超级管理员',
    status: 'active',
    lastLogin: '2024-01-15 10:30:00',
    relatedProjects: ['CDN加速', '安全防护', '边缘计算']
  },
  {
    id: '2',
    username: 'manager',
    email: 'manager@hfcloud.com',
    role: 'admin',
    roleLabel: '管理员',
    status: 'active',
    lastLogin: '2024-01-15 09:15:00',
    relatedProjects: ['CDN加速', 'API加速']
  },
  {
    id: '3',
    username: 'user1',
    email: 'user1@hfcloud.com',
    role: 'user',
    roleLabel: '普通用户',
    status: 'active',
    lastLogin: '2024-01-14 16:45:00',
    relatedProjects: ['CDN加速']
  },
  {
    id: '4',
    username: 'user2',
    email: 'user2@hfcloud.com',
    role: 'user',
    roleLabel: '普通用户',
    status: 'disabled',
    lastLogin: '2024-01-10 14:20:00',
    relatedProjects: ['API加速', '视频加速']
  },
  {
    id: '5',
    username: 'developer',
    email: 'dev@hfcloud.com',
    role: 'user',
    roleLabel: '普通用户',
    status: 'active',
    lastLogin: '2024-01-14 11:30:00',
    relatedProjects: ['边缘计算', '移动端加速']
  }
]

// 获取所有用户数据
export const getAllUsers = (): UserData[] => {
  return [...mockUsers]
}

// 根据ID获取用户
export const getUserById = (id: string): UserData | undefined => {
  return mockUsers.find(user => user.id === id)
}

// 根据用户名获取用户
export const getUserByUsername = (username: string): UserData | undefined => {
  return mockUsers.find(user => user.username === username)
}

// 更新用户状态
export const updateUserStatus = (userId: string, status: 'active' | 'disabled'): boolean => {
  const userIndex = mockUsers.findIndex(user => user.id === userId)
  if (userIndex !== -1) {
    mockUsers[userIndex].status = status
    return true
  }
  return false
}

// 更新用户信息
export const updateUser = (userId: string, updates: Partial<UserData>): boolean => {
  const userIndex = mockUsers.findIndex(user => user.id === userId)
  if (userIndex !== -1) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates }
    return true
  }
  return false
}

// 添加新用户
export const addUser = (userData: Omit<UserData, 'id'>): UserData => {
  const newUser: UserData = {
    id: Date.now().toString(),
    ...userData
  }
  mockUsers.push(newUser)
  return newUser
}

// 删除用户
export const deleteUser = (userId: string): boolean => {
  const userIndex = mockUsers.findIndex(user => user.id === userId)
  if (userIndex !== -1) {
    mockUsers.splice(userIndex, 1)
    return true
  }
  return false
}

// 获取用户统计信息
export const getUserStats = () => {
  const total = mockUsers.length
  const active = mockUsers.filter(user => user.status === 'active').length
  const admins = mockUsers.filter(user => user.role === 'admin' || user.role === 'super_admin').length
  const users = mockUsers.filter(user => user.role === 'user').length
  
  return {
    total,
    active,
    disabled: total - active,
    admins,
    users
  }
}