import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X, Cloud, User, Settings, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/auth-context'
import { useSystemConfig } from '@/contexts/system-config-context'
import { getRoleLabel, getRoleColor, getRoleBgColor } from '@/utils/permissions'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  const { config } = useSystemConfig()

  const publicNavItems = [
    { name: '产品', href: '/' },
    { name: '解决方案', href: '/solutions' },
    { name: '文档', href: '/docs' },
    { name: '定价', href: '/pricing' },
  ]

  const protectedNavItems = [
    { name: '控制台', href: '/console' },
  ]

  const navItems = isAuthenticated 
    ? [...publicNavItems, ...protectedNavItems]
    : publicNavItems

  const isActive = (href: string) => location.pathname === href

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {config.logoUrl && config.logoUrl !== '/logo.png' ? (
              <img 
                src={config.logoUrl} 
                alt="Logo" 
                className="object-contain"
                style={{ 
                  width: `${config.logoSize}px`, 
                  height: `${config.logoSize}px` 
                }}
              />
            ) : (
              <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500">
                <Cloud className="h-6 w-6 text-white" />
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="text-sm">
                  <span className="text-gray-300">欢迎, </span>
                  <span className="text-white font-medium">{user?.username}</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs border ${getRoleBgColor(user?.role || 'user')} ${getRoleColor(user?.role || 'user')}`}>
                    {user?.roleLabel}
                  </span>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 hover:from-red-600 hover:via-orange-600 hover:via-yellow-600 hover:via-green-600 hover:via-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white font-semibold">
                  免费试用
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-2 text-gray-300 hover:text-white">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-md border-gray-700">
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/10">
                      <Settings className="mr-2 h-4 w-4" />
                      设置
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-white/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      退出登录
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-300 hover:text-white"
                  onClick={handleLoginClick}
                >
                  登录
                </Button>
                <Link to="/register">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-transparent border-gray-400 text-white hover:bg-white/10 hover:border-white/50"
                  >
                    注册
                  </Button>
                </Link>
                <Button size="sm" className="bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 hover:from-red-600 hover:via-orange-600 hover:via-yellow-600 hover:via-green-600 hover:via-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white font-semibold">
                  免费试用
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/40 backdrop-blur-md rounded-lg mt-2 border border-white/10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/10">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 text-sm">
                      <div className="text-gray-300">
                        欢迎, <span className="text-white font-medium">{user?.username}</span>
                      </div>
                      <div className={`inline-block mt-1 px-2 py-1 rounded text-xs border ${getRoleBgColor(user?.role || 'user')} ${getRoleColor(user?.role || 'user')}`}>
                        {user?.roleLabel}
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-2 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 text-white font-semibold">
                      免费试用
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-gray-300 hover:text-white mt-2"
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      退出登录
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-gray-300 hover:text-white"
                      onClick={() => {
                        handleLoginClick()
                        setIsMenuOpen(false)
                      }}
                    >
                      登录
                    </Button>
                    <Link to="/register">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start bg-transparent border-gray-400 text-white hover:bg-white/10 hover:border-white/50 mt-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        注册
                      </Button>
                    </Link>
                    <Button size="sm" className="w-full mt-2 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 text-white font-semibold">
                      免费试用
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar