import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Globe2, 
  ShieldCheck, 
  BarChart4, 
  Award, 
  Cpu, 
  ScrollText, 
  UserCog, 
  Settings,
  FolderOpen,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { useAuth } from '@/contexts/auth-context-supabase'
import { canAccessUserManagement } from '@/utils/permissions'

interface ConsoleLayoutProps {
  children: React.ReactNode
}

interface SidebarItem {
  name: string
  path?: string
  icon: React.ComponentType<{ className?: string }>
  children?: SidebarItem[]
}

const ConsoleLayout = ({ children }: ConsoleLayoutProps) => {
  const location = useLocation()
  const { user } = useAuth()
  const [expandedItems, setExpandedItems] = useState<string[]>(['项目管理'])

  const sidebarItems: SidebarItem[] = [
    { 
      name: '概览', 
      path: '/console', 
      icon: LayoutDashboard 
    },
    {
      name: '项目管理',
      icon: FolderOpen,
      children: [
        { 
          name: '域名管理', 
          path: '/console/domains', 
          icon: Globe2 
        },
        { 
          name: '安全防护', 
          path: '/console/security', 
          icon: ShieldCheck 
        },
        { 
          name: 'SSL 证书', 
          path: '/console/ssl', 
          icon: Award 
        },
        { 
          name: '边缘计算', 
          path: '/console/edge', 
          icon: Cpu 
        }
      ]
    },
    { 
      name: '数据分析', 
      path: '/console/analytics', 
      icon: BarChart4 
    },
    { 
      name: '日志中心', 
      path: '/console/logs', 
      icon: ScrollText 
    },
    ...(user && canAccessUserManagement(user.role) ? [{ 
      name: '用户管理', 
      path: '/console/user-management', 
      icon: UserCog 
    }] : []),
    { 
      name: '设置', 
      path: '/console/settings', 
      icon: Settings 
    }
  ]

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    const Icon = item.icon
    const isExpanded = expandedItems.includes(item.name)
    const hasChildren = item.children && item.children.length > 0
    const isActive = item.path && location.pathname === item.path
    const isChildActive = hasChildren && item.children.some(child => 
      child.path && location.pathname === child.path
    )

    if (hasChildren) {
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleExpanded(item.name)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
              isChildActive
                ? 'bg-blue-600/10 text-blue-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          {isExpanded && (
            <div className="ml-4 mt-1 space-y-1">
              {item.children.map(child => renderSidebarItem(child, level + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.path}
        to={item.path!}
        className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
          level > 0 ? 'ml-2 text-sm' : ''
        } ${
          isActive
            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <Icon className={`${level > 0 ? 'h-4 w-4' : 'h-5 w-5'}`} />
        <span>{item.name}</span>
      </Link>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-[#0d1117] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 backdrop-blur-md border-r border-white/10">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">控制台</h2>
          <nav className="space-y-2">
            {sidebarItems.map(item => renderSidebarItem(item))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

export default ConsoleLayout
