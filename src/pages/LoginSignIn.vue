<template>
  <div>
    <div class="content">
      <div class="visaul-wrap">
        <div class="logo">
          <img src="/portal-ui/main/main-logo.png" alt="FLOPS">
        </div>
        <div class="video-wrap">
          <video autoplay muted loop playsinline>
            <source src="/portal-ui/main/final333.webm" type="video/webm">
            <source src="/portal-ui/main/video-globe.mov" type="video/mov">
          </video>
        </div>
        <div class="text-wrap">
          <div class="title">
            <span class="f_f">
              OPTIMIZE ANALYSIS <br/>WITH FLOPS
            </span>
          </div>
          <div class="desc"><span class="f_f">Optimize various analysis tasks with FLOPS to maximize work efficiency.</span></div>
        </div>
      </div>
      <div class="login-wrap">
        <div class="text-wrap">
          <div class="title"><span class="f_f">Welcome</span></div>
          <div class="desc"><span class="b3_ko_s">Sign in to your account</span></div>
        </div>
        <Button class="sign-in-button" size="48" minWidth="320" backgroundColor="waferblue2" fontColor="white">Sign in</Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from '../portal-ui/components/Button.vue';
</script>

<style scoped lang="scss">
.content{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: #020207;
  overflow: hidden;
  min-height: 900px;
  overflow: auto;
  .visaul-wrap{
    width: 62.5%;
    height: 100%;
    position: relative;
    .logo{
      position: absolute;
      top: 72px;
      left: 90px;
      width: 150px;
      img{
        width: 100%;
        object-fit: contain;
      }
    }
    .video-wrap{
      // background: red;
      position: absolute;
      // width: vw(w, 1456);
      width: 120%;
      max-width: 1456px;
      top: 47%;
      left: 42%;
      transform: translate(-50%, -50%);
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
    .text-wrap{
      position: absolute;
      left: 90px;
      bottom: 90px;
      color: var(--color-white);
      .title span{
        font-size: 32px;
        line-height: 120%;
        font-weight: 700;
      }
      .desc{
        margin-top: 16px;
        span{
          font-size: 14px;
          line-height: 160%;
          font-weight: 400;
        }
      }
    }
  }
  .login-wrap{
    width: 37.5%;
    background-color: var(--color-bg1);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .text-wrap{
      text-align: center;
      .title span{
        font-size: 48px;
        line-height: 120%;
        font-weight: 700;
      }
    }
    .sign-in-button{
      margin-top: 24px;
    }
  }
}
</style>