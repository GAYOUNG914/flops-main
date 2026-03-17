<template>
  <div class="screen-search-no-result">
    <NoResultIcon message="조건을 선택해 검색해 주세요." iconImageTrack="./portal-ui/icon/icon-search-screen-blue.svg"/>
  </div>
</template>

<script setup lang="ts">
import NoResultIcon from './NoResultIcon.vue';
</script>

<style lang="scss" scoped>
.screen-search-no-result{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
