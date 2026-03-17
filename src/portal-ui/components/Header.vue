<template>
  <!-- 메인화면의 gnb에만 main-gnb 클래스 부여 -->
   <!-- Header.vue 컴포넌트는 메인에서만 쓰고있음 -->
  <Gnb class="main-gnb"/>

  <header class="main-header">
    <div class="logo-icon">
      <img src="/portal-ui/main/main-logo.png" alt="">
    </div>
    <!-- gnb 컴포넌트 추가 필요-->

    <!-- <button class="btn-gnb-toggle">
      <img src="/portal-ui/gnb/img-gnb-handle-black.svg" alt="gnb toggle btn">
      <span>MENU</span>
    </button> -->
  </header>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import Gnb from './Gnb.vue';

// const isOpen = ref(false);

// const toggleGnb = () => {
//   isOpen.value = !isOpen.value;
// };
</script>

<style lang="scss" scoped>
@use '@/assets/common/_mixin' as *;
@use '@/assets/common/_variables' as *;


header.main-header {
  // position: fixed;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  z-index: 1;

  // 임시 0624 추가
  filter: blur(10px);
  transform: scale(1.02);
  .logo-icon{
    width: 121px;
    img{
      width: 100%;
      object-fit: contain;
    }
  }
  .btn-gnb-toggle{
      display: inline-block;
      position: absolute;
      left: 50%;
      top: -9%;
      transform: translateX(-50%);
      width: 112px; height: 32px;
      span{
        font-family: var(--font-family-en);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 13px;
        line-height: 140%;
        font-weight: 700;
        letter-spacing: 1px;
        color: var(--color-white);
        &:after{
          content: '';
          display: block;
          width: 16px;
          height: 16px;
          background-image: url('/portal-ui/icon/icon-arrow-down-white.svg');
          background-size: contain;
          background-repeat: no-repeat;
          transition: transform 0.2s $ease-out-rowan;
        }
      }
      img{
        width: 100%;
        object-fit: contain;
      }
    }
}
</style>