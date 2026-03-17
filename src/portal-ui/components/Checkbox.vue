<template>
  <label :class="['checkbox', { checked, disabled }]">
    <input
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="checkbox-icon"></span>
    <span class="checkbox-label">
      <slot><span :class="labelClass">{{ label }}</span></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
defineProps({
  checked: Boolean,
  disabled: Boolean,
  label: String,
  labelClass: String
})

const emit = defineEmits(['update:checked'])

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:checked', target.checked)
}
</script>

<style scoped lang="scss">
.checkbox {
  display: flex; align-items: center; gap: 8px; cursor: pointer;
  input { display: none; }
  .checkbox-icon {
    width: 20px; height: 20px; 
    border: 1px solid var(--color-gray3);
    background: var(--color-white);
    position: relative;
  }
  &.disabled {
    cursor: not-allowed;
    .checkbox-icon { 
      border: 1px solid var(--color-bg2);
      background: var(--color-white);
    }
    .checkbox-label{
      color: var(--color-gray3); 
    }
  }
  &.checked {
    .checkbox-icon {
      border: none;
      background: url('/portal-ui/icon/checkbox-checked.svg') no-repeat center center / contain;
    }
  }
  &.checked.disabled {
    .checkbox-icon {
      border: none;
      background: url('/portal-ui/icon/checkbox-checked-disabled.svg') no-repeat center center / contain;
    }
    .checkbox-label{
      font-weight: 700 !important;
    }
  }
}
</style> 