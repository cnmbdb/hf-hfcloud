export type UserRole = 'super_admin' | 'admin' | 'user'
export type UserStatus = 'active' | 'disabled'

export interface MockUser {
  id: string
  username: string
  password: string
  email: string
  role: UserRole
  roleLabel: string
  status: UserStatus
  lastLogin?: string
  relatedProjects?: string[]
}

// 共享的模拟用户数据
let mockUsers: MockUser[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin',
    email: 'admin@hfcloud.com',
    role: 'super_admin',
    roleLabel: '最高管理员',
    status: 'active',
    lastLogin: '2024-01-15 10:30',
    relatedProjects: ['CDN加速', '安全防护', '+1']
  },
  {
    id: '2',
    username: 'admin2',
    password: 'admin2',
    email: 'admin2@hfcloud.com',
    role: 'admin',
    roleLabel: '管理员',
    status: 'disabled',
    lastLogin: '2024-01-14 15:20',
    relatedProjects: ['CDN加速', '安全防护']
  },
  {
    id: '3',
    username: 'admin3',
    password: 'admin3',
    email: 'admin3@hfcloud.com',
    role: 'user',
    roleLabel: '普通用户',
    status: 'active',
    lastLogin: '2024-01-13 09:15',
    relatedProjects: ['CDN加速']
  },
  {
    id: '4',
    username: 'user1',
    password: 'user1',
    email: 'user1@hfcloud.com',
    role: 'user',
    roleLabel: '普通用户',
    status: 'active',
    lastLogin: '2024-01-12 14:30',
    relatedProjects: ['安全防护']
  },
  {
    id: '5',
    username: 'user2',
    password: 'user2',
    email: 'user2@hfcloud.com',
    role: 'user',
    roleLabel: '普通用户',
    status: 'disabled',
    lastLogin: '2024-01-10 09:15',
    relatedProjects: ['边缘计算']
  }
]

// 获取所有用户
export const getAllUsers = (): MockUser[] => {
  return [...mockUsers]
}

// 根据ID获取用户
export const getUserById = (id: string): MockUser | undefined => {
  return mockUsers.find(user => user.id === id)
}

// 根据用户名获取用户
export const getUserByUsername = (username: string): MockUser | undefined => {
  return mockUsers.find(user => user.username === username)
}

// 更新用户状态
export const updateUserStatus = (userId: string, status: UserStatus): boolean => {
  const userIndex = mockUsers.findIndex(user => user.id === userId)
  if (userIndex !== -1) {
    mockUsers[userIndex].status = status
    console.log(`用户状态已更新: ${mockUsers[userIndex].username} -> ${status}`)
    
    // 将更新后的用户数据保存到localStorage以持久化
    try {
      localStorage.setItem('hfcloud_users_data', JSON.stringify(mockUsers))
    } catch (error) {
      console.warn('无法保存用户数据到localStorage:', error)
    }
    
    return true
  }
  return false
}

// 更新用户密码
export const updateUserPassword = (userId: string, newPassword: string): boolean => {
  const userIndex = mockUsers.findIndex(user => user.id === userId)
  if (userIndex !== -1) {
    mockUsers[userIndex].password = newPassword
    console.log(`用户密码已更新: ${mockUsers[userIndex].username}`)
    
    // 将更新后的用户数据保存到localStorage以持久化
    try {
      localStorage.setItem('hfcloud_users_data', JSON.stringify(mockUsers))
    } catch (error) {
      console.warn('无法保存用户数据到localStorage:', error)
    }
    
    return true
  }
  return false
}

// 验证用户凭据
export const validateUserCredentials = (username: string, password: string): MockUser | null => {
  const user = mockUsers.find(u => u.username === username && u.password === password)
  console.log(`验证用户凭据: ${username}, 找到用户:`, user ? `${user.username} (状态: ${user.status})` : '未找到')
  return user || null
}

// 初始化用户数据（从localStorage加载或使用默认数据）
export const initializeUserData = (): void => {
  try {
    const savedData = localStorage.getItem('hfcloud_users_data')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        mockUsers = parsedData
        console.log('从localStorage加载用户数据:', mockUsers.length, '个用户')
        return
      }
    }
  } catch (error) {
    console.warn('无法从localStorage加载用户数据:', error)
  }
  
  // 如果没有保存的数据，使用默认数据并保存
  try {
    localStorage.setItem('hfcloud_users_data', JSON.stringify(mockUsers))
    console.log('使用默认用户数据并保存到localStorage')
  } catch (error) {
    console.warn('无法保存默认用户数据到localStorage:', error)
  }
}

// 在模块加载时初始化数据
initializeUserData()
