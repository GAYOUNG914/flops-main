<template>
  <div>
    <Gnb />
    <Filter />
    <!-- <Screen screenType="default"/> -->
    <Screen screenType="search-no-result"/>
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

</style>