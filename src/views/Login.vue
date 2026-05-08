<template>
  <div class="login-wrap">
    <div class="login-card">
      <div class="login-logo">
        <img src="/hemas_icon.png" class="login-icon" alt="HEMAS" />
        <img src="/hermas_logo.png" class="login-text" alt="hermas" />
      </div>
      <h2 class="login-title">欢迎回来</h2>
      <p class="login-sub">登录后解锁全部功能</p>

      <div class="form-group">
        <label>账号</label>
        <input v-model="username" class="form-input" placeholder="输入手机号或邮箱" />
      </div>
      <div class="form-group">
        <label>密码</label>
        <input v-model="password" type="password" class="form-input" placeholder="输入密码" />
      </div>
      <button class="btn-login" @click="handleLogin">登录</button>
      <div class="login-divider">或</div>
      <button class="btn-register">注册新账号</button>
      <p class="login-hint">登录即代表同意 <a href="#">用户协议</a> 和 <a href="#">隐私政策</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter(); const userStore = useUserStore()
const username = ref(''); const password = ref('')

function handleLogin() {
  if (!username.value.trim()) return
  userStore.login(username.value)
  router.push('/')
}
</script>

<style scoped>
.login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
.login-card { background: white; border-radius: 20px; padding: 40px; width: 100%; max-width: 420px; box-shadow: 0 8px 40px rgba(0,0,0,0.08); }
.login-logo { display: flex; align-items: center; gap: 10px; justify-content: center; margin-bottom: 24px; }
.login-icon { width: 44px; height: 44px; object-fit: contain; }
.login-text { height: 22px; object-fit: contain; }
.login-title { font-size: 22px; font-weight: 800; text-align: center; margin-bottom: 6px; }
.login-sub { font-size: 13px; color: #aaa; text-align: center; margin-bottom: 28px; }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 13px; color: #555; margin-bottom: 6px; font-weight: 500; }
.form-input { width: 100%; padding: 11px 14px; border: 1px solid #e8e8e8; border-radius: 10px; font-size: 14px; font-family: inherit; outline: none; transition: border-color 0.15s; }
.form-input:focus { border-color: #4a6cf7; }
.btn-login { width: 100%; padding: 12px; background: #4a6cf7; color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 8px; transition: background 0.15s; }
.btn-login:hover { background: #3b5bdb; }
.login-divider { text-align: center; color: #ddd; margin: 16px 0; font-size: 13px; }
.btn-register { width: 100%; padding: 11px; background: white; color: #4a6cf7; border: 1px solid #4a6cf7; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; transition: background 0.15s; }
.btn-register:hover { background: #f0f2ff; }
.login-hint { text-align: center; font-size: 11px; color: #ccc; margin-top: 16px; }
.login-hint a { color: #4a6cf7; text-decoration: none; }
</style>
