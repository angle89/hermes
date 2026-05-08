<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">我的Agent模板</h2>
      <router-link to="/agent-store" class="btn-link">去模板市场选模板 →</router-link>
    </div>
    <div class="empty-state">
      <div class="empty-icon">🎯</div>
      <div class="empty-text">还没有保存的模板</div>
      <router-link to="/agent-store" class="btn-primary" style="margin-top:16px;display:inline-block">去模板市场</router-link>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.page { padding: 32px; min-height: 100%; }
.page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
.page-title { font-size: 22px; font-weight: 700; }
.btn-link { font-size: 13px; color: #4a6cf7; text-decoration: none; }
.empty-state { text-align: center; padding: 80px 0; }
.empty-icon { font-size: 48px; margin-bottom: 16px; }
.empty-text { font-size: 14px; color: #aaa; }
.btn-primary { padding: 10px 20px; background: #4a6cf7; color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 500; text-decoration: none; }
</style>
