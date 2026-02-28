import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

// CORS 中间件
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

// API 代理
const apiProxy = createProxyMiddleware({
  target: 'https://integrate.api.nvidia.com',
  changeOrigin: true,
  secure: true,
  pathRewrite: (path) => {
    return path.replace(/^\/api/, '/v1')
  },
  onProxyReq: (proxyReq, req) => {
    console.log(`[Proxy] ${req.method} ${req.originalUrl} -> ${proxyReq.path}`)
  },
  onProxyRes: (proxyRes) => {
    console.log(`[Proxy Response] ${proxyRes.statusCode}`)
  },
  onError: (err, req, res) => {
    console.error('[Proxy Error]', err.message)
    res.status(500).json({ error: 'Proxy error', message: err.message })
  }
})

// 代理 /api 路径
app.use('/api', apiProxy)

// 静态文件服务
app.use(express.static(path.join(__dirname, 'dist')))

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`)
  console.log(`API proxy: /api/* -> https://integrate.api.nvidia.com/v1/*`)
})
