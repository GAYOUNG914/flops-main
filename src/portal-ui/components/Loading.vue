<template>
  <transition name="fade" class="loading">
    <div class="loading-video" v-show="isVisible">
      <video ref="videoRef" src="/portal-ui/video/loading.mp4" muted loop></video>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useEventBus } from '../composables/useEventBus';

const { on } = useEventBus();
const isVisible = ref(false);
const videoRef = ref<HTMLVideoElement | null>(null);

// 로딩 열기/닫기 함수
const openLoading = () => {
  isVisible.value = true;
  // 비디오를 처음부터 재생
  if (videoRef.value) {
    videoRef.value.currentTime = 0;
    videoRef.value.play();
  }
};

const closeLoading = () => {
  isVisible.value = false;
  // 비디오 정지
  if (videoRef.value) {
    videoRef.value.pause();
  }
};

// 외부에서 호출할 수 있도록 expose
defineExpose({
  openLoading,
  closeLoading
});

onMounted(() => {
  // 이벤트 버스로 로딩 열기 이벤트 수신
  on('openLoading', openLoading);
  on('closeLoading', closeLoading);
});
</script>

<script lang="ts">
export default {
  name: 'Loading'
}
</script>

<style scoped lang="scss">
@use '@/assets/common/_mixin' as *;
@use '@/assets/common/_variables' as *;

.loading{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .loading-video {
    width: 550px;
    height: 550px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

</style>