<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">我的工作</h2>
      <button class="btn-primary" @click="showNew = true">+ 新建工作流</button>
    </div>

    <div v-if="workflowStore.myList.length === 0" class="empty-state">
      <div class="empty-icon">⚡</div>
      <div class="empty-text">还没有工作流，点击「新建工作流」开始</div>
    </div>

    <div v-else class="work-grid">
      <div v-for="wf in workflowStore.myList" :key="wf.id" class="work-card">
        <div class="work-card-header">
          <div class="work-icon">⚡</div>
          <div class="work-menu">···</div>
        </div>
        <div class="work-name">{{ wf.name }}</div>
        <div class="work-desc">{{ wf.desc || '暂无描述' }}</div>
        <div class="work-footer">
          <span class="work-date">{{ wf.createdAt }}</span>
          <button class="run-btn">运行</button>
        </div>
      </div>
    </div>

    <Modal :show="showNew" title="新建工作流" @close="showNew = false">
      <div class="form-group">
        <label>工作流名称</label>
        <input v-model="name" placeholder="给你的工作流起个名字..." class="form-input" />
      </div>
      <div class="form-group">
        <label>描述（可选）</label>
        <textarea v-model="desc" placeholder="描述这个工作流的用途..." class="form-textarea" />
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
import { useWorkflowStore } from '../stores/workflow'
import Modal from '../components/common/Modal.vue'

const workflowStore = useWorkflowStore()
const showNew = ref(false)
const name = ref(''); const desc = ref('')

function create() {
  if (!name.value.trim()) return
  workflowStore.addWorkflow({ name: name.value, desc: desc.value })
  name.value = ''; desc.value = ''; showNew.value = false
}
</script>

<style scoped>
.page { padding: 32px; min-height: 100%; }
.page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
.page-title { font-size: 22px; font-weight: 700; }
.btn-primary {
  padding: 9px 18px; background: #4a6cf7; color: white;
  border: none; border-radius: 10px; cursor: pointer;
  font-size: 13px; font-weight: 500; transition: background 0.15s;
}
.btn-primary:hover { background: #3b5bdb; }
.btn-cancel {
  padding: 8px 18px; border-radius: 8px; border: 1px solid #e8e8e8;
  background: white; color: #666; cursor: pointer; font-size: 13px;
}
.empty-state { text-align: center; padding: 80px 0; }
.empty-icon { font-size: 48px; margin-bottom: 16px; }
.empty-text { font-size: 14px; color: #aaa; }
.work-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
.work-card {
  background: white; border-radius: 14px; padding: 18px;
  border: 1px solid #f0f0f0; box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: box-shadow 0.2s, transform 0.2s; cursor: pointer;
}
.work-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.1); transform: translateY(-2px); }
.work-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.work-icon { font-size: 22px; }
.work-menu { color: #aaa; cursor: pointer; font-size: 16px; letter-spacing: 1px; }
.work-name { font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 6px; }
.work-desc { font-size: 12px; color: #888; margin-bottom: 14px; line-height: 1.5; }
.work-footer { display: flex; align-items: center; justify-content: space-between; }
.work-date { font-size: 11px; color: #bbb; }
.run-btn {
  padding: 4px 12px; background: #f0f2ff; color: #4a6cf7;
  border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500;
}
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 13px; color: #555; margin-bottom: 6px; font-weight: 500; }
.form-input, .form-textarea {
  width: 100%; padding: 10px 12px; border: 1px solid #e8e8e8;
  border-radius: 10px; font-size: 14px; font-family: inherit;
  outline: none; transition: border-color 0.15s;
}
.form-input:focus, .form-textarea:focus { border-color: #4a6cf7; }
.form-textarea { min-height: 80px; resize: vertical; }
</style>
