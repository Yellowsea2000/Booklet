import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

// 扫描docs目录获取所有文件
function scanDocsDirectory(docsPath) {
  const categories = []
  
  try {
    const categoryFolders = readdirSync(docsPath)
    
    for (const folder of categoryFolders) {
      const folderPath = join(docsPath, folder)
      
      if (statSync(folderPath).isDirectory()) {
        const docs = []
        const files = readdirSync(folderPath)
        
        for (const file of files) {
          if (extname(file) === '.md') {
            const filePath = join(folderPath, file)
            const title = extractTitleFromMarkdown(filePath) || file.replace('.md', '')
            
            docs.push({
              filename: file,
              title: title,
              path: `docs/${folder}/${file}`
            })
          }
        }
        
        // 按文件名排序
        docs.sort((a, b) => a.filename.localeCompare(b.filename))
        
        categories.push({
          name: folder,
          folder: folder,
          icon: getCategoryIcon(folder),
          docs: docs
        })
      }
    }
    
    return categories
  } catch (error) {
    console.error('扫描docs目录失败:', error)
    return []
  }
}

// 从markdown文件中提取标题
function extractTitleFromMarkdown(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const lines = content.split('\n')
    
    // 查找第一个一级标题
    for (const line of lines) {
      const trimmedLine = line.trim()
      if (trimmedLine.startsWith('# ')) {
        return trimmedLine.substring(2).trim()
      }
    }
    
    return null
  } catch (error) {
    console.error('读取文件失败:', filePath, error)
    return null
  }
}

// 根据分类名称获取图标
function getCategoryIcon(categoryName) {
  const iconMap = {
    'Vue 3 技术揭秘': '📚',
    'Vue3 企业级项目实战': '🚀', 
    '玩转 React Hooks': '⚛️'
  }
  
  return iconMap[categoryName] || '📄'
}

// 生成文档结构
function generateDocsStructure() {
  const docsPath = join(projectRoot, 'docs')
  const structure = scanDocsDirectory(docsPath)
  
  // 生成TypeScript/JavaScript文件
  const content = `// 自动生成的文档结构，请勿手动编辑
export const docsStructure = ${JSON.stringify(structure, null, 2)}

export function getDocumentStructure() {
  return docsStructure
}
`

  const outputPath = join(projectRoot, 'src/utils/docs-structure.js')
  writeFileSync(outputPath, content, 'utf-8')
  
  console.log('文档结构已生成:', outputPath)
  console.log('找到', structure.length, '个分类')
  structure.forEach(cat => {
    console.log(`- ${cat.name}: ${cat.docs.length} 个文档`)
  })
}

// 执行生成
generateDocsStructure()