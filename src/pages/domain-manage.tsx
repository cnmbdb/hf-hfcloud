import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Plus, 
  Globe, 
  Shield, 
  Zap, 
  Settings, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const DomainManagePage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const domains = [
    {
      id: 1,
      domain: 'example.com',
      status: 'active',
      traffic: '2.4TB',
      requests: '1.2M',
      ssl: true,
      cdn: true,
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      domain: 'api.example.com',
      status: 'active',
      traffic: '856GB',
      requests: '890K',
      ssl: true,
      cdn: true,
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      domain: 'staging.example.com',
      status: 'pending',
      traffic: '45GB',
      requests: '23K',
      ssl: false,
      cdn: false,
      lastUpdated: '2024-01-13'
    },
    {
      id: 4,
      domain: 'blog.example.com',
      status: 'inactive',
      traffic: '120GB',
      requests: '67K',
      ssl: true,
      cdn: false,
      lastUpdated: '2024-01-12'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          <CheckCircle className="h-3 w-3 mr-1" />
          活跃
        </Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
          <Clock className="h-3 w-3 mr-1" />
          待配置
        </Badge>
      case 'inactive':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
          <AlertCircle className="h-3 w-3 mr-1" />
          未激活
        </Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredDomains = domains.filter(domain =>
    domain.domain.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">域名管理</h1>
          <p className="text-gray-400">管理您的域名配置和加速服务</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 mt-4 md:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          添加域名
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-black/40 backdrop-blur-md border-white/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索域名..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/20 border-white/10 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-white/5">
                全部状态
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-white/5">
                筛选
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Domains Table */}
      <Card className="bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-white">域名列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">域名</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">状态</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">流量</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">请求数</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">服务</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">更新时间</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredDomains.map((domain) => (
                  <tr key={domain.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900">
                          <Globe className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{domain.domain}</div>
                          <div className="text-gray-400 text-sm">主域名</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(domain.status)}
                    </td>
                    <td className="py-4 px-4 text-white">{domain.traffic}</td>
                    <td className="py-4 px-4 text-white">{domain.requests}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        {domain.ssl && (
                          <Badge variant="outline" className="border-green-500/30 text-green-400">
                            <Shield className="h-3 w-3 mr-1" />
                            SSL
                          </Badge>
                        )}
                        {domain.cdn && (
                          <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                            <Zap className="h-3 w-3 mr-1" />
                            CDN
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{domain.lastUpdated}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="p-2 hover:bg-white/10">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-2 hover:bg-white/10">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="p-2 hover:bg-white/10">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-md border-gray-700">
                            <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/10">
                              <Settings className="mr-2 h-4 w-4" />
                              配置
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/10">
                              <Eye className="mr-2 h-4 w-4" />
                              统计
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                              <Trash2 className="mr-2 h-4 w-4" />
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredDomains.length === 0 && (
        <Card className="bg-black/40 backdrop-blur-md border-white/10">
          <CardContent className="p-12 text-center">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">没有找到域名</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm ? '没有匹配的域名，请尝试其他搜索条件' : '您还没有添加任何域名'}
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              添加第一个域名
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default DomainManagePage