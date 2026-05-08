<template>
  <router-link :to="to" class="nav-item" active-class="active" exact-active-class="active">
    <span class="nav-icon">
      <!-- cloud -->
      <svg v-if="icon==='cloud'" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11.5 10a3 3 0 10-1.3-5.7A4 4 0 103.5 10h8z"/>
      </svg>
      <!-- download -->
      <svg v-else-if="icon==='download'" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 2v8M5 7l3 3 3-3"/><path d="M3 12v1.5A1.5 1.5 0 004.5 15h7A1.5 1.5 0 0013 13.5V12"/>
      </svg>
      <!-- token -->
      <svg v-else-if="icon==='token'" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 1.5L9.8 5.2l4.2.6-3 2.9.7 4.1L8 10.8l-3.7 1.9.7-4.1-3-2.9 4.2-.6z"/>
      </svg>
      <!-- grid -->
      <svg v-else-if="icon==='grid'" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/>
        <rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/>
      </svg>
      <!-- list -->
      <svg v-else-if="icon==='list'" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2.5 4h11M2.5 8h7M2.5 12h9"/>
      </svg>
      <!-- template -->
      <svg v-else-if="icon==='template'" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="12" height="10" rx="1.5"/>
        <path d="M5 7h6M5 10h4"/>
      </svg>
      <!-- store -->
      <svg v-else-if="icon==='store'" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 13V6.5L8 3l6 3.5V13"/><path d="M5.5 13V9.5h5V13"/><path d="M2 6.5l6 3.5 6-3.5"/>
      </svg>
      <!-- clock -->
      <svg v-else-if="icon==='clock'" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="8" cy="8" r="5.5"/><path d="M8 5v3.5l2 1.5"/>
      </svg>
      <!-- bell -->
      <svg v-else-if="icon==='bell'" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 2a4.5 4.5 0 014.5 4.5c0 2.5.8 3.5 1.5 4H2c.7-.5 1.5-1.5 1.5-4A4.5 4.5 0 018 2z"/>
        <path d="M6.5 13.5a1.5 1.5 0 003 0"/>
      </svg>
    </span>
    <slot />
  </router-link>
</template>

<script setup>
defineProps({ to: String, icon: String })
</script>

<style scoped>
.nav-item {
  display: flex; align-items: center; gap: 9px;
  padding: 7px 12px; margin: 1px 7px;
  border-radius: 8px; cursor: pointer;
  font-size: 13.5px; color: #444;
  transition: background 0.12s; white-space: nowrap;
  text-decoration: none;
}
.nav-item:hover { background: #f5f5f5; }
.nav-item.active { background: #ebf0ff; color: #3b5bdb; font-weight: 500; }
.nav-icon {
  width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; opacity: 0.65;
}
.nav-item.active .nav-icon { opacity: 1; }
</style>
