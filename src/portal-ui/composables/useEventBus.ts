import { ref } from 'vue'

type EventCallback = () => void

const eventBus = ref<{ [key: string]: EventCallback[] }>({})

export function useEventBus() {
  const emit = (event: string) => {
    const callbacks = eventBus.value[event] ?? []
    callbacks.forEach(callback => {
      callback()
    })
  }

  const on = (event: string, callback: EventCallback) => {
    // if (!eventBus.value[event]) {
      eventBus.value[event] = []
    // }
    eventBus.value[event].push(callback)
  }

  return {
    emit,
    on
  }
} 