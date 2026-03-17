<template>
  <div class="screen-default slot-task" style="display: flex;">
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
            @click="handleTabClick('tab1')"
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
            @click="handleTabClick('tab2')"
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
            @click="handleTabClick('tab3')"
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
            @click="handleTabClick('tab4')"
          >
            tab4
          </Button>
        </div>
        <Breadcrumb />
      </div>
      <main class="main-content">

        <div id="main-container" class="main-container">
        <!-- 2슬롯용 요소들 -->

          <section id="left-slot" class="data-wrap slot left-slot">
            <div class="data-container">
              <div class="data-inner">
                  <div class="data-inner-header">
                    <div class="data-title-wrap">
                      <div class="title h8_ko_s">DATA1 Title</div>
                      <div class="sub-title b3_ko_s">데이터1 서브타이틀</div>
                    </div>
                    <div class="tab-list">
                      <Button
                        v-for="tab in tabList1"
                        :key="tab.value"
                        :class="['data-tab-btn', { selected1: selected1 === tab.value }]"
                        @click="select1(tab.value)"
                        backgroundColor="white"
                        :rectangular="true"
                        :fontColor="selected1 === tab.value ? 'black1' : 'gray3'"
                        minWidth="85"
                        size="32"
                        :underlineColor="selected1 === tab.value ? 'black1' : 'gray3'"
                      >
                        {{ tab.label }}
                      </Button>
                    </div>
                  </div>
                  <div class="data-inner-content">
                    <div class="data" v-if="selected1 === 'tab1'">
                        <div class="data-img data1">
                          <img src="/portal-ui/dummy/img-data1.png" alt="">
                        </div>
                    </div>
                    <div class="data" v-else-if="selected1 === 'tab2'">
                        <div class="data-img data2">
                          <img src="/portal-ui/dummy/img-data2.png" alt="">
                        </div>
                    </div>
                    <div class="data" v-else>
                        <div class="data-img data1">
                          <img src="/portal-ui/dummy/img-data1.png" alt="">
                        </div>
                    </div>
                  </div>
              </div>
            </div>
          </section>

          <section id="right-slot" class="data-wrap slot right-slot">
            <div class="data-container">
              <div class="data-inner">
                  <div class="data-inner-header">
                    <div class="data-title-wrap">
                      <div class="title h8_ko_s">DATA2 Title</div>
                    </div>
                    <div class="tab-list tab-list-2">
                      <Button
                        v-for="tab in tabList2"
                        :key="tab.value"
                        :class="['data-tab-btn', { selected2: selected2 === tab.value }]"
                        @click="select2(tab.value)"
                        :backgroundColor="selected2 === tab.value ? 'black' : 'gray3'"
                        :fontColor="selected2 === tab.value ? 'white' : 'black'"
                        minWidth="94"
                        size="32"
                      >
                        {{ tab.label }}
                      </Button>
                    </div>
                  </div>
                  <div class="data-inner-content">
                    <div class="data" v-if="selected2 === 'tab1'">
                        <div class="data-img data2">
                          <img src="/portal-ui/dummy/img-data2.png" alt="">
                        </div>
                    </div>
                    <div class="data" v-else-if="selected2 === 'tab2'">
                        <div class="data-img data1">
                          <img src="/portal-ui/dummy/img-data1.png" alt="">
                        </div>
                    </div>
                  </div>
              </div>
            </div>
          </section>

      <!-- 3슬롯용 요소들 -->
      
          <section id="top-left-slot" class="data-wrap slot top-left-slot">
            <div class="data-container">
              <div class="data-inner">
                  <div class="data-inner-header">
                    <div class="data-title-wrap">
                      <div class="title h8_ko_s">DATA3 Title</div>
                      <div class="sub-title b3_ko_s">데이터3 서브타이틀</div>
                    </div>
                    <div class="tab-list">
                      <Button
                        v-for="tab in tabList3"
                        :key="tab.value"
                        :class="['data-tab-btn', { selected3: selected3 === tab.value }]"
                        @click="select3(tab.value)"
                        backgroundColor="white"
                        :rectangular="true"
                        :fontColor="selected3 === tab.value ? 'black1' : 'gray3'"
                        minWidth="85"
                        size="32"
                        :underlineColor="selected3 === tab.value ? 'black1' : 'gray3'"
                      >
                        {{ tab.label }}
                      </Button>
                    </div>
                  </div>
                  <div class="data-inner-content">
                    <div class="data" v-if="selected3 === 'tab1'">
                        <div class="data-img data1">
                          <img src="/portal-ui/dummy/img-data1.png" alt="">
                        </div>
                    </div>
                    <div class="data" v-else-if="selected3 === 'tab2'">
                        <div class="data-img data2">
                          <img src="/portal-ui/dummy/img-data2.png" alt="">
                        </div>
                    </div>
                    <div class="data" v-else>
                        <div class="data-img data1">
                          <img src="/portal-ui/dummy/img-data1.png" alt="">
                        </div>
                    </div>
                  </div>
              </div>
            </div>
          </section>
          <section id="top-right-slot" class="data-wrap slot top-right-slot">
            <div class="data-container">
              <div class="data-inner">
                  <div class="data-inner-header">
                    <div class="data-title-wrap">
                      <div class="title h8_ko_s">DATA4 Title</div>
                    </div>
                    <div class="tab-list tab-list-2">
                      <Button
                        v-for="tab in tabList4"
                        :key="tab.value"
                        :class="['data-tab-btn', { selected4: selected4 === tab.value }]"
                        @click="select4(tab.value)"
                        :backgroundColor="selected4 === tab.value ? 'black' : 'gray3'"
                        :fontColor="selected4 === tab.value ? 'white' : 'black'"
                        minWidth="94"
                        size="32"
                      >
                        {{ tab.label }}
                      </Button>
                    </div>
                  </div>
                  <div class="data-inner-content">
                    <div class="data" v-if="selected4 === 'tab1'">
                        <div class="data-img data2">
                          <img src="/portal-ui/dummy/img-data2.png" alt="">
                        </div>
                    </div>
                    <div class="data" v-else-if="selected4 === 'tab2'">
                        <div class="data-img data1">
                          <img src="/portal-ui/dummy/img-data1.png" alt="">
                        </div>
                    </div>
                  </div>
              </div>
            </div>
          </section>
          <section id="bottom-slot" class="data-wrap slot bottom-slot">
            <div class="data-container table-data">
              <div class="data-inner" style="min-width: 800px;">
                <div class="accordion-wrap">
                  <div class="accordion-item">
                    <div class="accordion-item-header">
                      <div class="data-inner-header">
                        <div class="data-title-wrap">
                          <div class="title h8_ko_s">DATA3 Title</div>
                        </div>
                        <button class="accordion-button" @click="toggleAccordion">
                          <span class="blind">accordion button</span>
                          <img 
                            src="/portal-ui/icon/icon-arrow-up-black.svg"
                            :class="{ 'rotate': !isAccordionOpen }"
                            alt=""
                          >
                        </button>
                      </div>
                    </div>
                    <div class="data-inner-content">
                      <div class="accordion-item-content"
                        :class="{ 'collapsed': !isAccordionOpen }"
                        :style="{ maxHeight: isAccordionOpen ? contentHeight : '0' }"
                        ref="accordionContent"
                      >
                        <DataTable :columns="columns" :data="tableData">
                          <template #defectCount="{ value }">
                            <span :class="{ 'text-red-500': value > 0 }">
                              {{ value }}
                            </span>
                          </template>
                          <template #scanTime="{ value }">
                            {{ formatTime(value) }}
                          </template>
                        </DataTable>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
                
          <!-- 드래그 핸들들 -->
          <div id="horizontal-handle" class="drag-handle horizontal-handle"></div>
          <div id="vertical-handle" class="drag-handle vertical-handle"></div>
          <div id="right-vertical-handle" class="drag-handle right-vertical-handle"></div>
          <div id="corner-handle-left" class="drag-handle corner-handle"></div>
          <div id="corner-handle-right" class="drag-handle corner-handle"></div>
        </div>
        
      </main>
    </div>
    <SplitScreen ref="splitScreenRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useResizableLayout } from '../composables/resizableLayout'
import Button from './Button.vue'
import Breadcrumb from './Breadcrumb.vue'
import DataTable from './DataTable.vue'
import SplitScreen from './SplitScreen.vue'
import { useEventBus } from '../composables/useEventBus'

interface SplitScreenInstance {
  toggleSplitScreen: () => void;
}

const splitScreenRef = ref<SplitScreenInstance | null>(null);
const { on } = useEventBus();

// 상단 탭 버튼들의 토글 상태 관리
const activeMainTab = ref('tab1')

// 탭 선택 상태 관리
const selected1 = ref('tab1')
const selected2 = ref('tab1')
const selected3 = ref('tab1')
const selected4 = ref('tab1')

// 탭 선택 함수
const select1 = (value: string) => {
  selected1.value = value
}
const select2 = (value: string) => {
  selected2.value = value
}
const select3 = (value: string) => {
  selected3.value = value
}
const select4 = (value: string) => {
  selected4.value = value
}

const tabList1 = [
  { label: 'Data tab 1', value: 'tab1' },
  { label: 'Data tab 2', value: 'tab2' },
  { label: 'Data tab 3', value: 'tab3' }
]
const tabList2 = [
  { label: 'Data button', value: 'tab1' },
  { label: 'Data button', value: 'tab2' },
]
const tabList3 = [
  { label: 'Tab1', value: 'tab1' },
  { label: 'Tab2', value: 'tab2' },
  { label: 'Tab3', value: 'tab3' }
]
const tabList4 = [
  { label: 'Tab1', value: 'tab1' },
  { label: 'Tab2', value: 'tab2' },
]


// 영역분할
// types.ts
// const { state, setSlotCount, updateLayout, initialize } = useResizableLayout()
const { initialize, updateLayout } = useResizableLayout()


const columns = ref([
  { key: 'no', label: 'No', class: 'w-150' },
  { key: 'scanTime', label: 'Scan Time', class: 'w-180' },
  { key: 'lotId', label: 'Lot ID', class: 'w-150' },
  { key: 'line', label: 'Line', class: 'w-150' },
  { key: 'stepId', label: 'Step ID', class: 'w-150' },
  { key: 'eqpId', label: 'Eqp ID', class: 'w-150' },
  { key: 'defectCount', label: 'Defect Count', class: 'w-150' },
  { key: 'maskProc', label: 'Mask Proc', class: 'w-150' },
  { key: 'wfProc', label: 'WF Proc', class: 'w-150' },
  { key: 'layer', label: 'Layer', class: 'w-150' },
  { key: 'lotType', label: 'Lot Type', class: 'w-150' },
  { key: 'waveLength', label: 'Wave Length', class: 'w-150' }
])

const tableData = ref([
  {
    no: 1,
    scanTime: '22:07:00 060822',
    lotId: 0,
    line: 0,
    stepId: 0,
    eqpId: 0,
    defectCount: 5,
    maskProc: 0,
    wfProc: 0,
    layer: 28,
    lotType: 0,
    waveLength: 0
  },
  {
    no: 2,
    scanTime: '22:07:00 060822',
    lotId: 0,
    line: 0,
    stepId: 0,
    eqpId: 0,
    defectCount: 5,
    maskProc: 0,
    wfProc: 0,
    layer: 28,
    lotType: 0,
    waveLength: 0
  },
  {
    no: 3,
    scanTime: '22:07:00 060822',
    lotId: 0,
    line: 0,
    stepId: 0,
    eqpId: 0,
    defectCount: 5,
    maskProc: 0,
    wfProc: 0,
    layer: 28,
    lotType: 0,
    waveLength: 0
  },
  {
    no: 4,
    scanTime: '22:07:00 060822',
    lotId: 0,
    line: 0,
    stepId: 0,
    eqpId: 0,
    defectCount: 5,
    maskProc: 0,
    wfProc: 0,
    layer: 28,
    lotType: 0,
    waveLength: 0
  },
  {
    no: 5,
    scanTime: '22:07:00 060822',
    lotId: 0,
    line: 0,
    stepId: 0,
    eqpId: 0,
    defectCount: 5,
    maskProc: 0,
    wfProc: 0,
    layer: 28,
    lotType: 0,
    waveLength: 0
  },
  {
    no: 6,
    scanTime: '22:07:00 060822',
    lotId: 0,
    line: 0,
    stepId: 0,
    eqpId: 0,
    defectCount: 5,
    maskProc: 0,
    wfProc: 0,
    layer: 28,
    lotType: 0,
    waveLength: 0
  },
  // ... 더 많은 데이터
])

const formatTime = (timeStr: string) => {
  // 시간 포맷팅 로직
  return timeStr
}

// 아코디언 상태 관리
const isAccordionOpen = ref(true)
const accordionContent = ref<HTMLElement | null>(null)
const contentHeight = ref('auto')

const toggleAccordion = async () => {
  if (!accordionContent.value) return
  
  const $tableData = accordionContent.value.closest('.table-data')as HTMLElement

  if (isAccordionOpen.value) {
    // 닫기 전에 현재 높이 저장
    contentHeight.value = `${String(accordionContent.value.scrollHeight)}px`
    $tableData.style.overflowX = 'hidden'
    setTimeout(() => {
      $tableData.style.overflowX = 'auto'
    }, 300)
    await nextTick()
    isAccordionOpen.value = false;
  } else {
    isAccordionOpen.value = true
    $tableData.style.overflowX = 'hidden'
    setTimeout(() => {
      $tableData.style.overflowX = 'auto'
    }, 300)
  }
}

const handleTabClick = (tab: string) => {
  activeMainTab.value = tab;
  initialize();
};

onMounted(() => {
  initialize()
  // 초기 높이 설정
  if (accordionContent.value) {
    contentHeight.value = `${String(accordionContent.value.scrollHeight)}px`
  }

  // SplitScreen 토글 이벤트 리스너 등록
  on('toggle-split-screen', () => {
    splitScreenRef.value?.toggleSplitScreen(); 
    updateLayout();
  });

  // SplitScreen 리사이즈 이벤트 리스너 등록
  on('split-screen-resize', () => {
    updateLayout();
  });

  //dash-board 리사이즈 시 슬롯레이아웃 업데이트
  const $DASHBOARD = document.querySelector('.dash-board') as HTMLElement;

  $DASHBOARD.addEventListener('resize', () => {
    updateLayout();
  });
})

</script>

<style lang="scss" scoped>
.screen-default{
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
      widows: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .main-container{
        flex: 1;
        position: relative;
        overflow: hidden;
      }
      .slot {
        border: 2px solid #4a5568;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .data-wrap{
        border-radius: 16px;
        background-color: var(--color-white);
        border: 1px solid var(--color-gray4);
        padding: 20px;
        // padding-bottom: 32px;
        .data-container{
          width: 100%;
          height: 100%;
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
        }
        .data-inner{
          min-width: 600px;
          min-height: 400px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
          .data-inner-header{
            display: flex;
            justify-content: space-between;
            .data-title-wrap{
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              gap: 16px;
                .title, .sub-title{
                  font-weight: 700 !important;
                }
                .sub-title{
                  color: var(--color-gray2);
                }
              }
            .tab-list{
              display: flex;
              &.tab-list-2{
                gap: 4px;
              }
              .data-tab-btn {
                :deep(.button-text) {
                  font-weight: 700;
                }
              }
            }
          }
          .data-inner-content{
            // overflow: auto;
            height: 100%;
            display: flex;
            justify-content: center;
            .data{
              display: flex;
              justify-content: center;
              align-items: center;
              .data-img{
                &.data1{ width: 90%; max-width: 1100px;}
                &.data2{ width: 50%; max-width: 900px;}
              }
            }
          }
        }
      }
    }
  }

}

/* 2슬롯 레이아웃 */
.left-slot {
  top: 0;
  left: 0;
  height: 100%;
  // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.right-slot {
  top: 0;
  right: 0;
  height: 100%;
  // background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

/* 3슬롯 레이아웃 */
.top-left-slot {
  top: 0;
  left: 0;
  // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.top-right-slot {
  top: 0;
  right: 0;
  // background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.bottom-slot {
  bottom: 0;
  left: 0;
  width: 100%;
  // background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

/* 드래그 핸들 */
.drag-handle {
  position: absolute;
  background: rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;
  z-index: 10;
  opacity: 0;
}

.drag-handle:hover {
  background: rgba(0, 123, 255, 0.3);
}

.horizontal-handle {
  width: 8px;
  height: 100%;
  cursor: ew-resize;
  transform: translateX(-4px);
  // opacity: 0;
}

.vertical-handle {
  height: 8px;
  cursor: ns-resize;
  transform: translateY(-4px);
  // opacity: 0;
}

.corner-handle {
  width: 24px;
  height: 24px;
  cursor: move;
  background: rgba(255, 165, 0, 0.3);
  border-radius: 50%;
  border: 2px solid rgba(255, 165, 0, 0.6);
  // opacity: 0;
}

.corner-handle:hover {
  background: rgba(255, 165, 0, 0.6);
  border-color: rgba(255, 165, 0, 0.8);
}

.right-vertical-handle {
  height: 8px;
  cursor: ns-resize;
  transform: translateY(-4px);
  // opacity: 0;
}

.hidden {
  display: none;
}

.accordion-wrap {
  width: 100%;
  height: 100%;
  
  .accordion-item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .accordion-item-header {
      margin-bottom: 20px;
      .accordion-button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        img {
          transition: transform 0.3s ease;
          &.rotate {
            transform: rotate(180deg);
          }
        }
      }
    }
    
    .accordion-item-content {
      flex: 1;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      height: max-content;
      // min-width: 800px;
      // .data-table{
      //   width: max-content;
      // }
      
      &.collapsed {
        padding-top: 0;
        padding-bottom: 0;
        margin-top: 0;
        margin-bottom: 0;
      }
    }
    // .table-data{
    //   min-width: 800px;
    // }
  }
}
</style>
