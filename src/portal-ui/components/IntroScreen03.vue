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
          <div class="video-wrap">
            <video muted playsinline loop ref="videoRef">
              <source src="/portal-ui/main/final333.webm" type="video/webm">
              <!-- <source src="/portal-ui/main/video-globe.mov" type="video/mov"> -->
            </video>
          </div>
          <h1 class="logo-text" ref="logoTextRef">
            <img src="/portal-ui/intro/intro-logo.svg" alt="FLOPS">
          </h1>
          <p class="tagline f_f" ref="taglineRef">Powered by SSQS</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits<{
  complete: []
}>()

const isVisible = ref(true)
const isFadingOut = ref(false)

const introScreenRef = ref<HTMLElement | null>(null)
const backgroundElementsRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const logoTextRef = ref<HTMLElement | null>(null)
const taglineRef = ref<HTMLElement | null>(null)

let timeline: GSAPTimeline | null = null


const startAnimation = () => {
  timeline = gsap.timeline({
    onComplete: () => {
        fadeOut()
    }
  })


  gsap.set(introScreenRef.value, {
    opacity: 1,
  })

  gsap.set(videoRef.value, {
    y: 100,
    opacity: 0,
  })

  gsap.set(logoTextRef.value, {
    opacity: 0,
    y: 100,
  })

  gsap.set(taglineRef.value, {
    opacity: 0,
    y: 100,
  })

  // 애니메이션 시퀀스
  timeline
    .to(videoRef.value, {
      opacity: 1,
      duration: 1.2,
      ease: 'power1.inOut',
      onStart: () => {
        videoRef.value?.play()
      }
    }, 0.5)

    .to(videoRef.value, {
      y: 0,
      duration: 1.2,
      ease: 'power1.inOut',
    }, 2)

    .to(logoTextRef.value, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power1.inOut',
    }, 2)

    .to(taglineRef.value, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power1.inOut',
    }, 2)

    // 인트로 화면 페이드아웃
    .to(introScreenRef.value, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
    }, 3.5)

    .to('.intro', {
      scale: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power1.inOut',
    }, 4)

    .to('header.main-header', {
      scale: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power1.inOut',
    }, 4)

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .logo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: -5%;
    .video-wrap{
      position: relative;
      left: -10%;
      width: 1000px;
      video{
        width: 100%;
        object-fit: contain;

        image-rendering: crisp-edges;
        filter: contrast(0.6) brightness(2) saturate(4.3);
        transform: translateZ(0);
        will-change: transform;
        backface-visibility: hidden; 
      }
    }
    .logo-text{
      width: 345px;
      img{
        width: 100%;
        object-fit: contain;
      }
    }

    .tagline {
      margin-top: 40px;
      font-size: 28px;
      font-weight: 400;
      line-height: 180%;
      text-align: center;
      color: var(--color-white);
    }
  }
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