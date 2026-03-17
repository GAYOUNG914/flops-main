<template>
  <div v-show="isQuickMenuVisible" class="quick-menu" :class="{'active': isQuickMenuActivate}">
    <button class="quick-menu-item title" @click="toggleQuickMenuActivate">
      <div class="circle f_f">
        QUICK
      </div>
    </button>
    <button class="quick-menu-item ai" @click="openAi">
      <div class="circle f_f">
        AI
      </div>
    </button>
    <button
      v-for="(item, idx) in menuItems"
      :key="idx"
      class="quick-menu-item"
    >
      <div class="quick-menu-name"><span class="b5_ko_s">{{ item.label }}</span></div>
      <div class="circle">
        <div class="quick-menu-item-icon">
          <img :src="item.icon" alt="icon" />
        </div>
      </div>
    </button>
  </div>
  <Ai />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { useEventBus } from '../composables/useEventBus';
import Ai from './Ai.vue';

const { emit, on } = useEventBus();

const isQuickMenuActivate = ref(false)
const isQuickMenuVisible = ref(true) // QuickMenu 전체 표시 여부

const menuItems = ref([
  { label: '즐겨찾기한 메뉴명', icon: './portal-ui/icon/icon-display-quickmenu.svg' },
  { label: '즐겨찾기한 메뉴명', icon: './portal-ui/icon/icon-display-quickmenu.svg' },
  { label: '즐겨찾기한 메뉴명', icon: './portal-ui/icon/icon-display-quickmenu.svg' },
])

const toggleQuickMenuActivate = () => {
  const $quickMenus = document.querySelectorAll('.quick-menu-item:not(.title)');

  // gsap실행중일때 클릭시 무시
  if (gsap.isTweening($quickMenus)) {
    return;
  }

  if (!isQuickMenuActivate.value) {
    // 활성화: 아래에서 위로 순차 fade-in
    $quickMenus.forEach(($el, idx) => {
      gsap.to($el, {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
        delay: idx * 0.08,
        duration: 0.3,
        ease: 'power2.out',
        onStart: () => {
          ($el as HTMLElement).style.display = 'flex';
        }
      })
    })
  } else {
    // 비활성화: 위에서 아래로 순차 fade-out
    Array.from($quickMenus).reverse().forEach(($el, revIdx) => {
      gsap.to($el, {
        opacity: 0,
        y: 30,
        pointerEvents: 'none',
        delay: revIdx * 0.08,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          ($el as HTMLElement).style.display = 'none'; 
        }
      })
    })
  }
  isQuickMenuActivate.value = !isQuickMenuActivate.value
}

const openAi = () => {
  // AI 열면서 후 QuickMenu fade-out

  gsap.to('.quick-menu', {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.out',
    onStart: () => {
      isQuickMenuVisible.value = false;
      emit('openAi');
    }
  });
}

// AI 닫힐 때 QuickMenu fade-in
const handleAiClose = () => {
  isQuickMenuVisible.value = true;
  gsap.fromTo('.quick-menu', 
    { opacity: 0 }, 
    { opacity: 1, duration: 0.3, ease: 'power2.out' }
  );
}

onMounted(() => {
  // 기본은 unactive (숨김)
  const $quickMenus = document.querySelectorAll('.quick-menu-item:not(.title)');
  $quickMenus.forEach(($el) => {
    gsap.set($el, { opacity: 0, y: 30, pointerEvents: 'none' })
  })
  
  // AI 닫기 이벤트 리스너 등록
  on('closeAi', handleAiClose);
})

</script>

<style lang="scss" scoped>
@use '@/assets/common/_variables' as *;
@use '@/assets/common/_mixin' as *;

.quick-menu{
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 999;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 4px;
  // &.active{
  //   .quick-menu-item{
  //     pointer-events: auto;
  //   }
  // }
  .quick-menu-item{
    position: relative;
    // display: flex;
    align-items: center;
    gap: 4px;
    opacity: 0;
    transform: translateY(30px);
    pointer-events: none;
    transition: none;
    &:not(.title){
      display: none;
    }
    &.title {
      opacity: 1 !important;
      transform: none !important;
      pointer-events: auto;
      transition: none;
      z-index: 1;
    }
    @include hoverable{
      &:hover{
        &.title .circle{
          background-color: var(--color-wafer-blue2);
        }
        &.ai .circle{
          background-color: var(--color-gray1);
        }
        &:not(.title,.ai) {
          .circle{
            background-color: var(--color-gray1);
          }
          .quick-menu-name{
            opacity: 1;
            pointer-events: auto;
            transform: translateY(-50%) translateX(0);
          }
        }
      }
    }
    &.title .circle{
      font-weight: 700;
      font-size: 11px;
      line-height: 150%;
      letter-spacing: 0.1px;
      text-align: center;
      color: var(--color-white);
      background-color: var(--color-wafer-blue1);
    }
    &.ai .circle{
      font-size: 11px;
      font-weight: 700;
      line-height: 150%;
      letter-spacing: 0.1px;
      color: var(--color-white);
      background-color: var(--color-black1);
    }
    .circle{
      position: relative;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-gray2);
      transition: background-color 0.3s ease, opacity 0.3s ease;
      .quick-menu-item-icon{
        width: 20px;
        height: 20px;
        img{
          width: 100%;
          object-fit: contain;
        }
      }
    }
    .quick-menu-name{
      position: absolute;
      right: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%) translateX(10%);
      opacity: 0;
      pointer-events: none;
      border-radius: 40px;
      padding: 6px 16px;
      background-color: var(--color-gray1);
      color: var(--color-white);
      transition: transform 0.3s, opacity 0.3s;
      white-space: nowrap;
    }
  }
}
</style>