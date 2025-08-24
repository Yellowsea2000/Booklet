<template>
  <div class="doc-viewer">
    <div class="doc-header">
      <h2>{{ title }}</h2>
      <div class="doc-meta">
        <span class="category-tag">{{ category }}</span>
      </div>
    </div>
    
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else class="markdown-content" v-html="htmlContent"></div>
  </div>
</template>

<script>
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { readMarkdownFile } from '../utils/fileReader.js'

export default {
  name: 'DocViewer',
  props: ['category', 'filename'],
  data() {
    return {
      content: '',
      loading: true,
      error: null
    }
  },
  computed: {
    title() {
      return this.filename ? this.filename.replace('.md', '') : '文档'
    },
    htmlContent() {
      if (!this.content) return ''
      
      // 配置 marked
      marked.setOptions({
        highlight: function(code, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(code, { language: lang }).value
            } catch (err) {}
          }
          return hljs.highlightAuto(code).value
        },
        breaks: true,
        gfm: true
      })
      
      return marked(this.content)
    }
  },
  async mounted() {
    await this.loadDoc()
  },
  async beforeRouteUpdate(to, from, next) {
    this.loading = true
    this.error = null
    next()
    await this.loadDoc()
  },
  methods: {
    async loadDoc() {
      try {
        this.loading = true
        this.error = null
        
        this.content = await readMarkdownFile(this.category, this.filename)
      } catch (err) {
        this.error = `加载文档失败: ${err.message}`
        console.error('Error loading document:', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.doc-viewer {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.doc-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e1e8ed;
}

.doc-header h2 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
  line-height: 1.3;
}

.doc-meta {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.category-tag {
  background: #3498db;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.loading {
  text-align: center;
  padding: 4rem 2rem;
  color: #3498db;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e3f2fd;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  color: #e74c3c;
  background: #fdf2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  margin: 2rem 0;
}
</style>

<style>
/* Markdown 内容样式 */
.markdown-content {
  line-height: 1.8;
  color: #333;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-weight: 600;
}

.markdown-content h1 {
  font-size: 2rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
}

.markdown-content h2 {
  font-size: 1.5rem;
  border-bottom: 1px solid #bdc3c7;
  padding-bottom: 0.3rem;
}

.markdown-content h3 {
  font-size: 1.3rem;
}

.markdown-content h4 {
  font-size: 1.1rem;
}

.markdown-content p {
  margin-bottom: 1.2rem;
  text-align: justify;
}

.markdown-content ul,
.markdown-content ol {
  margin-bottom: 1.2rem;
  padding-left: 2rem;
}

.markdown-content li {
  margin-bottom: 0.5rem;
}

.markdown-content blockquote {
  border-left: 4px solid #3498db;
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  color: #555;
  font-style: italic;
  position: relative;
}

.markdown-content blockquote::before {
  content: '"';
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  font-size: 2rem;
  color: #3498db;
  opacity: 0.3;
}

.markdown-content code {
  background: #f1f2f6;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9em;
  color: #e74c3c;
}

.markdown-content pre {
  background: #f8f8f8;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  position: relative;
}

.markdown-content pre code {
  background: none;
  padding: 0;
  color: inherit;
  font-size: 0.9rem;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid #e1e8ed;
  padding: 0.75rem;
  text-align: left;
}

.markdown-content th {
  background: #3498db;
  color: white;
  font-weight: 600;
}

.markdown-content tr:nth-child(even) {
  background: #f8f9fa;
}

.markdown-content tr:hover {
  background: #e3f2fd;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.markdown-content a {
  color: #3498db;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-bottom-color 0.3s ease;
}

.markdown-content a:hover {
  border-bottom-color: #3498db;
}

.markdown-content strong {
  color: #2c3e50;
  font-weight: 600;
}

.markdown-content em {
  color: #7f8c8d;
  font-style: italic;
}

.markdown-content hr {
  border: none;
  height: 2px;
  background: linear-gradient(to right, #3498db, transparent);
  margin: 2rem 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .doc-viewer {
    padding: 1rem;
  }
  
  .doc-header h2 {
    font-size: 1.5rem;
  }
  
  .markdown-content h1 {
    font-size: 1.6rem;
  }
  
  .markdown-content h2 {
    font-size: 1.3rem;
  }
  
  .markdown-content pre {
    padding: 1rem;
    font-size: 0.8rem;
  }
  
  .markdown-content table {
    font-size: 0.9rem;
  }
}
</style>