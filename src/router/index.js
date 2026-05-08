import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/',             name: 'Home',            component: () => import('../views/Home.vue') },
  { path: '/cloud',        name: 'CloudDeploy',     component: () => import('../views/CloudDeploy.vue') },
  { path: '/download',     name: 'LocalDownload',   component: () => import('../views/LocalDownload.vue') },
  { path: '/token',        name: 'TokenFactory',    component: () => import('../views/TokenFactory.vue') },
  { path: '/work',         name: 'MyWork',          component: () => import('../views/MyWork.vue') },
  { path: '/my-agent',     name: 'MyAgentTemplate', component: () => import('../views/MyAgentTemplate.vue') },
  { path: '/agent-store',  name: 'AgentStore',      component: () => import('../views/AgentStore.vue') },
  { path: '/schedule',     name: 'Schedule',        component: () => import('../views/Schedule.vue') },
  { path: '/messages',     name: 'Messages',        component: () => import('../views/Messages.vue') },
  { path: '/login',        name: 'Login',           component: () => import('../views/Login.vue') },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
