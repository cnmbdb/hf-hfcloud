import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Globe, 
  Shield, 
  Zap, 
  BarChart3, 
  Server, 
  Lock,
  ArrowRight,
  CheckCircle,
  Users,
  Building,
  Gamepad2,
  ShoppingCart,
  Video,
  Smartphone
} from 'lucide-react'

const SolutionsPage = () => {
  const solutions = [
    {
      id: 'web-acceleration',
      title: '网站加速',
      description: '为企业网站提供全球CDN加速，提升用户访问体验',
      icon: <Globe className="h-8 w-8 text-blue-400" />,
      features: ['全球节点覆盖', '智能路由优化', '缓存策略定制', '实时性能监控'],
      industries: ['电商平台', '企业官网', '媒体门户', '在线教育'],
      benefits: '访问速度提升80%，带宽成本降低60%'
    },
    {
      id: 'security-protection',
      title: '安全防护',
      description: '全方位的网络安全防护，保障业务稳定运行',
      icon: <Shield className="h-8 w-8 text-green-400" />,
      features: ['DDoS攻击防护', 'Web应用防火墙', 'CC攻击防护', '恶意爬虫拦截'],
      industries: ['金融服务', '政府机构', '医疗健康', '在线游戏'],
      benefits: '安全事件减少95%，业务可用性99.9%'
    },
    {
      id: 'edge-computing',
      title: '边缘计算',
      description: '将计算能力部署到网络边缘，实现低延迟处理',
      icon: <Zap className="h-8 w-8 text-purple-400" />,
      features: ['边缘函数部署', '实时数据处理', '智能缓存', 'API网关'],
      industries: ['物联网', '实时游戏', '视频直播', '智能制造'],
      benefits: '响应延迟降低70%，计算效率提升3倍'
    },
    {
      id: 'api-acceleration',
      title: 'API加速',
      description: '专为API服务优化的加速解决方案',
      icon: <Server className="h-8 w-8 text-orange-400" />,
      features: ['API缓存优化', '请求合并', '智能压缩', '协议优化'],
      industries: ['移动应用', 'SaaS服务', '微服务架构', '开放平台'],
      benefits: 'API响应速度提升5倍，成功率99.99%'
    },
    {
      id: 'video-acceleration',
      title: '视频加速',
      description: '专业的视频内容分发和加速服务',
      icon: <Video className="h-8 w-8 text-red-400" />,
      features: ['视频转码', '自适应码率', '防盗链保护', '播放统计'],
      industries: ['在线视频', '直播平台', '教育培训', '企业培训'],
      benefits: '播放成功率99.5%，缓冲时间减少80%'
    },
    {
      id: 'mobile-acceleration',
      title: '移动端加速',
      description: '针对移动设备优化的加速解决方案',
      icon: <Smartphone className="h-8 w-8 text-cyan-400" />,
      features: ['移动端优化', '弱网加速', '协议优化', '图片压缩'],
      industries: ['移动应用', '手机游戏', '移动电商', '社交平台'],
      benefits: '移动端加载速度提升60%，流量节省40%'
    }
  ]

  const industries = [
    {
      name: '电商零售',
      icon: <ShoppingCart className="h-6 w-6 text-yellow-400" />,
      description: '提升购物体验，降低跳出率',
      solutions: ['网站加速', 'API加速', '安全防护']
    },
    {
      name: '在线游戏',
      icon: <Gamepad2 className="h-6 w-6 text-pink-400" />,
      description: '减少延迟，提升游戏体验',
      solutions: ['边缘计算', '安全防护', 'API加速']
    },
    {
      name: '视频媒体',
      icon: <Video className="h-6 w-6 text-red-400" />,
      description: '流畅播放，全球分发',
      solutions: ['视频加速', '网站加速', '边缘计算']
    },
    {
      name: '企业服务',
      icon: <Building className="h-6 w-6 text-indigo-400" />,
      description: '稳定可靠，安全合规',
      solutions: ['安全防护', '网站加速', 'API加速']
    }
  ]

  return (
    <div className="pt-16 min-h-screen bg-[#0d1117]">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-purple-500/5 to-blue-500/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 via-orange-400 via-yellow-400 via-green-400 via-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                解决方案
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              基于全球边缘网络，为不同行业和场景提供专业的加速与安全解决方案
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>全球300+节点</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>99.9%可用性保障</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>24/7技术支持</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">核心解决方案</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              针对不同业务场景，提供定制化的边缘计算和网络加速解决方案
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <Card key={solution.id} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-blue-500/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300">
                      {solution.icon}
                    </div>
                    <div>
                      <CardTitle className="text-white text-xl">{solution.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-gray-400 text-base">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">核心功能</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {solution.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">适用行业</h4>
                    <div className="flex flex-wrap gap-2">
                      {solution.industries.map((industry, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/20">
                    <p className="text-sm text-green-400 font-medium">{solution.benefits}</p>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    了解详情 <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20 px-6 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">行业解决方案</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              深度理解行业需求，提供针对性的技术解决方案
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-blue-500/50 transition-all duration-300 text-center group">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300">
                      {industry.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{industry.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{industry.description}</p>
                  <div className="space-y-2">
                    {industry.solutions.map((solution, idx) => (
                      <span key={idx} className="inline-block px-3 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full mr-2 mb-2">
                        {solution}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <Card className="bg-transparent backdrop-blur-sm border border-gray-300/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                开始您的数字化加速之旅
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                立即体验HFCloud边缘计算平台，享受专业的技术支持和定制化解决方案
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  免费试用 <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  联系销售
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default SolutionsPage