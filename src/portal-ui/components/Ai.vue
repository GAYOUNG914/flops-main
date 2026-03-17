<template>
  <div v-show="isAiOpen" class="ai-container" ref="aiContainer" :style="{ width: `${width}px`, height: `${height}px` }">
    <div class="ai-board">
      <div class="board-header">
        <div class="tools">
          <button class="screen-size" @click="handleScreenSize">
            <span class="blind">manipulate screen size</span>
            <img v-if="!isScreenSizeActive" src="/portal-ui/ai/ai-screen-size-black.svg" alt="">
            <img v-if="isScreenSizeActive" src="/portal-ui/ai/ai-screen-size-black-active.svg" alt="">
          </button>
          <button class="close" @click="closeAi">
            <span class="blind">close</span>
            <img src="/portal-ui/ai/ai-close-black.svg" alt="">
          </button>
        </div>
      </div>
      <div class="background">
        <transition name="fade">
          <div v-if="!isAiStarted" class="init">
            <div class="img">
              <img src="/portal-ui/ai/ai-init-logo.svg" alt="">
            </div>
            <p class="b1_ko_s">무엇이든 물어보세요</p>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="isAiStarted" class="ing">
            <div class="img">
              <img src="/portal-ui/ai/ai-logo.svg" alt="">
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="ai-prompt">
      <div class="textarea">
        <textarea placeholder="텍스트를 입력해 주세요."></textarea>
      </div>
      <transition name="fade">
        <div class="init-buttons" v-if="!isAiStarted">
          <button class="init" @click="startAi">
            <img src="/portal-ui/ai/ai-comment.svg" alt="">
          </button>
          <button class="file">
            <img src="/portal-ui/ai/ai-clip.svg" alt="">
          </button>
        </div>
      </transition>
      <transition name="fade">
        <div class="stop-button" v-if="isAiStarted">
          <button class="stop" @click="stopAi">
            <img src="/portal-ui/ai/ai-stop.svg" alt="">
          </button>
        </div>
      </transition>
    </div>
    <button v-if="!isScreenSizeActive" class="ai-screen-handle" @mousedown="startDrag" ref="aiScreenHandle">
        <span class="blind">drag handle</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useEventBus } from '../composables/useEventBus';
import gsap from 'gsap';

const { emit, on } = useEventBus();

const isScreenSizeActive = ref(false);
const isAiOpen = ref(false);
const aiContainer = ref<HTMLElement | null>(null);
const filterHeaderHeight = ref(0);
const isDragging = ref(false);
const aiScreenHandle = ref(null);
const startX = ref(0);
const startWidth = ref(0);
const startY = ref(0);
const startHeight = ref(0);
const width = ref(480);
const height = ref(0);
const isAiStarted = ref(false);

const startAi = () => {
  console.log('startAi');
  isAiStarted.value = true;
}
const stopAi = () => {
  console.log('stopAi');
  isAiStarted.value = false;
}

const handleScreenSize = () => {
  isScreenSizeActive.value = !isScreenSizeActive.value;
  
  if (isScreenSizeActive.value) {
    // 전체화면 모드로 변경
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight - filterHeaderHeight.value;
    
    width.value = screenWidth;
    height.value = screenHeight;
  } else {
    // 원래 크기로 복원
    width.value = 480;
    height.value = window.innerHeight - 80 - filterHeaderHeight.value;
  }
  
  emit('screenSize');
}

// 이벤트 핸들러들
const handleOpenAi = () => {
  isAiOpen.value = true;
  // 화면 크기 상태 초기화
  isScreenSizeActive.value = false;
  
  // 기본 크기 설정
  width.value = 480;
  height.value = window.innerHeight - 80 - filterHeaderHeight.value;
  
  // DOM이 렌더링된 후 애니메이션 실행
  setTimeout(() => {
    // if (aiContainer.value) {
      // 슬라이딩 애니메이션
      gsap.fromTo(aiContainer.value, 
        { x: '100%' }, 
        { x: '0%', duration: 0.5, ease: 'power2.out' }
      );
    // }
  }, 10);
}
const closeAi = () => {
  gsap.to(aiContainer.value, { 
    x: '100%', 
    duration: 0.3,
    ease: 'power2.out',
    onComplete: () => {
      isAiOpen.value = false;
      emit('closeAi'); // QuickMenu에 닫기 이벤트 전달
    }
  });
}

const handleCloseAi = () => {
  isAiOpen.value = false;
}

const startDrag = (e: MouseEvent) => {
  isDragging.value = true;
  startX.value = e.clientX;
  startY.value = e.clientY;
  startHeight.value = height.value;
  
  // 현재 AI 컨테이너의 실제 width 가져오기
  // if (aiContainer.value) {
    const computedStyle = window.getComputedStyle(aiContainer.value as Element);
    const currentWidth = parseInt(computedStyle.width, 10);
    const currentHeight = parseInt(computedStyle.height, 10);
    startWidth.value = currentWidth;
    startHeight.value = currentHeight;
    width.value = currentWidth; // ref 값도 동기화
    height.value = currentHeight; // ref 값도 동기화
  // }

  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
};

const handleDrag = (e: MouseEvent) => {

  const minWidth = 400;
  const minHeight = 600;
  const maxWidth = 1800;
  const maxHeight = 1000;
  let newWidth = startWidth.value + (startX.value - e.clientX);
  let newHeight = startHeight.value + (startY.value - e.clientY);

  // 최소/최대값 적용
  newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
  newHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));

  width.value = newWidth;
  height.value = newHeight;
  emit('split-screen-resize');
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
};


onMounted(() => {
  // 이벤트 리스너 등록
  on('openAi', handleOpenAi);
  on('closeAi', handleCloseAi);

  // filter header 높이 가져오기
  filterHeaderHeight.value = document.querySelector('.filter-header')?.clientHeight || 0;
  height.value = document.querySelector('.ai-container')?.clientHeight || 0;
});
</script>

<script lang="ts">
export default {
  name: 'Ai'
}
</script>

<style scoped lang="scss">
@use '@/assets/common/_variables' as *;
@use '@/assets/common/_mixin' as *;

.ai-container{
  position: fixed;
  right: 0;
  bottom: 0;
  transform: translateX(100%);
  background-color: var(--color-wafer-blue3);
  max-width: 100% !important;
  max-height: calc(100% - $filter-header-height) !important;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  transition: width 0.1s ease, height 0.1s ease;
  padding: 14px 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1;
  .ai-board, .ai-prompt{
    border-radius: 8px;
    background-color: var(--color-white);
  }
  .ai-board{
    position: relative;
    height: 80%;
    .init, .ing{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .init{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      .img{
        width: 60px;
        img{
          width: 100%;
          object-fit: contain;
        }
      }
    }
    .ing{
      .img{
        width: 200px;
        img{
          width: 100%;
          object-fit: contain;
        }
      }
    }
  }
  .ai-prompt{
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .textarea{
      align-self: flex-start;
      padding: 16px;
      width: 83%;
      height: 100%;
      textarea{
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        resize: none;
        // background: yellow;

      }
    }
    .init-buttons{
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      .init, .file{
        width: 32px;
      }
    }
    .stop-button{
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      .stop{
        width: 60px; height: 60px;
        img{
          width: 100%;
          object-fit: contain;
        }
      }
    }
  }
  
  .tools{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    padding: 20px;
    .screen-size{
      width: 24px;
      height: 24px;
    }
    .close{
      width: 24px;
      height: 24px;
    }
  }

  .ai-screen-handle{
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 100%;
    opacity: 0;
    // background: yellow;
    cursor: grab;
  }
}
</style>