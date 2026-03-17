<template>
  <div>
    <!-- Intro Screen -->
    <IntroScreen02 v-if="showIntro" @complete="onIntroComplete" />
    
    <Header />
    <div id="MAIN" class="loaded" :class="{ 'intro-active': showIntro }">
      <div class="inner">

        <section class="intro">
          <div class="inner-intro">
            <div class="globe-elements sticky-height">
              <div class="sticky">
                <div class="sticky-inner">
                  <div class="img-glob" ref="globeRef">
                    <!-- <div class="globe-text">
                      <span class="flops on">FLOPS</span>
                      <span class="ai">AI</span>
                    </div> -->
                    <video
                      preload="none"
                      autoplay
                      muted
                      loop
                      playsinline
                      loading="lazy"
                      :src="videoSrc"
                    >
                    </video>
                  </div>
                </div>
              </div>
            </div>
            <div class="intro-section-1">
              <div class="title-text">
                <h2 class="title h3_en">OPTIMIZE ANALYSIS<br />WITH FLOPS</h2>
                <p class="desc b1_en">Optimize various analysis tasks with FLOPS<br />to maximize work efficiency.</p>
              </div>
              <div class="globe-area" ref="globeAreas[0]"></div>
              <div class="bg">
                <img src="/portal-ui/main/intro-bg.png" alt="">
              </div>
              <div class="hand-img">
                <img src="/portal-ui/main/intro-hand.png" alt="">
              </div>
            </div>
            <div class="intro-section-2">
              <div class="title-text">
                <h2 class="title h3_en">INTEGRATED<br />ANALYSIS REPORTS</h2>
                <p class="desc b1_en">Check the today's status immediately<br />through the daily supported analysis report.</p>
              </div>
              <div class="globe-area" ref="globeAreas[1]"></div>
            </div>
            <div class="intro-section-3">
              <div class="title-text">
                <h2 class="title h3_en">VARIOUS ON-DEMAND<br />ANALYSIS TOOLS</h2>
                <p class="desc b1_en">Find the cause of today's condition<br />with linked various on-demand analysis tools.</p>
              </div>
              <div class="globe-area" ref="globeAreas[2]"></div>
              <div class="bg">
                <img src="/portal-ui/main/intro-3-bg.png" alt="">
              </div>
            </div>
          </div>
        </section>

        <section class="insight">
          <div class="inner-halfvideo">
            <div class="left">
              <div class="title-text">
                <h2 class="h3_en">
                  GAIN <br />INSIGHTS
                </h2>
                <p class="b1_en">
                  Derive actionable insights from comprehensive analysis <br>of manufacturing data.
                </p>
              </div>
              <div class="progress-indicator">
                <span class="current">0{{ insightCurrentIndex + 1 }}</span>
                <div class="progress-bar">
                  <div class="progress" :style="{ width: insightProgress + '%' }"></div>
                </div>
                <span class="total">0{{ insightSlides.length }}</span>
                <button class="pause" @click="toggleInsightPause">
                  <span v-if="insightPaused">
                    <img src="/portal-ui/icon/icon-play.svg" alt="">
                  </span>
                  <span v-else>
                    <img src="/portal-ui/icon/icon-stop.svg" alt="">
                  </span>
                </button>
              </div>
            </div>
            <div class="right">
              <div class="arrow-wrap">
                <button class="arrow prev" @click="prevInsightSlide" :disabled="arrowDisabled">
                  <img src="/portal-ui/icon/icon-arrow-prev.svg" alt="">
                </button>
                <button class="arrow next" @click="nextInsightSlide" :disabled="arrowDisabled">
                  <img src="/portal-ui/icon/icon-arrow-next.svg" alt="">
                </button>
              </div>
              <div class="title-text">
                <transition name="fade-slide" mode="out-in">
                  <h3 class="h6_ko" v-html="insightSlides[insightCurrentIndex].text" :key="insightCurrentIndex"></h3>
                </transition>
              </div>
            </div>
            <div class="background-video" ref="backgroundVideoRef">
              <transition name="fade-slide" mode="out-in">
                <div :key="insightSlides[insightCurrentIndex].video" class="video-wrap">
                  <video ref="insightVideoRef" muted loop playsinline >
                    <source :src="insightSlides[insightCurrentIndex].video" type="video/mp4">
                  </video>
                </div>
              </transition>
            </div>
          </div>
          <!-- <div class="decoration-circle"></div> -->
        </section>

        <section class="steps">
          <div class="inner-steps">
            <div class="sticky-height">
              <div class="sticky">
                <div class="sticky-content">
                  <div class="img-steps">
                    <div class="img">
                      <img src="/portal-ui/main/step-visual-1.png" alt="" class="on">
                      <img src="/portal-ui/main/step-visual-2.png" alt="">
                      <img src="/portal-ui/main/step-visual-3.png" alt="">
                      <img src="/portal-ui/main/step-visual-4.png" alt="">
                      <img src="/portal-ui/main/step-visual-5.png" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="step-list">
              <div class="step-item">
                <span class="h8_en">Step 01</span>
                <strong class="h3_en">MIRRORING</strong>
                <p class="b1_en">Loading data for all types of analysis.</p>
              </div>
              <div class="step-item">
                <span class="h8_en">Step 02</span>
                <strong class="h3_en">MONITORING</strong>
                <p class="b1_en">Visualization to enable efficient monitoring <br />of loaded data.</p>
              </div>
              <div class="step-item">
                <span class="h8_en">Step 03</span>
                <strong class="h3_en">SIMULATION</strong>
                <p class="b1_en">Simulate and predict various scenarios <br/>with large data handling.</p>
              </div>
              <div class="step-item">
                <span class="h8_en">Step 04</span>
                <strong class="h3_en">INTEGRATION</strong>
                <p class="b1_en">Gather functions in one place so that <br />you can do all the analyses in FLOPS.</p>
              </div>
              <div class="step-item">
                <span class="h8_en">Step 05</span>
                <strong class="h3_en">FUTURE FAB</strong>
                <p class="b1_en">Automatic control without human <br />based on system judgement results.</p>
              </div>
            </div>
            <div class="line-wrap">
              <div class="line-bg"></div>
              <div class="line"></div>
              <div class="divider-circle"></div>
              <div class="divider-circle"></div>
              <div class="divider-circle"></div>
              <div class="divider-circle"></div>
              <div class="divider-circle"></div>
            </div>
          </div>
        </section>

        <section class="analysis">
          <div class="inner-analysis">
            <div class="sticky-height">
              <div class="sticky">
                <div class="sticky-inner">
                  <div class="left">
                    <div class="title-text">
                      <h2 class="h3_en">
                        THE MOST <br />
                        INTUITIVE <br />
                        ANALYSIS
                      </h2>
                      <p class="b1_en">
                        Explore key manufacturing metrics <br />
                        through interactive, data-driven <br />
                        visualizations.
                      </p>
                    </div>
                  </div>
                  <div class="right">
                    <div class="accordion-container">
                      <div class="accordion-item">
                        <div class="accordion-header">
                          <span class="h8_en">ONE</span>
                        </div>
                        <div class="accordion-content">
                          <div class="image-graphic">
                            <!-- <img src="/portal-ui/main/graphic-1.png" alt=""> -->
                            <lottie-player
                              ref="el => lottieRefs[0] = el"
                              src="./portal-ui/main/lottie-1.json"
                              background="transparent"
                              speed="1"
                              loop
                              style="width: 100%; height: 100%; filter: brightness(0) invert(1); opacity: 0.3;"
                            ></lottie-player>                             
                          </div>
                        </div>
                        <div class="accordion-bottom">
                          <span class="h6_en">
                            ANALYSIS
                          </span>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <div class="accordion-header">
                          <span class="h8_en">TWO</span>
                        </div>
                        <div class="accordion-content">
                          <div class="image-graphic">
                            <lottie-player
                              ref="el => lottieRefs[1] = el"
                              src="./portal-ui/main/lottie-2.json"
                              background="transparent"
                              speed="1"
                              loop
                              style="width: 100%; height: 100%; filter: brightness(0) invert(1); opacity: 0.3;"
                            ></lottie-player>      
                          </div>
                        </div>
                        <div class="accordion-bottom">
                          <span class="h6_en">
                            MY TASK
                          </span>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <div class="accordion-header">
                          <span class="h8_en">THREE</span>
                        </div>
                        <div class="accordion-content">
                          <div class="image-graphic">
                            <lottie-player
                              ref="el => lottieRefs[2] = el"
                              src="./portal-ui/main/lottie-3.json"
                              background="transparent"
                              speed="1"
                              loop
                              style="width: 100%; height: 100%; filter: brightness(0) invert(1); opacity: 0.3;"
                            ></lottie-player>      
                          </div>
                        </div>
                        <div class="accordion-bottom">
                          <span class="h6_en">
                            MY REPORT
                          </span>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <div class="accordion-header">
                          <span class="h8_en">FOUR</span>
                        </div>
                        <div class="accordion-content">
                          <div class="image-graphic">
                            <lottie-player
                              ref="el => lottieRefs[3] = el"
                              src="./portal-ui/main/lottie-4.json"
                              background="transparent"
                              speed="1"
                              loop
                              style="width: 100%; height: 100%; filter: brightness(0) invert(1); opacity: 0.3;"
                            ></lottie-player>      
                          </div>
                        </div>
                        <div class="accordion-bottom">
                          <span class="h6_en">
                            ALARMS
                          </span>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <div class="accordion-header">
                          <span class="h8_en">FIVE</span>
                        </div>
                        <div class="accordion-content">
                          <div class="image-graphic">
                            <lottie-player
                              ref="el => lottieRefs[4] = el"
                              src="./portal-ui/main/lottie-5.json"
                              background="transparent"
                              speed="1"
                              loop
                              style="width: 100%; height: 100%; filter: brightness(0) invert(1); opacity: 0.3;"
                            ></lottie-player>      
                          </div>
                        </div>
                        <div class="accordion-bottom">
                          <span class="h6_en">
                            MY ROLE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="operations">
          <div class="inner-operations">
            <div class="inner">
            <div class="title-text">
              <h2 class="h3_en">
                AUTOMATED <br />
                OPERATIONS
              </h2>
              <p class="b1_en">
                Streamline repetitive processes with automated tasks to <br />
                boost productivity and reduce manual effort.
              </p>
            </div>
            <div class="ball-wrap">
              <div class="ball">
                <img src="/portal-ui/main/operations-ball.png" alt="">
              </div>
              <div class="ball-shadow">
                <img src="/portal-ui/main/operations-ball-shadow.png" alt="">
              </div>            
            </div>
            <div class="bg">
              <img src="/portal-ui/main/operations-bg.png" alt="">
              </div>
            </div>            
          </div>
        </section>

        <section class="contacts">
          <div class="inner-contacts">
            <div class="sticky-height">
              <div class="sticky">
                <div class="inner-sticky">
                  <div class="title-text">
                    <h2 class="h3_en">
                      FLOPS <br />
                      Contacts
                    </h2>
                    <p class="b1_en">
                      Find the right contact for each part.
                    </p>
                  </div>
                  <div class="footer-wrap">
                    <div class="footer-logo">
                      <div class="logo-icon">
                        <img src="/portal-ui/main/main-logo.png" alt="">
                      </div>
                      <h2 class="logo-text">FLOPS</h2>
                    </div>
                    <nav class="footer-nav">
                      <ul class="nav-list">
                          <li><a href="javascript:void(0)" class="nav-item">개인정보처리방침</a></li>
                          <li><a href="javascript:void(0)" class="nav-item">이용약관</a></li>
                          <li><a href="javascript:void(0)" class="nav-item">서비스 이용약관</a></li>
                          <li><a href="javascript:void(0)" class="nav-item">이메일무단수집거부</a></li>
                          <li><a href="javascript:void(0)" class="nav-item">아이디어 정책</a></li>
                      </ul>
                    </nav>
                    <div class="footer-info">
                      <!-- <address class="company-address">
                          서울시 송파구 올림픽로 35길 125 삼성SDS (05510) |
                      </address> -->
                      <div class="contact-info">
                          +82-32-680-4700 | <a href="mailto:flops@flops.com">flops@flops.com</a>
                      </div>
                      <div class="copyright">
                          COPYRIGHT SAMSUNG ELECTRONICS. ALL RIGHTS RESERVED.
                      </div>
                    </div>
                    <div class="family-site" ref="familySiteRef">
                        <button class="family-site-toggle" @click="toggleFamilySite" :class="{ 'active': isOpen }">
                            <span>FAMILY SITE</span>
                            <div class="toggle-icon"></div>
                        </button>
                        <ul class="family-site-list" ref="familySiteList" :class="{ 'show': isOpen }">
                            <li class="family-site-item"><a href="javascript:void(0)">Samsung Electronics</a></li>
                            <li class="family-site-item"><a href="javascript:void(0)">Samsung SDS</a></li>
                            <li class="family-site-item"><a href="javascript:void(0)">Samsung Display</a></li>
                            <li class="family-site-item"><a href="javascript:void(0)">Samsung Biologics</a></li>
                        </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="profile-cards">
                <div class="card">
                  <div class="img">
                    <img src="/portal-ui/main/profile-1.png" alt="">
                  </div>
                  <div class="name">
                    <strong class="h6_en">Jusung Lee</strong>
                    <span class="b1_en">Project Leader</span>
                  </div>
                </div>
                <div class="card">
                  <div class="img">
                    <img src="/portal-ui/main/profile-2.png" alt="">
                  </div>
                  <div class="name">
                    <strong class="h6_en">Jusung Lee</strong>
                    <span class="b1_en">Project Leader</span>
                  </div>
                </div>
                <div class="card">
                  <div class="img">
                    <img src="/portal-ui/main/profile-3.png" alt="">
                  </div>
                  <div class="name">
                    <strong class="h6_en">Jusung Lee</strong>
                    <span class="b1_en">Project Leader</span>
                  </div>
                </div>
                <div class="card">
                  <div class="img">
                    <img src="/portal-ui/main/profile-4.png" alt="">
                  </div>
                  <div class="name">
                    <strong class="h6_en">Jusung Lee</strong>
                    <span class="b1_en">Project Leader</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="float-wrap">
          <button class="top-button" @click="scrollToTop">
            <span>TOP</span>
          </button>
        </div>

      </div>
    </div>
    <Footer class="footer--home" />
  </div>

</template>

<script setup lang="ts">
import Header from '../portal-ui/components/Header.vue'
import Footer from '../portal-ui/components/Footer.vue'
import IntroScreen02 from '../portal-ui/components/IntroScreen02.vue'
import '@lottiefiles/lottie-player';
import type { LottiePlayerElement } from '@/types/lottie-player';


if (typeof window !== 'undefined') {
  // 브라우저의 스크롤 복원 기능 비활성화
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  } 
  // 즉시 맨 위로 스크롤
  window.scrollTo(0, 0)
}


import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { gsap } from 'gsap'
import Lenis from '@studio-freight/lenis'

const mainRef = ref<HTMLElement | null>(null)
const globeRef = ref<HTMLElement | null>(null)
const backgroundVideoRef = ref<HTMLElement | null>(null)
const insightVideoRef = ref<HTMLVideoElement | null>(null)
const isOpen = ref(false)
const showIntro = ref(true)
const familySiteRef = ref<HTMLElement | null>(null)
const familySiteList = ref<HTMLElement | null>(null)
const videoSrc = ref('./portal-ui/main/final333.webm') //경로 직접 바꿀 때 상대경로 필수
const titleTexts = ref<HTMLElement[]>([])
const descTexts = ref<HTMLElement[]>([])
const sections = ref<HTMLElement[]>([])
const profileCards = ref<HTMLElement[]>([])
const profileCardImgs = ref<HTMLElement[]>([])

let lenis: Lenis | null = null

let textObserver: IntersectionObserver | null = null
let sectionObserver: IntersectionObserver | null = null
let videoObserver: IntersectionObserver | null = null

// 사파리 브라우저 감지
const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('safari') && !ua.includes('chrome')
}

function scrollToTop() {
  lenis?.stop()
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  lenis?.start()
}

function toggleFamilySite() {
  isOpen.value = !isOpen.value
}


// 텍스트 블러 효과를 위한 Intersection Observer 설정
const setupTextBlurEffect = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const element = entry.target as HTMLElement
      if (entry.isIntersecting) {
        const ratio = entry.intersectionRatio
        // intersectionRatio가 0.5 이상일 때 블러 효과 제거
        if (ratio >= 0.5) {
          element.style.filter = 'blur(0px)'
          element.style.opacity = '1'
        } else {
          // 0.5 미만일 때는 블러 효과 적용
          const blurAmount = Math.round(10 * (1 - ratio * 2)) // 0.5에서 0으로 갈 때 블러가 0에서 10으로 증가
          element.style.filter = `blur(${String(blurAmount)}px)`
          element.style.opacity = String(ratio * 2) // 투명도도 함께 조절
        }
      } else {
        // 화면에서 벗어나면 다시 블러 효과 적용
        element.style.filter = 'blur(10px)'
        element.style.opacity = '0'
      }
    })
  }, {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // 여러 임계값 설정
    rootMargin: '0px'
  })

  // 모든 title-text 내의 h2 요소에 observer 적용
  titleTexts.value.forEach(element => {
    observer.observe(element)
  })
  descTexts.value.forEach(element => {
    observer.observe(element)
  })

  return observer
}

const setupSectionObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const element = entry.target as HTMLElement
      if (entry.isIntersecting) {
        const ratio = entry.intersectionRatio
        // intersectionRatio가 0.5 이상일 때 블러 효과 제거
        if (ratio >= 0.3) {
          element.classList.add('active')
        } else {
          element.classList.remove('active')
        }
      } else {
        element.classList.remove('active')
      }      
    })
  }, {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // 여러 임계값 설정
    rootMargin: '0px'
  })

    sections.value.forEach(element => {
    observer.observe(element)
  })

    return observer;
}

const setupVideoPlayback = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = insightVideoRef.value
      if (!video) return
      
      if (entry.isIntersecting) {
        // 화면에 보일 때 비디오 재생
        video.play().catch((error: unknown) => {
          console.log('비디오 재생 실패:', error)
        })
      } else {
        // 화면에서 벗어날 때 비디오 일시정지
        video.pause()
      }
    })
  }, {
    threshold: 0.1, // 10% 이상 보일 때 재생
    rootMargin: '0px'
  })

  if (backgroundVideoRef.value) {
    observer.observe(backgroundVideoRef.value)
  }

  return observer
}

function headerMount(){
  const $header = document.querySelector('.main-header') as HTMLElement;
  const $logo = $header.querySelector('.logo-icon') as HTMLElement;
  // const $nav = $header.querySelector('nav') as HTMLElement;

  gsap.set($logo, {
    y: -100,
    filter: 'blur(10px)'
  })

  gsap.to($logo, {
    y: 0,
    filter: 'blur(0px)',
    duration: 0.7,
    ease: 'power1.out',
    onStart: () => {
      $header.classList.add('active')
    }
  })

  // gsap.set($nav, {
  //   y: -100,
  //   filter: 'blur(10px)'
  // })

  // gsap.to($nav, {
  //   y: 0,
  //   filter: 'blur(0px)',
  //   duration: 0.7,
  //   ease: 'power1.out'
  // })
}

// function analysisSectionRightElementScrollFocus(accordion: Element){
//   const $analysis = document.querySelector('.analysis') as HTMLElement;
//   const $analysisRight = $analysis.querySelector('.right') as HTMLElement;
//   const $accordionItem = accordion.querySelector('.accordion-item') as HTMLElement;

//   //지금 gsap 작동하는 아코디언 아이템의 상단 값(.getBoundingClientRect().top)이 window.Height/2 + 상수? 보다 크다면
//   //현재 열린 아코디언 아이템과 윈도우top(혹은 section)과의 거리 - (window.Height - 현재 열린 아코디언 아이템 height)/2  -> 만큼 .right 가 translateY 음수이동, 아코디언 열릴 떄
//   // 아코디언 닫힐 때는 .right 의 transform none으로 되돌려놓기

// }

// function introScreen(){
//   const $globeRef = globeRef.value as HTMLElement;

//   let timeline: GSAPTimeline | null = null;

//   // function createTimeline() {
//   //   if(timeline) timeline.kill()
//   //   timeline = gsap.timeline({ paused: true })

//   //   timeline.to($globeRef, {
//   //     scale: 1,
//   //     duration: 0.5,
//   //     ease: 'power1.out'
//   //   })
//   // }

// }

function intro() {
  const $Intro = document.querySelector('.intro') as HTMLElement;
  const $globeAreas = $Intro.querySelectorAll('.globe-area');
  const $globeRef = globeRef.value as HTMLElement;
  const $handImg = $Intro.querySelector('.hand-img') as HTMLElement;
  // const $globeText = $globeRef.querySelector('.globe-text') as HTMLElement;

  let areaHeight = 0, introHeight = 0, progressHeight = 0;
  
  let timeline: GSAPTimeline | null = null;

  function createTimeline1() {

    if(timeline) timeline.kill()
    timeline = gsap.timeline({ paused: true })

    const firstArea = $globeAreas[0] as HTMLElement;
    const secondArea = $globeAreas[1] as HTMLElement;
    const thirdArea = $globeAreas[2] as HTMLElement;    

        // timeline.to($globeText.querySelector('.flops'), {
        //   opacity: 0,
        //   duration: 0.01,
        //   ease: 'sine.inout'
        // },0.02)
        // timeline.to($globeText.querySelector('.ai'), {
        //   opacity: 1,
        //   duration: 0.08,
        //   ease: 'sine.inout'
        // },0.9)


    timeline.fromTo(
      $globeRef,
      {
        bottom: window.getComputedStyle(firstArea).bottom, 
        right: window.getComputedStyle(firstArea).right,
        width: firstArea.offsetWidth,
        height: firstArea.offsetHeight,
      },
      { 
        bottom: window.getComputedStyle(secondArea).bottom, 
        right: window.getComputedStyle(secondArea).right,
        width: secondArea.offsetWidth,
        height: secondArea.offsetHeight,
        duration: 0.45, 
        ease: 'sine.inout' 
      },
      0
    )   

    timeline.fromTo($handImg, {
      opacity: 1,
    },{
      opacity: 0,
      duration: 0.3,
      ease: 'sine.inout'
    },
    0)

    timeline.to(
      $globeRef,
      { 
        bottom: window.getComputedStyle(thirdArea).bottom, 
        right: window.getComputedStyle(thirdArea).right,
        width: thirdArea.offsetWidth,
        height: thirdArea.offsetHeight,  
        duration: 0.4, 
        ease: 'sine.inout',
        // onComplete: () => {
        //   $globeText.querySelector('.ai')?.classList.add('on')
        // }
      },
      0.5
    )    

  }

  function onScroll() {
    const rect = $Intro.getBoundingClientRect()
    if (rect.top < areaHeight && rect.bottom > 0) {
      const progress = -rect.top / progressHeight
      timeline?.progress(progress)
    } 
  }

  function onResize() {
    areaHeight = window.innerHeight;
    introHeight = $Intro.offsetHeight;
    progressHeight = introHeight - areaHeight;

    createTimeline1();
    onScroll();
  }

  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', onScroll)

  onResize();
  onScroll();
  createTimeline1();
}

function analysisSection(){
  const $Analysis = document.querySelector('.analysis') as HTMLElement;
  const $accordions = $Analysis.querySelectorAll('.accordion-item');

  let areaHeight = 0, analysisHeight = 0, progress = 0, pregressHeight = 0;

  let timeline: GSAPTimeline | null = null;
  let isAnimate = false;

  for(let i = 0; i < $accordions.length; i++){
    const accordion = $accordions[i] as HTMLElement;
    //accordion 초기 위치 설정
    accordion.style.top = `-${String(accordion.offsetTop)}px`
    accordion.style.zIndex = `-${String(i)}`
  }

  //로띠 세팅
  setLottieToLastFrame();
  
  function createTimeline() {
    if(timeline) timeline.kill()
    timeline = gsap.timeline({ paused: true })

    //item 1 애니메이션
    timeline
    .to($accordions[0].querySelector('.accordion-content'), {
      height: "450px",
      duration: 0.15,
      ease: 'power1.out',
      // onStart: () => {
      //   analysisSectionRightElementScrollFocus($accordions[0]);
      // },
    },0)   
    timeline
    .to($accordions[0].querySelector('.image-graphic'), {
      top: "50%",
      right: "50%",
      transform: "translate(50%, -50%)",
      scale: 6.25,
      duration: 0.15,
      ease: 'power1.out',
      onComplete: () => {
        const lottieEl = $accordions[0].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
          lottieEl.style.filter = 'none';
          lottieEl.style.opacity = '1';
          lottieEl.stop(); //처음부터 다시시작하기 위해서 정지 필요
          lottieEl.play();
      },
      onReverseComplete: () => {
        const lottieEl = $accordions[0].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
        lottieEl.style.filter = `brightness(0) invert(1)`;
        lottieEl.style.opacity = '0.3';
        lottieEl.seek(lottieEl.getLottie().totalFrames - 1);
        lottieEl.pause();
      }
    },0)
    timeline
    .to($accordions[0].querySelector('.accordion-content'), {
      height: 0,
      duration: 0.2,
      ease: 'power1.out'
    },0.25)
    timeline
    .to($accordions[0].querySelector('.image-graphic'), {
      top: "60px",
      right: "60px",
      transform: "none",
      scale: 1,
      duration: 0.2,
      ease: 'power1.out',
      onComplete: () => {
        const lottieEl = $accordions[0].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
        lottieEl.style.filter = `brightness(0) invert(1)`;
        lottieEl.style.opacity = '0.3';
        lottieEl.seek(lottieEl.getLottie().totalFrames - 1); //마지막 장면에서 멈춰있어야함
        lottieEl.pause();
      },
      onReverseComplete: () => {
        const lottieEl = $accordions[0].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
          lottieEl.style.filter = 'none';
          lottieEl.style.opacity = '1';
          lottieEl.stop(); //처음부터 다시시작하기 위해서 정지 필요
          lottieEl.play();
      }
    },0.25)


    //item 2 애니메이션
    timeline.to($accordions[1].querySelector('.accordion-content'), {
      height: "450px",
      duration: 0.15,
      ease: 'power1.out'
    },0.25)
    timeline.to($accordions[1].querySelector('.image-graphic'), {
      top: "50%",
      right: "50%",
      transform: "translate(50%, -50%)",
      scale: 6.25,
      duration: 0.15,
      ease: 'power1.out',
      onComplete: () => {
        const lottieEl = $accordions[1].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
          lottieEl.style.filter = 'none';
          lottieEl.style.opacity = '1';
          lottieEl.stop(); //처음부터 다시시작하기 위해서 정지 필요
          lottieEl.play();
      },
      onReverseComplete: () => {
        const lottieEl = $accordions[1].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
        lottieEl.style.filter = `brightness(0) invert(1)`;
        lottieEl.style.opacity = '0.3';
        lottieEl.seek(lottieEl.getLottie().totalFrames - 1);
        lottieEl.pause();
      }
    },0.25)
    timeline.to($accordions[1].querySelector('.accordion-content'), {
      height: 0,
      duration: 0.2,
      ease: 'power1.out'
    },0.5)    
    timeline.to($accordions[1].querySelector('.image-graphic'), {
      top: "60px",
      right: "60px",
      transform: "none",
      scale: 1,
      duration: 0.2,
      ease: 'power1.out'
      ,onComplete: () => {
        const lottieEl = $accordions[1].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
        lottieEl.style.filter = `brightness(0) invert(1)`;
        lottieEl.style.opacity = '0.3';
        lottieEl.seek(lottieEl.getLottie().totalFrames - 1); //마지막 장면에서 멈춰있어야함
        lottieEl.pause();
      },
      onReverseComplete: () => {
        const lottieEl = $accordions[1].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
          lottieEl.style.filter = 'none';
          lottieEl.style.opacity = '1';
          lottieEl.stop(); //처음부터 다시시작하기 위해서 정지 필요
          lottieEl.play();
      }
    },0.5)
    
    //item 3 애니메이션
    timeline.to($accordions[2].querySelector('.accordion-content'), {
      height: "450px",
      duration: 0.15,
      ease: 'power1.out'
    },0.5)
    timeline.to($accordions[2].querySelector('.image-graphic'), {
      top: "50%",
      right: "50%",
      transform: "translate(50%, -50%)",
      scale: 6.25,
      duration: 0.15,
      ease: 'power1.out',
      onComplete: () => {
        const lottieEl = $accordions[2].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
          lottieEl.style.filter = 'none';
          lottieEl.style.opacity = '1';
          lottieEl.stop(); //처음부터 다시시작하기 위해서 정지 필요
          lottieEl.play();
      },
      onReverseComplete: () => {
        const lottieEl = $accordions[2].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
        lottieEl.style.filter = `brightness(0) invert(1)`;
        lottieEl.style.opacity = '0.3';
        lottieEl.seek(lottieEl.getLottie().totalFrames - 1);
        lottieEl.pause();
      }
    },0.5)    
    timeline.to($accordions[2].querySelector('.accordion-content'), {
      height: 0,
      duration: 0.2,
      ease: 'power1.out'
    },0.75)    
    timeline.to($accordions[2].querySelector('.image-graphic'), {
      top: "60px",
      right: "60px",
      transform: "none",
      scale: 1,
      duration: 0.2,
      ease: 'power1.out',
      onComplete: () => {
        const lottieEl = $accordions[2].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
        lottieEl.style.filter = `brightness(0) invert(1)`;
        lottieEl.style.opacity = '0.3';
        lottieEl.seek(lottieEl.getLottie().totalFrames - 1); //마지막 장면에서 멈춰있어야함
        lottieEl.pause();
      },
      onReverseComplete: () => {
        const lottieEl = $accordions[2].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
          lottieEl.style.filter = 'none';
          lottieEl.style.opacity = '1';
          lottieEl.stop(); //처음부터 다시시작하기 위해서 정지 필요
          lottieEl.play();
      }
    },0.75)

    //item 4 애니메이션
    timeline.to($accordions[3].querySelector('.accordion-content'), {
      height: "450px",
      duration: 0.15,
      ease: 'power1.out'
    },0.75)
    timeline.to($accordions[3].querySelector('.image-graphic'), {
      top: "50%",
      right: "50%",
      transform: "translate(50%, -50%)",
      scale: 6.25,
      duration: 0.15,
      ease: 'power1.out',
      onComplete: () => {
        const lottieEl = $accordions[3].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
          lottieEl.style.filter = 'none';
          lottieEl.style.opacity = '1';
          lottieEl.stop(); //처음부터 다시시작하기 위해서 정지 필요
          lottieEl.play();
      },
      onReverseComplete: () => {
        const lottieEl = $accordions[3].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
        lottieEl.style.filter = `brightness(0) invert(1)`;
        lottieEl.style.opacity = '0.3';
        lottieEl.seek(lottieEl.getLottie().totalFrames - 1);
        lottieEl.pause();
      }
    },0.75)       
    timeline.to($accordions[3].querySelector('.accordion-content'), {
      height: 0,
      duration: 0.2,
      ease: 'power1.out'
    },1)  
    timeline.to($accordions[3].querySelector('.image-graphic'), {
      top: "60px",
      right: "60px",
      transform: "none",
      scale: 1,
      duration: 0.2,
      ease: 'power1.out',
      onComplete: () => {
        const lottieEl = $accordions[3].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
        lottieEl.style.filter = `brightness(0) invert(1)`;
        lottieEl.style.opacity = '0.3';
        lottieEl.seek(lottieEl.getLottie().totalFrames - 1); //마지막 장면에서 멈춰있어야함
        lottieEl.pause();
      },
      onReverseComplete: () => {
        const lottieEl = $accordions[3].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
          lottieEl.style.filter = 'none';
          lottieEl.style.opacity = '1';
          lottieEl.stop(); //처음부터 다시시작하기 위해서 정지 필요
          lottieEl.play();
      }
    },1)     
    
    //item 5 애니메이션
    timeline.to($accordions[4].querySelector('.accordion-content'), {
      height: "450px",
      duration: 0.25,
      ease: 'power1.out'
    },1) 
    timeline.to($accordions[4].querySelector('.image-graphic'), {
      top: "50%",
      right: "50%",
      transform: "translate(50%, -50%)",
      scale: 6.25,
      duration: 0.25,
      ease: 'power1.out',
      onComplete: () => {
        const lottieEl = $accordions[4].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
          lottieEl.style.filter = 'none';
          lottieEl.style.opacity = '1';
          lottieEl.stop(); //처음부터 다시시작하기 위해서 정지 필요
          lottieEl.play();
      },
      onReverseComplete: () => {
        const lottieEl = $accordions[4].querySelector('.image-graphic lottie-player') as LottiePlayerElement;
        lottieEl.style.filter = `brightness(0) invert(1)`;
        lottieEl.style.opacity = '0.3';
        lottieEl.seek(lottieEl.getLottie().totalFrames - 1);
        lottieEl.pause();
      }
    },1)
  }

  function onScroll(){
    const rect = $Analysis.getBoundingClientRect();
    if(rect.top < areaHeight && rect.bottom > 0){
      progress = -rect.top / pregressHeight;
      timeline?.progress(progress);

      if(progress > - 0.15 && !isAnimate){
        isAnimate = true;
        $Analysis.classList.add('active');
        for(let i = 0; i < $accordions.length; i++){
          gsap.to($accordions[i], {
            top: 0,
            duration: 0.6,
            delay: 0.08 * i,
            ease: 'power3.out'
          })
        }
      }
    }
    else if(isAnimate && progress < - 0.15){
      isAnimate = false;
      $Analysis.classList.remove('active');
      for(let i = 0; i < $accordions.length; i++){
        gsap.to($accordions[i], {
          top: -($accordions[i] as HTMLElement).offsetTop,
          duration: 0.6,
          ease: 'power3.out'
        })
      }
    }
  }

  function onResize(){
    areaHeight = window.innerHeight;
    analysisHeight = $Analysis.offsetHeight;
    pregressHeight = analysisHeight - areaHeight;
  }

  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', onScroll);
  createTimeline();
  onResize();
  onScroll();
}

function stepsSection(){
  const $Steps = document.querySelector('.steps') as HTMLElement;
  const $stepsList = $Steps.querySelector('.step-list') as HTMLElement;
  const $stepsItems = Array.from($Steps.querySelectorAll('.step-item'));
  const $imgStep = $Steps.querySelector('.img-steps') as HTMLElement;
  const $imgStepImg = Array.from($Steps.querySelectorAll('.img-steps img'));
  const $lineWrap = $Steps.querySelector('.line-wrap') as HTMLElement;
  const $line = $Steps.querySelector('.line') as HTMLElement;
  const $deviderCircles = Array.from($Steps.querySelectorAll('.divider-circle'));

  let areaHeight = 0, responsiblePadding = 0;
  
  // 이전 인덱스 추적
  let previousActiveIndex = 0;
  let isAnimating = false;

  function mountcss(){
    const imgStepHeight = ($imgStepImg[0] as HTMLElement).offsetHeight;
    const imgStepPaddingBottom = parseInt(window.getComputedStyle($imgStep).paddingBottom);

    responsiblePadding = (areaHeight - imgStepHeight) / 2;

    $imgStep.style.paddingTop = `${String(responsiblePadding)}px`;
    $stepsList.style.paddingTop = `${String(responsiblePadding)}px`;
    $lineWrap.style.top = `${String(responsiblePadding)}px`;
    $lineWrap.style.height = `calc(100% - ${String(responsiblePadding)}px - ${String(imgStepPaddingBottom)}px)`;

    for(let i = 0; i < $deviderCircles.length; i++){
      const circle = $deviderCircles[i] as HTMLElement;
      const stepItem = $stepsItems[i] as HTMLElement;
      circle.style.top = `${String(stepItem.getBoundingClientRect().height * i)}px`;
    }
  }

  function onScroll() {
    const rect = $Steps.getBoundingClientRect();
    if (rect.top < areaHeight && rect.bottom > 0) { 
      const constantNumber = 100;
      const progress = Math.max(0, Math.min(1, -(rect.top - areaHeight/2 + responsiblePadding - constantNumber) / ($Steps.offsetHeight - areaHeight/2)));
      // const scrollYmid = -rect.top + areaHeight/2;

      // 이미지 롤링 제어
      // const $imgSteps = $Steps.querySelector('.img-steps .img') as HTMLElement;
      const $imgStepImg = Array.from($Steps.querySelectorAll('.img-steps img'));
      const totalImages = $imgStepImg.length;
      const rotationPerStep = 360 / totalImages;
      
      // 현재 활성 이미지 인덱스
      const currentIndex = Math.floor(progress * totalImages);
      const clampedIndex = Math.min(currentIndex, totalImages - 1);

      // 인덱스가 변경되었을 때만 롤링 애니메이션 실행
      if (clampedIndex !== previousActiveIndex && !isAnimating) {
        isAnimating = true;
        
        // 모든 stepItem에서 active 제거
        for(const stepItem of $stepsItems){
          (stepItem as HTMLElement).classList.remove('active');
        }
        
        $imgStepImg.forEach((img, index) => {
          const currentRotation = index * rotationPerStep - previousActiveIndex * rotationPerStep;
          const targetRotation = index * rotationPerStep - clampedIndex * rotationPerStep;
          
          // GSAP으로 부드러운 회전 애니메이션
          gsap.fromTo(img, 
            { rotation: currentRotation },
            { 
              rotation: targetRotation,
              duration: 0.6,
              ease: 'power2.out',
              onComplete: () => {
                if (index === 0) isAnimating = false;
              }
            }
          );
          
          // 현재 보이는 이미지에만 .on 클래스
          if (index === clampedIndex) {
            img.classList.add('on');
            // 해당하는 stepItem에도 active 클래스 추가
            if ($stepsItems[index]) {
              ($stepsItems[index] as HTMLElement).classList.add('active');
            }
          } else {
            img.classList.remove('on');
          }
        });
        
        // 해당하는 divider circle도 활성화 (현재 인덱스까지 모두 활성화)
        $deviderCircles.forEach((circle, index) => {
          if (index <= clampedIndex) {
            (circle as HTMLElement).classList.add('active');
          } else {
            (circle as HTMLElement).classList.remove('active');
          }
        });
        
        previousActiveIndex = clampedIndex;
      }

      // 진행률 라인 애니메이션
      gsap.to($line, {
        height: `${String(progress * 100)}%`,
        duration: 0.5,
        ease: 'power1.out'
      });
    }

    if(rect.top > 0){
      ($stepsItems[0] as HTMLElement).classList.add('active');
      ($imgStepImg[0] as HTMLElement).classList.add('on');
      ($deviderCircles[0] as HTMLElement).classList.add('active');
    }
    if(rect.bottom - areaHeight < 0){
      ($stepsItems[$stepsItems.length - 1] as HTMLElement).classList.add('active');
      ($imgStepImg[$imgStepImg.length - 1] as HTMLElement).classList.add('on');
      ($deviderCircles[$deviderCircles.length - 1] as HTMLElement).classList.add('active');
    }
  }

  function onResize() {
    areaHeight = window.innerHeight;

    mountcss();
    onScroll();
  }

  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', onScroll);
  mountcss();
  onResize();
  onScroll();
}

function setupOperationsParallax() {
  const $section = document.querySelector('.operations') as HTMLElement;
  const $bg = $section.querySelector('.bg') as HTMLElement;

  function onScroll() {
    const rect = $section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // 섹션이 화면에 들어왔을 때만 패럴랙스 적용
    if (rect.top < windowHeight && rect.bottom > 0) {
      // progress: 0(섹션 시작) ~ 1(섹션 끝)
      const progress = 1 - (rect.bottom / (rect.height + windowHeight));
      // 패럴랙스 이동값 (원하는 만큼 조절, 예: 최대 80px)
      const parallaxY = progress * 150 - 40; // -40~+40px
      $bg.style.transform = `translateY(${String(parallaxY)}px)`;
    }
  }

  window.addEventListener('scroll', onScroll);
  onScroll();
}

function initProfileCards() {
  const $profileCards = Array.from(document.querySelectorAll('.profile-cards .card'));
  const $profileCardImgs = Array.from(document.querySelectorAll('.profile-cards .card img'));
  
  profileCards.value = $profileCards.map(item => item as HTMLElement);
  profileCardImgs.value = $profileCardImgs.map(item => item as HTMLElement);

  function onProfileScroll() {
    const scrollY = window.scrollY;

    profileCardImgs.value.forEach((img, index) => {
      
      const moveX = Math.sin(scrollY * 0.01 + index) * 5;
      const moveY = Math.cos(scrollY * 0.01 + index) * 5;
      
      gsap.to(img, {
        x: moveX,
        y: moveY,
        scale: 1.05,
        duration: 0.8,
        ease: 'power1.out'
      });
    });
  }

  window.addEventListener('scroll', onProfileScroll);
  onProfileScroll();
}

function setLottieToLastFrame() {
  // 모든 .image-graphic 내 lottie-player를 찾아서 마지막 프레임에 멈춤
  const lottieEls = document.querySelectorAll('.image-graphic lottie-player');
  lottieEls.forEach((el) => {

    // lottie-player가 로드된 후에만 동작해야 함
    const lottie = el as unknown as LottiePlayerElement;

    lottie.addEventListener('load', () => {
      const totalFrames = lottie.getLottie().totalFrames;
      lottie.seek(totalFrames - 1);
      lottie.pause();
    });
    // 이미 로드된 경우
      const totalFrames = lottie.getLottie().totalFrames;
      lottie.seek(totalFrames - 1);
      lottie.pause();
  });
}

const onIntroComplete = () => {
  showIntro.value = false
  // 인트로 완료 후 스크롤 허용
  document.body.style.overflow = 'auto'
  // Lenis 스크롤 재시작
  if (lenis) {
    lenis.start()
  }
}

onMounted(async () => {
  window.scrollTo(0, 0);

  // 인트로 화면이 활성화되어 있을 때 스크롤 비활성화
  if (showIntro.value) {
    document.body.style.overflow = 'hidden'
  }

  await nextTick();
  
  nextTick(() => {
    lenis = new Lenis({
      duration: 1.5
    });

    lenis.scrollTo(0, { immediate: true });
    
    // 인트로 화면이 활성화되어 있을 때는 lenis 정지
    if (showIntro.value) {
      lenis.stop()
    }
    
    // if (isSafari()) {
    //   videoSrc.value = './portal-ui/main/video-globe.mov';
    // }    

    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // introScreen();
    startMainAnimations();
  });
});

const startMainAnimations = () => {
  headerMount();
  intro();
  stepsSection();
  initProfileCards();
  analysisSection();
  setupOperationsParallax();

  mainRef.value = document.querySelector('#MAIN') as HTMLElement;
  mainRef.value.classList.add('loaded');

  titleTexts.value = Array.from(document.querySelectorAll('.title-text h2'));
  descTexts.value = Array.from(document.querySelectorAll('.title-text p'));
  sections.value = Array.from(document.querySelectorAll('section'));
  
  textObserver = setupTextBlurEffect();
  sectionObserver = setupSectionObserver();
  videoObserver = setupVideoPlayback();
}

onUnmounted(() => {
  lenis?.destroy();

  if (textObserver) {
    titleTexts.value.forEach(element => {
      textObserver?.unobserve(element);
    });
    textObserver.disconnect();
  }

  if (sectionObserver) {
    sections.value.forEach(element => {
      sectionObserver?.unobserve(element);
    });
    sectionObserver.disconnect();
  }

  if (videoObserver) {
    videoObserver.disconnect();
  }
});

// insight 슬라이드 데이터
const insightSlides = ref([
  {
    text: 'AI 프로젝트에서 ROI가 더욱 <br/>중요한 이유',
    video: './portal-ui/main/insight-video.mp4',
  },
  {
    text: '두번째 슬라이드 예시 텍스트',
    video: './portal-ui/main/insight-video.mp4',
  },
  {
    text: '세번째 슬라이드 예시 텍스트',
    video: './portal-ui/main/insight-video.mp4',
  },
  // 필요시 추가
])
const insightCurrentIndex = ref(0)
const insightProgress = ref(0)
const insightPaused = ref(false)
let insightTimer: any = null

// 화살표 연속 클릭 방지
const arrowDisabled = ref(false)

function startInsightProgress() {
  clearInterval(insightTimer)
  insightProgress.value = 0
  if (!insightPaused.value) {
    insightTimer = setInterval(() => {
      insightProgress.value += 100 / (5 * 10) // 5초, 0.1초마다
      if (insightProgress.value >= 100) {
        nextInsightSlide()
      }
    }, 100)
  }
}
function nextInsightSlide() {
  if (arrowDisabled.value) return
  arrowDisabled.value = true
  setTimeout(() => { arrowDisabled.value = false }, 800)
  insightCurrentIndex.value = (insightCurrentIndex.value + 1) % insightSlides.value.length
  startInsightProgress()
}
function prevInsightSlide() {
  if (arrowDisabled.value) return
  arrowDisabled.value = true
  setTimeout(() => { arrowDisabled.value = false }, 800)
  insightCurrentIndex.value = (insightCurrentIndex.value - 1 + insightSlides.value.length) % insightSlides.value.length
  startInsightProgress()
}
function toggleInsightPause() {
  insightPaused.value = !insightPaused.value
  startInsightProgress()
}
watch(insightCurrentIndex, () => {
  // 비디오 자동 재생
  nextTick(() => {
    const video = insightVideoRef.value
    if (video) {
      video.currentTime = 0
      video.play().catch(() => {})
    }
  })
})

const insightSectionRef = ref<HTMLElement | null>(null)
let insightObserver: IntersectionObserver | null = null

function setupInsightSectionObserver() {
  if (insightObserver) insightObserver.disconnect()
  insightObserver = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        insightPaused.value = false
        startInsightProgress()
      } else {
        insightPaused.value = true
        clearInterval(insightTimer)
      }
    })
  }, { threshold: 0.1 })
  if (insightSectionRef.value) {
    insightObserver.observe(insightSectionRef.value)
  }
}

onMounted(() => {
  startInsightProgress()
  nextTick(() => {
    insightSectionRef.value = document.querySelector('.insight')
    setupInsightSectionObserver()
  })
})
onUnmounted(() => {
  clearInterval(insightTimer)
  if (insightObserver) insightObserver.disconnect()
})
</script>


<style lang="scss" scoped>
@use '@/assets/common/_variables.scss' as *;
@use '@/assets/common/_mixin.scss' as *;

#MAIN {
  // min-width: 1440px;
  width: 100%;
  font-family: var(--font-family-futura);
  &.loaded{
    .intro .inner-intro .sticky-height .sticky .img-glob{
      // transform: scale(1);
      opacity: 1;
    }
  }
  section:not(.intro), .intro .intro-section-1, .intro .intro-section-2, .intro .intro-section-3{
    min-height: 800px;
  }
  .title-text{
    position: absolute;
    left: 120px;
    h2{
      transition: filter 0.8s ease-out, opacity 0.8s ease-out;
      filter: blur(10px);
      opacity: 0;
      color: #fff;
    }
    p{
      transition: filter 0.7s ease-out, opacity 0.7s ease-out;
      filter: blur(10px);
      opacity: 0;
      color: #fff;
      margin-top: 32px;
    }
  }
  .intro{
    // 임시 0624 추가
    filter: blur(10px);
    transform: scale(1.02);
    background-color: var(--color-black);
    .inner-intro{
      position: relative;
      .sticky-height{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        .sticky{
          position: sticky;
          top: 0;
          z-index: 5;
          left: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          .sticky-inner{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
          }
          .img-glob{ //첫번쨰 globe-area 와 width, height, top, right 맞추기
            position: absolute;
            // width: vw(w, 462); 
            // height: vw(w, 462); 
            width: vw(w, 1216);
            height: vw(w, 736); //1920 이상일 때 width height 손이랑 같이 키울까
            // top: 15.89%; pure
            // right: 9.4%; pure

            // background-color: rgba(255,255,255,0.1);
            opacity: 0;
            transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1),;
            @include laptop-large{
              transform: scale(1.2);
            }
            .globe-text{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%; height: 100%;
              span{
                position: absolute;
                display: inline-block;
                top: 52%;
                right: 30%;
                transform: translate(0, -50%);
                color: #fff;
                font-size: vw(w, 56);
                font-weight: 700;
                line-height: 110%;
                letter-spacing: 6px;
                text-align: center;
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
                &.on{
                  opacity: 1;
                }
                &.ai{
                  right: 35%;
                }
                &.flops{
                  opacity: 1;
                }
              }
            }
            video {
              width: 100%;
              height: 100%;
              object-fit: cover;
              background-color: transparent;

              image-rendering: crisp-edges;
              filter: contrast(0.6) brightness(2) saturate(4.3);
              transform: translateZ(0);
              will-change: transform;
              backface-visibility: hidden;  
            }
          }
        }
      }
      [class*="intro-section-"]{
        position: relative;
        height: 100vh;
        overflow: hidden;
        .bg{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        .globe-area{
          position: absolute;
          // border: 1px solid red;
        }
      }
      .intro-section-1{
        .title-text{
          bottom: vw(w, 120);
        }
        .globe-area{
          bottom: 20%;
          // right: 9.4%;
          right: 6%;
          width: vw(w, 1216);
          height: vw(w, 736); 
          @include laptop-large{
            transform: scale(1.2);
            right: 11%;
            bottom: 24%;
          }
        }
        .hand-img{
          position: absolute;
          bottom: 0;
          right: 0;
          width: vw(w, 975);
          height: vw(w, 434);
          z-index: 1;
          @include laptop-large{
            transform: scale(1.2);
          }
          img{
            width: 100%;
          }
        }
      }
      .intro-section-2{
        background-color: #070F19;
        .title-text{
          top: 50%;
          transform: translateY(-50%);
        }
        .globe-area{
          bottom: -25%;
          right: -26%;
          width: vw(w, 2206);
          height: vw(w, 1334);
          @include laptop-large{
            transform: scale(1.2);
            right: -30%;
          } 
        }
      }
      .intro-section-3{
        background-color: #0E020C;
        .title-text{
          bottom: vw(w, 112);
        }
        .globe-area{
          // top: 8.3%;
          bottom: 5%;
          right: 7%;
          // left: -5%;
          width: vw(w, 1605);
          height: vw(w, 971);
          @include laptop-large{
            transform: scale(1.2);
          }
        }
      }
    }
  }
  .insight{
    position: relative;
    height: 100vh;
    overflow: hidden;
    &.active{
      .inner-halfvideo .right .title-text{
        filter: blur(0px);
      }
    }
    .inner-halfvideo{
      display: flex;
      height: 100%;
      .left{
        position: relative;
        width: 50%;
        height: 100%;
        background-color: var(--color-black1);
        .title-text{
          top: vw(w, 240);
        }
        .progress-indicator {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          bottom: vw(w, 80);
          right: vw(w, 80);
          width: vw(w, 376);
          height: vw(w, 34);
          gap: vw(w, 20);
          color: var(--color-white);
          .current, .total {
            font-size: 14px;
            font-weight: 500;
            // min-width: 24px;
            text-align: center;
          }
          .total{
            color: var(--color-gray3);
          }
          .progress-bar {
            width: vw(w, 180);
            height: 3px;
            background: var(--color-gray3);
            overflow: hidden;
            position: relative;
            .progress {
              height: 100%;
              background: var(--color-white);
              transition: width 0.1s linear;
            }
          }
          .pause {
            background: none;
            border: none;
            cursor: pointer;
            margin-left: vw(w, 12);
          }
        }        
      }
      .right{
        position: relative;
        width: 50%;
        .title-text{
          top: vw(w, 80);
          left: vw(w, 80);
          // top: vw(w, 340);
          // left: 50%;
          // transform: translateX(-50%);
          filter: blur(10px);
          transition: filter 0.5s ease-in-out;
          h3{
            color: #fff;
            // text-align: center;
            text-align: left;
          }
        }
        .arrow-wrap{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 vw(w,40);
          .arrow{
            width: vw(w, 80);
            height: vw(w, 80);
            cursor: pointer;
          }
        }
      }
      .background-video{
        position: absolute;
        display: flex;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #100524;
        z-index: -1;
        .video-wrap{
          width: 100%;
          height: 100%;
          // height: 68.5%;
          margin-top: auto;
          video{
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
    .decoration-circle{
      position: absolute;
      top: vw(w, 340);
      left: 50%;
      transform: translateX(-50%);
      width: vw(w, 60);
      height: vw(w, 60);
      border-radius: 50%; //임시
      background: linear-gradient(147.95deg, #E162FF 18.02%, #0069FF 92.55%); //임시
      z-index: 1;
      animation: circulation 2s linear infinite;
    }
  }
  .analysis{
    position: relative;
    background-color: #01012F;
    min-height: vw(w, 1320);
    .inner-analysis{
      .sticky-height{
        height: 650vh;
        .sticky{
          position: sticky;
          top: 0;
          left: 0;
          height: 100vh;
          min-height: 1320px;
          overflow: hidden;
          .sticky-inner{
            overflow: hidden;
            display: flex;
            width: 100%;
            height: 100%;
            &:before{
              content: '';
              position: absolute;
              top: -50%;
              left: 0;
              width: vw(w, 1200);
              height: vw(w, 1200);
              // border-radius: 50%;
              // background-color: #082679;
              // backdrop-filter: blur(400px);
              // opacity: 0.7;
              background: url('/portal-ui/main/bg-blur-top.png') no-repeat center center / contain;
              animation: orbit 7s linear infinite;
              z-index: -1;
            }
            &:after{
              content: '';
              position: absolute;
              bottom: -50%;
              left: -10%;
              width: vw(w, 900);
              height: vw(w, 900);
              // border-radius: 50%;
              // background-color: #063663;
              // backdrop-filter: blur(400px);
              // opacity: 0.7;
              // filter: blur(400px);
              background: url('/portal-ui/main/bg-blur-bottom.png') no-repeat center center / contain;
              animation: orbit 9s linear infinite reverse;
              z-index: -1;
            }
            .left{
              width: 50%;
              height: 100%;
              .title-text{
                top: vw(w, 240);
              }
            }
            .right{
              border-left:1px solid #FFFFFF4D;
              width: 50%;
            }
          }
        }
      }
    }
    .accordion-container{
      .accordion-item{
        position: relative;
        width: 100%;
        background-color: #01012F;
        &:first-child{
          .accordion-header{
            border-top: none;
          }
        }
        .accordion-header{
          // padding: vw(w, 50) vw(w, 60) vw(w, 5) vw(w, 60);
          padding: 50px 60px 5px 60px;
          border-top:1px solid #FFFFFF4D;
          span{
            color: #fff;
          }
        }
        .accordion-content{
          .image-graphic{
            position: absolute;
            // top: vw(w, 60);
            // right: vw(w, 60);
            // width: vw(w, 48);
            // height: vw(w, 48);
            top: 60px;
            right: 60px;
            width: 48px;
            height: 48px;
            transition: opacity 0.5s ease-in-out, filter 0.5s ease-in-out;
            img{
              width: 100%;
            }
          }
        }
        .accordion-bottom{
          // padding: vw(w, 5) vw(w, 60) vw(w, 50) vw(w, 60);
          padding: 5px 60px 50px 60px;
          span{
            color: #fff;
          }
        }
      }
    }
  }
  .steps{
    .inner-steps{
      position: relative;
      background-color: #05000E;
    }
    .sticky-height{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .sticky{
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        .sticky-content{
          width: 50%;
          .img-steps{
            padding-top: vw(w, 160);
            padding-left: vw(w, 200);
            padding-bottom: vw(w, 240);
            width: vw(w, 560);
            height: vw(w, 560);
            box-sizing: content-box;
            .img{
              position: relative;
              width: 100%;
              height: 100%;
            }
            img{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              opacity: 0;
              transition: opacity 0.5s ease-in-out;
              &.on{
                opacity: 1;
              }
            }
          }
        }
      }
    }
    .step-list{
      width: 50%;
      margin-left: auto;
      padding-top: vw(w, 160);
      padding-bottom: vw(w, 240);
      .step-item{
        height: vw(w, 600);
        padding-top: vw(w, 140);
        padding-left: vw(w, 200);
        color: #fff;
        opacity: 0.12;
        transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        filter: blur(3px);
        &.active{
          opacity: 1;
          filter: blur(0px);
        }
        span{
          display: block;
        }
        strong{
          margin-top: vw(w, 56);
        }
        p{
          margin-top: vw(w, 12);
        }
      }
    }
    .line-wrap{
      position: absolute;
      top: vw(w, 160);
      height: calc(100% - vw(w, 160) - vw(w, 240));
      left: 50%;
      transform: translateX(-50%);
      .line-bg{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 1px;
        height: 100%;
        background-color: #444;
      }
      .line{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 1px;
        // height: 100%;
        max-height: 100%;
        background-color: #176CEC;
        // transition: height 0.1s linear;
      }
      .divider-circle{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        width: vw(w, 40);
        height: vw(w, 40);
        border-radius: 50%;
        background-color: #444;
        transition: background-color 0.3s ease-in-out;
        &.active{
          background-color: #176CEC;
        }
      }
    }
  }
  .operations{
    position: relative;
    overflow: hidden;
    height: 100vh;
    .inner-operations{
      .title-text{
        top: vw(w, 240);
      }
      .ball-wrap{
        position: absolute;
        top: 32%;
        right: 45%;
        width: vw(w, 120);
        height: vw(w, 210);
        .ball{
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, 0);
          width: vw(w, 120);
          height: vw(w, 120);
          animation: bounce 1.2s ease-in-out infinite;
          img{
            width: 100%;
            object-fit: contain;
          }
        }
        .ball-shadow{
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 0);
          width: vw(w, 300);
          height: vw(w, 150);
          animation: bounce-shadow 1.2s ease-in-out infinite;
          img{
            width: 100%;
            object-fit: contain;
          }
        }
      }
      .bg{
        position: absolute;
        top: -40px;
        left: 0;
        width: 100%;
        height: 110%;
        z-index: -1;
      }
    }
  }
  .contacts{
    &.active{
      .inner-contacts .right .profile-cards .card .img:before{
        transform: translate(-50%, -50%) scale(2.2);
      }
      .inner-contacts .sticky-height .sticky .footer-wrap{
        filter: blur(0px);
      }
    }
    .inner-contacts{
      position: relative;
      background-color: var(--color-black1);
      .sticky-height{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .sticky{
          position: sticky;
          top: 0;
          left: 0;
          min-height: 100vh;
          height: 100%;
          .inner-sticky{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 40%;
            height: 100%;
            .title-text{
              position: static;
              margin-top: vw(w, 240);
              margin-left: vw(w, 120);
              // margin-top: 15%;
              color: #fff;
            }
          }
          .footer-wrap{
            font-family: var(--font-family-pretendard);
            font-size: vw(w, 14);
            font-weight: 700;
            line-height: 140%;
            color: #fff;
            margin-bottom: vw(w, 260);
            // margin-bottom: 16.25%;
            margin-left: vw(w, 120);
            filter: blur(10px);
            transition: filter 0.5s ease-in-out;

            .footer-logo {
              display: flex;
              align-items: center;
              margin-bottom: 30px;
          
              .logo-icon {
                width: vw(w, 218);
                height: vw(w, 38);
                .footer-logo          
                img {
                  width: 100%;
                  height: auto;
                  object-fit: contain;
                }
              }
          
              .logo-text {
                font-size: 0;
              }
            }
          
            .footer-nav {
              margin-bottom: vw(w, 30);  
              line-height: 140%;
          
              .nav-list {
                display: flex;
                flex-wrap: wrap;
                gap: vw(w, 35);

                & > li{
                  &:last-child{
                    .nav-item{
                      &:after{
                        display: none;
                      }
                    }
                  }
                }
          
                .nav-item {
                  position: relative;
                  color: #ffffff;
                  font-weight: 700;
                  text-decoration: none;
                  font-size: vw(w, 14);
                  &:after{
                    content: '';
                    position: absolute;
                    display: inline-block;
                    top: 50%;
                    right: calc(vw(w, 19) * -1);
                    transform: translateY(-50%);
                    width: vw(w, 3);
                    height: vw(w, 3);
                    border-radius: 50%;
                    background-color: #fff;
                  }
          
                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
            }
          
            .footer-info {
              font-size: vw(w, 14);
              font-weight: 500;
              line-height: 160%;
          
              .company-address {
                font-style: normal;
                margin-bottom: vw(w, 8);
              }
          
              .contact-info {
                a {
                  color: #ffffff;
                  text-decoration: none;
          
                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
          
              .copyright {
                margin-top: vw(w, 8);
                font-size: vw(w, 12);
                color: #aaa;
              }
            }
          
            .family-site {
              width: vw(w, 270);
              margin-top: vw(w, 80);
              padding-bottom: vw(w, 12);
              border-bottom: 1px solid #FFFFFF;
          
              .family-site-toggle {
                display: flex;
                align-items: center;
                background: none;
                border: none;
                color: #ffffff;
                font-weight: 900;
                font-size: vw(w, 14);
                line-height: 160%;
                cursor: pointer;
                width: 100%;
                & >span{
                  margin-left: vw(w, 12);
                }
          
                .toggle-icon {
                  margin-left: vw(w, 133);
                  width: vw(w, 28);
                  height: vw(w, 28);
                  background-color: #ffffff;
                  color: #000;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transition: transform 0.3s ease;
          
                  &::before {
                    content: '+';
                    font-size: vw(w, 16);
                    font-weight: 300;
                    transition: transform 0.3s ease;
                  }
                }

                &.active {
                  .toggle-icon {
                    transform: rotate(45deg);
                  }
                }
              }
          
              .family-site-list {
                position: absolute;
                list-style: none;
                padding: 0;
                max-height: 0;
                overflow: hidden;
                transform: translateY(24px);
                transition: max-height 0.3s ease-out;
                // opacity: 0;
                transition: max-height 0.3s ease-out, opacity 0.3s ease-out, transform 0.3s ease-out;
          
                &.show {
                  max-height: 200px; // 충분히 큰 값으로 설정
                  // opacity: 1;
                }
          
                .family-site-item {
                  margin-bottom: 8px;
          
                  a {
                    color: #ffffff;
                    text-decoration: none;
                    display: block;
                    padding: vw(w, 4) 0;
                    font-size: vw(w, 14);
                    line-height: 1.4;
          
                    &:hover {
                      text-decoration: underline;
                    }
                  }
                }
              }
            }            
          }
        }
      }
      .right{
        width: 50%;
        margin-left: auto;
        padding-right: vw(w, 120);
        color: #176CEC;
        padding-top: vw(w, 160);
        .profile-cards{
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          column-gap: vw(w, 100);
          row-gap: vw(w, 56);
          padding-bottom: vw(w, 220);
          .card{
            max-width: vw(w, 400);
            width: 100%;
            &:nth-child(2n){
              transform: translateY(vw(w, 120));
            }
            @for $i from 1 through 4 {
              &:nth-of-type(#{$i}) .img:before {
                transition-delay: #{($i - 1) * 0.12}s;
              }
            }
            .img{
              position: relative;
              max-width: vw(w, 400);
              width: 100%;
              border-radius: vw(w, 16);
              overflow: hidden;
              &:before{
                content: '';
                position: absolute;
                display: inline-block;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.5);
                width: 50%;
                height: 50%;
                border-radius: vw(w, 16);
                background-color: transparent;
                z-index: 1;
                box-shadow: 0 0 0 400px var(--color-black1);
                transition: transform 1.3s cubic-bezier(0.4, 0, 0.2, 1);
              }
              img{
                width: 100%;
              }
            }
            .name{
              margin-top: vw(w, 24);
              strong{
                display: block;
              }
              span{
                display: block;
                margin-top: vw(w, 4);
              }
            }
          }
        }
      }
    }
  }
}
.float-wrap{
  position: fixed;
  bottom: vw(w, 120);
  right: vw(w, 90);
  z-index: 100;
  .top-button{
    position: relative;
    width: vw(w, 60);
    height: vw(w, 60);
    border-radius: 50%;
    background-color: #fff;
    span{
      position: absolute;
      bottom: vw(w, 13);
      left: 50%;
      transform: translateX(-50%);
      display: block;
      font-size: vw(w, 12);
      font-weight: 700;
      line-height: 140%;
      color: #000;
      text-align: center;
      &:before{
        content: '';
        position: absolute;
        top: -7px;
        left: 50%;
        transform: translateX(-50%);
        background: url('/portal-ui/main/arrow-up.png') no-repeat center center / contain;
        width: vw(w, 8);
        height: vw(w, 4);
      }
    }
  }
}

@keyframes orbit {
  0% {
    transform: rotate(0deg) translateX(100px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(100px) rotate(-360deg);
  }
}


@keyframes bounce {
  0% {
    transform: translate(-50%,-50px);
    animation-timing-function: ease-in;
  }
  // 10% {
  //   transform: translate(-50%,-55px);
  //   animation-timing-function: ease-in;
  // }
  40% {
    transform: translate(-50%,10px); 
    animation-timing-function: ease-out;
  }
  100% {
    transform: translate(-50%,-50px); 
  }
}



@keyframes bounce-shadow {
  0% {
    transform: translate(-50%,0) scale(0.6);
    // animation-timing-function: ease-in;
  }
  55% {
    transform: translate(-50%, 0) scale(0.8); 
    // animation-timing-function: ease-in;
  }
  100% {
    transform: translate(-50%,0) scale(0.6);
  }
}

@keyframes circulation {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.img-steps {
  .img {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      // opacity: 0.3;
      transition: opacity 0.5s ease;
      transform-origin: 50% 120.7%;
      
      &.on {
        // opacity: 1;
        z-index: 2;
      }
    }
  }
}

</style>