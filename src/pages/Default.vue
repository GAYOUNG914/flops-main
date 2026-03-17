<template>
  <div>
    <!-- <IntroScreen v-if="showIntro" :screenStartWithBlur="['.screen, #FILTER']" @complete="onIntroComplete" /> -->
    <Gnb />
    <Filter />
    <Screen screenType="default"/>
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

// IntroScreen에 필요한 주석처리

// import { ref } from 'vue';
// import IntroScreen from '../portal-ui/components/IntroScreen.vue';
// const showIntro = ref(true)
// const onIntroComplete = () => {
//   showIntro.value = false
// }

</script>

<style scoped lang="scss">

</style>