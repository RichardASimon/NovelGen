import axios from 'axios'

// LLM API service - LLM API 服务
// Handles all AI model interactions - 处理所有 AI 模型交互

// 判断是否需要代理（特定 API 不允许浏览器直接调用）
function needsProxy(baseUrl) {
  const proxyRequiredApis = [
    'integrate.api.nvidia.com',
    'api.anthropic.com',
  ]
  return proxyRequiredApis.some(api => baseUrl.includes(api))
}

// 获取代理后的 API URL
function getApiUrl(baseUrl) {
  if (needsProxy(baseUrl)) {
    return '/api/chat/completions'
  }
  return `${baseUrl}/chat/completions`
}

/**
* Create chat completion request
* 创建聊天补全请求
*/
export async function chatCompletion(config, prompt, onStream = null) {
  const { baseUrl, apiKey, model, temperature, maxTokens, timeout } = config

  const requestBody = {
    model,
    messages: [{ role: 'user', content: prompt }],
    temperature,
    max_tokens: maxTokens,
    stream: !!onStream
  }

  if (onStream) {
    // Streaming response - 流式响应
    return streamCompletion(baseUrl, apiKey, requestBody, timeout, onStream)
  }

  const apiUrl = getApiUrl(baseUrl)

  // Non-streaming response - 非流式响应
  const response = await axios.post(
    apiUrl,
    requestBody,
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: timeout * 1000
    }
  )

  return response.data.choices[0].message.content
}

/**
* Stream completion with callback
* 流式补全并回调
*/
async function streamCompletion(baseUrl, apiKey, requestBody, timeout, onStream) {
  const apiUrl = getApiUrl(baseUrl)
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let fullContent = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value)
    const lines = chunk.split('\n').filter(line => line.trim() !== '')

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6)
        if (data === '[DONE]') continue
        
        try {
          const parsed = JSON.parse(data)
          const content = parsed.choices?.[0]?.delta?.content || ''
          if (content) {
            fullContent += content
            onStream(content, fullContent)
          }
        } catch (e) {
          // Skip invalid JSON
        }
      }
    }
  }

  return fullContent
}

/**
 * Clean AI response - remove markdown formatting
 * 清理 AI 响应 - 移除 markdown 格式
 */
export function cleanResponse(text) {
  if (!text) return ''
  
  // Remove markdown code blocks - 移除 markdown 代码块
  let cleaned = text.replace(/```[\s\S]*?```/g, '')
  cleaned = cleaned.replace(/`/g, '')
  
  // Trim whitespace - 去除空白
  cleaned = cleaned.trim()
  
  return cleaned
}
