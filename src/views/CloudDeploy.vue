<template>
  <div class="page">
    <h2 class="page-title">云端运行HEMAS</h2>
    <div class="cloud-hero">
      <div class="cloud-icon">☁️</div>
      <h3>无需安装，浏览器直接运行</h3>
      <p>云端版 HEMAS 无需本地部署，打开即用，数据实时同步</p>
      <button class="btn-primary">立即使用云端版</button>
    </div>
    <div class="feature-grid">
      <div class="feature-card" v-for="f in features" :key="f.title">
        <div class="f-icon">{{ f.icon }}</div>
        <div class="f-title">{{ f.title }}</div>
        <div class="f-desc">{{ f.desc }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
const features = [
  { icon:'⚡', title:'秒级启动', desc:'无需等待，打开页面即可使用' },
  { icon:'🔄', title:'实时同步', desc:'工作流与数据云端实时保存' },
  { icon:'🔒', title:'安全可靠', desc:'企业级数据加密，隐私保护' },
  { icon:'📱', title:'多端适配', desc:'PC/平板/手机均可流畅使用' },
]
</script>
<style scoped>
.page { padding: 32px; min-height: 100%; }
.page-title { font-size: 22px; font-weight: 700; margin-bottom: 32px; }
.cloud-hero { text-align: center; padding: 48px 24px; background: linear-gradient(135deg,#f0f2ff,#e8f0ff); border-radius: 20px; margin-bottom: 32px; }
.cloud-icon { font-size: 56px; margin-bottom: 16px; }
.cloud-hero h3 { font-size: 22px; font-weight: 700; margin-bottom: 10px; }
.cloud-hero p { font-size: 14px; color: #666; margin-bottom: 24px; }
.btn-primary { padding: 12px 28px; background: #4a6cf7; color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 15px; font-weight: 600; }
.feature-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.feature-card { background: white; border-radius: 14px; padding: 24px; border: 1px solid #f0f0f0; text-align: center; }
.f-icon { font-size: 28px; margin-bottom: 12px; }
.f-title { font-size: 14px; font-weight: 600; margin-bottom: 6px; }
.f-desc { font-size: 12px; color: #888; line-height: 1.5; }
</style>
