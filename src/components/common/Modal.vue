<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-box" :style="{ width: width }">
          <div class="modal-header">
            <span class="modal-title">{{ title }}</span>
            <button class="modal-close" @click="$emit('close')">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                <path d="M1 1l12 12M13 1L1 13"/>
              </svg>
            </button>
          </div>
          <div class="modal-body"><slot /></div>
          <div v-if="$slots.footer" class="modal-footer"><slot name="footer" /></div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
defineProps({ show: Boolean, title: String, width: { type: String, default: '480px' } })
defineEmits(['close'])
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.35);
  display: flex; align-items: center; justify-content: center;
}
.modal-box {
  background: #fff; border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  max-height: 85vh; display: flex; flex-direction: column;
  overflow: hidden;
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 20px 14px; border-bottom: 1px solid #f0f0f0;
}
.modal-title { font-size: 15px; font-weight: 600; color: #1a1a1a; }
.modal-close {
  width: 28px; height: 28px; border: none; background: none;
  cursor: pointer; color: #aaa; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
}
.modal-close:hover { background: #f5f5f5; color: #333; }
.modal-body { padding: 20px; overflow-y: auto; flex: 1; }
.modal-footer { padding: 14px 20px; border-top: 1px solid #f0f0f0; display: flex; justify-content: flex-end; gap: 8px; }
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s; }
.modal-enter-active .modal-box, .modal-leave-active .modal-box { transition: transform 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-box, .modal-leave-to .modal-box { transform: scale(0.95) translateY(10px); }
</style>
