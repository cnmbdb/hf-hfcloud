import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Check,
  X,
  Star,
  Zap,
  Shield,
  Globe,
  Server,
  ArrowRight,
  Users,
  Building,
  Crown,
  Calculator,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const plans = [
    {
      name: '免费版',
      description: '适合个人开发者和小型项目',
      icon: <Users className="h-6 w-6 text-green-400" />,
      price: {
        monthly: 0,
        yearly: 0
      },
      popular: false,
      features: [
        { name: 'CDN流量', value: '10GB/月', included: true },
        { name: '域名数量', value: '1个', included: true },
        { name: 'SSL证书', value: '免费证书', included: true },
        { name: '基础DDoS防护', value: '✓', included: true },
        { name: '技术支持', value: '社区支持', included: true },
        { name: '高级安全防护', value: '×', included: false },
        { name: '边缘计算', value: '×', included: false },
        { name: '专属客服', value: '×', included: false }
      ],
      cta: '免费开始',
      highlight: false
    },
    {
      name: '专业版',
      description: '适合中小企业和成长型业务',
      icon: <Building className="h-6 w-6 text-blue-400" />,
      price: {
        monthly: 299,
        yearly: 2390 // 20% discount
      },
      popular: true,
      features: [
        { name: 'CDN流量', value: '500GB/月', included: true },
        { name: '域名数量', value: '10个', included: true },
        { name: 'SSL证书', value: '通配符证书', included: true },
        { name: '高级DDoS防护', value: '✓', included: true },
        { name: 'Web应用防火墙', value: '✓', included: true },
        { name: '边缘计算', value: '100万次/月', included: true },
        { name: '实时监控', value: '✓', included: true },
        { name: '技术支持', value: '7×24小时', included: true }
      ],
      cta: '立即购买',
      highlight: true
    },
    {
      name: '企业版',
      description: '适合大型企业和高流量业务',
      icon: <Crown className="h-6 w-6 text-yellow-400" />,
      price: {
        monthly: 999,
        yearly: 9990 // 17% discount
      },
      popular: false,
      features: [
        { name: 'CDN流量', value: '5TB/月', included: true },
        { name: '域名数量', value: '无限制', included: true },
        { name: 'SSL证书', value: 'EV证书', included: true },
        { name: '企业级DDoS防护', value: '✓', included: true },
        { name: '高级WAF规则', value: '✓', included: true },
        { name: '边缘计算', value: '1000万次/月', included: true },
        { name: '私有节点', value: '✓', included: true },
        { name: '专属客服', value: '✓', included: true }
      ],
      cta: '联系销售',
      highlight: false
    }
  ]

  const addOns = [
    {
      name: '额外CDN流量',
      description: '超出套餐流量后的按量计费',
      price: '0.15元/GB',
      icon: <Globe className="h-5 w-5 text-blue-400" />
    },
    {
      name: '边缘计算请求',
      description: '超出套餐请求数后的按量计费',
      price: '0.0002元/次',
      icon: <Zap className="h-5 w-5 text-yellow-400" />
    },
    {
      name: '高级安全防护',
      description: '增强的安全防护和威胁检测',
      price: '199元/月',
      icon: <Shield className="h-5 w-5 text-green-400" />
    },
    {
      name: '专属节点',
      description: '独享的边缘节点资源',
      price: '1999元/月',
      icon: <Server className="h-5 w-5 text-purple-400" />
    }
  ]

  const faqs = [
    {
      question: '如何选择适合的套餐？',
      answer: '建议根据您的月流量需求和域名数量来选择。个人项目推荐免费版，中小企业推荐专业版，大型企业推荐企业版。您可以随时升级套餐。'
    },
    {
      question: '是否支持按量付费？',
      answer: '是的，我们提供灵活的按量付费选项。超出套餐限制的流量和请求会按照标准费率计费，让您只为实际使用的资源付费。'
    },
    {
      question: '可以随时取消订阅吗？',
      answer: '当然可以。您可以随时在控制台中取消订阅，取消后服务将在当前计费周期结束时停止，不会产生额外费用。'
    },
    {
      question: '是否提供免费试用？',
      answer: '新用户注册即可获得免费版服务，包含10GB流量和基础功能。专业版和企业版用户可申请14天免费试用。'
    },
    {
      question: '如何获得技术支持？',
      answer: '免费版用户可通过社区获得支持，专业版和企业版用户享有7×24小时技术支持，企业版还配备专属客服经理。'
    },
    {
      question: '支持哪些付款方式？',
      answer: '我们支持支付宝、微信支付、银行转账等多种付款方式。企业用户还可以申请月结或季结的付款方式。'
    }
  ]

  const getDiscountPercentage = (plan: typeof plans[0]) => {
    if (plan.price.monthly === 0) return 0
    return Math.round((1 - plan.price.yearly / (plan.price.monthly * 12)) * 100)
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
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
                灵活定价
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              从免费开始，随业务增长而扩展。透明的定价，无隐藏费用
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-lg ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
                按月付费
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-16 h-8 bg-gray-700 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className={`absolute top-1 left-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-8' : ''}`} />
              </button>
              <span className={`text-lg ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
                按年付费
              </span>
              {billingCycle === 'yearly' && (
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                  节省高达20%
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative bg-gray-900/50 backdrop-blur-sm border-gray-800 transition-all duration-300 ${
                  plan.highlight 
                    ? 'border-blue-500/50 scale-105 shadow-2xl shadow-blue-500/20' 
                    : 'hover:border-blue-500/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      最受欢迎
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                      {plan.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400 mb-6">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-white">
                        ¥{billingCycle === 'monthly' ? plan.price.monthly : Math.round(plan.price.yearly / 12)}
                      </span>
                      <span className="text-gray-400">/月</span>
                    </div>
                    {billingCycle === 'yearly' && plan.price.monthly > 0 && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-400 line-through">
                          ¥{plan.price.monthly * 12}/年
                        </span>
                        <span className="ml-2 text-sm text-green-400">
                          节省{getDiscountPercentage(plan)}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      plan.highlight
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300'
                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300'
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                    {plan.name !== '企业版' && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-500'}`}>
                            {feature.name}
                          </span>
                          <span className={`ml-2 text-sm font-medium ${
                            feature.included ? 'text-white' : 'text-gray-500'
                          }`}>
                            {feature.value}
                          </span>
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

      {/* Add-ons */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">增值服务</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              根据业务需求，灵活添加额外的服务和资源
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {addOns.map((addon, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-blue-500/50 transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                      {addon.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{addon.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{addon.description}</p>
                  <div className="text-xl font-bold text-blue-400">{addon.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                    <Calculator className="h-8 w-8 text-orange-400" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-white mb-2">定价计算器</CardTitle>
                <CardDescription className="text-gray-400">
                  根据您的实际需求，估算服务费用
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center">
                  <p className="text-gray-400 mb-6">
                    想要了解具体的费用估算？我们的销售团队将根据您的业务需求，
                    为您提供详细的定价方案和成本分析。
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    联系销售获取报价 <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">常见问题</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              关于定价和服务的常见问题解答
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <HelpCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-white font-medium">{faq.question}</span>
                    </div>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <div className="pl-9 text-gray-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  )}
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
                准备开始了吗？
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                立即注册HFCloud，享受免费额度，体验全球领先的边缘计算服务
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  免费开始 <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 transition-all duration-300">
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

export default PricingPage