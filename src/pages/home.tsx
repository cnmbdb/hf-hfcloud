import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Cloud, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3, 
  Lock,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      title: 'CDN 全球加速',
      description: '遍布全球的边缘节点，为您的内容提供极速分发服务，显著提升用户访问体验。'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-400" />,
      title: 'DDoS 安全防护',
      description: '企业级安全防护体系，实时监控和拦截恶意攻击，保障您的业务稳定运行。'
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-400" />,
      title: '智能 DNS 解析',
      description: '智能流量调度和负载均衡，根据用户地理位置自动选择最优节点。'
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-orange-400" />,
      title: '实时数据分析',
      description: '详细的访问统计和性能监控，帮助您深入了解用户行为和系统表现。'
    },
    {
      icon: <Lock className="h-8 w-8 text-red-400" />,
      title: 'SSL 证书管理',
      description: '一键申请和部署 SSL 证书，确保数据传输安全，提升网站信任度。'
    },
    {
      icon: <Cloud className="h-8 w-8 text-cyan-400" />,
      title: '边缘计算服务',
      description: '在边缘节点运行您的代码，降低延迟，提供更快的响应速度。'
    }
  ]

  const stats = [
    { label: '全球节点', value: '200+', unit: '个' },
    { label: '服务客户', value: '10K+', unit: '家' },
    { label: '数据传输', value: '50TB+', unit: '/天' },
    { label: '响应时间', value: '<50ms', unit: '平均' }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-red-400 via-orange-400 via-yellow-400 via-green-400 via-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                全球边缘加速
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 via-red-400 via-orange-400 via-yellow-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
                让您的应用飞起来
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              HFCloud 提供企业级边缘计算和 CDN 服务，通过全球分布式节点网络，
              为您的应用提供极速访问体验和全方位安全防护。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 hover:from-red-600 hover:via-orange-600 hover:via-yellow-600 hover:via-green-600 hover:via-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold"
              >
                免费试用 30 天
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-gray-400 text-white hover:bg-white/10 hover:border-gray-300 px-8 py-4 text-lg"
              >
                查看产品文档
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.label} {stat.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              强大的功能特性
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              从内容分发到安全防护，从性能优化到数据分析，HFCloud 为您提供全方位的边缘计算解决方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-black/40 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-black/60 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-purple-500/5 to-blue-500/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <Card className="bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl">
            <CardContent className="p-12 text-center">
              {/* Main Title with Rainbow Effect */}
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-400 via-orange-400 via-yellow-400 via-green-400 via-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  准备好体验极速云服务了吗？
                </span>
              </h2>
              
              {/* Enhanced Description */}
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                立即开始使用 HFCloud，享受 30 天免费试用，无需信用卡，随时可以取消。
                <br />
                <span className="text-lg text-gray-400 mt-2 block">
                  加入全球 10,000+ 企业的信赖选择，体验极速边缘计算服务
                </span>
              </p>
              
              {/* Enhanced Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 hover:from-red-600 hover:via-orange-600 hover:via-yellow-600 hover:via-green-600 hover:via-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white px-10 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  立即开始免费试用
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-transparent border-gray-400 text-white hover:bg-white/10 hover:border-gray-300 px-10 py-4 text-lg transform hover:scale-105 transition-all duration-300"
                >
                  联系销售团队
                </Button>
              </div>
              
              {/* Enhanced Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-white font-medium">30 天免费试用</span>
                </div>
                <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <CheckCircle className="h-6 w-6 text-blue-400" />
                  <span className="text-white font-medium">无需信用卡</span>
                </div>
                <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <CheckCircle className="h-6 w-6 text-purple-400" />
                  <span className="text-white font-medium">随时取消</span>
                </div>
              </div>
              
              {/* Additional Benefits */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4">
                  <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                  <div className="text-sm text-gray-400">服务可用性</div>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-gray-400">技术支持</div>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-white mb-1">200+</div>
                  <div className="text-sm text-gray-400">全球节点</div>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-white mb-1">10K+</div>
                  <div className="text-sm text-gray-400">企业客户</div>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-4">受到全球领先企业信赖</p>
                <div className="flex items-center justify-center space-x-8 opacity-60">
                  <div className="px-4 py-2 bg-white/5 rounded-lg text-gray-300 text-sm">科技公司</div>
                  <div className="px-4 py-2 bg-white/5 rounded-lg text-gray-300 text-sm">电商平台</div>
                  <div className="px-4 py-2 bg-white/5 rounded-lg text-gray-300 text-sm">游戏行业</div>
                  <div className="px-4 py-2 bg-white/5 rounded-lg text-gray-300 text-sm">金融服务</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default HomePage