<template>
  <div class="split-screen" :style="{ display: isVisible ? 'block' : 'none', width: `${width}px` }">
    <div class="split-screen-content" style="height: 100%;display: flex; align-items: center; justify-content: flex-start; position: relative;">
      <button class="split-screen-handle" @mousedown="startDrag">
        <img src="/portal-ui/icon/icon-three-dot.svg" alt="">
      </button>
      <div class="inner">
        <NoResultIcon message="화면을 선택해 주세요." iconImageTrack="./portal-ui/icon/icon-layout-blue.svg"/>
        <Button size="48" minWidth="160" text="My Task" style="margin-top: 20px;" />
        <Button size="48" minWidth="160" text="Map" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useEventBus } from '../composables/useEventBus';
import NoResultIcon from './NoResultIcon.vue';
import Button from './Button.vue';

const isVisible = ref(false);
const { emit } = useEventBus();
const width = ref(Math.floor(window.innerWidth * 0.4));
const isDragging = ref(false);
const startX = ref(0);
const startWidth = ref(0);

const toggleSplitScreen = () => {
  const $splitScreenFilterIcon = document.querySelector('.filter-icon.expand-right') as HTMLElement;
  if(isVisible.value){
    isVisible.value = false;
    $splitScreenFilterIcon.classList.remove('is-active');
  }else{
    isVisible.value = true;
    $splitScreenFilterIcon.classList.add('is-active');
    // 스플릿 스크린을 열 때마다 화면의 40% 너비로 초기화
    width.value = Math.floor(window.innerWidth * 0.4);
  }
  
  // 토글 후 dash-board 너비 조정
  // setTimeout(() => {
    adjustContentWidth();
  // }, 50);
};

const startDrag = (e: MouseEvent) => {
  isDragging.value = true;
  startX.value = e.clientX;
  startWidth.value = width.value;
  
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
};

const handleDrag = (e: MouseEvent) => {
  if (!isDragging.value) return;
  
  const deltaX = e.clientX - startX.value;
  const newWidth = startWidth.value - deltaX;
  
  // 전체 화면 너비의 70%를 최대 너비로 설정
  const maxWidth = Math.floor(window.innerWidth * 0.7);
  
  // 최소/최대 너비 제한 (최소 300px, 최대 화면의 70%)
  if (newWidth >= 300 && newWidth <= maxWidth) {
    width.value = newWidth;
    emit('split-screen-resize');
    // 드래그 중에 dash-board 너비 조정
    adjustContentWidth();
  }
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
};

// 리사이즈 옵저버 설정
let resizeObserver: ResizeObserver;

// dash-board 요소의 너비를 스플릿 스크린 너비에 맞게 조정하는 함수
function adjustContentWidth(){
  const $dashBoard = document.querySelector('.dash-board') as HTMLElement;
  const $splitScreen = document.querySelector('.split-screen') as HTMLElement;

  //default 화면에서는 조정하지 않음
  if($dashBoard.parentElement == document.querySelector('.slot-task')) return;
  
  if( isVisible.value){
    // 스플릿 스크린이 열려있을 때만 dash-board 너비 조정
    $dashBoard.style.position = 'absolute';
    $dashBoard.style.left = '0px';
    $dashBoard.style.width = `calc(100% - ${String($splitScreen.offsetWidth)}px)`;

    $splitScreen.style.position = 'absolute';
    $splitScreen.style.right = '0px';
  } 
  
  // else if(!isVisible.value) {
  //   // 스플릿 스크린이 닫혀있을 때는 dash-board를 원래 상태로 복원
  //   $dashBoard.style.position = '';
  //   $dashBoard.style.left = '';
  //   $dashBoard.style.width = '';
  // }
}

// 화면 크기 변화에 대응하여 스플릿 스크린 너비 조정
function adjustSplitScreenWidth() {
  const maxWidth = Math.floor(window.innerWidth * 0.7);
  
  // 현재 너비가 최대 너비를 초과하면 최대 너비로 조정
  if (width.value > maxWidth) {
    width.value = maxWidth;
    emit('split-screen-resize');
    adjustContentWidth();
  }
}

onMounted(() => {
  const splitScreen = document.querySelector('.split-screen');
  if (splitScreen) {
    resizeObserver = new ResizeObserver(() => {
      emit('split-screen-resize');
      // 리사이즈 시 dash-board 너비 조정
      adjustContentWidth();
    });
    resizeObserver.observe(splitScreen);
  }

  // 윈도우 리사이즈 이벤트 리스너 추가
  window.addEventListener('resize', adjustSplitScreenWidth);

  // 초기 설정
  adjustContentWidth();
});

onUnmounted(() => {
  resizeObserver.disconnect();

  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
  window.removeEventListener('resize', adjustSplitScreenWidth);
});

defineExpose({
  toggleSplitScreen
});
</script>

<script lang="ts">
export default {
  name: 'SplitScreen'
}
</script>

<style scoped lang="scss">
.split-screen {
  height: 100%;
  background-color: var(--color-white);
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);

  .split-screen-handle{
    position: relative;
    right: 0;
    top: 0;
    z-index: 2;
    cursor: grab;
    height: 100%;
    width: 24px;
    padding-right: 20px;
    box-sizing: content-box;
    img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    object-fit: contain;
    }
  }
  
  .inner{
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    gap: 20px; 
    .no-result{
      height: auto;
    }
  }
}
</style>