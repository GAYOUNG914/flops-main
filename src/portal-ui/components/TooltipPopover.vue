<template>
  <transition name="tooltip-fade">
    <div
      v-if="visible"
      class="tooltip-popover"
      :class="[size, arrowPosition]"
      :style="popoverStyle"
      ref="popover"
    >
      <div class="tooltip-arrow" :class="arrowPosition"></div>
      <div class="tooltip-content">
        <slot />
        <Button class="tooltip-close-custombtn" size="32" minWidth="86" fontColor="gray1" lineColor="gray4" backgroundColor="white" @click.stop="close">닫기</Button>
      </div>
      <button v-if="showClose" class="tooltip-close" @click.stop="close"></button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import Button from './Button.vue';

const props = defineProps({
  visible: { type: Boolean, default: false },
  size: { type: String, default: 'medium' }, // small, medium, large, custom
  arrowPosition: { type: String, default: 'top' }, // top, bottom, left, right
  showClose: { type: Boolean, default: false },
  width: { type: [String, Number], default: '' }, // custom width
  maxWidth: { type: [String, Number], default: '' }
})
const emit = defineEmits(['close'])

function close() {
  emit('close')
}

const popoverStyle = computed(() => ({
  width: props.width ? (typeof props.width === 'number' ? `${String(props.width)}px` : props.width) : '',
  maxWidth: props.maxWidth ? (typeof props.maxWidth === 'number' ? `${String(props.maxWidth)}px` : props.maxWidth) : ''
}))
</script>

<script lang="ts">
export default {
  name: 'TooltipPopover'
}
</script>

<style scoped lang="scss">
.tooltip-popover {
  position: absolute;
  z-index: 2000;
  background: var(--color-white);
  border: 1px solid var(--color-gray3);
  border-radius: 8px;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.08);
  padding: 20px;
  min-width: 180px;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.2s;
  font-size: 16px;
  color: var(--color-black1, #222);
  cursor: auto;
  .tooltip-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    background: url('/portal-ui/icon/icon-tooltip-close.svg') no-repeat center/contain;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  &.small { min-width: 120px; max-width: 220px; }
  &.medium { min-width: 240px; max-width: 400px; }
  &.large { min-width: 400px; max-width: 600px; }
  &.custom { min-width: unset; max-width: unset; }
}
.tooltip-content {
  width: 100%;
}
.tooltip-arrow {
  position: absolute;
  width: 18px;
  height: 12px;
  &.top {
    right: 32px;
    top: -7px;
    background: url('/portal-ui/icon/tooltip-arrow-top.svg') no-repeat center/contain;
  }
  &.bottom {
    left: 32px;
    bottom: -7px;
    background: url('/portal-ui/icon/tooltip-arrow-bottom.svg') no-repeat center/contain;
  }
  &.left {
    left: -12px;
    top: 24px;
    background: url('/portal-ui/icon/tooltip-arrow-left.svg') no-repeat center/contain;
  }
  &.right {
    right: -12px;
    top: 24px;
    background: url('/portal-ui/icon/tooltip-arrow-right.svg') no-repeat center/contain;
  }
}

.tooltip-close-custombtn{
  position: absolute;
  bottom: 20px;
  right: 20px;
}

/* 간단한 페이드 효과 */
.tooltip-fade-enter-active, .tooltip-fade-leave-active {
  transition: opacity 0.18s;
}
.tooltip-fade-enter-from, .tooltip-fade-leave-to {
  opacity: 0;
}
.tooltip-fade-enter-to, .tooltip-fade-leave-from {
  opacity: 1;
}
</style>