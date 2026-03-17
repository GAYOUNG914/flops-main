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
          <h1 class="logo-text" ref="logoTextRef">
            <!-- <span class="blind">FLOPS</span> -->
            <img src="/portal-ui/intro/intro-logo.svg" alt="FLOPS">
          </h1>
        </div>
        <div class="rectangle" ref="rectangleRef"></div>
        <p class="tagline f_f" ref="taglineRef">Powered by SSQS</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

interface Props {
  screenStartWithBlur?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  screenStartWithBlur: () => []
})

const emit = defineEmits<{
  complete: []
}>()

const isVisible = ref(true)
const isFadingOut = ref(false)

const logoTextRef = ref<HTMLElement | null>(null)
const taglineRef = ref<HTMLElement | null>(null)
const rectangleRef = ref<HTMLElement | null>(null)
const introScreenRef = ref<HTMLElement | null>(null)
const backgroundElementsRef = ref<HTMLElement | null>(null)

let timeline: GSAPTimeline | null = null

const startAnimation = () => {
  timeline = gsap.timeline({
    onComplete: () => {
        fadeOut()
    }
  })

  // 초기 상태 설정
  gsap.set([logoTextRef.value, taglineRef.value], {
    opacity: 0,
    filter: 'blur(10px)',
  })

  gsap.set(rectangleRef.value, {
    width: 0,
    height: 0,
  })

  // screenStartWithBlur 요소들의 초기 상태 설정
  if (props.screenStartWithBlur && props.screenStartWithBlur.length > 0) {
    props.screenStartWithBlur.forEach(selector => {
      gsap.set(selector, {
        scale: 1.02,
        filter: 'blur(10px)',
      })
    })
  }

  // 애니메이션 시퀀스
  timeline

    // 로고 텍스트 등장
    .to(logoTextRef.value, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    }, 0.2)
    
    // 태그라인 등장
    .to(taglineRef.value, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    }, 0.3)

    .to(rectangleRef.value, {
      width: '105vw',
      height: '110vh',
      duration: 1.2,
      ease: 'power4.out',
    }, 1.2)

    // 로고 텍스트 등장
    .to(logoTextRef.value, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 1.2)
    
    // 태그라인 등장
    .to(taglineRef.value, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 1.2)    

    .to(backgroundElementsRef.value, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
    }, 1)


  // screenStartWithBlur 요소들의 애니메이션
  if (props.screenStartWithBlur && props.screenStartWithBlur.length > 0) {
    props.screenStartWithBlur.forEach(selector => {
      timeline!.to(selector, {
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power1.inOut',
      }, 1.2)
    })
  }

  timeline.to(introScreenRef.value, {
    opacity: 0,
    duration: 0.2,
    ease: 'power2.inOut',
  }, 1.8)
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
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;

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
  // margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
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

.logo-text {
  // font-family: var(--font-family-futura, 'Arial', sans-serif);
  // font-size: 72px;
  // font-weight: 700;
  // color: #ffffff;
  // letter-spacing: 4px;
  // text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  img{
    width: 460px;
    object-fit: contain;
  }
}

.tagline {
  font-size: 28px;
  font-weight: 400;
  line-height: 180%;
  text-align: center;
  color: var(--color-white);
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