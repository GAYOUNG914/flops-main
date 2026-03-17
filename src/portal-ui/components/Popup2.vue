<template>
  <transition name="popup-fade">
    <div v-if="visible" class="popup-deem" @click.self="handleClose">
      <div
        class="popup-container"
        :style="{ width: width + 'px', minHeight: minHeight + 'px' }"
        :class="sizeClass"
      >
        <div class="popup-container-inner">
          <button v-if="showClose" class="popup-close" @click="handleClose"></button>
          <div class="popup-content">
            <div class="header">
              <div class="title">
                <span class="h8_ko_s">
                  <slot name="title" />
                </span>
              </div>
            </div>
            <div class="content">
              <slot name="content" />
            </div>
            <div class="bottom">
              <div class="left">
                <slot name="bottom-left" />
              </div>
              <div class="right">
                <slot name="bottom-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, onUnmounted, watch } from 'vue'

  const props = defineProps({
    visible: { type: Boolean, default: false },
    width: { type: String, default: '400' },
    minHeight: { type: Number, default: 120 },
    size: { type: String, default: '' }, // 'small', 'medium', 'large' 등
    showClose: { type: Boolean, default: true },
  })
  const emit = defineEmits(['close'])

  function handleClose() {
    emit('close')
  }

  const sizeClass = props.size ? `popup-${props.size}` : ''

  // body 스크롤 제어
  const lockScroll = () => {
    document.body.style.overflow = 'hidden'
  }
  const unlockScroll = () => {
    document.body.style.overflow = ''
  }

  watch(
    () => props.visible,
    (val) => {
      if (val) lockScroll()
      else unlockScroll()
    }
  )

  onUnmounted(() => {
    unlockScroll()
  })
</script>

<script lang="ts">
export default {
  name: 'Popup2'
}
</script>

<style scoped lang="scss">
@use '@/assets/common/_mixin' as *;
@use '@/assets/common/_variables' as *;

.popup-deem {
  position: fixed;
  z-index: 1000;
  inset: 0;
  background: var(--color-deem);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-container {
  overflow: auto;
  background: var(--color-white);
  border-radius: 8px;
  position: relative;
  padding: 20px 4px 12px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 90vw;
  max-height: 90vh;
}
.popup-container-inner{
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  // background: yellow;
  padding: 20px 20px 12px 20px;
  &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--color-gray4);
      border-radius: 8px;
    }
    &::-webkit-scrollbar-track{
      margin: 4px !important;
    }
}
.popup-close {
  position: absolute;
  top: 32px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  background: url('/portal-ui/icon/icon-popup-close.svg') no-repeat center center;
  background-size: 100% 100%;
  width: 32px;
  height: 32px;
  transition: transform 0.2s ease-in-out;
  @include hoverable{
    &:hover{
      transform: rotate(90deg);
    }
  }
}
.popup-content {
  width: 100%;
  .bottom{
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 40px;
    .left{
      display: flex;
      align-items: center;
      gap: 8px;
      margin-right: auto;
    }
    .right{
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }
  }
}
.popup-footer {
  margin-top: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 12px;
}
.popup-small { width: 320px !important; }
.popup-medium { width: 400px !important; }
.popup-large { width: 560px !important; }

.popup-fade-enter-active, .popup-fade-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4,0,0.2,1);
}
.popup-fade-enter-from, .popup-fade-leave-to {
  opacity: 0;
}
.popup-fade-enter-to, .popup-fade-leave-from {
  opacity: 1;
}

.popup-default{
  :deep(.popup-container){
    padding: 20px 4px 2px;
    .popup-container-inner{
      padding: 4px 20px 20px;
      .popup-close{
        display: none;
      }
      .popup-default-content{
        display: flex;
        flex-direction: column;
        align-content: center;
        gap: 8px;
        .default-header{
          text-align: center;
          .title span{
            font-weight: 700 !important;
          }
          .sub-title{
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
              vertical-align: middle;
            }
          }
        }
        .default-content{
          text-align: center;
          .desc span{
            color: var(--color-gray1);
          }
        }
        .default-bottom{
          display: flex;
          align-items: center;
          margin-top: 16px;
          gap: 8px;
          .btn{
            max-width: 312px; 
            flex: 1;
          }
        }
      }
    }
  }
}
</style>