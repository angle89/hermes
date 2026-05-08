<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">Agent模板市场</h2>
      <input v-model="search" class="search-input" placeholder="搜索模板..." />
    </div>
    <div class="tabs">
      <button v-for="tab in tabs" :key="tab" class="tab" :class="{ active: activeTab === tab }" @click="activeTab = tab">{{ tab }}</button>
    </div>
    <div class="grid">
      <div v-for="tpl in filtered" :key="tpl.id" class="card" @click="selected = tpl">
        <div class="card-cover" :style="{ background: tpl.bg }">
          <span class="card-label">{{ tpl.name }}</span>
        </div>
        <div class="card-body">
          <div class="card-name">{{ tpl.name }}</div>
          <div class="card-desc">{{ tpl.desc }}</div>
          <div class="card-tags">
            <span v-for="tag in tpl.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <Modal :show="!!selected" :title="selected?.name" @close="selected = null" width="520px">
      <div v-if="selected">
        <div class="modal-cover" :style="{ background: selected.bg }">
          <span class="card-label">{{ selected.name }}</span>
        </div>
        <p class="modal-desc">{{ selected.desc }}</p>
        <div class="card-tags" style="margin-top:10px">
          <span v-for="tag in selected.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
      <template #footer>
        <button class="btn-cancel" @click="selected = null">取消</button>
        <button class="btn-primary" @click="useIt">使用此模板</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWorkflowStore } from '../stores/workflow'
import Modal from '../components/common/Modal.vue'

const workflowStore = useWorkflowStore()
const search = ref(''); const activeTab = ref('全部'); const selected = ref(null)
const tabs = ['全部','内容创作','数据处理','生活娱乐','职场必备']

const templates = [
  { id:1, name:'一键抠图', bg:'linear-gradient(135deg,#00d4b4,#00b4d8)', category:'内容创作', desc:'上传图片，AI自动识别主体并抠图，支持批量处理', tags:['图像处理','AI抠图'] },
  { id:2, name:'AI写作', bg:'linear-gradient(135deg,#6c63ff,#a78bfa)', category:'内容创作', desc:'智能生成各类文案，支持多平台风格', tags:['文案创作','多平台'] },
  { id:3, name:'数据分析', bg:'linear-gradient(135deg,#3b82f6,#06b6d4)', category:'数据处理', desc:'上传Excel/CSV，自动生成可视化图表和分析报告', tags:['数据分析','可视化'] },
  { id:4, name:'AI日报', bg:'linear-gradient(135deg,#0f0f1a,#1e1e3a)', category:'职场必备', desc:'自动汇总行业动态，生成个性化每日简报', tags:['日报','信息汇总'] },
  { id:5, name:'会议纪要', bg:'linear-gradient(135deg,#f59e0b,#ef4444)', category:'职场必备', desc:'上传录音，自动生成结构化会议纪要', tags:['会议','效率'] },
  { id:6, name:'漫剧生成', bg:'linear-gradient(135deg,#ec4899,#8b5cf6)', category:'生活娱乐', desc:'AI生成漫画风格短剧，支持自定义角色', tags:['漫剧','AI绘画'] },
  { id:7, name:'简历优化', bg:'linear-gradient(135deg,#10b981,#3b82f6)', category:'职场必备', desc:'智能分析简历，提供针对性优化建议', tags:['简历','求职'] },
  { id:8, name:'翻译助手', bg:'linear-gradient(135deg,#f97316,#eab308)', category:'生活娱乐', desc:'多语言互译，支持文档批量翻译', tags:['翻译','多语言'] },
  { id:9, name:'SEO优化', bg:'linear-gradient(135deg,#14b8a6,#0ea5e9)', category:'内容创作', desc:'分析关键词，优化内容SEO表现', tags:['SEO','关键词'] },
  { id:10, name:'代码助手', bg:'linear-gradient(135deg,#1e293b,#334155)', category:'数据处理', desc:'代码审查、补全、解释，支持多种语言', tags:['代码','开发'] },
  { id:11, name:'智能客服', bg:'linear-gradient(135deg,#7c3aed,#c026d3)', category:'职场必备', desc:'搭建智能客服机器人，自动处理常见问题', tags:['客服','自动化'] },
  { id:12, name:'短视频脚本', bg:'linear-gradient(135deg,#dc2626,#ea580c)', category:'内容创作', desc:'一键生成爆款短视频脚本，适配抖音快手', tags:['短视频','脚本'] },
]

const filtered = computed(() => templates.filter(t =>
  (activeTab.value === '全部' || t.category === activeTab.value) &&
  (!search.value || t.name.includes(search.value) || t.desc.includes(search.value))
))

function useIt() {
  workflowStore.addWorkflow({ name: selected.value.name, desc: selected.value.desc })
  selected.value = null
}
</script>

<style scoped>
.page { padding: 32px; min-height: 100%; }
.page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.page-title { font-size: 22px; font-weight: 700; }
.search-input {
  padding: 8px 14px; border: 1px solid #e8e8e8; border-radius: 20px;
  font-size: 13px; outline: none; width: 200px; transition: border-color 0.15s;
}
.search-input:focus { border-color: #4a6cf7; }
.tabs { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
.tab {
  padding: 6px 16px; border-radius: 20px; border: 1px solid #e0e0e8;
  background: white; font-size: 13px; color: #666; cursor: pointer; transition: all 0.15s; font-weight: 500;
}
.tab.active { background: #1a1a1a; color: white; border-color: #1a1a1a; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.card {
  background: white; border-radius: 14px; overflow: hidden;
  border: 1px solid #f0f0f0; cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
.card-cover { height: 100px; display: flex; align-items: center; justify-content: center; }
.card-label { font-size: 18px; font-weight: 800; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
.card-body { padding: 14px; }
.card-name { font-size: 14px; font-weight: 600; margin-bottom: 5px; }
.card-desc { font-size: 12px; color: #888; line-height: 1.5; margin-bottom: 10px; }
.card-tags { display: flex; gap: 5px; flex-wrap: wrap; }
.tag { font-size: 11px; padding: 2px 8px; border-radius: 10px; background: #f0f2ff; color: #4a6cf7; }
.modal-cover { height: 140px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.modal-desc { font-size: 14px; color: #555; line-height: 1.7; }
.btn-cancel { padding: 8px 18px; border-radius: 8px; border: 1px solid #e8e8e8; background: white; color: #666; cursor: pointer; font-size: 13px; }
.btn-primary { padding: 8px 18px; border-radius: 8px; border: none; background: #4a6cf7; color: white; cursor: pointer; font-size: 13px; font-weight: 500; }
</style>
