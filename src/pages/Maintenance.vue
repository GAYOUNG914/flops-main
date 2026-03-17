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
          <span class="h5_ko_s">서비스 점검 중입니다.</span>
        </div>
        <p class="description b1_ko_s">
          보나 나은 서비스를 위해 현재 서버 점검을 진행하고 있습니다. <br/>
          불편을 끼쳐드려 죄송합니다.
        </p>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
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