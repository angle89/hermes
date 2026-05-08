<template>
  <div class="app-shell">
    <Sidebar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import Sidebar from './components/layout/Sidebar.vue'
</script>

<style>
.app-shell { display: flex; height: 100vh; overflow: hidden; }
.main-content {
  flex: 1;
  overflow-y: auto;
  background: linear-gradient(160deg, #f6f7fb 0%, #f0f2f7 30%, #f8f9fc 65%, #ffffff 100%);
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
