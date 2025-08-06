import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Plus, 
  Users, 
  UserCog, 
  Shield, 
  Edit,
  Trash2,
  MoreHorizontal,
  X,
  Save,
  Package,
  Key,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth } from '@/contexts/auth-context-supabase'
import { canManageUsers, canAccessUserManagement } from '@/utils/permissions'
import { useNavigate } from 'react-router-dom'
import { useCustomToast } from '@/components/ui/toast-manager'
import { supabase } from '@/lib/supabase'

// 类型定义
type UserRole = 'super_admin' | 'admin' | 'user'
type UserStatus = 'active' | 'disabled'

interface User {
  id: string
  username: string
  email: string
  role: UserRole
  status: UserStatus
  lastLogin: string
  projects: string[]
  password?: string
}

interface EditUserData {
  username: string
  email: string
  role: 'super_admin' | 'admin' | 'user'
  status: 'active' | 'disabled'
  projects: string[]
  password: string
}

const UserManagementPage = () => {
  const { user, changePassword } = useAuth()
  const { showSuccess, showError } = useCustomToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [editUserData, setEditUserData] = useState<EditUserData>({
    username: '',
    email: '',
    role: 'user',
    status: 'active',
    projects: [],
    password: ''
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordChangeData, setPasswordChangeData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const navigate = useNavigate()

  // 检查权限 - 所有用户都可以访问用户管理页面
  if (!user || !canAccessUserManagement(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Shield className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">访问受限</h2>
        <p className="text-gray-400 text-center max-w-md">
          您没有权限访问用户管理功能。请联系管理员获取相应权限。
        </p>
      </div>
    )
  }

  // 用户数据状态管理 - 从 Supabase 数据库获取
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 从数据库获取用户数据
  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('获取用户数据失败:', error)
        showError('数据加载失败', '无法从数据库获取用户数据')
        return
      }

      const formattedUsers: User[] = users.map((dbUser: any) => ({
        id: dbUser.id,
        username: dbUser.username,
        email: dbUser.email,
        role: dbUser.role,
        status: dbUser.status,
        lastLogin: dbUser.last_login || '未知',
        projects: dbUser.related_projects || []
      }))

      setAllUsers(formattedUsers)
    } catch (error) {
      console.error('获取用户数据异常:', error)
      showError('数据加载异常', '获取用户数据时发生异常')
    } finally {
      setIsLoading(false)
    }
  }

  // 初始化用户数据
  useEffect(() => {
    fetchUsers()
  }, [])

  // 可用的产品项目
  const availableProjects = ['CDN加速', '安全防护', '边缘计算', 'API加速', '视频加速', '移动端加速']

  // 根据当前用户权限过滤用户列表
  const getFilteredUsersByPermission = () => {
    if (!user) return []
    
    switch (user.role) {
      case 'super_admin':
        // 超级管理员可以看到所有用户
        return allUsers
      case 'admin':
        // 管理员只能看到自己和所有普通用户
        return allUsers.filter(u => u.role === 'user' || u.id === user.id)
      case 'user':
        // 普通用户只能看到自己
        return allUsers.filter(u => u.id === user.id)
      default:
        return []
    }
  }

  // 检查是否可以编辑某个用户
  const canEditUser = (targetUser: User) => {
    if (!user) return false
    
    switch (user.role) {
      case 'super_admin':
        // 超级管理员可以编辑所有用户
        return true
      case 'admin':
        // 管理员可以编辑自己和普通用户
        return targetUser.role === 'user' || targetUser.id === user.id
      case 'user':
        // 普通用户只能编辑自己
        return targetUser.id === user.id
      default:
        return false
    }
  }

  // 检查是否可以修改账户状态
  const canEditUserStatus = (targetUser: User) => {
    if (!user) return false
    
    switch (user.role) {
      case 'super_admin':
        // 超级管理员可以修改所有用户的账户状态
        return true
      case 'admin':
        // 管理员不能修改自己的账户状态，但可以修改普通用户的账户状态
        return targetUser.role === 'user' && targetUser.id !== user.id
      case 'user':
        // 普通用户不能修改任何账户状态（包括自己的）
        return false
      default:
        return false
    }
  }

  const users = getFilteredUsersByPermission()

  // 更新统计数据以使用实时数据
  const totalUsers = users.length
  const adminUsers = users.filter(u => u.role === 'admin' || u.role === 'super_admin').length
  const activeUsers = users.filter(u => u.status === 'active').length

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">最高管理员</Badge>
      case 'admin':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">管理员</Badge>
      case 'user':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">普通用户</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">活跃</Badge>
      case 'disabled':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">停用</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 更新用户状态到数据库
  const updateUserStatusInDB = async (userId: string, status: UserStatus) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (error) {
        console.error('更新用户状态失败:', error)
        return false
      }
      return true
    } catch (error) {
      console.error('更新用户状态异常:', error)
      return false
    }
  }

  // 打开编辑对话框
  const handleEditUser = (userToEdit: User) => {
    if (!canEditUser(userToEdit)) return
    
    setEditingUser(userToEdit)
    setEditUserData({
      username: userToEdit.username,
      email: userToEdit.email,
      role: userToEdit.role,
      status: userToEdit.status,
      projects: userToEdit.projects,
      password: ''
    })
    setIsEditDialogOpen(true)
  }

  // 保存用户编辑
  const handleSaveUser = async () => {
    if (!editingUser) return

    try {
      // 更新数据库中的用户信息
      const updateData: any = {
        username: editUserData.username,
        email: editUserData.email,
        role: editUserData.role,
        status: editUserData.status,
        updated_at: new Date().toISOString()
      }

      // 只有当 projects 字段存在时才更新
      if (editUserData.projects && editUserData.projects.length > 0) {
        updateData.projects = JSON.stringify(editUserData.projects)
      }

      console.log('准备更新的数据:', updateData)

      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', editingUser.id)

      if (error) {
        console.error('更新用户信息失败:', error)
        console.error('错误详情:', JSON.stringify(error, null, 2))
        console.error('更新数据:', {
          username: editUserData.username,
          email: editUserData.email,
          role: editUserData.role,
          status: editUserData.status,
          projects: editUserData.projects,
          updated_at: new Date().toISOString()
        })
        showError('保存失败', `数据库错误: ${error.message || '未知错误'}`)
        return
      }

      // 更新本地用户列表状态
      setAllUsers(prevUsers => 
        prevUsers.map(u => 
          u.id === editingUser.id 
            ? {
                ...u,
                username: editUserData.username,
                email: editUserData.email,
                role: editUserData.role,
                status: editUserData.status,
                projects: editUserData.projects
              }
            : u
        )
      )

      // 显示保存成功提示
      showSuccess('保存成功', '用户信息已成功更新')
      
      // 关闭对话框
      setIsEditDialogOpen(false)
      setEditingUser(null)
      
      console.log('用户信息已同步更新:', editUserData)
    } catch (error) {
      console.error('保存用户信息异常:', error)
      showError('保存异常', '保存用户信息时发生异常')
    }
  }

  // 打开密码修改对话框
  const handleChangePassword = () => {
    setPasswordChangeData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setIsPasswordDialogOpen(true)
  }

  // 提交密码修改
  const handlePasswordSubmit = async () => {
    if (!passwordChangeData.oldPassword || !passwordChangeData.newPassword) {
      showError('输入错误', '请填写完整的密码信息')
      return
    }

    if (passwordChangeData.newPassword !== passwordChangeData.confirmPassword) {
      showError('密码不匹配', '新密码和确认密码不一致')
      return
    }

    if (passwordChangeData.newPassword.length < 6) {
      showError('密码太短', '新密码长度至少6位')
      return
    }

    setIsChangingPassword(true)
    
    const result = await changePassword(passwordChangeData.oldPassword, passwordChangeData.newPassword)
    
    setIsChangingPassword(false)
    
    if (result.success) {
      showSuccess('密码修改成功', '请重新登录')
      setIsPasswordDialogOpen(false)
      // 密码修改成功后会自动退出登录，跳转到登录页面
      navigate('/login')
    } else {
      showError('密码修改失败', result.error || '未知错误')
    }
  }

  // 关闭密码修改对话框
  const handleClosePasswordDialog = () => {
    setIsPasswordDialogOpen(false)
    setPasswordChangeData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  // 关闭编辑对话框
  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false)
    setEditingUser(null)
    setShowPassword(false)
  }

  // 处理项目选择
  const handleProjectToggle = (project: string, checked: boolean) => {
    setEditUserData(prev => ({
      ...prev,
      projects: checked 
        ? [...prev.projects, project]
        : prev.projects.filter(p => p !== project)
    }))
  }

  // 如果正在加载，显示加载状态
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-400">正在加载用户数据...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">用户管理</h1>
          <p className="text-gray-400">管理系统中的所有用户账户和权限</p>
        </div>
        {user?.role === 'super_admin' && (
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 mt-4 md:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            添加用户
          </Button>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/40 backdrop-blur-md border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">总用户数</p>
                <p className="text-3xl font-bold text-white">{totalUsers}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">管理员</p>
                <p className="text-3xl font-bold text-white">{adminUsers}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/20">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">活跃用户</p>
                <p className="text-3xl font-bold text-white">{activeUsers}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/20">
                <UserCog className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-black/40 backdrop-blur-md border-white/10">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索用户名或邮箱..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/20 border-white/10 text-white placeholder-gray-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="h-5 w-5 mr-2" />
            用户列表
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={fetchUsers}
              className="ml-auto text-gray-400 hover:text-white"
            >
              刷新数据
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">用户</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">角色</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">状态</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">关联项目</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">最后登录</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {u.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white font-medium">{u.username}</div>
                          <div className="text-gray-400 text-sm">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getRoleBadge(u.role)}
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(u.status)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {u.projects.slice(0, 2).map((project, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {project}
                          </Badge>
                        ))}
                        {u.projects.length > 2 && (
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                            +{u.projects.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{u.lastLogin}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {canEditUser(u) && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost" className="p-2 hover:bg-white/10">
                                <MoreHorizontal className="h-4 w-4 text-white" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-md border-gray-700">
                              <DropdownMenuItem 
                                className="text-gray-300 hover:text-white hover:bg-white/10"
                                onClick={() => handleEditUser(u)}
                              >
                                <Edit className="mr-2 h-4 w-4 text-white" />
                                编辑
                              </DropdownMenuItem>
                              {u.id === user?.id && (
                                <DropdownMenuItem 
                                  className="text-gray-300 hover:text-white hover:bg-white/10"
                                  onClick={handleChangePassword}
                                >
                                  <Key className="mr-2 h-4 w-4 text-white" />
                                  修改密码
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/10">
                                <Shield className="mr-2 h-4 w-4 text-white" />
                                权限设置
                              </DropdownMenuItem>
                              {user?.role === 'super_admin' && u.id !== user.id && (
                                <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                  <Trash2 className="mr-2 h-4 w-4 text-white" />
                                  删除
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={handleCloseEditDialog}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              编辑用户信息
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              修改用户的基本信息、权限和关联项目
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            {/* 基本信息 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <UserCog className="h-5 w-5" />
                基本信息
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">用户名</Label>
                  <Input
                    id="username"
                    value={editUserData.username}
                    onChange={(e) => setEditUserData(prev => ({ ...prev, username: e.target.value }))}
                    className="bg-black/20 border-white/10 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editUserData.email}
                    onChange={(e) => setEditUserData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-black/20 border-white/10 text-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-300">用户角色</Label>
                  <Select 
                    value={editUserData.role} 
                    onValueChange={(value: 'super_admin' | 'admin' | 'user') => 
                      setEditUserData(prev => ({ ...prev, role: value }))
                    }
                    disabled={user?.role !== 'super_admin' || editingUser?.id === user?.id}
                  >
                    <SelectTrigger className={`bg-black/20 border-white/10 text-white ${
                      (user?.role !== 'super_admin' || editingUser?.id === user?.id) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900/95 backdrop-blur-md border-gray-700">
                      <SelectItem value="user" className="text-white hover:bg-white/10">普通用户</SelectItem>
                      <SelectItem value="admin" className="text-white hover:bg-white/10">管理员</SelectItem>
                      {user?.role === 'super_admin' && (
                        <SelectItem value="super_admin" className="text-white hover:bg-white/10">最高管理员</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {(user?.role !== 'super_admin' || editingUser?.id === user?.id) && (
                    <p className="text-xs text-gray-500">
                      {editingUser?.id === user?.id ? '您不能修改自己的角色' : '只有超级管理员可以修改用户角色'}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-gray-300">账户状态</Label>
                  <Select 
                    value={editUserData.status} 
                    onValueChange={(value: 'active' | 'disabled') => 
                      setEditUserData(prev => ({ ...prev, status: value }))
                    }
                    disabled={editingUser ? !canEditUserStatus(editingUser) : false}
                  >
                    <SelectTrigger className={`bg-black/20 border-white/10 text-white ${
                      editingUser && !canEditUserStatus(editingUser) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900/95 backdrop-blur-md border-gray-700">
                      <SelectItem value="active" className="text-white hover:bg-white/10">活跃</SelectItem>
                      <SelectItem value="disabled" className="text-white hover:bg-white/10">停用</SelectItem>
                    </SelectContent>
                  </Select>
                  {editingUser && !canEditUserStatus(editingUser) && (
                    <p className="text-xs text-gray-500">您没有权限修改此用户的账户状态</p>
                  )}
                </div>
              </div>
            </div>

            {/* 密码设置 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Key className="h-5 w-5" />
                密码设置
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">新密码（留空则不修改）</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={editUserData.password}
                    onChange={(e) => setEditUserData(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-black/20 border-white/10 text-white pr-10"
                    placeholder="输入新密码"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* 关联项目 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Package className="h-5 w-5" />
                关联产品项目
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {availableProjects.map((project) => (
                  <div key={project} className="flex items-center space-x-2">
                    <Checkbox
                      id={project}
                      checked={editUserData.projects.includes(project)}
                      onCheckedChange={(checked) => handleProjectToggle(project, checked as boolean)}
                      className="border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label 
                      htmlFor={project} 
                      className="text-gray-300 text-sm cursor-pointer"
                    >
                      {project}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={handleCloseEditDialog}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <X className="h-4 w-4 mr-2" />
              取消
            </Button>
            <Button 
              onClick={handleSaveUser}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={handleClosePasswordDialog}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              修改密码
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              请输入当前密码和新密码来修改您的账户密码
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="oldPassword" className="text-gray-300">当前密码</Label>
              <Input
                id="oldPassword"
                type="password"
                value={passwordChangeData.oldPassword}
                onChange={(e) => setPasswordChangeData(prev => ({ ...prev, oldPassword: e.target.value }))}
                className="bg-black/20 border-white/10 text-white"
                placeholder="请输入当前密码"
                disabled={isChangingPassword}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-gray-300">新密码</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordChangeData.newPassword}
                onChange={(e) => setPasswordChangeData(prev => ({ ...prev, newPassword: e.target.value }))}
                className="bg-black/20 border-white/10 text-white"
                placeholder="请输入新密码（至少6位）"
                disabled={isChangingPassword}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">确认新密码</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordChangeData.confirmPassword}
                onChange={(e) => setPasswordChangeData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="bg-black/20 border-white/10 text-white"
                placeholder="请再次输入新密码"
                disabled={isChangingPassword}
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={handleClosePasswordDialog}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
              disabled={isChangingPassword}
            >
              <X className="h-4 w-4 mr-2" />
              取消
            </Button>
            <Button 
              onClick={handlePasswordSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isChangingPassword}
            >
              {isChangingPassword ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  修改中...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  确认修改
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserManagementPage
