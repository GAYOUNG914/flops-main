<template>
  <div>
    <Gnb />
    <Filter :initial-filter-state="false">
      <template #title>
        <span>즐겨찾기</span>
      </template>
    </Filter>
    <Screen screenType="favorites"/>
    <QuickMenu />
    <Loading />
  </div>
</template>

<script setup lang="ts">
import Gnb from '../portal-ui/components/Gnb.vue';
import Filter from '../portal-ui/components/Filter.vue';
import Screen from '../portal-ui/components/Screen.vue';
import QuickMenu from '../portal-ui/components/QuickMenu.vue';
import Loading from '../portal-ui/components/Loading.vue';
</script>

<style scoped lang="scss">
:deep(#FILTER){
  .filter-tooltip{
    display: none !important; 
  }
  .filter-icon.tutorials{
    display: none !important;
  }
  .filter-icon.filter{
    display: none !important;
  }
}
</style>