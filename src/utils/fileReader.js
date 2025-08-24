// 文档内容映射 - 这里我们直接嵌入一些示例内容
// 在实际项目中，你可以通过后端API或者构建时预处理来获取真实的markdown内容

const docContents = {
  'Vue 3 技术揭秘': {
    '2.渲染器：组件是如何被渲染成 DOM 的？.md': `# 渲染器：组件是如何被渲染成 DOM 的？

## 概述

Vue 3 的渲染器是整个框架的核心部分，它负责将组件转换为真实的 DOM 元素。本文将深入探讨这个过程。

## 渲染器的工作原理

渲染器主要完成以下几个步骤：

1. **创建虚拟节点（VNode）**
2. **挂载组件**
3. **更新组件**
4. **卸载组件**

### 1. 创建虚拟节点

\`\`\`javascript
function createVNode(type, props, children) {
  return {
    type,
    props,
    children,
    el: null, // 对应的真实DOM元素
    key: props && props.key
  }
}
\`\`\`

### 2. 挂载过程

挂载过程是将虚拟节点转换为真实DOM的过程：

\`\`\`javascript
function mount(vnode, container) {
  if (typeof vnode.type === 'string') {
    // 处理普通HTML元素
    mountElement(vnode, container)
  } else if (typeof vnode.type === 'object') {
    // 处理组件
    mountComponent(vnode, container)
  }
}
\`\`\`

## 总结

Vue 3 的渲染器通过精心设计的算法，高效地将组件渲染为DOM，为用户提供了出色的性能体验。`,

    '6.响应式原理：基于 Proxy 的响应式是什么样的？.md': `# 响应式原理：基于 Proxy 的响应式是什么样的？

## 什么是响应式

响应式是 Vue 3 的核心特性之一，它让数据变化能够自动触发视图更新。

## Proxy vs Object.defineProperty

Vue 3 使用 Proxy 替代了 Vue 2 中的 Object.defineProperty，带来了以下优势：

- 可以监听数组变化
- 可以监听对象属性的添加和删除
- 更好的性能表现

## 基本实现

\`\`\`javascript
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 收集依赖
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      // 触发更新
      trigger(target, key)
      return result
    }
  })
}
\`\`\`

## 依赖收集

\`\`\`javascript
let activeEffect = null

function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    
    dep.add(activeEffect)
  }
}
\`\`\`

这就是 Vue 3 响应式系统的核心原理。`
  },
  
  'Vue3 企业级项目实战': {
    '1.开篇词：通关 Vue3 企业级项目开发，升职加薪快人一步.md': `# 开篇词：通关 Vue3 企业级项目开发，升职加薪快人一步

## 为什么要学习 Vue 3？

Vue 3 作为目前最流行的前端框架之一，在企业级项目开发中有着广泛的应用。

## 课程目标

通过本课程，你将学会：

- Vue 3 的核心概念和API
- 企业级项目的架构设计
- 最佳实践和性能优化
- 实际项目开发经验

## 学习路径

1. **基础知识**：Vue 3 核心概念
2. **进阶技能**：组件设计、状态管理
3. **实战项目**：完整的企业级应用
4. **部署上线**：项目发布和维护

让我们开始这段学习之旅吧！`,

    '5.Vue3 简介及开发环境搭建.md': `# Vue3 简介及开发环境搭建

## Vue 3 的新特性

Vue 3 带来了许多激动人心的新特性：

### 1. Composition API

\`\`\`javascript
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    return {
      count,
      doubleCount
    }
  }
}
\`\`\`

### 2. 更好的性能

- 更小的包体积
- 更快的渲染速度
- 更好的 Tree-shaking 支持

### 3. 更好的 TypeScript 支持

Vue 3 从头开始用 TypeScript 重写，提供了更好的类型推导。

## 开发环境搭建

### 1. 安装 Node.js

确保你的系统安装了 Node.js 14+ 版本。

### 2. 创建项目

\`\`\`bash
npm create vue@latest my-project
cd my-project
npm install
npm run dev
\`\`\`

### 3. 推荐的开发工具

- **VS Code**：最受欢迎的代码编辑器
- **Volar**：Vue 3 的官方 VS Code 扩展
- **Vue DevTools**：浏览器调试工具

现在你已经准备好开始 Vue 3 的开发之旅了！`
  }
}

export async function readMarkdownFile(category, filename) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const categoryDocs = docContents[category]
      if (categoryDocs && categoryDocs[filename]) {
        resolve(categoryDocs[filename])
      } else {
        reject(new Error(`文档不存在: ${category}/${filename}`))
      }
    }, 500) // 模拟网络延迟
  })
}