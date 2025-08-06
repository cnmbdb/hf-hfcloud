// 腾讯云Pages构建配置
module.exports = {
  // 构建配置
  build: {
    command: 'npm run build',
    output: 'dist',
    environment: {
      NODE_VERSION: '18.x'
    }
  },
  
  // 路由配置
  routes: [
    {
      src: '/(.*)',
      dest: '/index.html'
    }
  ],
  
  // 环境变量
  env: {
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY
  },
  
  // 缓存配置
  headers: [
    {
      source: '/static/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    },
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        }
      ]
    }
  ]
}