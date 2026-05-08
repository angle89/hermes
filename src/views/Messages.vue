<template>
  <div class="page">
    <h2 class="page-title">消息</h2>
    <div v-if="messages.length === 0" class="empty-state">
      <div class="empty-icon">🔔</div>
      <div class="empty-text">暂无消息通知</div>
    </div>
    <div v-else class="msg-list">
      <div v-for="msg in messages" :key="msg.id" class="msg-item" :class="{ unread: !msg.read }">
        <div class="msg-dot" v-if="!msg.read"></div>
        <div class="msg-icon">{{ msg.icon }}</div>
        <div class="msg-content">
          <div class="msg-title">{{ msg.title }}</div>
          <div class="msg-body">{{ msg.body }}</div>
          <div class="msg-time">{{ msg.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const messages = []
</script>

<style scoped>
.page { padding: 32px; min-height: 100%; }
.page-title { font-size: 22px; font-weight: 700; margin-bottom: 24px; }
.empty-state { text-align: center; padding: 80px 0; }
.empty-icon { font-size: 48px; margin-bottom: 16px; }
.empty-text { font-size: 14px; color: #aaa; }
.msg-list { display: flex; flex-direction: column; gap: 2px; }
.msg-item { display: flex; align-items: flex-start; gap: 12px; padding: 16px; border-radius: 12px; position: relative; cursor: pointer; transition: background 0.15s; }
.msg-item:hover { background: #f8f9fc; }
.msg-item.unread { background: #f0f2ff; }
.msg-dot { width: 8px; height: 8px; background: #4a6cf7; border-radius: 50%; position: absolute; top: 20px; left: 10px; }
.msg-icon { font-size: 20px; flex-shrink: 0; }
.msg-title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.msg-body { font-size: 13px; color: #666; margin-bottom: 6px; }
.msg-time { font-size: 11px; color: #bbb; }
</style>
