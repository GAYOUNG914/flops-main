<template>
  <div>
    <div class="error-page">
      <div class="content">
        <div class="visual">
          <div class="text">
            <span class="f_f">(FL)OOPS!</span>
          </div>
          <div class="img">
            <img src="/portal-ui/error/img-error.png" alt="404 에러 이미지">
          </div>
        </div>
        <div class="title">
          <span class="h5_ko_s">서비스를 이용할 수 없습니다.</span>
        </div>
        <p class="description b1_ko_s">
          서버에 일시적인 오류가 발생했습니다. <br/>
          불편을 드려 죄송합니다 잠시 후 다시 시도해 주세요.
        </p>
        <div class="button-wrap">
          <Button fontColor="gray1" lineColor="gray4" backgroundColor="white" size="48" minWidth="160">이전으로 이동</Button>
          <Button fontColor="white" backgroundColor="black" size="48" minWidth="160">메인으로 이동</Button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import Button from '../portal-ui/components/Button.vue';
</script>

<style scoped lang="scss">
.error-page{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: var(--color-bg1);
  .content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    .visual{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      .text{
        font-weight: 700;
        font-size: 80px;
        line-height: 150%;
      }
      .img{
        width: 420px;
        img{
          width: 100%;
          object-fit: contain;
        }
      }
    }
    .title{
      margin-top: 40px;
    }
    .description{
      margin-top: 40px;
    }
    .button-wrap{
      margin-top: 60px;
      display: flex;
      gap: 8px;
    }
  }
}
</style>