import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  Globe, 
  Shield, 
  TrendingUp, 
  Server,
  Activity,
  Plus,
  Lock,
  FileText
} from 'lucide-react'

const ConsoleDashboard = () => {
  const stats = [
    {
      title: '总流量',
      value: '2.4TB',
      change: '+12.5%',
      icon: <BarChart3 className="h-6 w-6 text-blue-400" />,
      trend: 'up'
    },
    {
      title: '请求数',
      value: '1.2M',
      change: '+8.2%',
      icon: <Activity className="h-6 w-6 text-green-400" />,
      trend: 'up'
    },
    {
      title: '活跃节点',
      value: '156',
      change: '+2',
      icon: <Server className="h-6 w-6 text-purple-400" />,
      trend: 'up'
    },
    {
      title: '安全拦截',
      value: '8.9K',
      change: '+15.3%',
      icon: <Shield className="h-6 w-6 text-red-400" />,
      trend: 'up'
    }
  ]

  const quickActions = [
    {
      title: '添加域名',
      description: '配置新的域名加速服务',
      icon: <Plus className="h-8 w-8 text-blue-400" />,
      action: '立即添加'
    },
    {
      title: '查看日志',
      description: '实时监控访问和错误日志',
      icon: <FileText className="h-8 w-8 text-green-400" />,
      action: '查看详情'
    },
    {
      title: '安全设置',
      description: '配置防护规则和安全策略',
      icon: <Lock className="h-8 w-8 text-orange-400" />,
      action: '管理设置'
    },
    {
      title: '性能分析',
      description: '深入了解网站性能指标',
      icon: <TrendingUp className="h-8 w-8 text-purple-400" />,
      action: '查看报告'
    }
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">概览仪表板</h1>
        <p className="text-gray-400">欢迎回到 HFCloud 控制台，这里是您的服务概览</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-black/40 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className={`text-sm flex items-center mt-1 ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-black/40 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
              流量趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>图表组件将在这里显示</p>
                <p className="text-sm">需要安装 recharts 依赖</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="h-5 w-5 mr-2 text-green-400" />
              请求分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>地理分布图表</p>
                <p className="text-sm">显示全球请求分布情况</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-white">快速操作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 hover:border-white/20 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 group-hover:from-gray-600 group-hover:to-gray-700 transition-all duration-300">
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-white">{action.title}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">{action.description}</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full bg-transparent border-gray-400 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-200"
                >
                  {action.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ConsoleDashboard