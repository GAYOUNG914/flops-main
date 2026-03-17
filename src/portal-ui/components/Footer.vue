<template>
  <footer class="main-footer">
    <h1 class="h1_en">
      <span>F</span>
      <span>L</span>
      <span>O</span>
      <span>P</span>
      <span>S</span>
    </h1>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 스크롤 시 footer가 반쯤 보일 때 푸터에 active 붙여줘
const footerRef = ref<HTMLElement | null>(null)

// 옵저버로 footer 반 쯤 보일 때 푸터에 active 붙여줘
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const ratio = entry.intersectionRatio
      if (ratio >= 0.5) {
        footerRef.value?.classList.add('active')
      } else {
        footerRef.value?.classList.remove('active')
      }
    }
  })  
},
{
  threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // 여러 임계값 설정
  rootMargin: '0px'
}
)

onMounted(() => {
  footerRef.value = document.querySelector('.main-footer') as HTMLElement
  observer.observe(footerRef.value)
})

onUnmounted(() => {
  footerRef.value?.classList.remove('active')
  observer.disconnect()
})
</script>

<style lang="scss" scoped>
@use '@/assets/common/_mixin' as *;
@use '@/assets/common/_variables' as *;

.main-footer {
  width: 100%;
  margin-top: -50px;
  background: var(--color-black1);
  color: #fff;
  overflow: hidden;
  &.active{
    h1 span{
      transform: translateY(0);
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    }
  }
  h1{
    transform: translateY(110px);
    text-align: center;
    span{
      display: inline-block;
      transform: translateY(300px);
      // transition: transform 0.5s ease-in-out;
      @for $i from 1 through 5 {
        &:nth-child(#{$i}){
          transition-delay: $i * 0.1s;
        }
      }
    }
  }
}
</style>