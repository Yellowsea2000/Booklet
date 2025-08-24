import { getDocumentStructure } from './docs-structure.js'

// 读取markdown文件内容
export async function readMarkdownFile(category, filename) {
  return new Promise(async (resolve, reject) => {
    try {
      // 在浏览器环境中，通过fetch从public目录读取文件
      const response = await fetch(`/docs/${encodeURIComponent(category)}/${encodeURIComponent(filename)}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const content = await response.text()
      resolve(content)
    } catch (error) {
      reject(new Error(`文档不存在: ${category}/${filename}`))
    }
  })
}

// 获取所有文档分类和文件列表 - 使用预生成的结构
export { getDocumentStructure }

