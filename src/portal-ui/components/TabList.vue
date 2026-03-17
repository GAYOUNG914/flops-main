<template>
  <div class="tab-list-root">
    <div class="tab-list-header">
      <slot
        name="tabs"
        :select="selectTab"
        :selected="modelValue"
      >
        <!-- 기본 버튼 UI (slot 미사용시) -->
        <button
          v-for="(tab) in tabs"
          :key="tab.value"
          :class="{ active: modelValue === tab.value }"
          @click="selectTab(tab.value)"
        >
          {{ tab.label }}
        </button>
      </slot>
    </div>
    <div class="tab-list-content">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string | number
  tabs?: { label: string, value: string | number }[]
}>()
const emit = defineEmits(['update:modelValue'])

function selectTab(val: string | number) {
  emit('update:modelValue', val)
}

</script>

<style lang="scss" scoped>
</style>