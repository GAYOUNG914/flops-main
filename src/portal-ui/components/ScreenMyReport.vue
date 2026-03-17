<template>
  <div class="screen-report slot-task" style="display: flex;">
    <div class="dash-board">
      <div class="dash-board-navigator">
        <div class="tools">
          <div class="menu">
            <p class="b3_ko_s">메뉴찾기</p>
            <CustomDropdown
                v-model="defaultValue"
                :options="basicOptions"
                placeholder="Save Report"
                variant="default"
                class="board-dropdown"
              />
          </div>
          <Button size="32" minWidth="116" backgroundColor="black" fontColor="white" @click="openPopup">내보내기/가져오기</Button>
        </div>
        <Breadcrumb />
      </div>
      <main class="main-content">

        <div id="main-container" class="main-container">

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

    <!-- 내보내기 팝업-->
    <Popup2 :visible="isPopupVisible" @close="closePopup" width="848" class="popup-my-report">
      <template #title>
        My Report 내보내기/가져오기
      </template>
      <template #content>
        <div class="popup-my-report-content-inner">
          <div class="btns">
            <Button size="32" minWidth="82" lineColor="wafer-blue1" fontColor="wafer-blue1" backgroundColor="white" round>내보내기</Button>
            <Button size="32" minWidth="82" lineColor="gray4" fontColor="gray3" backgroundColor="white" round>가져오기</Button>
          </div>
          <div class="user">
            <div class="user-btn-wrap">
              <Button size="32" minWidth="86" backgroundColor="black" fontColor="white" @click="openPopup2">
                사용자 찾기
              </Button>
              <div class="total">
                <span class="b5_ko_s">Total : <em class="b5_ko_s">4</em></span>
              </div>
            </div>
            <div class="user-result">
              <div class="wrap">
                <Button onlyTextClose14>홍길동</Button>
                <Button onlyTextClose14>홍길동</Button>
                <Button onlyTextClose14>홍길동</Button>
                <Button onlyTextClose14>홍길동</Button>
              </div>
            </div>
          </div>
          <div class="subscribe">
            <div class="header">
              <div class="title b2_ko_s">구독목록</div>
              <div class="total">
                <span>Total <em>1/1</em> 건</span>
              </div>
            </div>
            <div class="wrap">
              <div class="list minus onedepth">
                <div class="list-inner">
                  <button class="box">
                    <!-- <img src="/portal-ui/icon/icon-list-minus.svg" alt=""> -->
                  </button>
                  <span class="text b3_ko_s">리스트 1</span>
                </div>
                <div class="list minus">
                  <div class="list-inner">
                    <button class="box">
                    </button>
                    <span class="text b3_ko_s">리스트 2</span>
                  </div>
                  <div class="list check">
                    <div class="list-inner">
                      <button class="box"></button>
                      <span class="text b3_ko_s">리스트 3</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list plus onedepth">
                <div class="list-inner">
                  <button class="box"></button>
                  <span class="text b3_ko_s">리스트 4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #bottom-right>
        <Button size="40" minWidth="120" backgroundColor="white" fontColor="gray1" lineColor="gray4" @click="closePopup">
          취소
        </Button>
        <Button size="40" minWidth="120" backgroundColor="black" fontColor="white" @click="closePopup">
          내보내기
        </Button>
      </template>
    </Popup2>

    <!-- 사용자 검색 팝업-->
    <Popup2 :visible="isPopupVisible2" @close="closePopup2" width="928" class="popup-user-search">
      <template #title>
        사용자 검색
      </template>
      <template #content>
        <div class="popup-user-search-content-inner">
          <div class="btns">
            <Button size="32" minWidth="82" lineColor="wafer-blue1" fontColor="wafer-blue1" backgroundColor="white" round>임직원</Button>
            <Button size="32" minWidth="82" lineColor="gray4" fontColor="gray3" backgroundColor="white" round>연락처</Button>
          </div>

          <div class="header">
            <div class="left">
              <div class="title b2_ko_s">검색결과</div>
              <div class="total">
                <span class="b3_ko_s">Total<em class="b5_ko_s">3</em></span>
              </div>
              <Button size="32" minWidth="86" backgroundColor="black" fontColor="white" @click="closePopup2">
                추가
              </Button>
            </div>
            <div class="right">
              <TextInput placeholder="성명" search class="search-input"/>
              <Button size="32" minWidth="86" backgroundColor="black" fontColor="white">
                검색
              </Button>
            </div>
          </div>

          <div class="table">
            <DataTable :columns="userColumns" :data="userTableData">
              <template #checkbox="{ index }">
                <Checkbox v-model:checked="checkedList[index]" />
              </template>
              <template #name="{ value }">
                <span>{{ value }}</span>
              </template>
            </DataTable>
          </div>

          <div class="selected-user">
            <div class="wrap">
              <Button onlyTextClose14>홍길동</Button>
              <Button onlyTextClose14>홍길동</Button>
            </div>
          </div>

        </div>
      </template>
      <template #bottom-right>
        <Button size="40" minWidth="120" backgroundColor="white" fontColor="gray1" lineColor="gray4" @click="closePopup2">
          취소
        </Button>
        <Button size="40" minWidth="120" backgroundColor="black" fontColor="white" @click="closePopup2">
          확인
        </Button>
      </template>
    </Popup2>
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
import CustomDropdown from './Dropdown.vue'
import Popup2 from './Popup2.vue';
import TextInput from './TextInput.vue';
import Checkbox from './Checkbox.vue';

interface SplitScreenInstance {
  toggleSplitScreen: () => void;
}

const isPopupVisible = ref(false);
const isPopupVisible2 = ref(false);

const openPopup = () => {
  isPopupVisible.value = true;
}

const openPopup2 = () => {
  isPopupVisible2.value = true;
}

const closePopup = () => {
  isPopupVisible.value = false;
}

const closePopup2 = () => {
  isPopupVisible2.value = false;
}

const checkedList = ref<boolean[]>([]);


const splitScreenRef = ref<SplitScreenInstance | null>(null);
const { on } = useEventBus();

// 상단 탭 버튼들의 토글 상태 관리
// const activeMainTab = ref('tab1')

// 탭 선택 상태 관리
const selected3 = ref('tab1')
const selected4 = ref('tab1')

const defaultValue = ref<string | number | (string | number)[] | null>(null)

const basicOptions = ref<{ value: string | number, label: string, disabled?: boolean }[]>([
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' , disabled: true},
  { value: 'option3', label: '옵션 3' },
])


const select3 = (value: string) => {
  selected3.value = value
}
const select4 = (value: string) => {
  selected4.value = value
}

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

const userColumns = [
  { key: 'checkbox', label: 'No', class: 'w-60' },
  { key: 'name', label: '성명', class: 'w-90', headerClass: 'highlight' },
  { key: 'engName', label: '영문성명', class: 'w-140' },
  { key: 'knoxId', label: 'Knox Potal ID', class: 'w-120' },
  { key: 'department', label: '부서', class: 'w-200' },
  { key: 'duty', label: '담당업무', class: 'w-120' },
  { key: 'company', label: '회사', class: 'w-120' }
]

//checkbox와 no 병합
// const mergeRules = ref({
//   0: [{ start: 1, end: 2, value: '읽지 않은 알림105' }], // 105번 행: 요청,개수 컬럼 병합
//   1: [{ start: 1, end: 2, value: '읽지 않은 알림104' }]  // 104번 행: 요청,개수 컬럼 병합
// })

const userTableData = [
  {
    checkbox: '', // 체크박스는 slot으로 커스텀
    name: '홍길동',
    engName: 'GILDONG HONG',
    knoxId: 'GD.hong',
    department: '설비/인프라 IT그룹(AI센터)',
    duty: 'AI 운영 관리',
    company: '삼성전자'
  },
  {
    checkbox: '',
    name: '고길동',
    engName: 'GILDONG HONG',
    knoxId: 'GD.hong',
    department: '설비/인프라 IT그룹(AI센터)',
    duty: 'AI 운영 관리',
    company: '삼성전자'
  },
  {
    checkbox: '',
    name: '김길동',
    engName: 'GILDONG HONG',
    knoxId: 'GD.hong',
    department: '설비/인프라 IT그룹(AI센터)',
    duty: 'AI 운영 관리',
    company: '삼성전자'
  },
  {
    checkbox: '',
    name: '홍길동',
    engName: 'GILDONG HONG',
    knoxId: 'GD.hong',
    department: '설비/인프라 IT그룹(AI센터)',
    duty: 'AI 운영 관리',
    company: '삼성전자'
  }
]


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

// const handleTabClick = (tab: string) => {
//   activeMainTab.value = tab;
//   initialize();
// };

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
.screen-report{
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
      .tools{
        display: flex;
        align-items: center;
        gap: 8px;
        .menu{
          display: flex;
          align-items: center;
          gap: 8px;
          p{color: var(--color-gray2);}
          .board-dropdown{
            width: 160px;
          }
        }
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
                  font-weight: 700 !important;
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

.popup-my-report{
  .popup-my-report-content-inner{
    margin-top: 20px;
    .btns{
      display: flex;
      align-items: center;
      gap: 8px;
      .btn{
        :deep(.button-text){
          font-weight: 700 !important;
        }
      }
    }
    .user{
      margin-top: 20px;
      .user-btn-wrap{
        display: flex;
        align-items: center;
        gap: 16px;
        .total{
          color: var(--color-gray2);
        }
      }
      .user-result{
        margin-top: 12px;
        .wrap{
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 4px;
          border: 1px solid var(--color-gray3);
          .btn{
            :deep(.button-text){
              color: var(--color-gray2) !important;
              gap: 0;
              .icon-close{
                opacity: 0.6;
              }
            }
          }
        }
      }
    }
    .subscribe{
      margin-top: 20px;
      .header{
        display: flex;
        align-items: center;
        gap: 16px;
        .title{
          font-weight: 700 !important;
        }
        .total{
          color: var(--color-gray2);
        }
      }
      .wrap{
        margin-top: 12px;
        padding: 14px 18px;
        border: 1px solid var(--color-gray4);
        border-radius: 4px;
        .list{
          margin-top: 16px;
          &:first-child{
            margin-top: 0;
          }
          &:not(.onedepth){
            padding-left: 24px;
          }
          .list-inner{
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .box{
            width: 24px; height: 24px;
          }
          &.minus{
            .box{
              background: url('/portal-ui/icon/icon-list-minus.svg') no-repeat center center / contain;
            }
          }
          &.plus{
            .box{
              background: url('/portal-ui/icon/icon-list-plus.svg') no-repeat center center / contain;
            }
          }
          &.check{
            .box{
              background: url('/portal-ui/icon/icon-list-check.svg') no-repeat center center / contain;
            }
          }
        }
      }
    }
  }
}

.popup-user-search{
  .popup-user-search-content-inner{
    margin-top: 20px;
    .btns{
      display: flex;
      align-items: center;
      gap: 8px;
      .btn{
        :deep(.button-text){
          font-weight: 700 !important;
        }
      }
    }
    .header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      .left{
        display: flex;
        align-items: center;
        gap: 16px;
        .title{
          font-weight: 700 !important;
        }
        .total{
          color: var(--color-gray2);
        }
      }
      .right{
        display: flex;
        align-items: center;
        gap: 8px;
        .search-input{
          :deep(input){
            width: 200px;
          }
        }
      }
    }
    .table{
      margin-top: 12px;
      padding: 16px;
      border: 1px solid var(--color-gray4);
      border-radius: 4px;
      .checkbox{
        gap: 0;
        justify-content: center;
      }
    }
    .selected-user{
      margin-top: 20px;
      .wrap{
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 6px 16px;
        border-radius: 4px;
        border: 1px solid var(--color-gray3);
        .btn{
          :deep(.button-text){
            color: var(--color-gray2) !important;
            gap: 0;
            .icon-close{
              opacity: 0.6;
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
