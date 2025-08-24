<template>
  <div class="doc-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <button @click="toggleSidebar" class="toggle-btn">
          <span class="toggle-icon">{{ sidebarCollapsed ? '☰' : '✕' }}</span>
        </button>
        <h2 v-show="!sidebarCollapsed" class="sidebar-title">文档目录</h2>
      </div>
      
      <nav class="sidebar-nav" v-show="!sidebarCollapsed">
        <div 
          v-for="category in categories" 
          :key="category.name" 
          class="category-section"
        >
          <div 
            class="category-header" 
            @click="toggleCategory(category.name)"
            :class="{ 'active': expandedCategories.includes(category.name) }"
          >
            <span class="category-icon">{{ category.icon }}</span>
            <span class="category-name">{{ category.name }}</span>
            <span class="expand-icon">
              {{ expandedCategories.includes(category.name) ? '▼' : '▶' }}
            </span>
          </div>
          
          <div 
            v-show="expandedCategories.includes(category.name)" 
            class="category-content"
          >
            <router-link
              v-for="doc in category.docs"
              :key="doc.filename"
              :to="`/docs/${encodeURIComponent(category.folder)}/${encodeURIComponent(doc.filename)}`"
              class="doc-link"
              :class="{ 'active': isActiveDoc(category.folder, doc.filename) }"
            >
              <span class="doc-title">{{ doc.title }}</span>
            </router-link>
          </div>
        </div>
      </nav>
    </aside>

    <!-- 主内容区 -->
    <main class="content-area" :class="{ 'content-expanded': sidebarCollapsed }">
      <router-view />
    </main>
  </div>
</template>

<script>
import { getDocumentStructure } from '../utils/fileReader.js'

export default {
  name: 'DocLayout',
  data() {
    return {
      sidebarCollapsed: false,
      expandedCategories: [],
      categories: []
    }
  },
  async created() {
    // 自动从docs目录生成文档结构
    try {
      this.categories = getDocumentStructure()
      // 默认展开第一个分类
      if (this.categories.length > 0) {
        this.expandedCategories = [this.categories[0].name]
      }
    } catch (error) {
      console.error('获取文档结构失败:', error)
      // 如果自动生成失败，使用备用的静态配置
      this.categories = this.getStaticCategories()
      this.expandedCategories = [this.categories[0]?.name].filter(Boolean)
    }
    
    // 根据当前路由自动展开对应分类
    this.autoExpandCurrentCategory()
  },
  methods: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    toggleCategory(categoryName) {
      const index = this.expandedCategories.indexOf(categoryName)
      if (index > -1) {
        this.expandedCategories.splice(index, 1)
      } else {
        this.expandedCategories.push(categoryName)
      }
    },
    isActiveDoc(folder, filename) {
      return this.$route.params.category === folder && this.$route.params.filename === filename
    },
    autoExpandCurrentCategory() {
      if (this.$route.params.category) {
        const categoryName = this.categories.find(cat => cat.folder === this.$route.params.category)?.name
        if (categoryName && !this.expandedCategories.includes(categoryName)) {
          this.expandedCategories.push(categoryName)
        }
      }
    },
    getStaticCategories() {
      // 静态备用配置，防止自动生成失败
      return [
        {
          name: 'Vue 3 技术揭秘',
          icon: '📚',
          folder: 'Vue 3 技术揭秘',
          docs: [
            { filename: '2.渲染器：组件是如何被渲染成 DOM 的？.md', title: '渲染器：组件渲染成 DOM' }
          ]
        }
      ]
    }
  },
  watch: {
    '$route'(to) {
      // 路由变化时自动展开对应分类
      this.autoExpandCurrentCategory()
    }
  }
}
</script>

<style scoped>
.doc-layout {
  display: flex;
  height: 100vh;
  background: #f8f9fa;
}

/* 侧边栏样式 */
.sidebar {
  width: 320px;
  background: #ffffff;
  border-right: 1px solid #e1e8ed;
  overflow-y: auto;
  transition: width 0.3s ease;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.sidebar-collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #e1e8ed;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toggle-btn {
  background: #3498db;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  background: #2980b9;
}

.toggle-icon {
  font-size: 0.9rem;
  font-weight: bold;
}

.sidebar-title {
  font-size: 1.1rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
}

/* 导航菜单样式 */
.sidebar-nav {
  padding: 1rem 0;
}

.category-section {
  margin-bottom: 0.5rem;
}

.category-header {
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;
  border-left: 3px solid transparent;
}

.category-header:hover {
  background: #f8f9fa;
}

.category-header.active {
  background: #e3f2fd;
  border-left-color: #3498db;
}

.category-icon {
  font-size: 1.1rem;
  min-width: 20px;
}

.category-name {
  flex: 1;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.expand-icon {
  font-size: 0.8rem;
  color: #7f8c8d;
  transition: transform 0.2s ease;
}

.category-content {
  background: #fafbfc;
  border-left: 2px solid #e3f2fd;
  margin-left: 1rem;
}

.doc-link {
  display: block;
  padding: 0.6rem 1rem 0.6rem 2rem;
  text-decoration: none;
  color: #34495e;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  position: relative;
}

.doc-link:hover {
  background: #e3f2fd;
  color: #2980b9;
  border-left-color: #3498db;
}

.doc-link.active {
  background: #3498db;
  color: white;
  border-left-color: #2c3e50;
}

.doc-link.active::before {
  content: '▸';
  position: absolute;
  left: 0.5rem;
  color: white;
  font-size: 0.6rem;
}

.doc-title {
  font-size: 0.85rem;
  line-height: 1.4;
  display: block;
}

/* 主内容区样式 */
.content-area {
  flex: 1;
  overflow-y: auto;
  background: white;
  margin: 1rem;
  margin-left: 0;
}

</style>