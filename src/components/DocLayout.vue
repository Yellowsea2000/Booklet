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
export default {
  name: 'DocLayout',
  data() {
    return {
      sidebarCollapsed: false,
      expandedCategories: ['Vue 3 技术揭秘'],
      categories: [
        {
          name: 'Vue 3 技术揭秘',
          icon: '📚',
          folder: 'Vue 3 技术揭秘',
          docs: [
            { filename: '1.开篇词：_Vue 3__/Vue 2_.md', title: '开篇词：Vue 3 vs Vue 2' },
            { filename: '2.渲染器：组件是如何被渲染成 DOM 的？.md', title: '渲染器：组件渲染成 DOM' },
            { filename: '3.渲染器：数据访问是如何被代理的？.md', title: '渲染器：数据访问代理' },
            { filename: '4.渲染器：组件是如何完成更新的？.md', title: '渲染器：组件更新机制' },
            { filename: '5.渲染器：数组子节点的 diff 算法.md', title: '渲染器：diff 算法' },
            { filename: '6.响应式原理：基于 Proxy 的响应式是什么样的？.md', title: '响应式：Proxy 原理' },
            { filename: '7.响应式原理：副作用函数探秘.md', title: '响应式：副作用函数' },
            { filename: '8.响应式原理：Vue 3 的 nextTick ？.md', title: '响应式：nextTick 机制' },
            { filename: '9.响应式原理：watch 函数的实现原理.md', title: '响应式：watch 实现' },
            { filename: '10.响应式原理：computed 函数和普通函数有什么不同？.md', title: '响应式：computed 原理' },
            { filename: '11.响应式原理：依赖注入实现跨级组件数据共享.md', title: '响应式：依赖注入' },
            { filename: '12.编译器：模板是如何被编译成 AST 的？.md', title: '编译器：模板到 AST' },
            { filename: '13.编译器：AST 是如何被转换成 JS AST 的？.md', title: '编译器：AST 转换' },
            { filename: '14.编译器：JS AST 是如何生成渲染函数的？.md', title: '编译器：渲染函数生成' },
            { filename: '15.编译器：编译过程中的优化细节.md', title: '编译器：优化细节' },
            { filename: '16.内置组件：Transition 是如何实现的？.md', title: '内置组件：Transition' },
            { filename: '17.内置组件：KeepAlive 保活的原理.md', title: '内置组件：KeepAlive' },
            { filename: '18.内置组件：Teleport 是如何实现选择性挂载的？.md', title: '内置组件：Teleport' },
            { filename: '19.内置组件：Suspense 原理与异步.md', title: '内置组件：Suspense' },
            { filename: '20.特殊元素&指令：双向绑定是如何实现的？.md', title: '特殊元素：双向绑定' },
            { filename: '21.特殊元素&指令：slot 插槽元素是如何实现的？.md', title: '特殊元素：slot 插槽' },
            { filename: '22.结语：再回首，纵观 Vue 3 实现.md', title: '结语：纵观 Vue 3' }
          ]
        },
        {
          name: 'Vue3 企业级项目实战',
          icon: '🚀',
          folder: 'Vue3 企业级项目实战',
          docs: [
            { filename: '1.开篇词：通关 Vue3 企业级项目开发，升职加薪快人一步.md', title: '开篇词：企业级项目开发' },
            { filename: '2.项目须知与课程约定.md', title: '项目须知与课程约定' },
            { filename: '3. 2022年9月小册全新优化升级.md', title: '2022年9月优化升级' },
            { filename: '4.大势所趋："前后端分离"开发模式.md', title: '前后端分离开发模式' },
            { filename: '5.Vue3 简介及开发环境搭建.md', title: 'Vue3 简介与环境搭建' },
            { filename: '6.Vue3 组合 API 入口 Setup 浅析.md', title: 'Vue3 组合 API Setup' },
            { filename: '7.Vue3 之响应式系统 API.md', title: 'Vue3 响应式系统 API' },
            { filename: '8.Vue3 之生命周期钩子函数、提供注入.md', title: 'Vue3 生命周期与依赖注入' },
            { filename: '9.Vue3 性能和业务层面上的提升.md', title: 'Vue3 性能与业务提升' },
            { filename: '10.Vite2 构建项目及原理分析.md', title: 'Vite2 项目构建' },
            { filename: '11.Vue-Router4 新旧路由方法对比.md', title: 'Vue-Router4 路由对比' },
            { filename: '12.Vue3 实战项目启动篇.md', title: 'Vue3 实战项目启动' },
            { filename: '13.技术选型之 Spring Boot.md', title: '技术选型：Spring Boot' },
            { filename: '14.基础运行环境和开发工具准备.md', title: '环境与工具准备' },
            { filename: '15.Spring Boot 项目搭建及快速上手.md', title: 'Spring Boot 项目搭建' },
            { filename: '16.Spring Boot 实践之 Web 功能开发.md', title: 'Spring Boot Web 开发' },
            { filename: '17.Spring Boot 实践之文件上传处理.md', title: 'Spring Boot 文件上传' },
            { filename: '18.Spring Boot 实践之整合 MyBatis 操作数据库.md', title: 'Spring Boot MyBatis 整合' },
            { filename: '19.Spring Boot 实践之整合 Lombok.md', title: 'Spring Boot Lombok 整合' },
            { filename: '20.Spring Boot 实践之整合 Swagger 生成接口文档.md', title: 'Spring Boot Swagger 整合' },
            { filename: '21.后端 API 项目启动和运行注意事项.md', title: '后端 API 项目启动' },
            { filename: '22.接口参数处理和统一响应结果处理.md', title: '接口参数与响应处理' },
            { filename: '23.API 接口开发实战之用户登录接口开发.md', title: 'API 开发：用户登录' },
            { filename: '24.API 接口开发实战之用户身份认证详解.md', title: 'API 开发：身份认证' },
            { filename: '25.API 接口开发实战之轮播图管理模块接口开发.md', title: 'API 开发：轮播图管理' },
            { filename: '26.API 接口开发实战之商品分类管理模块接口开发.md', title: 'API 开发：商品分类管理' },
            { filename: '27.API 接口开发实战之商品管理模块接口开发.md', title: 'API 开发：商品管理' },
            { filename: '28.API 接口开发实战之商品配置管理模块接口开发.md', title: 'API 开发：商品配置管理' },
            { filename: '29.API 接口开发实战之订单管理模块接口开发.md', title: 'API 开发：订单管理' },
            { filename: '30.成为一名有独立开发能力的前端工程师.md', title: '成为独立前端工程师' },
            { filename: '31.Vite 2 + Vue 3 + Element-Plus 搭建管理后台项目.md', title: '搭建管理后台项目' },
            { filename: '32.Vue3 实战之管理后台左右栏目布局（Menu 菜单组件）.md', title: 'Vue3 实战：后台布局' },
            { filename: '33.Vue3 实战之登录鉴权（Form 表单组件）.md', title: 'Vue3 实战：登录鉴权' },
            { filename: '34.Vue3 实战之首页大盘数据 （Echarts 5）.md', title: 'Vue3 实战：首页数据大盘' },
            { filename: '35.Vue3 实战之首页配置.md', title: 'Vue3 实战：首页配置' },
            { filename: '36.Vue3 实战之分类管理（多级共用 Table）.md', title: 'Vue3 实战：分类管理' },
            { filename: '37.Vue3 实战之商品管理（wangEditor 富文本插件、Cascader 组件分类三级联动）.md', title: 'Vue3 实战：商品管理' },
            { filename: '38.Vue3 实战之订单管理（操作多级判断）.md', title: 'Vue3 实战：订单管理' },
            { filename: '39.Vue3 实战之会员管理、账户修改.md', title: 'Vue3 实战：会员管理' },
            { filename: '40.pm2 实现一键部署云端服务器.md', title: 'pm2 云端部署' },
            { filename: '41.常见问题汇总讲解.md', title: '常见问题汇总' }
          ]
        },
        {
          name: '玩转 React Hooks',
          icon: '⚛️',
          folder: '玩转 React Hooks',
          docs: [
            { filename: '1.预习篇｜React 组件的通信和强化方式.md', title: '预习篇：React 组件通信' },
            { filename: '2.基础篇｜10 种 React Hooks API 的介绍和使用（v16 篇）.md', title: '基础篇：10 种 Hooks API (v16)' },
            { filename: '3.基础篇｜5 种 React Hooks API 的介绍和使用（v18 篇）.md', title: '基础篇：5 种 Hooks API (v18)' },
            { filename: '4.基础篇｜自定义 Hooks 开发：响应式的 useState.md', title: '基础篇：自定义 Hooks' },
            { filename: '5.基础篇｜自定义 Hooks 之 Jest（一）：如何测试自定义 Hooks？.md', title: '基础篇：测试自定义 Hooks' },
            { filename: '9.源码前置篇｜搞懂 Fiber 和并发.md', title: '源码篇：Fiber 与并发' },
            { filename: '10.源码篇｜以 useState 的视角来看 Hooks 的运行机制.md', title: '源码篇：useState 运行机制' },
            { filename: '16.实践篇｜实现简易版的 react-redux.md', title: '实践篇：实现 react-redux' }
          ]
        }
      ]
    }
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
    }
  },
  mounted() {
    // 根据路由自动展开对应分类
    if (this.$route.params.category) {
      const categoryName = this.categories.find(cat => cat.folder === this.$route.params.category)?.name
      if (categoryName && !this.expandedCategories.includes(categoryName)) {
        this.expandedCategories.push(categoryName)
      }
    }
  },
  watch: {
    '$route'(to) {
      // 路由变化时自动展开对应分类
      if (to.params.category) {
        const categoryName = this.categories.find(cat => cat.folder === to.params.category)?.name
        if (categoryName && !this.expandedCategories.includes(categoryName)) {
          this.expandedCategories.push(categoryName)
        }
      }
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