<template>
  <div class="page">
    <h2 class="page-title">本地下载HEMAS</h2>
    <div class="dl-hero">
      <img src="/hemas_icon.png" class="dl-icon" alt="HEMAS" />
      <h3>HEMAS 桌面客户端</h3>
      <p>本地运行，数据隐私有保障，支持离线使用</p>
      <div class="dl-btns">
        <button class="btn-mac">⬇️ macOS 下载</button>
        <button class="btn-win">⬇️ Windows 下载</button>
      </div>
      <div class="dl-version">当前版本 v1.0.0 · 2026年5月</div>
    </div>
    <div class="steps">
      <h3 class="steps-title">安装步骤</h3>
      <div class="step" v-for="(s, i) in steps" :key="i">
        <div class="step-num">{{ i + 1 }}</div>
        <div class="step-text">{{ s }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
const steps = ['下载对应系统的安装包', '打开安装包，按提示完成安装', '启动 HEMAS，登录账号', '开始使用所有功能']
</script>
<style scoped>
.page { padding: 32px; min-height: 100%; }
.page-title { font-size: 22px; font-weight: 700; margin-bottom: 32px; }
.dl-hero { text-align: center; padding: 48px 24px; background: white; border-radius: 20px; border: 1px solid #f0f0f0; margin-bottom: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
.dl-icon { width: 72px; height: 72px; object-fit: contain; margin-bottom: 16px; }
.dl-hero h3 { font-size: 22px; font-weight: 700; margin-bottom: 10px; }
.dl-hero p { font-size: 14px; color: #666; margin-bottom: 24px; }
.dl-btns { display: flex; gap: 12px; justify-content: center; margin-bottom: 16px; }
.btn-mac, .btn-win { padding: 12px 24px; border: none; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 600; transition: transform 0.15s; }
.btn-mac { background: #1a1a1a; color: white; }
.btn-win { background: #0078d4; color: white; }
.btn-mac:hover, .btn-win:hover { transform: translateY(-2px); }
.dl-version { font-size: 12px; color: #aaa; }
.steps { background: white; border-radius: 16px; padding: 24px; border: 1px solid #f0f0f0; }
.steps-title { font-size: 15px; font-weight: 700; margin-bottom: 20px; }
.step { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid #f5f5f5; }
.step:last-child { border: none; }
.step-num { width: 28px; height: 28px; background: #4a6cf7; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; }
.step-text { font-size: 14px; color: #444; }
</style>
