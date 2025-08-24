import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import DocLayout from './components/DocLayout.vue'
import DocViewer from './components/DocViewer.vue'

const routes = [
    {
        path: '/',
        redirect: '/docs/Vue 3 技术揭秘/2.渲染器：组件是如何被渲染成 DOM 的？.md'
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

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')