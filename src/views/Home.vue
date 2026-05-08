<template>
  <div class="home">
    <!-- Hero -->
    <div class="hero">
      <div class="download-pill">
        <img class="pill-avatar" src="/hemas_icon.png" alt="HEMAS" />
        <span class="pill-name">河马智能体 (HEMAS)</span>
        <router-link to="/download" class="pill-link">去下载 →</router-link>
      </div>
      <h1 class="hero-title">河马 · 智能体中的007</h1>
      <p class="hero-subtitle">今天有啥想法？来帮你实现!</p>
      <div class="chat-box">
        <textarea class="chat-textarea" v-model="prompt"
          placeholder="例如：创建一个可以通过输入书籍、电影、电视剧名字，就能自动总结内容，并且生成抖音式故事解说的文案，并把文案发送到邮箱" />
        <div class="chat-footer">
          <button class="attach-btn" title="附件">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
            </svg>
          </button>
          <button class="send-btn" :class="{ active: prompt.trim() }" @click="handleSend">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 11.5V2.5M7 2.5L3 6.5M7 2.5L11 6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 近期工作流 -->
    <div class="section-wrap">
      <div class="section-row">
        <span class="section-title">近期工作流</span>
        <router-link to="/work" class="more-btn">更多 ›</router-link>
      </div>
      <div class="workflow-cards">
        <div class="new-wf-card" @click="showNewWf = true">
          <div class="plus-circle">+</div>
          <span>新建工作流</span>
        </div>
        <div v-for="wf in workflowStore.recentList" :key="wf.id" class="wf-card">
          <div class="wf-card-icon">⚡</div>
          <div class="wf-card-info">
            <div class="wf-name">{{ wf.name }}</div>
            <div class="wf-date">{{ wf.createdAt }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模板市场 -->
    <div class="section-wrap">
      <div class="section-row">
        <span class="section-title">模板市场</span>
        <router-link to="/agent-store" class="more-btn">更多 ›</router-link>
      </div>
      <div class="template-tabs">
        <button v-for="tab in tabs" :key="tab" class="tab" :class="{ active: activeTab === tab }" @click="activeTab = tab">{{ tab }}</button>
      </div>
      <div class="template-grid">
        <div v-for="tpl in filteredTemplates" :key="tpl.id" class="tpl-card" :style="{ background: tpl.bg }" @click="selectedTpl = tpl">
          <div class="tpl-inner">
            <span class="tpl-label">{{ tpl.name }}</span>
          </div>
          <span v-if="tpl.date" class="tpl-date">{{ tpl.date }}</span>
        </div>
      </div>
    </div>

    <!-- 新建工作流弹窗 -->
    <Modal :show="showNewWf" title="新建工作流" @close="showNewWf = false">
      <div class="form-group">
        <label>工作流名称</label>
        <input v-model="newWfName" placeholder="给你的工作流起个名字..." class="form-input" />
      </div>
      <div class="form-group">
        <label>描述（可选）</label>
        <textarea v-model="newWfDesc" placeholder="描述这个工作流的用途..." class="form-textarea" />
      </div>
      <template #footer>
        <button class="btn-cancel" @click="showNewWf = false">取消</button>
        <button class="btn-primary" @click="createWorkflow">创建</button>
      </template>
    </Modal>

    <!-- 模板详情弹窗 -->
    <Modal :show="!!selectedTpl" :title="selectedTpl?.name" @close="selectedTpl = null" width="560px">
      <div v-if="selectedTpl" class="tpl-detail">
        <div class="tpl-preview" :style="{ background: selectedTpl.bg }">
          <span class="tpl-label">{{ selectedTpl.name }}</span>
        </div>
        <p class="tpl-desc">{{ selectedTpl.desc }}</p>
        <div class="tpl-tags">
          <span v-for="tag in selectedTpl.tags" :key="tag" class="tpl-tag">{{ tag }}</span>
        </div>
      </div>
      <template #footer>
        <button class="btn-cancel" @click="selectedTpl = null">关闭</button>
        <button class="btn-primary" @click="useTemplate">使用此模板</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWorkflowStore } from '../stores/workflow'
import Modal from '../components/common/Modal.vue'

const workflowStore = useWorkflowStore()
const prompt = ref('')
const showNewWf = ref(false)
const newWfName = ref('')
const newWfDesc = ref('')
const selectedTpl = ref(null)
const activeTab = ref('全部')

const tabs = ['全部', '内容创作', '数据处理', '生活娱乐', '职场必备']

const templates = [
  { id: 1, name: '一键抠图', bg: 'linear-gradient(135deg,#00d4b4,#00b4d8)', category: '内容创作', desc: '上传图片，AI自动识别主体并抠图，支持批量处理', tags: ['图像处理', 'AI抠图', '批量'] },
  { id: 2, name: 'AI写作', bg: 'linear-gradient(135deg,#6c63ff,#a78bfa)', category: '内容创作', desc: '智能生成各类文案，支持小红书、抖音、公众号等平台风格', tags: ['文案创作', '多平台', 'AI写作'] },
  { id: 3, name: '数据分析', bg: 'linear-gradient(135deg,#3b82f6,#06b6d4)', category: '数据处理', desc: '上传Excel/CSV，自动生成可视化图表和分析报告', tags: ['数据分析', '可视化', '报告'] },
  { id: 4, name: 'AI日报', bg: 'linear-gradient(135deg,#0f0f1a,#1e1e3a)', category: '职场必备', desc: '自动汇总行业动态，生成个性化每日简报', date: '2026年3月11日', tags: ['日报', '信息汇总', '自动化'] },
  { id: 5, name: '会议纪要', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)', category: '职场必备', desc: '上传录音或文字，自动生成结构化会议纪要', tags: ['会议', '纪要', '效率'] },
  { id: 6, name: '漫剧生成', bg: 'linear-gradient(135deg,#ec4899,#8b5cf6)', category: '生活娱乐', desc: 'AI生成漫画风格短剧，支持自定义角色和剧情', tags: ['漫剧', 'AI绘画', '短视频'] },
  { id: 7, name: '简历优化', bg: 'linear-gradient(135deg,#10b981,#3b82f6)', category: '职场必备', desc: '智能分析简历，提供针对性优化建议和改写', tags: ['简历', '求职', 'AI优化'] },
  { id: 8, name: '翻译助手', bg: 'linear-gradient(135deg,#f97316,#eab308)', category: '生活娱乐', desc: '多语言互译，支持文档批量翻译和专业术语校对', tags: ['翻译', '多语言', '批量'] },
]

const filteredTemplates = computed(() =>
  activeTab.value === '全部' ? templates : templates.filter(t => t.category === activeTab.value)
)

function handleSend() {
  if (!prompt.value.trim()) return
  prompt.value = ''
}

function createWorkflow() {
  if (!newWfName.value.trim()) return
  workflowStore.addWorkflow({ name: newWfName.value, desc: newWfDesc.value })
  newWfName.value = ''
  newWfDesc.value = ''
  showNewWf.value = false
}

function useTemplate() {
  workflowStore.addWorkflow({ name: selectedTpl.value.name, desc: selectedTpl.value.desc })
  selectedTpl.value = null
}
</script>

<style scoped>
.home { min-height: 100%; }
.hero {
  display: flex; flex-direction: column; align-items: center;
  padding: 44px 32px 28px; text-align: center;
}
.download-pill {
  display: inline-flex; align-items: center; gap: 7px;
  background: rgba(255,255,255,0.72); backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.85); border-radius: 20px;
  padding: 6px 14px 6px 8px; margin-bottom: 20px;
  font-size: 13px; cursor: pointer;
  box-shadow: 0 2px 12px rgba(80,80,200,0.08);
}
.pill-avatar { width: 24px; height: 24px; border-radius: 50%; object-fit: contain; }
.pill-name { color: #333; font-weight: 500; }
.pill-link { color: #4a6cf7; font-weight: 600; text-decoration: none; }
.hero-title { font-size: 38px; font-weight: 800; color: #111; letter-spacing: -1.5px; margin-bottom: 10px; }
.hero-subtitle { font-size: 14px; color: #777; margin-bottom: 26px; }

.chat-box {
  width: 100%; max-width: 700px;
  background: rgba(255,255,255,0.92); border-radius: 16px;
  border: 1px solid rgba(220,220,240,0.9); padding: 16px 16px 12px;
  box-shadow: 0 4px 24px rgba(100,100,200,0.08);
}
.chat-textarea {
  width: 100%; border: none; outline: none;
  font-size: 14px; color: #333; resize: none;
  min-height: 68px; background: transparent; font-family: inherit; line-height: 1.65;
}
.chat-textarea::placeholder { color: #bbb; }
.chat-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 6px; }
.attach-btn {
  width: 30px; height: 30px; background: none; border: none;
  cursor: pointer; color: #aaa; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  transition: color 0.15s, background 0.15s;
}
.attach-btn:hover { color: #666; background: #f0f0f0; }
.send-btn {
  width: 34px; height: 34px; background: #e0e0e0; border: none;
  border-radius: 10px; cursor: pointer; color: #aaa;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, color 0.2s;
}
.send-btn.active, .send-btn:hover { background: #4a6cf7; color: white; }

.section-wrap { padding: 0 32px 32px; }
.section-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; margin-top: 28px; }
.section-title { font-size: 15px; font-weight: 700; color: #1a1a1a; }
.more-btn { font-size: 13px; color: #aaa; text-decoration: none; transition: color 0.15s; }
.more-btn:hover { color: #4a6cf7; }

.workflow-cards { display: flex; gap: 12px; flex-wrap: wrap; }
.new-wf-card {
  width: 140px; height: 100px; border: 2px dashed #d4d4e8;
  border-radius: 14px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 9px;
  cursor: pointer; transition: border-color 0.2s, background 0.2s;
  background: rgba(255,255,255,0.5); font-size: 13px; color: #666; font-weight: 500;
}
.new-wf-card:hover { border-color: #4a6cf7; background: rgba(74,108,247,0.04); }
.plus-circle {
  width: 36px; height: 36px; background: #1a1a1a; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 20px; transition: background 0.2s;
}
.new-wf-card:hover .plus-circle { background: #4a6cf7; }

.wf-card {
  width: 160px; height: 100px; background: white; border-radius: 14px;
  border: 1px solid #f0f0f0; padding: 14px; cursor: pointer;
  display: flex; flex-direction: column; gap: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04); transition: box-shadow 0.2s;
}
.wf-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
.wf-card-icon { font-size: 20px; }
.wf-name { font-size: 13px; font-weight: 600; color: #1a1a1a; }
.wf-date { font-size: 11px; color: #aaa; }

.template-tabs { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.tab {
  padding: 6px 16px; border-radius: 20px; border: 1px solid #e0e0e8;
  background: rgba(255,255,255,0.8); font-size: 13px; color: #666;
  cursor: pointer; transition: all 0.15s; font-weight: 500;
}
.tab.active { background: #1a1a1a; color: white; border-color: #1a1a1a; }
.tab:hover:not(.active) { border-color: #999; color: #333; }

.template-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.tpl-card {
  border-radius: 14px; overflow: hidden; cursor: pointer;
  height: 118px; position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.tpl-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.14); }
.tpl-inner { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.tpl-label { font-size: 20px; font-weight: 800; color: white; text-shadow: 0 2px 6px rgba(0,0,0,0.2); }
.tpl-date { position: absolute; top: 8px; right: 10px; font-size: 9px; color: rgba(255,255,255,0.7); }

/* Form */
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 13px; color: #555; margin-bottom: 6px; font-weight: 500; }
.form-input, .form-textarea {
  width: 100%; padding: 10px 12px; border: 1px solid #e8e8e8;
  border-radius: 10px; font-size: 14px; font-family: inherit;
  outline: none; transition: border-color 0.15s;
}
.form-input:focus, .form-textarea:focus { border-color: #4a6cf7; }
.form-textarea { min-height: 80px; resize: vertical; }

.btn-cancel {
  padding: 8px 18px; border-radius: 8px; border: 1px solid #e8e8e8;
  background: white; color: #666; cursor: pointer; font-size: 13px;
}
.btn-primary {
  padding: 8px 18px; border-radius: 8px; border: none;
  background: #4a6cf7; color: white; cursor: pointer;
  font-size: 13px; font-weight: 500;
  transition: background 0.15s;
}
.btn-primary:hover { background: #3b5bdb; }

.tpl-detail .tpl-preview {
  height: 140px; border-radius: 12px; display: flex;
  align-items: center; justify-content: center; margin-bottom: 16px;
}
.tpl-desc { font-size: 14px; color: #555; line-height: 1.7; margin-bottom: 12px; }
.tpl-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.tpl-tag {
  font-size: 12px; padding: 3px 10px; border-radius: 20px;
  background: #f0f2ff; color: #4a6cf7; border: 1px solid #dde4ff;
}
</style>
