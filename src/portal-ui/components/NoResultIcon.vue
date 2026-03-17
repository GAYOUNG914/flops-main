<template>
  <div class="no-result">
    <div class="icon-wrap">
      <img :src="`${iconImageTrack}`" alt="">
    </div>
    <p class="message b1_ko_s">
      <span v-html="message"></span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  message: {
    type: String,
    default: '검색 결과가 없습니다.',
  },
  iconImageTrack: {
    type: String,
    default: './portal-ui/icon/icon-search-icon.svg',
  },
});

</script>

<script lang="ts">
export default {
  name: 'NoResultIcon'
}
</script>

<style lang="scss" scoped>
@use '@/assets/common/_variables' as *;
@use '@/assets/common/_mixin' as *;

.no-result{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .icon-wrap{
    width: 160px;
    height: 160px;
    background: var(--color-bg1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 56px;
      height: 56px;
      object-fit: contain;
    }
  }
  .message{
    margin-top: 20px;
    color: var(--color-black1);
    font-weight: 700 !important;
  }
}
</style>