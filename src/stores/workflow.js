import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWorkflowStore = defineStore('workflow', () => {
  const recentList = ref([])
  const myList = ref([])

  function addWorkflow(item) {
    myList.value.unshift({ id: Date.now(), ...item, createdAt: new Date().toLocaleDateString() })
    recentList.value = myList.value.slice(0, 5)
  }

  return { recentList, myList, addWorkflow }
})
