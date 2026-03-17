<template>
  <div class="screen">
    <ScreenSearchNoResult v-if="props.screenType === 'search-no-result'" />
    <ScreenDefault v-else-if="props.screenType === 'default'" />
    <ScreenNotice v-else-if="props.screenType === 'notice'" />
    <ScreenNoticeEdit v-else-if="props.screenType === 'notice-edit'" />
    <ScreenNoticeNoResult v-else-if="props.screenType === 'notice-no-result'" />
    <ScreenAlarm v-else-if="props.screenType === 'alarm'" />
    <ScreenMyReport v-else-if="props.screenType === 'myreport'" />
    <ScreenMyRole v-else-if="props.screenType === 'myrole'" />
    <ScreenMyTask v-else-if="props.screenType === 'mytask'" />
    <ScreenFavorites v-else-if="props.screenType === 'favorites'" />
    <ScreenSitemap v-else-if="props.screenType === 'sitemap'" />
  </div>
</template>

<script setup lang="ts">
import ScreenSearchNoResult from './ScreenSearchNoResult.vue';
import ScreenDefault from './ScreenDefault.vue';
import ScreenNotice from './ScreenNotice.vue';
import ScreenNoticeEdit from './ScreenNoticeEdit.vue';
import ScreenNoticeNoResult from './ScreenNoticeNoResult.vue'; 
import ScreenAlarm from './ScreenAlarm.vue';
import ScreenMyReport from './ScreenMyReport.vue';
import ScreenMyRole from './ScreenMyRole.vue';
import ScreenMyTask from './ScreenMyTask.vue';
import ScreenFavorites from './ScreenFavorites.vue';
import ScreenSitemap from './ScreenSitemap.vue';

const props = defineProps<{
  screenType: string;
}>();
</script>

<style lang="scss" scoped>
@use '@/assets/common/_variables' as *;
@use '@/assets/common/_mixin' as *;

  .screen{
    position: relative;
    width: 100%;
    top: $filter-header-height;
    height: calc(100svh - $filter-header-height);
  }
</style>

<!-- 전역 global csss -->
<style lang="scss">
  .screen-content{
    width: 100%;
    height: 100%;
  }
</style>