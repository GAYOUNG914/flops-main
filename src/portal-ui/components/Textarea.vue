<template>
  <div class="textarea-wrapper">
    <div 
      class="textarea-container"
      :class="containerClasses"
    >
      <textarea
        ref="textareaRef"
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="disabled || readOnly || completed"
        :readonly="readOnly || completed"
        :maxlength="maxLength"
        class="textarea-input b4_ko_s"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      />

        <div class="textarea-bottom">
        <!-- Error message -->
        <div v-if="error && errorMessage" class="error-message b5_ko_s">
          {{ errorMessage }}
        </div>

        <!-- Character count -->
        <div v-if="maxLength" class="character-count b5_ko_s">
          <span class="character-count-number">{{ inputValue.length }}</span>/{{ maxLength }}
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  maxLength?: number
  disabled?: boolean
  readOnly?: boolean
  completed?: boolean
  error?: boolean
  errorMessage?: string
}

interface Emits {
  (e: 'update:modelValue' | 'input', value: string): void
  (e: 'focus' | 'blur'): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Placeholder text',
})

const emit = defineEmits<Emits>()

const textareaRef = ref<HTMLTextAreaElement>()
const inputValue = ref(props.modelValue)
const isFocused = ref(false)
const isHovered = ref(false)
const hasContent = ref(false)

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
  hasContent.value = newValue.length > 0
})

// Update hasContent when inputValue changes
watch(inputValue, (newValue) => {
  hasContent.value = newValue.length > 0
})

const containerClasses = computed(() => {
  return {
    'textarea-container--focus': isFocused.value && !props.disabled && !props.readOnly && !props.completed,
    'textarea-container--pressed': hasContent.value && !props.completed,
    'textarea-container--completed': props.completed,
    'textarea-container--hover': isHovered.value && !props.disabled && !props.readOnly && !props.completed && !isFocused.value,
    'textarea-container--disabled': props.disabled,
    'textarea-container--error': props.error,
    'textarea-container--readonly': props.readOnly
  }
})

const handleFocus = () => {
  if (!props.disabled && !props.readOnly && !props.completed) {
    isFocused.value = true
    emit('focus')
  }
}

const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  const value = target.value
  
  inputValue.value = value
  emit('update:modelValue', value)
  emit('input', value)
}

// Expose methods for parent component
defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  clear: () => {
    inputValue.value = ''
    emit('update:modelValue', '')
  }
})
</script>

<script lang="ts">
export default {
  name: 'TextareaComponent',
}
</script>

<style scoped lang="scss">
.textarea-wrapper {
  width: 100%;
  /* margin-bottom: 16px; */
}

.textarea-container {
  background-color: transparent;
  transition: all 0.2s ease;
}

.textarea-input {
  width: 100%;
  padding: 14px 18px;
  // resize: vertical;
  background: transparent;
  color: var(--color-black);
  border-radius: 4px;
  border: 1px solid var(--color-gray4);
  resize: none;
  outline: none; // 포커스 시 기본 파란 선 없애기!!
  transition: all 0.2s ease;
}

.textarea-input::placeholder {
  color: var(--color-gray3);
}

.textarea-bottom{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
.character-count {
  color: var(--color-gray3);
  margin-left: auto;
}

.error-message {
  color: var(--color-error1);
  margin-right: auto;
}

/* Focus State */
.textarea-container--focus {
  border-color: var(--color-black);
}

/* Pressed State */
.textarea-container--pressed{
  .textarea-input{
    border-color: var(--color-black);
  }
  .character-count-number{
    color: var(--color-black);
  }
}

/* Completed State */
.textarea-container--completed {
  border-color: var(--color-gray4);
  .character-count-number{
    color: var(--color-black);
  }
}

.textarea-container--completed .textarea-input {
  cursor: not-allowed;
}

/* Hover State */
.textarea-container--hover {
  .textarea-input{
    border-color: var(--color-black);
    color: var(--color-black);
    &::placeholder{
      color: var(--color-black);
    }
  }
}

/* Disabled State */
.textarea-container--disabled {
  border-color: var(--color-gray4);
  color: var(--color-gray4);
  cursor: not-allowed;
}

.textarea-container--disabled .textarea-input {
  color: #6b7280;
  cursor: not-allowed;
}

/* Error State */
.textarea-container--error .textarea-input {
  border-color: var(--color-error1);
}

.textarea-container--error .character-count {
  color: var(--color-error1);
}

/* Read Only State */
.textarea-container--readonly .textarea-input{
  border-color: var(--color-gray3);
  color: var(--color-gray2);
  cursor: not-allowed;
}
</style>