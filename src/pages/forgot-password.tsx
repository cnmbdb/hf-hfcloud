import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Cloud, Mail, Loader2, Check, ArrowLeft } from 'lucide-react'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('请输入邮箱地址')
      return
    }

    if (!validateEmail(email)) {
      setError('请输入有效的邮箱地址')
      return
    }

    setIsLoading(true)

    // 模拟发送重置邮件API调用
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setEmailSent(true)
    } catch (err) {
      setError('发送失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      // 重置状态以显示重新发送成功
    } catch (err) {
      setError('重新发送失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-3xl" />

        <div className="max-w-md w-full relative z-10">
          <Card className="bg-black/40 backdrop-blur-md border-white/20 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">邮件已发送</h2>
              <p className="text-gray-400 mb-6">
                我们已向 <span className="text-white font-medium">{email}</span> 发送了密码重置链接。
                请检查您的邮箱（包括垃圾邮件文件夹）。
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={handleResendEmail}
                  variant="outline"
                  className="w-full bg-transparent border-gray-400 text-white hover:bg-white/10 hover:border-white/50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      重新发送中...
                    </>
                  ) : (
                    '重新发送邮件'
                  )}
                </Button>
                
                <Link to="/login">
                  <Button variant="ghost" className="w-full text-gray-400 hover:text-white">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    返回登录
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500">
              <Cloud className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">HFCloud</span>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">忘记密码</h2>
          <p className="text-gray-400">输入您的邮箱地址，我们将发送重置链接给您</p>
        </div>

        {/* Forgot Password Form */}
        <Card className="bg-black/40 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">重置密码</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">邮箱地址</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入您的邮箱地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-400">
                  我们将向此邮箱发送密码重置链接
                </p>
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 hover:from-red-600 hover:via-orange-600 hover:via-yellow-600 hover:via-green-600 hover:via-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white font-semibold py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    发送中...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    发送重置链接
                  </>
                )}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-2">
              <Link 
                to="/login" 
                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                返回登录
              </Link>
              <p className="text-sm text-gray-400">
                还没有账户？{' '}
                <Link 
                  to="/register" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  立即注册
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPasswordPage