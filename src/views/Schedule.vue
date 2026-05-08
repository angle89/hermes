<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">定时任务</h2>
      <button class="btn-primary" @click="showNew = true">+ 新建定时任务</button>
    </div>
    <div v-if="tasks.length === 0" class="empty-state">
      <div class="empty-icon">⏰</div>
      <div class="empty-text">还没有定时任务，点击「新建定时任务」开始</div>
    </div>
    <div v-else class="task-list">
      <div v-for="t in tasks" :key="t.id" class="task-card">
        <div class="task-left">
          <div class="task-name">{{ t.name }}</div>
          <div class="task-cron">{{ t.cron }}</div>
        </div>
        <div class="task-right">
          <span class="task-status" :class="t.active ? 'on' : 'off'">{{ t.active ? '运行中' : '已停止' }}</span>
        </div>
      </div>
    </div>

    <Modal :show="showNew" title="新建定时任务" @close="showNew = false">
      <div class="form-group">
        <label>任务名称</label>
        <input v-model="newName" class="form-input" placeholder="给任务起个名字..." />
      </div>
      <div class="form-group">
        <label>执行频率</label>
        <select v-model="newCron" class="form-input">
          <option value="每天 09:00">每天 09:00</option>
          <option value="每天 18:00">每天 18:00</option>
          <option value="每周一 09:00">每周一 09:00</option>
          <option value="每月1日 09:00">每月1日 09:00</option>
        </select>
      </div>
      <template #footer>
        <button class="btn-cancel" @click="showNew = false">取消</button>
        <button class="btn-primary" @click="create">创建</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '../components/common/Modal.vue'

const showNew = ref(false); const newName = ref(''); const newCron = ref('每天 09:00')
const tasks = ref([])

function create() {
  if (!newName.value.trim()) return
  tasks.value.unshift({ id: Date.now(), name: newName.value, cron: newCron.value, active: true })
  newName.value = ''; showNew.value = false
}
</script>

<style scoped>
.page { padding: 32px; min-height: 100%; }
.page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
.page-title { font-size: 22px; font-weight: 700; }
.btn-primary { padding: 9px 18px; background: #4a6cf7; color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 500; }
.btn-cancel { padding: 8px 18px; border-radius: 8px; border: 1px solid #e8e8e8; background: white; color: #666; cursor: pointer; font-size: 13px; }
.empty-state { text-align: center; padding: 80px 0; }
.empty-icon { font-size: 48px; margin-bottom: 16px; }
.empty-text { font-size: 14px; color: #aaa; }
.task-list { display: flex; flex-direction: column; gap: 10px; }
.task-card { background: white; border-radius: 12px; padding: 16px 20px; border: 1px solid #f0f0f0; display: flex; align-items: center; justify-content: space-between; }
.task-name { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.task-cron { font-size: 12px; color: #aaa; }
.task-status { font-size: 12px; padding: 4px 10px; border-radius: 20px; font-weight: 500; }
.task-status.on { background: #dcfce7; color: #16a34a; }
.task-status.off { background: #f3f4f6; color: #9ca3af; }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 13px; color: #555; margin-bottom: 6px; font-weight: 500; }
.form-input { width: 100%; padding: 10px 12px; border: 1px solid #e8e8e8; border-radius: 10px; font-size: 14px; font-family: inherit; outline: none; }
</style>
