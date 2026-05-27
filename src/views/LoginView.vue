<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const showPassword = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMsg.value = '請填寫帳號與密碼'
    return
  }
  errorMsg.value = ''
  loading.value = true
  await new Promise(r => setTimeout(r, 700))
  loading.value = false
  router.push('/admin/dashboard')
}
</script>

<template>
  <div class="page">
    <div class="card">
      <!-- Logo -->
      <div class="logo">
        <span class="material-icons-outlined logo-icon">eco</span>
        <div class="logo-text-wrap">
          <span class="logo-text">Eco Sensing</span>
          <span class="logo-tagline">企業自動化碳排查平台</span>
        </div>
      </div>

      <h1 class="title">登入</h1>
      <p class="subtitle">請使用管理員帳號登入企業後台</p>

      <!-- 表單 -->
      <form @submit.prevent="handleLogin">
        <div class="field">
          <label>帳號</label>
          <input
            v-model="username"
            type="text"
            placeholder="管理員帳號 / 電子郵件"
            autocomplete="username"
          >
        </div>

        <div class="field">
          <label>密碼</label>
          <div class="pw-wrap">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="請輸入密碼"
              autocomplete="current-password"
            >
            <button type="button" class="eye" @click="showPassword = !showPassword" tabindex="-1">
              <span class="material-icons-outlined">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
        </div>

        <div class="row-between">
          <label class="remember"><input type="checkbox"> 記住我</label>
          <a href="#" class="link">忘記密碼？</a>
        </div>

        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

        <button type="submit" class="submit-btn" :disabled="loading">
          <span v-if="!loading">登入</span>
          <span v-else class="spinner"></span>
        </button>
      </form>

      <p class="footer-hint">尚未有帳號？<a href="#" class="link">聯絡管理員</a></p>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--sb-canvas-warm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 24px;
}

.card {
  background: var(--sb-white);
  border-radius: var(--sb-radius-card);
  padding: 40px 36px;
  width: 100%;
  max-width: 400px;
  box-shadow: var(--sb-shadow-card);
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 28px;
}
.logo-icon {
  font-size: 26px;
  color: var(--sb-green-accent);
}
.logo-text-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: var(--sb-green-brand);
  letter-spacing: -0.16px;
  line-height: 1.2;
}
.logo-tagline {
  font-size: 11px;
  font-weight: 500;
  color: var(--sb-text-soft);
  line-height: 1.3;
}

/* Heading */
.title {
  font-size: 24px;
  font-weight: 600;
  color: var(--sb-green-brand);
  margin: 0 0 4px;
  letter-spacing: -0.16px;
}
.subtitle {
  font-size: 14px;
  color: var(--sb-text-soft);
  margin: 0 0 24px;
}

/* Fields */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}
.field label {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}
.field input,
.pw-wrap input {
  border: 1px solid var(--sb-ceramic);
  border-radius: var(--sb-radius-card);
  padding: 12px 14px;
  font-size: 14px;
  color: var(--sb-text);
  outline: none;
  transition: border-color 0.2s ease;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
  background: var(--sb-neutral-cool);
}
.field input:focus,
.pw-wrap input:focus {
  border-color: var(--sb-green-accent);
  background: var(--sb-white);
}
.field input::placeholder,
.pw-wrap input::placeholder {
  color: #c4c9d4;
}

.pw-wrap {
  position: relative;
}
.pw-wrap input {
  padding-right: 40px;
}
.eye {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #9ca3af;
  display: flex;
  align-items: center;
}
.eye:hover { color: var(--sb-green-accent); }
.eye .material-icons-outlined { font-size: 18px; }

/* Options row */
.row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.remember {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
}
.remember input { accent-color: var(--sb-green-accent); cursor: pointer; }
.link {
  font-size: 13px;
  color: var(--sb-green-accent);
  text-decoration: none;
  font-weight: 600;
}
.link:hover { text-decoration: underline; }

/* Error */
.error {
  font-size: 13px;
  color: #ef4444;
  margin: -8px 0 12px;
}

/* Submit */
.submit-btn {
  width: 100%;
  padding: 12px 16px;
  background: var(--sb-green-accent);
  border: 1px solid var(--sb-green-accent);
  border-radius: var(--sb-radius-pill);
  color: var(--sb-white);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  letter-spacing: -0.01em;
}
.submit-btn:hover:not(:disabled) {
  background: var(--sb-green-brand);
  border-color: var(--sb-green-brand);
}
.submit-btn:active:not(:disabled) {
  transform: scale(0.95);
}
.submit-btn:disabled { opacity: .65; cursor: not-allowed; }

.spinner {
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255, 255, 255, .4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin .65s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Footer */
.footer-hint {
  text-align: center;
  font-size: 13px;
  color: #9ca3af;
  margin-top: 20px;
}
</style>
