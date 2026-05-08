<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar-header">
      <router-link to="/" class="logo">
        <img class="logo-icon" src="/hemas_icon.png" alt="HEMAS" />
        <img class="logo-text" src="/hermas_logo.png" alt="hermas" />
      </router-link>
      <button class="collapse-btn" @click="collapsed = !collapsed" title="收起">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3.5" width="12" height="1.5" rx="0.75" fill="currentColor"/>
          <rect x="2" y="7.25" width="12" height="1.5" rx="0.75" fill="currentColor"/>
          <rect x="2" y="11" width="12" height="1.5" rx="0.75" fill="currentColor"/>
        </svg>
      </button>
    </div>

    <!-- 数字员工 -->
    <div class="section-label">数字员工</div>
    <NavItem to="/cloud" icon="cloud">云端运行HEMAS <span class="hot-badge">Hot</span></NavItem>
    <NavItem to="/download" icon="download">本地下载HEMAS</NavItem>

    <!-- Agentsyun -->
    <div class="section-label">Agentsyun</div>
    <NavItem to="/token" icon="token">Token工场</NavItem>

    <!-- 工作流 -->
    <div class="section-label">工作流</div>
    <NavItem to="/work" icon="grid">工作</NavItem>
    <NavItem to="/work" icon="list">我的工作</NavItem>
    <NavItem to="/my-agent" icon="template">我的Agent模板</NavItem>
    <NavItem to="/agent-store" icon="store">Agent模板市场</NavItem>
    <NavItem to="/schedule" icon="clock">定时任务</NavItem>
    <NavItem to="/messages" icon="bell">消息</NavItem>

    <div class="spacer" />

    <!-- 底部 -->
    <div class="sidebar-bottom">
      <div class="g-points">
        <div class="g-left">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#888" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9.5 2L4 9h4.5L6.5 14 13 7H8.5z"/>
          </svg>
          <span>剩余G分：{{ userStore.gPoints }}</span>
        </div>
        <span class="free-badge">{{ userStore.plan }}</span>
      </div>

      <router-link to="/login" class="user-row">
        <div class="user-avatar">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#aaa" stroke-width="1.5" stroke-linecap="round">
            <circle cx="8" cy="6" r="3"/>
            <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/>
          </svg>
        </div>
        <span class="user-name">{{ userStore.isLoggedIn ? userStore.username : '未登录' }}</span>
      </router-link>

      <div class="theme-row">
        <button class="theme-btn" :class="{ active: theme === 'light' }" @click="theme = 'light'">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <circle cx="8" cy="8" r="3.5"/>
            <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.1 3.1l1 1M11.9 11.9l1 1M11.9 3.1l-1 1M4.1 11.9l-1 1"/>
          </svg>
          浅色
        </button>
        <button class="theme-btn" :class="{ active: theme === 'dark' }" @click="theme = 'dark'">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <path d="M13 9.5A5.5 5.5 0 016.5 3a5.5 5.5 0 100 10 5.5 5.5 0 006.5-3.5z"/>
          </svg>
          深色
        </button>
      </div>
    </div>

    <div class="sidebar-footer">
      <a href="#">用户协议</a> · <a href="#">隐私协议</a><br>
      苏ICP备2023021414号-2
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import NavItem from './NavItem.vue'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()
const collapsed = ref(false)
const theme = ref('light')
</script>

<style scoped>
.sidebar {
  width: 210px;
  min-width: 210px;
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid #f0f0f0;
  z-index: 10;
}
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 14px 10px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 7px;
  text-decoration: none;
}
.logo-icon { width: 42px; height: 42px; object-fit: contain; }
.logo-text { height: 18px; width: auto; object-fit: contain; }
.collapse-btn {
  width: 26px; height: 26px;
  border: none; background: none; cursor: pointer;
  color: #aaa; border-radius: 5px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
}
.collapse-btn:hover { background: #f5f5f5; color: #555; }
.section-label {
  font-size: 11px; color: #b0b0b0;
  padding: 12px 16px 4px;
  font-weight: 600; letter-spacing: 0.2px;
}
.spacer { flex: 1; }
.sidebar-bottom { border-top: 1px solid #f0f0f0; padding: 8px 0 4px; }
.g-points {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 14px; font-size: 12px; color: #666;
}
.g-left { display: flex; align-items: center; gap: 5px; }
.free-badge {
  font-size: 11px; padding: 2px 8px;
  border-radius: 4px; background: #f5f5f5;
  color: #888; border: 1px solid #eee;
}
.user-row {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 14px; cursor: pointer;
  border-radius: 8px; margin: 1px 7px;
  transition: background 0.12s; text-decoration: none;
}
.user-row:hover { background: #f5f5f5; }
.user-avatar {
  width: 26px; height: 26px; border-radius: 50%;
  background: #f0f0f0; display: flex;
  align-items: center; justify-content: center;
  border: 1px solid #e8e8e8; flex-shrink: 0;
}
.user-name { font-size: 13px; color: #555; }
.theme-row {
  display: flex; align-items: center; gap: 4px;
  padding: 6px 14px; margin: 0 7px 2px;
}
.theme-btn {
  flex: 1; padding: 4px 8px; font-size: 12px;
  border: none; background: none; cursor: pointer;
  border-radius: 5px; color: #888;
  display: flex; align-items: center; justify-content: center; gap: 4px;
  transition: background 0.12s;
}
.theme-btn.active { background: #f0f0f0; color: #333; font-weight: 500; }
.hot-badge {
  font-size: 10px; padding: 1px 6px; border-radius: 4px;
  background: linear-gradient(135deg, #ff6b35, #ff4500);
  color: white; font-weight: 700; margin-left: 3px;
}
.sidebar-footer {
  padding: 6px 14px 10px; text-align: center;
  font-size: 10px; color: #ccc; line-height: 1.7;
}
.sidebar-footer a { color: #bbb; text-decoration: none; }
.sidebar-footer a:hover { text-decoration: underline; }
</style>
