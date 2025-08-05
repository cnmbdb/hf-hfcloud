import React, { createContext, useContext, useState, useCallback } from 'react'
import CustomToast, { CustomToastType, CustomToastProps } from './custom-toast'

interface ToastContextType {
  showToast: (type: CustomToastType, title: string, description?: string, duration?: number) => void
  showSuccess: (title: string, description?: string) => void
  showError: (title: string, description?: string) => void
  showWarning: (title: string, description?: string) => void
  showInfo: (title: string, description?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useCustomToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useCustomToast must be used within a CustomToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: React.ReactNode
}

export const CustomToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<CustomToastProps[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showToast = useCallback((
    type: CustomToastType, 
    title: string, 
    description?: string, 
    duration = 3000
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const newToast = {
      id,
      type,
      title,
      description,
      duration,
      onClose: removeToast
    }
    
    setToasts(prev => [...prev, newToast])
  }, [removeToast])

  const showSuccess = useCallback((title: string, description?: string) => {
    showToast('success', title, description)
  }, [showToast])

  const showError = useCallback((title: string, description?: string) => {
    showToast('error', title, description)
  }, [showToast])

  const showWarning = useCallback((title: string, description?: string) => {
    showToast('warning', title, description)
  }, [showToast])

  const showInfo = useCallback((title: string, description?: string) => {
    showToast('info', title, description)
  }, [showToast])

  const value = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
        {toasts.map(toast => (
          <CustomToast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}