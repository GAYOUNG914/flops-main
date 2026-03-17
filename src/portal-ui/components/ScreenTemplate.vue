<!-- 슬롯이 없는 기본 화면 템플릿 -->

<template>
  <div class="screen-tempalte" style="display: flex;">
    <div class="dash-board">
      <div class="dash-board-navigator">
        <div class="tab-list main-content-tab-list">
          <Button
            class="btn-3-slot"
            :round="true"
            minWidth="75"
            size="40"
            :backgroundColor="activeMainTab === 'tab1' ? 'transparent' : 'white'"
            :fontColor="activeMainTab === 'tab1' ? 'wafer-blue1' : 'gray3'"
            :lineColor="activeMainTab === 'tab1' ? 'wafer-blue1' : 'gray4'"
          >
            tab1
          </Button>
          <Button
            class="btn-2-slot"
            :round="true"
            minWidth="75"
            size="40"
            :backgroundColor="activeMainTab === 'tab2' ? 'transparent' : 'white'"
            :fontColor="activeMainTab === 'tab2' ? 'wafer-blue1' : 'gray3'"
            :lineColor="activeMainTab === 'tab2' ? 'wafer-blue1' : 'gray4'"
          >
            tab2
          </Button>
          <Button
            :round="true"
            minWidth="75"
            size="40"
            :backgroundColor="activeMainTab === 'tab3' ? 'transparent' : 'white'"
            :fontColor="activeMainTab === 'tab3' ? 'wafer-blue1' : 'gray3'"
            :lineColor="activeMainTab === 'tab3' ? 'wafer-blue1' : 'gray4'"
          >
            tab3
          </Button>
          <Button
            :round="true"
            minWidth="75"
            size="40"
            :backgroundColor="activeMainTab === 'tab4' ? 'transparent' : 'white'"
            :fontColor="activeMainTab === 'tab4' ? 'wafer-blue1' : 'gray3'"
            :lineColor="activeMainTab === 'tab4' ? 'wafer-blue1' : 'gray4'"
          >
            tab4
          </Button>
        </div>
        <Breadcrumb />
      </div>
      <main class="main-content">
        <div class="main-content-inner">
          <div class="inner"></div>
        </div>
      </main>
    </div>
    <SplitScreen ref="splitScreenRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from './Button.vue'
import Breadcrumb from './Breadcrumb.vue'
import SplitScreen from './SplitScreen.vue'
import { useEventBus } from '../composables/useEventBus'

// 상단 탭 버튼들의 토글 상태 관리
const activeMainTab = ref('tab1')

// SplitScreen 인스턴스 타입 정의
interface SplitScreenInstance {
  toggleSplitScreen: () => void;
}

const splitScreenRef = ref<SplitScreenInstance | null>(null);
const { on } = useEventBus();

onMounted(() => {
  // SplitScreen 토글 이벤트 리스너 등록
  on('toggle-split-screen', () => {
    splitScreenRef.value?.toggleSplitScreen(); 
  });

  // SplitScreen 리사이즈 이벤트 리스너 등록
  on('split-screen-resize', () => {
    // 필요한 경우 리사이즈 로직 추가
  });
});
</script>

<style lang="scss" scoped>
.screen-tempalte{
  width: 100%;
  height: 100%;
  .dash-board{
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: 100%;
    height: 100%;
    background-color: var(--color-bg1);
    .dash-board-navigator{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .main-content-tab-list{
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
    .main-content{
      width: 100%;
      height: 85%;
      border: 1px solid var(--color-gray4);
      border-radius: 16px;
      background-color: var(--color-white);
      padding: 10px 10px;
      .main-content-inner{
        height: 100%;
        padding: 24px 10px;
        overflow: auto;
      &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
          background-color: transparent;
        }
        &::-webkit-scrollbar-thumb {
          background-color: var(--color-gray4);
          border-radius: 8px;
        }
        &::-webkit-scrollbar-track{
          margin: 4px !important;
        }
        .inner{
          min-width: 1100px;
          min-height: 600px;
        }
      }
    }
  }

}

</style>
