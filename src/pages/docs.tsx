import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search,
  BookOpen,
  Code,
  Zap,
  Shield,
  Globe,
  Server,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  FileText,
  Video,
  Download,
  Star,
  Clock,
  Users
} from 'lucide-react'

const DocsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const quickStart = [
    {
      title: '快速开始',
      description: '5分钟快速接入HFCloud服务',
      icon: <Zap className="h-6 w-6 text-purple-400" />,
      time: '5 分钟',
      steps: ['注册账号', '添加域名', '配置DNS', '开始加速']
    },
    {
      title: 'API集成',
      description: '通过API管理您的边缘服务',
      icon: <Code className="h-6 w-6 text-orange-400" />,
      time: '10 分钟',
      steps: ['获取API密钥', '安装SDK', '调用接口', '测试功能']
    },
    {
      title: '安全配置',
      description: '配置安全防护规则',
      icon: <Shield className="h-6 w-6 text-green-400" />,
      time: '15 分钟',
      steps: ['启用防护', '配置规则', '设置白名单', '监控告警']
    }
  ]

  const docCategories = [
    {
      title: '产品概述',
      icon: <BookOpen className="h-5 w-5 text-blue-400" />,
      docs: [
        { title: '什么是HFCloud', type: 'guide', popular: true },
        { title: '产品架构', type: 'guide' },
        { title: '核心优势', type: 'guide' },
        { title: '使用场景', type: 'guide' }
      ]
    },
    {
      title: '快速入门',
      icon: <Zap className="h-5 w-5 text-purple-400" />,
      docs: [
        { title: '注册与认证', type: 'tutorial', popular: true },
        { title: '添加第一个域名', type: 'tutorial', popular: true },
        { title: '配置DNS解析', type: 'tutorial' },
        { title: '验证加速效果', type: 'tutorial' }
      ]
    },
    {
      title: 'CDN加速',
      icon: <Globe className="h-5 w-5 text-cyan-400" />,
      docs: [
        { title: '缓存配置', type: 'guide', popular: true },
        { title: '回源设置', type: 'guide' },
        { title: '压缩优化', type: 'guide' },
        { title: '性能监控', type: 'guide' }
      ]
    },
    {
      title: '安全防护',
      icon: <Shield className="h-5 w-5 text-green-400" />,
      docs: [
        { title: 'DDoS防护', type: 'guide' },
        { title: 'Web应用防火墙', type: 'guide', popular: true },
        { title: 'CC攻击防护', type: 'guide' },
        { title: '访问控制', type: 'guide' }
      ]
    },
    {
      title: '边缘计算',
      icon: <Server className="h-5 w-5 text-red-400" />,
      docs: [
        { title: '边缘函数', type: 'guide' },
        { title: '实时计算', type: 'guide' },
        { title: '数据处理', type: 'guide' },
        { title: '性能优化', type: 'guide' }
      ]
    },
    {
      title: 'API参考',
      icon: <Code className="h-5 w-5 text-orange-400" />,
      docs: [
        { title: 'REST API', type: 'api', popular: true },
        { title: 'SDK文档', type: 'api' },
        { title: '错误码', type: 'api' },
        { title: '限流说明', type: 'api' }
      ]
    }
  ]

  const popularDocs = [
    {
      title: '快速开始指南',
      description: '从零开始使用HFCloud服务',
      category: '入门教程',
      readTime: '5 分钟',
      views: '12.5K',
      rating: 4.9
    },
    {
      title: 'CDN缓存最佳实践',
      description: '优化缓存策略，提升网站性能',
      category: 'CDN加速',
      readTime: '8 分钟',
      views: '8.2K',
      rating: 4.8
    },
    {
      title: 'API接口完整指南',
      description: '详细的API使用说明和示例',
      category: 'API参考',
      readTime: '15 分钟',
      views: '6.7K',
      rating: 4.7
    },
    {
      title: '安全防护配置',
      description: '全面的安全防护设置指南',
      category: '安全防护',
      readTime: '12 分钟',
      views: '5.3K',
      rating: 4.9
    }
  ]

  const resources = [
    {
      title: '视频教程',
      description: '观看详细的操作演示',
      icon: <Video className="h-6 w-6 text-red-400" />,
      count: '25+ 视频',
      link: '#'
    },
    {
      title: 'SDK下载',
      description: '多语言SDK和工具包',
      icon: <Download className="h-6 w-6 text-green-400" />,
      count: '8 种语言',
      link: '#'
    },
    {
      title: '示例代码',
      description: '完整的集成示例',
      icon: <Code className="h-6 w-6 text-yellow-400" />,
      count: '50+ 示例',
      link: '#'
    },
    {
      title: '技术博客',
      description: '最新技术分享和案例',
      icon: <FileText className="h-6 w-6 text-pink-400" />,
      count: '每周更新',
      link: '#'
    }
  ]

  const getDocTypeColor = (type: string) => {
    switch (type) {
      case 'tutorial':
        return 'text-green-400 bg-green-400/10'
      case 'guide':
        return 'text-blue-400 bg-blue-400/10'
      case 'api':
        return 'text-purple-400 bg-purple-400/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getDocTypeText = (type: string) => {
    switch (type) {
      case 'tutorial':
        return '教程'
      case 'guide':
        return '指南'
      case 'api':
        return 'API'
      default:
        return '文档'
    }
  }

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
                开发文档
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              完整的技术文档、API参考和最佳实践，助您快速上手HFCloud服务
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="搜索文档、API、教程..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-gray-900/50 backdrop-blur-sm border-gray-700 text-white placeholder-gray-400 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">快速开始</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              选择适合您的入门方式，快速体验HFCloud的强大功能
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {quickStart.map((item, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-blue-500/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <CardTitle className="text-white text-xl">{item.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{item.time}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-400">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {item.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-semibold">
                          {stepIndex + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    开始学习 <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Docs */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">热门文档</h2>
              <p className="text-gray-400">最受欢迎的文档和教程</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              查看全部 <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {popularDocs.map((doc, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">{doc.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs">
                        {doc.category}
                      </span>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{doc.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{doc.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400" />
                        <span>{doc.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">文档分类</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              按功能分类的详细文档，涵盖从基础概念到高级配置的所有内容
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {docCategories.map((category, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300">
                      {category.icon}
                    </div>
                    <CardTitle className="text-white text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.docs.map((doc, docIndex) => (
                      <div key={docIndex} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-300 group-hover:text-white transition-colors">
                            {doc.title}
                          </span>
                          {doc.popular && (
                            <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded">
                              热门
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs ${getDocTypeColor(doc.type)}`}>
                            {getDocTypeText(doc.type)}
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">开发资源</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              丰富的开发工具和资源，加速您的开发进程
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300">
                      {resource.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
                  <div className="text-blue-400 text-sm font-medium mb-4">{resource.count}</div>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white w-full shadow-lg hover:shadow-xl transition-all duration-300">
                    访问 <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
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
                需要更多帮助？
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                我们的技术团队随时为您提供专业支持，助您快速解决技术问题
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  联系技术支持 <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  加入开发者社区
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default DocsPage