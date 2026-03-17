<template>
  <div v-if="isVisible" class="intro-screen" :class="{ 'fade-out': isFadingOut }" ref="introScreenRef">
    <div class="intro-content">
      <!-- Background Elements -->
      <div class="background-elements" ref="backgroundElementsRef">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>

      <!-- Main Logo Animation -->
      <div class="logo-container">
        <div class="logo-wrapper">
           <div class="logo-img">
            <div class="old" ref="oldLogoRef"><img src="/portal-ui/intro/intro-logo-old.png" alt="Old FLOPS logo"></div>
            <div class="new" ref="newLogoRef">
              <lottie-player
                ref="newLogoLottieInstance"
                src="./portal-ui/intro/flops_logo.json"
                background="transparent"
                speed="0.9"
              ></lottie-player>      
            </div>
           </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import '@lottiefiles/lottie-player';
import type { LottiePlayerElement } from '@/types/lottie-player';

const emit = defineEmits<{
  complete: []
}>()

const isVisible = ref(true)
const isFadingOut = ref(false)

// const taglineRef = ref<HTMLElement | null>(null)
// const rectangleRef = ref<HTMLElement | null>(null)
const introScreenRef = ref<HTMLElement | null>(null)
const backgroundElementsRef = ref<HTMLElement | null>(null)
const oldLogoRef = ref<HTMLElement | null>(null)
const newLogoRef = ref<HTMLElement | null>(null)
const newLogoLottieInstance = ref<LottiePlayerElement | null>(null)

let timeline: GSAPTimeline | null = null

const playNewLogoLottie = () => { 
  newLogoLottieInstance.value?.play()
}

const startAnimation = () => {
  timeline = gsap.timeline({
    onComplete: () => {
        fadeOut()
    }
  })

  // 초기 상태 설정
  gsap.set([oldLogoRef.value, newLogoRef.value], {
    opacity: 0,
    filter: 'blur(10px)',
  })

  gsap.set(introScreenRef.value, {
    opacity: 1,
  })

  // 애니메이션 시퀀스
  timeline
    // 구로고 텍스트 등장
    .to(oldLogoRef.value, {
      opacity: 1,
      filter: 'blur(0px)',
      // y: 0,
      duration: 0.7,
      ease: 'power2.out',
    }, 0.2)
    .to(oldLogoRef.value, {
      opacity: 0,
      // y: 0,
      duration: 1,
      ease: 'power1.out',
    }, 1)

    // 신로고 텍스트 등장
    .add(() => {
      playNewLogoLottie()
    }, 1.6)
    .to(newLogoRef.value, {
      opacity: 0.8,
      filter: 'blur(0px)',
      // y: 0,
      duration: 0.5,
      // ease: 'power1.out'
    }, 1.6)    

    // 인트로 화면 페이드아웃
    .to(introScreenRef.value, {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut',
    }, 5.5)

    .to('.intro', {
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power1.inOut',
    }, 5.5)

    .to('header.main-header', {
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power1.inOut',
    }, 5.5)

}

const fadeOut = () => {
  isFadingOut.value = true

  isVisible.value = false
  emit('complete')

}

onMounted(() => {
  startAnimation()
})

onUnmounted(() => {
  if (timeline) {
    timeline.kill()
  }
})
</script>

<script lang="ts">
export default {
  name: 'IntroScreen'
}
</script>

<style scoped lang="scss">
.intro-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  // background: linear-gradient(135deg, #0a0a23 0%, #1a1a3a 50%, #0f0f2a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
  background: var(--color-black);

  // opacity: 0;
  
  &.fade-out {
    pointer-events: none;
  }
}

.intro-content {
  position: relative;
  text-align: center;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.background-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
  animation: float 3s ease-in-out infinite;
  
  &.orb-1 {
    width: 400px;
    height: 400px;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &.orb-2 {
    width: 300px;
    height: 300px;
    background: linear-gradient(45deg, #06b6d4, #3b82f6);
    top: 60%;
    right: 15%;
    animation-delay: 2s;
  }
  
  &.orb-3 {
    width: 250px;
    height: 250px;
    background: linear-gradient(45deg, #8b5cf6, #ec4899);
    bottom: 30%;
    left: 20%;
    animation-delay: 4s;
  }
}

.logo-container {
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  .rectangle{
    width: 110vw;
    height: 110vh;
    box-shadow: 0 0 0 100vw var(--color-black);
    background: transparent;
  }
  .logo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    // margin-bottom: 32px;
  }
}



.logo-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 24px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  img {
    width: 80px;
    height: auto;
    filter: brightness(0) invert(1);
  }
}

.logo-img {
  .old, .new{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .old{
    width: 324px;
    img{
      width: 100%;
      object-fit: contain;
    }
  }
  .new{
    width: 600px;
    img{
      width: 100%;
      object-fit: contain;
    }
  }
}

.tagline {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.loading-bar {
  width: 200px;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1px;
  overflow: hidden;
  position: relative;
}

.loading-progress {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  border-radius: 1px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: shimmer 2s infinite;
  }
}

.loading-text {
  font-size: 12px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 1px;
  text-transform: uppercase;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-200px) scale(1.15);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

</style> 