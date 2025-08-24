import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import DocLayout from './components/DocLayout.vue'
import DocViewer from './components/DocViewer.vue'
import { getDocumentStructure } from './utils/fileReader.js'

// 动态生成路由配置
function generateRoutes() {
  const categories = getDocumentStructure()
  let defaultRedirect = '/docs/Vue 3 技术揭秘/1.开篇词：_Vue 3__Vue 2_.md'
  
  // 如果有文档，使用第一个分类的第一个文档作为默认重定向
  if (categories.length > 0 && categories[0].docs.length > 0) {
    const firstCategory = categories[0]
    const firstDoc = firstCategory.docs[0]
    defaultRedirect = `/docs/${encodeURIComponent(firstCategory.folder)}/${encodeURIComponent(firstDoc.filename)}`
  }
  
  return [
    {
      path: '/',
      redirect: defaultRedirect
    },
    {
      path: '/docs',
      component: DocLayout,
      children: [
        {
          path: ':category/:filename',
          component: DocViewer,
          props: true
        }
      ]
    }
  ]
}

// 创建路由实例
const routes = generateRoutes()
const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')