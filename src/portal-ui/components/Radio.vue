<template>
  <label :class="['radio', { checked: isChecked, disabled }]">
    <input
      type="radio"
      :checked="isChecked"
      :disabled="disabled"
      :name="name"
      :value="value"
      @change="handleChange"
    />
    <span class="radio-icon"></span>
    <span class="radio-label b3_ko_s" :title="label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number, Boolean], // v-model로 받을 현재 선택된 값
  value: [String, Number, Boolean],      // 이 라디오 버튼의 값
  disabled: Boolean,
  label: String,
  name: String
})

const emit = defineEmits(['update:modelValue'])

// 현재 라디오 버튼이 선택되었는지 확인
const isChecked = computed(() => props.modelValue === props.value)

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.checked) {
    emit('update:modelValue', props.value)
  }
}
</script>

<script lang="ts">
export default {
  name: 'Radio'
}
</script>

<style scoped lang="scss">
.radio {
  display: flex; align-items: center; gap: 8px; cursor: pointer;
  input { display: none; }
  .radio-icon {
    width: 20px; height: 20px; border-radius: 50%;
    position: relative; transition: background 0.2s ease;
    background: url('/portal-ui/icon/radio-unchecked.svg') no-repeat center center / contain;
  }
  &.checked {
    .radio-icon {
    background: url('/portal-ui/icon/radio-checked.svg') no-repeat center center / contain;
    }    
    .radio-label{
      font-weight: 700 !important;
    }
  }
  &.disabled {
    cursor: not-allowed;
    .radio-icon { 
      background: url('/portal-ui/icon/radio-unchecked-disabled.svg') no-repeat center center / contain; 
    }
    .radio-label{
      color: var(--color-gray3);
    }
  }
  &.checked.disabled .radio-icon {
    background: url('/portal-ui/icon/radio-checked-disabled.svg') no-repeat center center / contain;
  }
  .radio-label {
    color: var(--color-black1);
    &:after{
      content: attr(title);
      display: block;
      font-weight: 700 !important;
      height: 0px;
      visibility: hidden;
    }
  }
}
</style>