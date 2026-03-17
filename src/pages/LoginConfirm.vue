<template>
  <div>
    <div class="content">
      <div class="visaul-wrap">
        <div class="logo">
          <img src="/portal-ui/main/main-logo.png" alt="FLOPS">
        </div>
        <div class="inner">
          <div class="video-wrap">
            <video autoplay muted loop playsinline>
              <source src="/portal-ui/main/final333.webm" type="video/webm">
              <!-- <source src="/portal-ui/main/video-globe.mov" type="video/mov"> -->
            </video>
          </div>
          <div class="bottom-wrap">
            <div class="data-wrap">
              <div class="data">
                <p class="b3_ko_s">Current Connection IP</p>
                <p class="b3_ko_s">100.100.100.1</p>
              </div>
              <div class="data">
                <p class="b3_ko_s">Last Connection IP</p>
                <p class="b3_ko_s">100.100.100.1</p>
              </div>
              <div class="data">
                <p class="b3_ko_s">Last Login Time</p>
                <p class="b3_ko_s">2025-03-19 10:35:36</p>
              </div>
            </div>
            <Button class="confirm-button" size="48" minWidth="320" backgroundColor="waferblue2" fontColor="white">Confirm</Button>
            <div class="desc">
              <span class="b4_ko_s">
                This system is strictly restricted to authorized users only. Any illegal access shall be punished with a related-law.
                <br/> 삼성 전자 임직원을 위한 시스템으로서 인가된 분만 사용 가능하며 불법적으로 사용 시 법적 제재를 받을 수 있습니다.
              </span>
            </div>
          </div>
        </div>
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
    width: 100%;
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
    .inner{
      position: absolute;
      top: 47%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .video-wrap{
      position: relative;
      left: -12%;
      width: 110%;
      // width: 1183px;
      // top: 47%;
      // left: 45%;
      // transform: translate(-50%, -50%);
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
    .bottom-wrap{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 24px;
      // margin-top: -50px;
      .data{
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-gray3);
        margin-top: 8px;
        &:first-child{
          margin-top: 0;
        }
        p{
          &:first-child{
            width: 180px;
          }
          &:last-child{
            width: 140px;
          }
        }
      }
      .desc{
        text-align: center;
        color: var(--color-white);
      }
    }
  }
}
</style>