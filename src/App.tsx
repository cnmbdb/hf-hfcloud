import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { CustomToastProvider } from '@/components/ui/toast-manager'
import { AuthProvider } from '@/contexts/auth-context'
import ProtectedRoute from '@/components/protected-route'
import Navbar from '@/components/navbar'
import HomePage from '@/pages/home'
import SolutionsPage from '@/pages/solutions'
import DocsPage from '@/pages/docs'
import PricingPage from '@/pages/pricing'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'
import ForgotPasswordPage from '@/pages/forgot-password'
import UserManagementPage from '@/pages/user-management'
import ConsoleLayout from '@/components/console-layout'
import ConsoleDashboard from '@/pages/console-dashboard'
import DomainManagePage from '@/pages/domain-manage'
import './globals.css'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="hfcloud-ui-theme">
      <CustomToastProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-[#0d1117] text-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/console" element={
                <ProtectedRoute>
                  <ConsoleLayout>
                    <ConsoleDashboard />
                  </ConsoleLayout>
                </ProtectedRoute>
              } />
              <Route path="/console/domains" element={
                <ProtectedRoute>
                  <ConsoleLayout>
                    <DomainManagePage />
                  </ConsoleLayout>
                </ProtectedRoute>
              } />
              <Route path="/console/user-management" element={
                <ProtectedRoute>
                  <ConsoleLayout>
                    <UserManagementPage />
                  </ConsoleLayout>
                </ProtectedRoute>
              } />
              <Route path="/console/security" element={
                <ProtectedRoute>
                  <ConsoleLayout>
                    <div className="flex items-center justify-center h-96">
                      <div className="text-center text-white">
                        <h1 className="text-2xl font-bold mb-4">安全防护</h1>
                        <p className="text-gray-400">安全防护功能正在开发中...</p>
                      </div>
                    </div>
                  </ConsoleLayout>
                </ProtectedRoute>
              } />
              <Route path="/console/analytics" element={
                <ProtectedRoute>
                  <ConsoleLayout>
                    <div className="flex items-center justify-center h-96">
                      <div className="text-center text-white">
                        <h1 className="text-2xl font-bold mb-4">数据分析</h1>
                        <p className="text-gray-400">数据分析功能正在开发中...</p>
                      </div>
                    </div>
                  </ConsoleLayout>
                </ProtectedRoute>
              } />
              <Route path="/console/ssl" element={
                <ProtectedRoute>
                  <ConsoleLayout>
                    <div className="flex items-center justify-center h-96">
                      <div className="text-center text-white">
                        <h1 className="text-2xl font-bold mb-4">SSL 证书</h1>
                        <p className="text-gray-400">SSL证书管理功能正在开发中...</p>
                      </div>
                    </div>
                  </ConsoleLayout>
                </ProtectedRoute>
              } />
              <Route path="/console/edge" element={
                <ProtectedRoute>
                  <ConsoleLayout>
                    <div className="flex items-center justify-center h-96">
                      <div className="text-center text-white">
                        <h1 className="text-2xl font-bold mb-4">边缘计算</h1>
                        <p className="text-gray-400">边缘计算功能正在开发中...</p>
                      </div>
                    </div>
                  </ConsoleLayout>
                </ProtectedRoute>
              } />
              <Route path="/console/logs" element={
                <ProtectedRoute>
                  <ConsoleLayout>
                    <div className="flex items-center justify-center h-96">
                      <div className="text-center text-white">
                        <h1 className="text-2xl font-bold mb-4">日志中心</h1>
                        <p className="text-gray-400">日志中心功能正在开发中...</p>
                      </div>
                    </div>
                  </ConsoleLayout>
                </ProtectedRoute>
              } />
              <Route path="/console/settings" element={
                <ProtectedRoute>
                  <ConsoleLayout>
                    <div className="flex items-center justify-center h-96">
                      <div className="text-center text-white">
                        <h1 className="text-2xl font-bold mb-4">设置</h1>
                        <p className="text-gray-400">系统设置功能正在开发中...</p>
                      </div>
                    </div>
                  </ConsoleLayout>
                </ProtectedRoute>
              } />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </CustomToastProvider>
  </ThemeProvider>
  )
}

export default App