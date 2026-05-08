<template>
  <div class="page">
    <h2 class="page-title">Token工场</h2>
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-label">G分余额</div>
        <div class="stat-value">{{ userStore.gPoints }}</div>
        <div class="stat-sub">当前账户余额</div>
      </div>
      <div class="stat-card accent">
        <div class="stat-label">本月已用</div>
        <div class="stat-value">0</div>
        <div class="stat-sub">Token调用次数</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">账户类型</div>
        <div class="stat-value small">{{ userStore.plan }}</div>
        <div class="stat-sub">升级获得更多权益</div>
      </div>
    </div>

    <div class="section-title">充值G分</div>
    <div class="plans">
      <div v-for="plan in plans" :key="plan.id" class="plan-card" :class="{ recommended: plan.recommended }" @click="selectedPlan = plan">
        <div v-if="plan.recommended" class="plan-badge">推荐</div>
        <div class="plan-price">¥{{ plan.price }}</div>
        <div class="plan-points">{{ plan.points }} G分</div>
        <div class="plan-desc">{{ plan.desc }}</div>
      </div>
    </div>
    <button class="btn-primary" :disabled="!selectedPlan" @click="showPay = true">
      立即充值{{ selectedPlan ? ' · ¥' + selectedPlan.price : '' }}
    </button>

    <div class="section-title" style="margin-top:36px">使用记录</div>
    <div class="empty-state">
      <div class="empty-icon">📊</div>
      <div class="empty-text">暂无使用记录</div>
    </div>

    <Modal :show="showPay" title="确认充值" @close="showPay = false">
      <div class="pay-info">
        <div class="pay-row"><span>充值金额</span><span class="pay-val">¥{{ selectedPlan?.price }}</span></div>
        <div class="pay-row"><span>获得G分</span><span class="pay-val accent">{{ selectedPlan?.points }} G分</span></div>
      </div>
      <p style="font-size:13px;color:#aaa;margin-top:16px">支付功能即将上线，敬请期待</p>
      <template #footer>
        <button class="btn-cancel" @click="showPay = false">取消</button>
        <button class="btn-primary">前往支付</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import Modal from '../components/common/Modal.vue'

const userStore = useUserStore()
const showPay = ref(false); const selectedPlan = ref(null)

const plans = [
  { id:1, price:9.9, points:100, desc:'入门体验包' },
  { id:2, price:49, points:600, desc:'个人标准包', recommended: true },
  { id:3, price:99, points:1500, desc:'专业增强包' },
  { id:4, price:299, points:6000, desc:'企业年度包' },
]
</script>

<style scoped>
.page { padding: 32px; min-height: 100%; }
.page-title { font-size: 22px; font-weight: 700; margin-bottom: 24px; }
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 36px; }
.stat-card { background: white; border-radius: 14px; padding: 20px; border: 1px solid #f0f0f0; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.stat-card.accent { background: linear-gradient(135deg,#4a6cf7,#7c3aed); color: white; }
.stat-card.accent .stat-label, .stat-card.accent .stat-sub { color: rgba(255,255,255,0.75); }
.stat-label { font-size: 12px; color: #aaa; margin-bottom: 8px; }
.stat-value { font-size: 32px; font-weight: 800; margin-bottom: 4px; }
.stat-value.small { font-size: 20px; }
.stat-sub { font-size: 12px; color: #aaa; }
.section-title { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px; }
.plans { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
.plan-card {
  background: white; border: 2px solid #f0f0f0; border-radius: 14px;
  padding: 20px; cursor: pointer; transition: all 0.2s; position: relative;
}
.plan-card:hover { border-color: #4a6cf7; }
.plan-card.recommended { border-color: #4a6cf7; background: #f0f2ff; }
.plan-badge { position: absolute; top:-10px; left:50%; transform:translateX(-50%); background:#4a6cf7; color:white; font-size:11px; padding:2px 10px; border-radius:10px; font-weight:600; }
.plan-price { font-size: 26px; font-weight: 800; color: #1a1a1a; }
.plan-points { font-size: 14px; color: #4a6cf7; font-weight: 600; margin: 4px 0; }
.plan-desc { font-size: 12px; color: #aaa; }
.btn-primary { padding: 10px 24px; background: #4a6cf7; color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 500; transition: background 0.15s; }
.btn-primary:disabled { background: #e0e0e0; color: #aaa; cursor: not-allowed; }
.btn-primary:not(:disabled):hover { background: #3b5bdb; }
.btn-cancel { padding: 8px 18px; border-radius: 8px; border: 1px solid #e8e8e8; background: white; color: #666; cursor: pointer; font-size: 13px; }
.empty-state { text-align: center; padding: 40px; }
.empty-icon { font-size: 40px; margin-bottom: 12px; }
.empty-text { font-size: 14px; color: #aaa; }
.pay-info { background: #f8f9ff; border-radius: 10px; padding: 16px; }
.pay-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; font-size: 14px; }
.pay-row:last-child { border: none; }
.pay-val { font-weight: 600; }
.pay-val.accent { color: #4a6cf7; }
</style>
