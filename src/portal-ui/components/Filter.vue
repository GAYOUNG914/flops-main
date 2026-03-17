<template>
  <div id="FILTER">
    <div class="filter-wrap">
      <div class="filter-header">
        <div class="filter-header-inner">
          <button class="title h8_ko_s" @click="openLoading"> <slot name="title">Page Name EN 24, 한글은 12자</slot> </button>
          <div class="icon-wrap">
            <button class="filter-icon bookmark">
              <span class="blind">bookmark</span>
            </button>
            <button class="filter-icon window" @click="openNewWindow">
              <span class="blind">window</span>
            </button>
            <button class="filter-icon expand-right" @click="handleExpandRight">
              <span class="blind">expand-right</span>
            </button>
            <button class="filter-icon tutorials" :class="{ 'is-active': isTutorialPopupOpen }" @click="openTutorialPopup">
              <span class="blind">tutorials</span>
            </button>
            <button class="filter-icon filter" @click="toggleFilterContents">
              <span class="blind">filter</span>
            </button>
          </div>

          <transition name="fade">          
            <div class="filter-tooltip" :class="{'on': filterTooltipClose}" v-show="!filterTooltipClose">
              <div class="text">
                <span class="b4_ko_s">필터 열기</span>
              </div>
              <button class="close" @click.stop="filterTooltipClose = true">
                <img src="/portal-ui/icon/icon-close-white.svg" alt="close">
              </button>
            </div>   
          </transition>

        </div>
      </div>
      <div class="filter-contents">
        <div class="filter-middle">
          <div class="table-wrap">
            <div class="table" v-for="(table, index) in tables" :key="table.id" >
              <div class="table-datas">
                <div class="table-title b3_ko_s">
                  {{ table.tableTitle }}
                </div>
                <div class="conditions-wrap">
                  <div v-for="group in table.conditionGroups" :key="group.id" class="conditions">
                    <div
                      class="condition"
                      v-for="cond in group.conditions"
                      :key="cond.id"
                    >
                      <div class="condition-title b5_ko_s">{{ cond.label }}</div>
                      <div class="condition-data">
                        <template v-if="cond.type === 'dropdown'">
                          <CustomDropdown
                            v-model="cond.value"
                            :options="cond.options || []"
                            placeholder="옵션을 선택하세요"
                            :show-check-icon="true"
                          />
                        </template>
                        <template v-else-if="cond.type === 'input'">
                          <input v-model="cond.value" placeholder="입력하세요" />
                        </template>
                      </div>
                    </div>
                    <!-- <button @click="removeConditionGroup(group.id)">조건 그룹 삭제</button> -->
                  </div>
                </div>
              </div>
              <div class="condition-group-control">
                <button class="btn-group-handle add" :class="{'disabled': table.conditionGroups.length === 4}" @click="addConditionGroup($event, table.id)"><span class="blind">조건 그룹 추가</span></button>
                <button class="btn-group-handle remove" :class="{'disabled': table.conditionGroups.length === 1}" @click="removeLastConditionGroup($event, table.id)" :disabled="table.conditionGroups.length === 1"><span class="blind">최근 조건 그룹 삭제</span></button>
                <Button class="add-table-button" size="32" backgroundColor="black1" @click="addTable" :style="{display: index === 0 ? 'block' : 'none'}">Add Table</Button>
                <Button class="remove-table-button" size="32" backgroundColor="gray3" @click="removeTable(table.id)" :style="{display: index === 0 ? 'none' : 'block'}">Remove Table</Button>
              </div>
            </div>
          </div>
        </div>
        <div class="filter-bottom">
          <div class="filter-bottom-inner">
            <div class="left">
              <Button size="32" backgroundColor="white" fontColor="gray1" lineColor="gray4" underlineColor="gray4" @click="openMyPopup">
                My
              </Button>
              <Button size="32" backgroundColor="white" fontColor="gray1" lineColor="gray4" underlineColor="gray4" @click="openMyReportPopup"> 
                My Report에 저장
              </Button>
            </div>
            <div class="right">
              <Button size="48" search backgroundColor="waferblue1" @click="toggleFilterContents">
                  검색
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Popup class="popup-tutorial" :visible="isTutorialPopupOpen" @close="closeTutorialPopup" width="560">
    <div class="popup-tutorial-content">
      <div class="tutorial-header">
        <p class="title h7_en_s">Welcome to FLOPS</p>
      </div>
      <div class="tutorial-content">
        <div class="tutorial-swiper-wrap">
          <Swiper
            :slides-per-view="1"
            :space-between="24"
            :navigation="{
              nextEl: '.custom-swiper-next',
              prevEl: '.custom-swiper-prev',
            }"
            :pagination="{
              el: '.custom-swiper-pagination',
              clickable: true,
            }"
            :allow-touch-move="false"
            class="tutorialSwiper"
          >
            <SwiperSlide>
              <div style="height:320px; background:#ddd; display:flex; align-items:center; justify-content:center;">슬라이드 1</div>
            </SwiperSlide>
            <SwiperSlide>
              <div style="height:320px; background:#ddd; display:flex; align-items:center; justify-content:center;">슬라이드 2</div>
            </SwiperSlide>
            <SwiperSlide>
              <div style="height:320px; background:#ddd; display:flex; align-items:center; justify-content:center;">슬라이드 3</div>
            </SwiperSlide>
            <SwiperSlide>
              <div style="height:320px; background:#ddd; display:flex; align-items:center; justify-content:center;">슬라이드 4</div>
            </SwiperSlide>
            <SwiperSlide>
              <div style="height:320px; background:#ddd; display:flex; align-items:center; justify-content:center;">슬라이드 5</div>
            </SwiperSlide>
          </Swiper>
          <div class="tutorial-swiper-controls">
            <div class="custom-swiper-prev swiper-button-prev"></div>
            <div class="custom-swiper-pagination swiper-pagination"></div>
            <div class="custom-swiper-next swiper-button-next"></div>
          </div>
        </div>
        <div class="tutorial-desc b3_ko_s">
          유틸리티 영역은 즐겨찾기, 새 창으로 이동, 화면분할 등 주요 기능에 <br/>
          빠르게 접근할 수 있도록 도와줍니다. 현재 화면을 벗어나지 않고도 <br/>
          작업 환경을 효율적으로 관리할 수 있습니다.
        </div>
      </div>
    </div>
    <template #footer="{ close }">
       <Button class="btn-tutorial-confirm" size="40" backgroundColor="black" fontColor="white" min-width="312" @click="close">확인</Button>
      <div class="tutorial-bottom">
        <button class="no-more-show" @click="close">더 이상 이 메시지 보지 않기</button>
        <button class="anotehr-close" @click="close">닫기</button>
      </div>
    </template>
  </Popup>

  <Popup class="popup-alert" :visible="isMyPopup" @close="closeMyPopup" width="360" isDefault>
    <template #subTitle>
      <span class="b3_ko_s">입력된 저장 내역이 있습니다. <br/>현재 내용으로 저장 하시겠습니까?</span>
    </template>
    <template #bottom>
      <Button size="40" minWidth="152" backgroundColor="white" fontColor="gray1" lineColor="gray4" @click="closeMyPopup">
        취소
      </Button>
      <Button size="40" minWidth="152" backgroundColor="black" fontColor="white" @click="closeMyPopup">
        확인
      </Button>
    </template>
  </Popup>

  <Popup class="popup-confirm" :visible="isMyReportPopup" @close="closeMyReportPopup" width="360" isDefault>
    <template #subTitle>
      <span class="b3_ko_s">저장되었습니다.</span>
    </template>
    <template #bottom>
        <Button size="40" minWidth="312" backgroundColor="black" fontColor="white" @click="closeMyReportPopup">
          확인
        </Button>
    </template>
  </Popup>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CustomDropdown from './Dropdown.vue';  
import Button from './Button.vue';
import { gsap } from 'gsap';
import { useDeemOverlay } from '../composables/useDeemOverlay';
import { useEventBus } from '../composables/useEventBus';
import Popup from './Popup.vue'; // 팝업 컴포넌트 import
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SwiperCore from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'

// Props 정의
interface Props {
  initialFilterState?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  initialFilterState: true
});

const { emit } = useEventBus();

defineEmits(['toggle-split-screen']);

interface FilterList {
  name: string;
  isActive: boolean;
}

interface Condition {
  id: number
  type: 'dropdown' | 'input' | 'button'
  label: string
  value: string | number | null
  options?: { value: string | number, label: string, disabled?: boolean }[]
}

interface ConditionGroup {
  id: number
  conditions: Condition[]
}

interface TableBlock {
  id: number
  tableTitle: string
  conditionGroups: ConditionGroup[]
}

const filterList = ref<FilterList[]>([
  {
    name: 'bookmark',
    isActive: false,
  },
  {
    name: 'window',
    isActive: false,
  },
  {
    name: 'expand-right',
    isActive: false,  
  },
  {
    name: 'tutorials',
    isActive: false,
  },
  {
    name: 'filter',
    isActive: false,
  },
  
])

const $FILTER = ref<HTMLElement | null>(null);
const filterState = ref(props.initialFilterState);
let nextTableId = 1
let nextGroupId = 1
let nextConditionId = 1

const tables = ref<TableBlock[]>([
  {
    id: nextTableId++,
    tableTitle: '영문 16/ 한글 8두 줄 배치 허용',
    conditionGroups: [createDefaultConditionGroup()]
  }
])

const isTutorialPopupOpen = ref(false);
const isMyPopup = ref(false);
const isMyReportPopup = ref(false);
const filterTooltipClose = ref(false);

SwiperCore.use([Navigation, Pagination])

function openTutorialPopup() {
  isTutorialPopupOpen.value = true;
}
function closeTutorialPopup() {
  isTutorialPopupOpen.value = false;
}

function openMyPopup() {
  isMyPopup.value = true;
}
function closeMyPopup() {
  isMyPopup.value = false;
}

function openMyReportPopup() {
  isMyReportPopup.value = true;
}
function closeMyReportPopup() {
  isMyReportPopup.value = false;
}

function openLoading() {
  emit('openLoading');
}

function createDefaultConditionGroup(): ConditionGroup {
  return {
    id: nextGroupId++,
    conditions: [
      {
        id: nextConditionId++,
        type: 'dropdown',
        label: 'Proc Step',
        value: null,
        options: [
          { value: 'option1', label: '옵션 1' },
          { value: 'option2', label: '옵션 2', disabled: true },
          { value: 'option3', label: '옵션 3' }
        ]
      },
      // {
      //   id: 2,
      //   type: 'input',
      //   label: 'Keyword',
      //   value: ''
      // },
      // {
      //   id: 3,
      //   type: 'button',
      //   label: 'Action',
      //   value: null
      // }
      { //ui 만들어야해서 일단 드롭다운으로만 채우기, 추후 캘린더, 멀티드롭다운 만들거임
        id: 2,
        type: 'dropdown',
        label: '조건명 영문16글자/한글8글자',
        value: null,
        options: [
          { value: 'option122', label: '옵션 122' },
          { value: 'option222', label: '옵션 222', disabled: true },
          { value: 'option322', label: '옵션 322' }
        ]
      },
      {
        id: 3,
        type: 'dropdown',
        label: 'Proc Step',
        value: null,
        options: [
          { value: 'option133', label: '옵션 133' },
          { value: 'option233', label: '옵션 233', disabled: true },
          { value: 'option333', label: '옵션 333' }
        ]
      },
    ]
  }
}

function createDummyConditionGroup(): ConditionGroup {
  return {
    id: nextGroupId++,
    conditions: [
      {
        id: nextConditionId++,
        type: 'dropdown',
        label: '새로운데이터',
        value: null,
        options: [
          { value: 'option1', label: '옵션 1' },
          { value: 'option2', label: '옵션 2', disabled: true },
          { value: 'option3', label: '옵션 3' }
        ]
      },
      
    ]
  }
}

function addTable() {
  tables.value.push({
    id: nextTableId++,
    tableTitle: '새 테이블 제목',
    conditionGroups: [createDummyConditionGroup()]
  })
}

function removeTable(id: number) {
  tables.value = tables.value.filter(t => t.id !== id)
}

function addConditionGroup(event: MouseEvent, tableId: number) {
  const table = tables.value.find(t => t.id === tableId)
  
  if (table && table.conditionGroups.length < 4) {
    const lastGroup = table.conditionGroups[table.conditionGroups.length - 1]
    const newGroup: ConditionGroup = {
      id: nextGroupId++,
      conditions: lastGroup.conditions.map(cond => ({
        ...cond,
        id: nextConditionId++,
        value: cond.type === 'dropdown' ? null : (cond.type === 'input' ? '' : null)
      }))
    }
    table.conditionGroups.push(newGroup)
  }
}

function removeLastConditionGroup(event: MouseEvent, tableId: number) {
  const table = tables.value.find(t => t.id === tableId)
  if (table && table.conditionGroups.length > 1) {
    table.conditionGroups.pop()
  }
}

// function clickFilterIcon() {
//   const $filterIcons = document.querySelectorAll('.filter-icon');
//   $filterIcons.forEach((icon: Element) => {
//     icon.addEventListener('click', () => {

//       // $filterIcons.forEach((icon: Element) => {
//       //   icon.classList.remove('is-active');
//       // })

//       //같은 아이콘 또 클릭하면 토글
//       if(icon.classList.contains('is-active')){
//         icon.classList.remove('is-active');
//         console.log('remove');
//       }else{
//         icon.classList.add('is-active');
//         console.log('add');
//       }
//     })
//   })
// }

function toggleFilterContents(){
  const { createDeemOverlay, removeDeemOverlay } = useDeemOverlay('filter');
  const $filterContent = document.querySelector('.filter-contents') as HTMLElement;
  const $filterIcon = document.querySelector('.filter-icon.filter');

  //filter가 moving 중이면 return
  if(gsap.isTweening($filterContent)){
    return;
  }

  const filterHeight = $filterContent.clientHeight;
  if(filterState.value){
    //필터 닫힘
    gsap.to($filterContent, {
      y: -filterHeight - 2,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        $filterContent.style.height = '0px';
      }
    })
    removeDeemOverlay();
    if($filterIcon){
      $filterIcon.classList.remove('is-active');
    }
    // 필터가 닫힐 때 tooltip 보이기
    filterTooltipClose.value = false;
    // console.log('필터 닫힘  ')
  }else{
    //필터 열림
    gsap.to($filterContent, {
      y: 0,
      duration: 0.3,
      ease: 'power2.inOut',
      onStart: () => {
        $filterContent.style.height = 'auto';
      }
    })
    createDeemOverlay(toggleFilterContents);
    if($filterIcon){
      $filterIcon.classList.add('is-active');
    }
    // 필터가 열릴 때 tooltip 숨기기
    filterTooltipClose.value = true;
    // console.log('필터 열림')
  }
  filterState.value = !filterState.value;
}

function handleExpandRight() {
  emit('toggle-split-screen');

  //필터가 열려있다면 필터 닫기
  if(filterState.value){
    toggleFilterContents();
  }

  // props.initialFilterState
}

const openNewWindow = () => {
  // 새 창 열기 이벤트 발생
  emit('save-window-state');
  
  // 새 창 열기
  const currentUrl = window.location.href;
  const windowFeatures = [
    'width=1920',
    'height=1080',
    'resizable=yes',
    'scrollbars=yes',
    'status=yes',
    'location=yes',
    'menubar=yes',
    'toolbar=yes',
    'top=0',
    'left=0'
  ].join(',');
  
  window.open(currentUrl, '_blank', windowFeatures);
};

onMounted(() => {
  $FILTER.value = document.querySelector('#FILTER');

  //filter 초기 설정
  //filter 아이콘버튼 초기설정
  filterList.value.forEach(item => {
    if(item.name === 'filter'){
      item.isActive = true;
    }
  })
  
  //filter 가로 스크롤
  window.addEventListener('scroll', () => { 
      const bwLeft = window.scrollX;
      if($FILTER.value){
        $FILTER.value.style.left = `-${String(bwLeft)}px`;
      }
  });

  // clickFilterIcon();
  
  // initialFilterState에 따라 필터 초기 상태 설정
  if (props.initialFilterState) {
    // 기본값: 열린 상태
    filterState.value = false;
    toggleFilterContents();
  } else {
    // 닫힌 상태로 시작
    filterState.value = true;
    toggleFilterContents();
    // 필터가 닫혀있는 상태로 보이도록 설정
    const $filterContent = document.querySelector('.filter-contents') as HTMLElement;
    const $filterIcon = document.querySelector('.filter-icon.filter');
    
    // if ($filterContent) {
      $filterContent.style.height = '0px';
      $filterContent.style.overflow = 'hidden';
    // }
    
    if ($filterIcon) {
      $filterIcon.classList.remove('is-active');
    }
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/common/_mixin' as *;
@use '@/assets/common/_variables' as *;

#FILTER{
  position: fixed;
  top: 0;
  left: 0;
  min-width: 1440px;
  width: 100%;
  // background-color: var(--color-white);
  z-index: 50;
  .filter-wrap{
    .filter-header{
      position: relative;
      z-index: 1;
      .filter-header-inner{
        display: flex;
        align-items: center;
        gap: 40px;
        padding: 16px 24px;
        background-color: var(--color-white);
        border-bottom: 1px solid var(--color-gray4);
        box-shadow: 0px 2px 4px 0px #0000000F;
        .title{
          font-weight: 700 !important;
        }
        .icon-wrap{
          display: flex;
          align-items: center;
          gap: 20px;
          button{
            position: relative;
            width: 24px;
            height: 24px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url('/portal-ui/filter/icon-bookmark-active.svg');
            transition: background 0.3s ease;
            // &:before{
            //   content: '';
            //   position: absolute;
            //   display: inline-block;
            //   top: 50%; left: 50%;
            //   transform: translate(-50%, -50%);
            //   width: 120%;
            //   height: 120%;
            //   background-color: var(--color-gray5);
            //   border-radius: 50%;
            //   // z-index: -1;
            //   opacity: 0;
            //   transition: opacity 0.3s ease;
            // }
            // @include hoverable{
            //   &:hover{
            //     &:before{
            //       opacity: 1;
            //     }
            //   }
            // }
            @include hoverable{
              &:hover{
                &.bookmark{
                background-image: url('/portal-ui/filter/icon-bookmark-active.svg');
                }
                &.window{
                  background-image: url('/portal-ui/filter/icon-window-active.svg');
                }
                &.expand-right{
                  background-image: url('/portal-ui/filter/icon-expand-right-active.svg');
                }
                &.tutorials{
                  background-image: url('/portal-ui/filter/icon-tutorial-active.svg');
                }
                &.filter{
                  background-image: url('/portal-ui/filter/icon-filter-active.svg');
                }
              }
            }
            &.is-active {
              &.bookmark{
                background-image: url('/portal-ui/filter/icon-bookmark-active.svg');
              }
              &.window{
                background-image: url('/portal-ui/filter/icon-window-active.svg');
              }
              &.expand-right{
                background-image: url('/portal-ui/filter/icon-expand-right-active.svg');
              }
              &.tutorials{
                background-image: url('/portal-ui/filter/icon-tutorial-active.svg');
              }
              &.filter{
                background-image: url('/portal-ui/filter/icon-filter-active.svg');
              }
            }
            &.bookmark{
              background-image: url('/portal-ui/filter/icon-bookmark.svg');
            }
            &.window{
              background-image: url('/portal-ui/filter/icon-window.svg');
            }
            &.expand-right{ 
              background-image: url('/portal-ui/filter/icon-expand-right.svg');
            }
            &.tutorials{
              background-image: url('/portal-ui/filter/icon-tutorial.svg');
            }
            &.filter{
              background-image: url('/portal-ui/filter/icon-filter.svg');
            }
          }         
        }
      }
      .filter-tooltip{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 542px;
        width: 100px;
        height: 30px;
        z-index: 10;
        background-color: var(--color-gray1);
        border-radius: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        &:after{
            content: '';
            position: absolute;
            top: 50%;
            left: -7px;
            width: 10px;
            height: 8px;
            transform: translateY(-50%);
            background-image: url('/portal-ui/icon/tootip-arrow-left-dark.svg');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
          }
        .text{
          display: flex;
          align-items: center;
          height: 100%;
          padding-left: 16px;
        }
        .close{
          width: 12px;
          height: 12px;
        }
        .bg-img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        span{
          display: block;
          color: var(--color-white);
        }
      } 
    }
    .filter-contents{
      border-bottom: 1px solid var(--color-wafer-blue1);
      background-color: var(--color-white);
      .filter-middle{
        .table-wrap{
          padding: 0 20px;
        }
        .table{
          display: flex;
          padding: 16px 0;
          border-bottom: 1px solid var(--color-gray5);
          &:last-child{
            border-bottom: none;
          }
          .table-datas{
            display: flex;
            align-items: center;
            gap: vw(w, 40);
          }
          .table-title{
            width: vw(w, 120);
            font-weight: 600 !important;
          }
          .conditions-wrap{
            display: flex;
            align-items: center;
            // justify-content: space-around;
            // gap: 60px;
            gap: vw(w, 60);
            .conditions{
              display: flex;
              flex-direction: column;
              .condition{
                display: flex;
                align-items: center;
                gap: 12px;
                height: 32px;
                padding: 6px 0;
                box-sizing: content-box;
                .condition-title{
                  width: vw(w, 140);
                  // font-size: vw(w, 12);
                  // width: 140px;
                  letter-spacing: 0;
                  color: var(--color-gray2);
                }
                .condition-data{
                  width: vw(w, 164);
                  flex-shrink: 0;
                }
              }
            }
          }
          .condition-group-control{
              margin-top: auto;
              margin-bottom: 6px;
              margin-left: vw(w, 20);
              display: flex;
              gap: 8px;
              .btn-group-handle{
                width: 32px;
                height: 32px;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                background-image: url('/portal-ui/filter/icon-plus.svg');
                opacity: 1;
                transition: opacity 0.2s $ease-out-rowan;
                &.add{
                  background-image: url('/portal-ui/filter/icon-plus.svg');
                }
                &.remove{
                  background-image: url('/portal-ui/filter/icon-minus.svg');
                }
                &.disabled{
                  opacity: 1 !important;
                  cursor: not-allowed;
                  &.add{
                    background-image: url('/portal-ui/filter/icon-plus-disabled.svg');
                  }
                  &.remove{
                    background-image: url('/portal-ui/filter/icon-minus-disabled.svg');
                  } 
                }
                @include hoverable{
                  &:hover{
                    opacity: 0.7;
                  }
                }
              }
            }
        }
      }
      .filter-bottom{
        background-color: var(--color-bg1);
        .filter-bottom-inner{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          .left{
            display: flex;
            align-items: center;
            gap: 8px;
          }
        }
      }
    }
  }
}

.popup-tutorial{
  :deep(.popup-close){
    display: none;
  }
  :deep(.popup-container){
    padding: 20px 4px 2px;
  }
  .popup-tutorial-content{
    .title{
      text-align: center;
    }
    .tutorial-swiper-wrap {
      width: 100%;
      margin: 0 auto;
      margin-top: 32px;
      .tutorialSwiper {
        width: 100%;
        height: 320px;
      }
      .tutorial-swiper-controls {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-top: 32px;
      }
      .custom-swiper-prev,
      .custom-swiper-next {
        position: static;
        margin: 0;
        width: 24px;
        height: 24px;
        color: var(--color-black1);
        &:after{
          font-size: unset;
        }
      }
      .custom-swiper-pagination {
        position: static;
        display: flex;
        justify-content: center;
        width: auto;
        :deep(.swiper-pagination-bullet){
          background-color: var(--color-gray3);
        }
        :deep(.swiper-pagination-bullet-active){
          background-color: var(--color-black1);
        }
      }
    }
    .tutorial-desc{
      width: 448px;
      margin: 0 auto;
      margin-top: 32px;
      color: var(--color-gray2);
      text-align: center;
    }
  }
  :deep(.popup-footer){
    margin-top: 32px;
    flex-direction: column;
    gap: 34px;
    .btn-tutorial-confirm{
      width: 312px;
      margin: 0 auto;
    }
    .tutorial-bottom{
      display: flex;
      justify-content: space-between;
      align-content: center;
      .no-more-show{
        color: var(--color-gray2);
      }
      .anotehr-close{
        display: flex;
        align-items: center;
        color: var(--color-gray2);
        &:after{
          content: '';
          display: inline-block;
          margin-left: 8px;
          width: 20px;
          height: 20px;
          background-image: url('/portal-ui/icon/icon-close-gray.svg');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
    }
  }
}

</style>