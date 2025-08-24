<template>
  <div class="home">
    <h2>文档目录</h2>
    <div class="categories">
      <div v-for="category in categories" :key="category.name" class="category">
        <div class="category-header">
          <h3>{{ category.name }}</h3>
          <p class="category-description">{{ category.description }}</p>
        </div>
        <ul class="doc-list">
          <li v-for="doc in category.docs" :key="doc.filename">
            <router-link 
              :to="`/doc/${encodeURIComponent(doc.category)}/${encodeURIComponent(doc.filename)}`"
              class="doc-link"
            >
              <span class="doc-title">{{ doc.title }}</span>
              <span class="doc-category">{{ doc.category }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      categories: [
        {
          name: '📚 Vue 3 基础入门',
          description: '从零开始学习 Vue 3 的核心概念和基础知识',
          docs: [
            { filename: '5.Vue3 简介及开发环境搭建.md', title: 'Vue3 简介及开发环境搭建', category: 'Vue3 企业级项目实战' },
            { filename: '6.Vue3 组合 API 入口 Setup 浅析.md', title: 'Vue3 组合 API 入口 Setup 浅析', category: 'Vue3 企业级项目实战' },
            { filename: '7.Vue3 之响应式系统 API.md', title: 'Vue3 之响应式系统 API', category: 'Vue3 企业级项目实战' },
            { filename: '8.Vue3 之生命周期钩子函数、提供注入.md', title: 'Vue3 之生命周期钩子函数、提供注入', category: 'Vue3 企业级项目实战' },
            { filename: '9.Vue3 性能和业务层面上的提升.md', title: 'Vue3 性能和业务层面上的提升', category: 'Vue3 企业级项目实战' }
          ]
        },
        {
          name: '⚡ 响应式系统深入',
          description: '深入理解 Vue 3 响应式系统的工作原理',
          docs: [
            { filename: '6.响应式原理：基于 Proxy 的响应式是什么样的？.md', title: '基于 Proxy 的响应式原理', category: 'Vue 3 技术揭秘' },
            { filename: '7.响应式原理：副作用函数探秘.md', title: '副作用函数探秘', category: 'Vue 3 技术揭秘' },
            { filename: '8.响应式原理：Vue 3 的 nextTick ？.md', title: 'Vue 3 的 nextTick 机制', category: 'Vue 3 技术揭秘' },
            { filename: '9.响应式原理：watch 函数的实现原理.md', title: 'watch 函数的实现原理', category: 'Vue 3 技术揭秘' },
            { filename: '10.响应式原理：computed 函数和普通函数有什么不同？.md', title: 'computed 函数和普通函数的区别', category: 'Vue 3 技术揭秘' },
            { filename: '11.响应式原理：依赖注入实现跨级组件数据共享.md', title: '依赖注入实现跨级组件数据共享', category: 'Vue 3 技术揭秘' }
          ]
        },
        {
          name: '🎨 渲染器核心',
          description: '了解 Vue 3 渲染器如何将组件转换为 DOM',
          docs: [
            { filename: '2.渲染器：组件是如何被渲染成 DOM 的？.md', title: '组件如何被渲染成 DOM', category: 'Vue 3 技术揭秘' },
            { filename: '3.渲染器：数据访问是如何被代理的？.md', title: '数据访问的代理机制', category: 'Vue 3 技术揭秘' },
            { filename: '4.渲染器：组件是如何完成更新的？.md', title: '组件更新机制', category: 'Vue 3 技术揭秘' },
            { filename: '5.渲染器：数组子节点的 diff 算法.md', title: '数组子节点的 diff 算法', category: 'Vue 3 技术揭秘' }
          ]
        },
        {
          name: '🔧 编译器原理',
          description: '深入了解 Vue 3 模板编译的完整过程',
          docs: [
            { filename: '12.编译器：模板是如何被编译成 AST 的？.md', title: '模板编译成 AST', category: 'Vue 3 技术揭秘' },
            { filename: '13.编译器：AST 是如何被转换成 JS AST 的？.md', title: 'AST 转换成 JS AST', category: 'Vue 3 技术揭秘' },
            { filename: '14.编译器：JS AST 是如何生成渲染函数的？.md', title: 'JS AST 生成渲染函数', category: 'Vue 3 技术揭秘' },
            { filename: '15.编译器：编译过程中的优化细节.md', title: '编译过程中的优化细节', category: 'Vue 3 技术揭秘' }
          ]
        },
        {
          name: '🧩 内置组件详解',
          description: '掌握 Vue 3 内置组件的实现原理和使用方法',
          docs: [
            { filename: '16.内置组件：Transition 是如何实现的？.md', title: 'Transition 组件实现原理', category: 'Vue 3 技术揭秘' },
            { filename: '17.内置组件：KeepAlive 保活的原理.md', title: 'KeepAlive 保活原理', category: 'Vue 3 技术揭秘' },
            { filename: '18.内置组件：Teleport 是如何实现选择性挂载的？.md', title: 'Teleport 选择性挂载', category: 'Vue 3 技术揭秘' },
            { filename: '19.内置组件：Suspense 原理与异步.md', title: 'Suspense 原理与异步处理', category: 'Vue 3 技术揭秘' }
          ]
        },
        {
          name: '🎯 特殊元素与指令',
          description: '学习 Vue 3 特殊元素和指令的实现机制',
          docs: [
            { filename: '20.特殊元素&指令：双向绑定是如何实现的？.md', title: '双向绑定实现原理', category: 'Vue 3 技术揭秘' },
            { filename: '21.特殊元素&指令：slot 插槽元素是如何实现的？.md', title: 'slot 插槽元素实现', category: 'Vue 3 技术揭秘' }
          ]
        },
        {
          name: '🚀 企业级项目实战',
          description: '从项目搭建到部署的完整企业级开发流程',
          docs: [
            { filename: '1.开篇词：通关 Vue3 企业级项目开发，升职加薪快人一步.md', title: '开篇词：企业级项目开发', category: 'Vue3 企业级项目实战' },
            { filename: '2.项目须知与课程约定.md', title: '项目须知与课程约定', category: 'Vue3 企业级项目实战' },
            { filename: '4.大势所趋："前后端分离"开发模式.md', title: '前后端分离开发模式', category: 'Vue3 企业级项目实战' },
            { filename: '10.Vite2 构建项目及原理分析.md', title: 'Vite2 构建项目及原理分析', category: 'Vue3 企业级项目实战' }
          ]
        },
        {
          name: '📖 总结与展望',
          description: '回顾学习成果，展望未来发展',
          docs: [
            { filename: '22.结语：再回首，纵观 Vue 3 实现.md', title: '结语：纵观 Vue 3 实现', category: 'Vue 3 技术揭秘' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1000px;
}

.home h2 {
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
}

.categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2rem;
}

.category {
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.category:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.category-header {
  margin-bottom: 1.5rem;
}

.category h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 600;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
}

.category-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  font-style: italic;
}

.doc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.doc-list li {
  margin-bottom: 0.3rem;
}

.doc-link {
  color: #3498db;
  text-decoration: none;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.doc-link:hover {
  background-color: #e3f2fd;
  border-color: #3498db;
  transform: translateX(4px);
}

.doc-title {
  font-weight: 500;
  margin-bottom: 0.2rem;
  color: #2c3e50;
}

.doc-category {
  font-size: 0.8rem;
  color: #7f8c8d;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .categories {
    grid-template-columns: 1fr;
  }
  
  .home h2 {
    font-size: 2rem;
  }
  
  .category {
    padding: 1rem;
  }
}
</style>