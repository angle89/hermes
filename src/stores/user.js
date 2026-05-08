import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const username = ref('')
  const gPoints = ref(0)
  const plan = ref('免费版')

  function login(name) {
    isLoggedIn.value = true
    username.value = name
  }
  function logout() {
    isLoggedIn.value = false
    username.value = ''
    gPoints.value = 0
  }

  return { isLoggedIn, username, gPoints, plan, login, logout }
})
