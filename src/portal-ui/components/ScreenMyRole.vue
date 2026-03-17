<template>
  <div class="screen-my-role" style="display: flex;">
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
            @click="activeMainTab = 'tab1'"
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
            @click="activeMainTab = 'tab2'"
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
            @click="activeMainTab = 'tab3'"
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
            @click="activeMainTab = 'tab4'"
          >
            tab4
          </Button>
        </div>
        <Breadcrumb />
      </div>
      <main class="main-content">
        <div class="main-content-inner">
          <div class="inner">
            <div class="content content01">
              <div class="header">
                <div class="left">
                  <div class="title">
                    <span class="h8_ko_s">시스템 사용 권한</span>
                  </div>
                </div>
                <div class="right">
                  <div class="total"><span class="b5_ko_s">Total: <em>2</em></span></div>
                  <Button size="32" backgroundColor="black" fontColor="white">조회</Button>
                </div>
              </div>
              <div class="table">
                <DataTable :columns="columns" :data="data1"/>
                <!-- <DataTable :columns="columns" :data="data2">
                  <template #status="{ value }">
                    <Button size="24" minWidth="68" backgroundColor="gray2" fontColor="white" buttonTextClasses="b5_ko_s">
                      {{ value }}
                    </Button>
                  </template>
                </DataTable> -->
              </div>
            </div>
            <div class="content content02">
              <div class="header">
                <div class="left">
                  <div class="title">
                    <span class="h8_ko_s">기준정보 관리 권한</span>
                  </div>
                </div>
                <div class="right">
                  <div class="total"><span class="b5_ko_s">Total: <em>5</em></span></div>
                  <Button size="32" backgroundColor="black" fontColor="white">조회</Button>
                </div>
              </div>
              <div class="table">
                <DataTable :columns="columns" :data="data2">
                  <template #status="{ value }">
                    <div class="button-wrap">
                      <Button size="24" minWidth="68" backgroundColor="gray2" fontColor="white" buttonTextClasses="b5_ko_s">
                        {{ value }}
                      </Button>
                    </div>
                  </template>
                </DataTable>
              </div>
            </div>
          </div>
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
import DataTable from './DataTable.vue'

// 상단 탭 버튼들의 토글 상태 관리
const activeMainTab = ref('tab1')

const columns = [
  { key: 'name', label: '권한명', class: 'w-120' },
  { key: 'status', label: '상태', class: 'w-200' },
  { key: 'desc', label: '설명', class: 'left pd-l-20' }
]

const data1 = [
  { name: '권한1', status: '권한 보유', desc: '설명 문구' },
  { name: '권한2', status: '권한 보유', desc: '설명 문구' },
]

const data2 = [
  { name: '권한3', status: '신청', desc: '설명 문구' },
  { name: '권한4', status: '신청', desc: '설명 문구' },
  { name: '권한5', status: '신청', desc: '설명 문구' },
  { name: '권한6', status: '신청', desc: '설명 문구' },
  { name: '권한7', status: '신청', desc: '설명 문구' }
]

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
.screen-my-role{
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
          .content{
            margin-top: 40px;
            width: 100%;
            &:first-child{
              margin-top: 0;
            }
            .header{
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              .right{
                display: flex;
                align-items: center;
                gap: 16px;
                .total{
                  color: var(--color-gray2);
                  span{
                    letter-spacing: -0.5px !important;
                  }
                }
              }
            }
            .table{
              margin-top: 16px;
              width: 100%;
              :deep(.data-table){
                width: 100%;
                td{
                  padding: 0;
                }
                .button-wrap{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }
        }
      }
    }
  }

}

</style>
