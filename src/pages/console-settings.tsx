import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, ShoppingBag, Save, Bell } from 'lucide-react'
import { useCustomToast } from '@/components/ui/toast-manager'
import { useAuth } from '@/contexts/auth-context'
import { useSystemConfig } from '@/contexts/system-config-context'
import { isSuperAdmin } from '@/utils/permissions'

// 系统设置组件
const SystemSettings = ({ onSave }: { onSave: () => void }) => {
  const { config, updateConfig } = useSystemConfig()
  const [logoUrl, setLogoUrl] = useState(config.logoUrl)
  const [logoSize, setLogoSize] = useState(config.logoSize)
  const [faviconUrl, setFaviconUrl] = useState(config.faviconUrl)
  const [systemName, setSystemName] = useState(config.systemName)
  const [adminEmail, setAdminEmail] = useState(config.adminEmail)
  const [announcement, setAnnouncement] = useState(config.announcement)
  const [maintenanceMode, setMaintenanceMode] = useState(config.maintenanceMode)

  // 实时更新配置
  const handleLogoUrlChange = (value: string) => {
    setLogoUrl(value)
    updateConfig({ logoUrl: value })
  }

  const handleLogoSizeChange = (value: number) => {
    setLogoSize(value)
    updateConfig({ logoSize: value })
  }

  const handleFaviconUrlChange = (value: string) => {
    setFaviconUrl(value)
    updateConfig({ faviconUrl: value })
  }

  const handleSystemNameChange = (value: string) => {
    setSystemName(value)
    updateConfig({ systemName: value })
  }

  const handleAdminEmailChange = (value: string) => {
    setAdminEmail(value)
    updateConfig({ adminEmail: value })
  }

  const handleAnnouncementChange = (value: string) => {
    setAnnouncement(value)
    updateConfig({ announcement: value })
  }

  const handleMaintenanceModeChange = (value: boolean) => {
    setMaintenanceMode(value)
    updateConfig({ maintenanceMode: value })
  }
  return (
    <div className="space-y-6">
      <Card className="bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-white">系统基本设置</CardTitle>
          <CardDescription className="text-gray-400">
            配置系统的基本参数和全局设置
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">左上角Logo链接URL</label>
                  <input 
                    type="url" 
                    value={logoUrl}
                    onChange={(e) => handleLogoUrlChange(e.target.value)}
                    placeholder="https://example.com/logo.png" 
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400">设置网站左上角显示的Logo图片链接</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Logo显示大小 (像素)</label>
                  <input 
                    type="number" 
                    value={logoSize}
                    onChange={(e) => handleLogoSizeChange(Number(e.target.value))}
                    placeholder="32" 
                    min="16"
                    max="128"
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400">设置Logo显示的大小比例 (16-128像素)</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">浏览器标签页Logo链接URL</label>
                  <input 
                    type="url" 
                    value={faviconUrl}
                    onChange={(e) => handleFaviconUrlChange(e.target.value)}
                    placeholder="https://example.com/favicon.ico" 
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400">设置浏览器标签页显示的图标链接</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">系统名称（网页标题）</label>
                  <input 
                    type="text" 
                    value={systemName}
                    onChange={(e) => handleSystemNameChange(e.target.value)}
                    placeholder="HFCloud 系统" 
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400">设置网页标题和系统显示名称</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">管理员邮箱</label>
                  <input 
                    type="email" 
                    value={adminEmail}
                    onChange={(e) => handleAdminEmailChange(e.target.value)}
                    placeholder="admin@example.com" 
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">系统公告</label>
              <textarea 
                value={announcement}
                onChange={(e) => handleAnnouncementChange(e.target.value)}
                placeholder="输入系统公告内容..." 
                rows={3}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">系统维护模式</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="maintenance-mode" 
                  checked={maintenanceMode}
                  onChange={(e) => handleMaintenanceModeChange(e.target.checked)}
                  className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                />
                <label htmlFor="maintenance-mode" className="text-gray-300">启用维护模式</label>
              </div>
              <p className="text-xs text-gray-400">启用后，除管理员外的用户将无法访问系统</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-white">安全设置</CardTitle>
          <CardDescription className="text-gray-400">
            配置系统安全相关参数
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">密码策略</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="require-uppercase" 
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                    defaultChecked
                  />
                  <label htmlFor="require-uppercase" className="text-gray-300">要求包含大写字母</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="require-number" 
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                    defaultChecked
                  />
                  <label htmlFor="require-number" className="text-gray-300">要求包含数字</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="require-special" 
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                    defaultChecked
                  />
                  <label htmlFor="require-special" className="text-gray-300">要求包含特殊字符</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">最小密码长度</label>
              <input 
                type="number" 
                defaultValue="8" 
                min="6"
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">登录尝试限制</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="number" 
                  placeholder="5" 
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="enable-lockout" 
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                    defaultChecked
                  />
                  <label htmlFor="enable-lockout" className="text-gray-300">启用账户锁定</label>
                </div>
              </div>
              <p className="text-xs text-gray-400">超过尝试次数后，账户将被临时锁定</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 通知设置组件
const NotificationSettings = ({ onSave }: { onSave: () => void }) => {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [browserNotifications, setBrowserNotifications] = useState(true)
  const [notificationFrequency, setNotificationFrequency] = useState('immediate')
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [billingAlerts, setBillingAlerts] = useState(true)
  const [performanceAlerts, setPerformanceAlerts] = useState(false)
  
  return (
    <div className="space-y-6">
      <Card className="bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-white">通知渠道设置</CardTitle>
          <CardDescription className="text-gray-400">
            配置系统通知的接收方式
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">通知渠道</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="email-notifications" 
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="email-notifications" className="text-gray-300">电子邮件通知</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="sms-notifications" 
                    checked={smsNotifications}
                    onChange={(e) => setSmsNotifications(e.target.checked)}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="sms-notifications" className="text-gray-300">短信通知</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="browser-notifications" 
                    checked={browserNotifications}
                    onChange={(e) => setBrowserNotifications(e.target.checked)}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="browser-notifications" className="text-gray-300">浏览器推送通知</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">通知频率</label>
              <select 
                value={notificationFrequency}
                onChange={(e) => setNotificationFrequency(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="immediate">实时通知</option>
                <option value="hourly">每小时汇总</option>
                <option value="daily">每日汇总</option>
                <option value="weekly">每周汇总</option>
              </select>
              <p className="text-xs text-gray-400">设置接收通知的频率</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-white">通知类型设置</CardTitle>
          <CardDescription className="text-gray-400">
            选择您希望接收的通知类型
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">系统通知</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="maintenance-alerts" 
                    checked={maintenanceAlerts}
                    onChange={(e) => setMaintenanceAlerts(e.target.checked)}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="maintenance-alerts" className="text-gray-300">维护通知</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="security-alerts" 
                    checked={securityAlerts}
                    onChange={(e) => setSecurityAlerts(e.target.checked)}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="security-alerts" className="text-gray-300">安全警报</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">业务通知</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="billing-alerts" 
                    checked={billingAlerts}
                    onChange={(e) => setBillingAlerts(e.target.checked)}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="billing-alerts" className="text-gray-300">账单和付款通知</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="performance-alerts" 
                    checked={performanceAlerts}
                    onChange={(e) => setPerformanceAlerts(e.target.checked)}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="performance-alerts" className="text-gray-300">性能监控通知</label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 商品设置组件
const ProductSettings = ({ onSave }: { onSave: () => void }) => {
  const [currency, setCurrency] = useState('CNY')
  const [taxRate, setTaxRate] = useState('13')
  const [displayMode, setDisplayMode] = useState('grid')
  const [itemsPerPage, setItemsPerPage] = useState('20')
  const [stockThreshold, setStockThreshold] = useState('10')
  const [outOfStockOption, setOutOfStockOption] = useState('show')
  const [stockUpdateFrequency, setStockUpdateFrequency] = useState('realtime')
  return (
    <div className="space-y-6">
      <Card className="bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-white">商品基本设置</CardTitle>
          <CardDescription className="text-gray-400">
            配置商品展示和销售相关参数
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">默认货币</label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CNY">人民币 (CNY)</option>
                  <option value="USD">美元 (USD)</option>
                  <option value="EUR">欧元 (EUR)</option>
                  <option value="JPY">日元 (JPY)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">税率设置 (%)</label>
                <input 
                  type="number" 
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  placeholder="13" 
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">商品展示方式</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="display-grid" 
                    name="display-mode"
                    value="grid"
                    checked={displayMode === 'grid'}
                    onChange={() => setDisplayMode('grid')}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 focus:ring-blue-500"
                  />
                  <label htmlFor="display-grid" className="text-gray-300">网格视图</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="display-list" 
                    name="display-mode"
                    value="list"
                    checked={displayMode === 'list'}
                    onChange={() => setDisplayMode('list')}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 focus:ring-blue-500"
                  />
                  <label htmlFor="display-list" className="text-gray-300">列表视图</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="display-card" 
                    name="display-mode"
                    value="card"
                    checked={displayMode === 'card'}
                    onChange={() => setDisplayMode('card')}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 focus:ring-blue-500"
                  />
                  <label htmlFor="display-card" className="text-gray-300">卡片视图</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">每页显示商品数</label>
              <select 
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-white">库存管理设置</CardTitle>
          <CardDescription className="text-gray-400">
            配置商品库存相关参数
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">库存警告阈值</label>
              <input 
                type="number" 
                value={stockThreshold}
                onChange={(e) => setStockThreshold(e.target.value)}
                placeholder="10" 
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400">当商品库存低于此值时发出警告</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">缺货处理</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="out-of-stock-hide" 
                    name="out-of-stock"
                    value="hide"
                    checked={outOfStockOption === 'hide'}
                    onChange={() => setOutOfStockOption('hide')}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 focus:ring-blue-500"
                  />
                  <label htmlFor="out-of-stock-hide" className="text-gray-300">隐藏缺货商品</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="out-of-stock-show" 
                    name="out-of-stock"
                    value="show"
                    checked={outOfStockOption === 'show'}
                    onChange={() => setOutOfStockOption('show')}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 focus:ring-blue-500"
                  />
                  <label htmlFor="out-of-stock-show" className="text-gray-300">显示但标记为缺货</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="out-of-stock-backorder" 
                    name="out-of-stock"
                    value="backorder"
                    checked={outOfStockOption === 'backorder'}
                    onChange={() => setOutOfStockOption('backorder')}
                    className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 focus:ring-blue-500"
                  />
                  <label htmlFor="out-of-stock-backorder" className="text-gray-300">允许缺货下单</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">库存更新频率</label>
              <select 
                value={stockUpdateFrequency}
                onChange={(e) => setStockUpdateFrequency(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="realtime">实时更新</option>
                <option value="hourly">每小时更新</option>
                <option value="daily">每日更新</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 主设置页面
const ConsoleSettings = () => {
  const { showSuccess } = useCustomToast()
  const { user } = useAuth()
  const { saveConfig } = useSystemConfig()
  const [activeTab, setActiveTab] = useState("notification")
  const [isSaving, setIsSaving] = useState(false)
  const isSuperAdminUser = user ? isSuperAdmin(user.role) : false

  // 当用户角色变化时，如果不是超级管理员，默认显示通知设置
  useEffect(() => {
    if (!isSuperAdminUser && (activeTab === "system" || activeTab === "product")) {
      setActiveTab("notification")
    }
  }, [user, isSuperAdminUser, activeTab])

  const handleSave = async () => {
    setIsSaving(true)
    
    try {
      // 保存系统配置
      await saveConfig()
      
      // 根据当前激活的标签页显示不同的成功消息
      let tabName = "系统";
      if (activeTab === "product") tabName = "商品";
      if (activeTab === "notification") tabName = "通知";
      
      showSuccess(
        "设置已保存", 
        `${tabName}设置已成功保存并实时生效`
      )
    } catch (error) {
      showSuccess(
        "保存失败", 
        "设置保存时出现错误，请重试"
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">设置</h1>
          <p className="text-gray-400">管理系统和商品的各项设置</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSaving ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              保存中...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              保存设置
            </>
          )}
        </Button>
      </div>
      
      <Tabs 
        value={activeTab}
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="bg-black/40 backdrop-blur-md border border-white/10 mb-6">
          {isSuperAdminUser && (
            <TabsTrigger value="system" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              <Settings className="h-4 w-4 mr-2" />
              系统
            </TabsTrigger>
          )}
          {isSuperAdminUser && (
            <TabsTrigger value="product" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              <ShoppingBag className="h-4 w-4 mr-2" />
              商品
            </TabsTrigger>
          )}
          <TabsTrigger value="notification" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
            <Bell className="h-4 w-4 mr-2" />
            通知
          </TabsTrigger>
        </TabsList>
        
        {isSuperAdminUser && (
          <TabsContent value="system" className="mt-0">
            <SystemSettings onSave={handleSave} />
          </TabsContent>
        )}
        
        {isSuperAdminUser && (
          <TabsContent value="product" className="mt-0">
            <ProductSettings onSave={handleSave} />
          </TabsContent>
        )}
        
        <TabsContent value="notification" className="mt-0">
          <NotificationSettings onSave={handleSave} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ConsoleSettings