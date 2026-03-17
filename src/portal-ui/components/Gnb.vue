<template>
  <div id="GNB" :class="{'is-open': isOpen}" v-bind="$attrs">
    <div class="gnb-wrap">
      <div class="gnb-inner">
        <div class="gnb-header">
          <div class="gnb-navs">
            <div class="logo-wrap">
              <a href="javascript:void(0)" class="logo-link">
                <img src="/portal-ui/main/main-logo-dark.png" alt="logo">
              </a>
            </div>
            <nav class="gnb-list">
              <ul>
                <li v-for="item in gnbList" :key="item.name" @click="handleListActive($event)" :class="{'is-active': item.name === 'Analysis'}">
                  <!-- 링크이동이면 a -->
                  <a v-if="item.link" href="javascript:void(0)" class="b2_ko_s gnb-link-btn" :title="item.name">{{ item.name }}</a>
                  <!-- 탭 버튼이면 button -->
                  <button v-else class="b2_ko_s gnb-btn" :title="item.name" @click="handleClickTap(item.name);" >
                    {{ item.name }}
                  </button>
                </li>
              </ul>
              <!-- 추가 버튼 일단 리스트만 추가되게..? -->
              <button class="btn-add-list" @click="handleAddList">
                <img src="/portal-ui/icon/icon-add-btn.svg" alt="add list">
              </button>
            </nav>
          </div>
          <div class="gnb-tooltips">

            <button class="tooltip tooltip-search">
              <img src="/portal-ui/icon/gnb-search.svg" alt="search">
            </button>

            <!-- 알람아이콘버튼 -->
            <button class="tooltip tooltip-alarm"
              @click="openedTooltip = 'alarm'"
            >
              <img src="/portal-ui/icon/gnb-alarm.svg" alt="alarm">
              <span class="badge"><em>3</em></span>
              <TooltipPopover
                :visible="openedTooltip === 'alarm'"
                arrowPosition="top"
                @close="openedTooltip = null"
                :style="{ top: '56px', right: '-14px'}"
                :showClose="true"
                class="tooltip-alarm-popover tooltip-custom-popover"
              >
                <div class="tooltip-alarm-header tooltip-custom-header">
                  <span class="b2_ko_s" style="font-weight: 700 !important;">Alram</span>
                </div>
                <div class="tooltip-alarm-content tooltip-custom-content">
                  <DataTable :columns="alarmcolumns" :data="alarmList">
                    <template #name="{ value }">
                      <span class="alarm-title">{{ value }}</span>
                    </template>
                    <template #desc="{ value }">
                      <span class="alarm-desc-text">{{ value }}</span>
                    </template>
                  </DataTable>
                </div>
                <div class="tooltip-alarm-bottom tooltip-custom-bottom">
                  <Button size="32" minWidth="86" fontColor="gray1" lineColor="gray4" backgroundColor="white">더보기</Button>
                </div>
              </TooltipPopover>
            </button>

            <!-- 즐겨찾기아이콘버튼 -->
            <button
              class="tooltip tooltip-favorite"
              @click="openedTooltip = 'favorite'"
            >
              <img src="/portal-ui/icon/gnb-star.svg" alt="favorite" />
              <!-- 아이콘버튼크기 56px -> tooltip top 56px -->
              <TooltipPopover
                :visible="openedTooltip === 'favorite'"
                arrowPosition="top"
                @close="openedTooltip = null"
                :style="{ top: '56px', right: '-14px'}"
                :showClose="true"
                class="tooltip-favorite-popover tooltip-custom-popover"
              >
              <div class="tooltip-favorite-header tooltip-custom-header">
                <span class="b2_ko_s" style="font-weight: 700 !important;">즐겨찾기</span>
              </div>
              <div class="tooltip-favorite-content tooltip-custom-content">
                <DataTable :columns="favoritecolumns" :data="favoriteList">
                  <template #name="{ value }">
                    <a href="javascript:void(0)" class="favorite-title">{{ value }}</a>
                  </template>
                  <template #action>
                    <Button size="32" minWidth="64" fontColor="white" backgroundColor="black" round>삭제</Button>
                  </template>
                </DataTable>
              </div>
              <div class="tooltip-favorite-bottom tooltip-custom-bottom">
                <Button size="32" minWidth="86" fontColor="gray1" lineColor="gray4" backgroundColor="white">더보기</Button>
                <!-- <Button size="32" minWidth="86" fontColor="gray1" lineColor="gray4" backgroundColor="white" @click="tooltipFavoriteVisible = false">닫기</Button> -->
              </div>
              </TooltipPopover>
            </button>

            <!-- 세팅아이콘버튼 -->
            <button class="tooltip tooltip-setting"
              @click="openedTooltip = 'setting'"
            >
              <img src="/portal-ui/icon/gnb-setting.svg" alt="alarm">
              <TooltipPopover
                :visible="openedTooltip === 'setting'"
                arrowPosition="top"
                @close="openedTooltip = null"
                :style="{ top: '56px', right: '-14px'}"
                :showClose="true"
                class="tooltip-setting-popover tooltip-custom-popover"
              >
              <div class="tooltip-setting-header tooltip-custom-header">
                <span class="b2_ko_s" style="font-weight: 700 !important;">시스템 설정</span>
              </div>
              <div class="tooltip-setting-content tooltip-custom-content">
                <div class="change-mode">
                  <div class="light-mode">
                    <button class="mode" :class="{'active': screenMode === 'light'}" @click="handleChangeMode('light')"></button>
                    <p>라이트 모드</p>
                  </div>
                  <div class="dark-mode">
                    <button class="mode" :class="{'active': screenMode === 'dark'}" @click="handleChangeMode('dark')"></button>
                    <p>다크 모드</p>
                  </div>
                </div>
                <div class="lang">
                  <div class="title-lang">
                    <strong class="b2_ko_s">언어</strong>
                  </div>
                  <div class="content-lang">
                    <Radio class="radio-lang" v-model="radio" label="한국어" name="group1" value="ko" />
                    <Radio class="radio-lang" v-model="radio" label="English" name="group1" value="en" />
                  </div>
                </div>
              </div>
              </TooltipPopover>
            </button>

            <!-- 유저아이콘버튼 -->
            <button class="tooltip tooltip-user"
              @click="openedTooltip = 'user'"
            >
              <img src="/portal-ui/icon/gnb-user.svg" alt="alarm">
              <TooltipPopover
                :visible="openedTooltip === 'user'"
                arrowPosition="top"
                @close="openedTooltip = null"
                :style="{ top: '56px', right: '-14px'}"
                :showClose="true"
                class="tooltip-user-popover tooltip-custom-popover"
              >
              <div class="tooltip-user-header tooltip-custom-header">
                <span class="b2_ko_s" style="font-weight: 700 !important;">사용자 정보</span>
              </div>
              <div class="tooltip-user-content tooltip-custom-content">
                <div class="user-info">
                  <div class="user-img">
                    <span>홍</span>
                  </div>
                  <div class="user-detail">
                    <div class="user-name"><span class="h8_ko_s">홍길동</span></div>
                    <div class="user-group"><span class="b5_ko_s">SDS/**그룹</span></div>
                  </div>
                </div>
              </div>
              <div class="tooltip-user-footer tooltip-custom-footer">
                <Button backgroundColor="white" fontColor="gray1" lineColor="gray4" minWidth="116" size="32" @click="isPopupVisible = true">사용자 설정</Button>
                <Button backgroundColor="white" fontColor="gray1" lineColor="gray4" minWidth="116" size="32">Logout</Button>
              </div>
              </TooltipPopover>
            </button>

            <button class="tooltip tooltip-menu">
              <img src="/portal-ui/icon/gnb-menu.svg" alt="list">
            </button>
          </div>
        </div>
        <div class="gnb-contents">
          <div class="gnb-contents-inner" :class="{'three-list': firstmylist}"> 
            <div class="section-menu">
              <div class="section-wrapper">
                <div class="section-inner" :style="{display: isAnalysis || mypage || report ? 'flex' : 'none'}">
                  <div class="menu-list">
                    <ul>
                      <li v-for="(item, index) in menuList01" :key="index">
                        <a v-if="index === 0" class="title b1_ko_s">
                          <!-- 타이틀메뉴 -->
                          {{ item.name }}
                        </a>
                        <a v-else href="javascript:void(0)" class="b3_ko_s">
                          <!-- 일반메뉴 -->
                          {{ item.name }}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="menu-list">
                    <ul>
                      <li v-for="(item, index) in menuList02" :key="index">
                        <a v-if="index === 0" class="title b1_ko_s">
                          {{ item.name }}
                        </a>
                        <a v-else href="javascript:void(0)" class="b3_ko_s">
                          {{ item.name }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="section-inner" :style="{display: firstmylist ? 'flex' : 'none'}">
                  <div class="menu-list">
                    <ul>
                      <li v-for="(item, index) in menuList01" :key="index">
                        <a v-if="index === 0" class="title b1_ko_s">
                          <!-- 타이틀메뉴 -->
                          {{ item.name }}
                        </a>
                        <a v-else href="javascript:void(0)" class="b3_ko_s">
                          <!-- 일반메뉴 -->
                          {{ item.name }}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="menu-list">
                    <ul>
                      <li v-for="(item, index) in menuList03" :key="index">
                        <a v-if="index === 0" class="title b1_ko_s">
                          {{ item.name }}
                        </a>
                        <a v-else href="javascript:void(0)" class="b3_ko_s">
                          {{ item.name }}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="menu-list">
                    <ul>
                      <li v-for="(item, index) in menuList04" :key="index">
                        <a v-if="index === 0" class="title b1_ko_s">
                          {{ item.name }}
                        </a>
                        <a v-else href="javascript:void(0)" class="b3_ko_s">
                          {{ item.name }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="section-banner">
              <a href="javascript:void(0)">
                <div class="img-banner">
                  <img src="/portal-ui/gnb/banner.png" alt="">
                </div>
                <p class="desc-banner b3_ko_s">
                  하단 배너 설명문구 최대글자 30자까지
                </p>
              </a>
            </div>
            <div class="section-button">
              <div>
                <Button text="디폴트 페이지" backgroundColor="waferblue1" link @click="goToSubPage" page="default"/>
              </div>
              <div>
                <!-- <Button text="하위 페이지로 링크" backgroundColor="gray3" link hoverShrinkAction/> -->
                 <Button text="내 보고서 페이지" backgroundColor="gray3" link hoverFillAction @click="goToSubPage" page="my-report" />
              </div>
              <div>
                <Button text="공지사항 페이지" backgroundColor="gray3" link hoverFillAction @click="goToSubPage" page="notice"/>
              </div>           
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="btn-gnb-toggle" @click="handleGnbToggle">
      <div class="img">
        <img src="/portal-ui/gnb/img-gnb-handle.svg" alt="gnb toggle btn" class="white-handle">
        <img src="/portal-ui/gnb/img-gnb-handle-black.svg" alt="gnb toggle btn" class="black-handle">
        <span>MENU</span>
      </div>
    </button>
  </div>
  
  <!-- Popup -->
  <Popup2 class="user-popup" :visible="isPopupVisible" @close="isPopupVisible = false" width="1080">
    <template #title>
      사용자 설정
    </template>
    <template #content>
      <div class="user-popup-content">
        <div class="left">
          <DataTable :columns="userPopupColumns" :data="userPopupData" />
        </div>
        <div class="right">
          <div class="right-top">
            <div class="title"><span class="b2_ko_s">조회조건</span></div>
            <div class="tooltip" @mouseenter="isUserTooltipVisible = true" @mouseleave="isUserTooltipVisible = false">
              <img src="/portal-ui/icon/icon-alert.svg" alt="info">
              <TooltipPopover
                :visible="isUserTooltipVisible"
                arrowPosition="top"
                @close="isUserTooltipVisible = false"
                :style="{ top: '22px', left: '-36px'}"
                :showClose="true"
                class="user-tooltip"
              >
                <span class="b3_ko_s text">조회조건 설명문구</span>
              </TooltipPopover>
            </div>
            <Button size="32" minWidth="86" backgroundColor="black" fontColor="white">초기화</Button>
          </div>
          <DataTable :columns="columns" :data="data">
            <!-- 일반 텍스트 셀 -->
            <template #groupValue="{ value, index }">
              <template v-if="index < 4">
                <TextInput :value="value" placeholder="전체" />
              </template>
              <template v-else>
                <Checkbox v-model:checked="onlyMyWork" />
              </template>
            </template>
            <template #lineValue="{ value, index }">
              <template v-if="index < 4">
                <TextInput :value="value" placeholder="전체"/>
              </template>
              <template v-else>
                <Checkbox v-model:checked="autoUpdate" />
              </template>
            </template>
          </DataTable>
        </div>
      </div>
    </template>
    <template #bottom-right>
      <Button size="40" minWidth="120" backgroundColor="black" fontColor="white" @click="isPopupVisible = false">확인</Button>
    </template>
  </Popup2>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import { ref, onMounted, nextTick } from 'vue';
import gsap from 'gsap';
import { useDeemOverlay } from '../composables/useDeemOverlay';
import TooltipPopover from './TooltipPopover.vue';
import DataTable from './DataTable.vue';
import Radio from './Radio.vue';
import Popup2 from './Popup2.vue';
import TextInput from './TextInput.vue';
import Checkbox from './Checkbox.vue';

//데이터
interface GnbList {
  name: string;
  link?: string;
}

interface MenuList01 {
  name: string;
  link?: string;
}

interface MenuList02 {
  name: string; 
  link?: string;
}

interface MenuList03 {
  name: string;
  link?: string;
}

interface MenuList04 {  
  name: string;
  link?: string;
}


const isAnalysis = ref(false);
const firstmylist = ref(false);
const mypage = ref(false);
const report = ref(false);
const radio = ref('ko');
const screenMode = ref('light');
const isPopupVisible = ref(false);
const isUserTooltipVisible = ref(false);

const goToSubPage = (e: Event) => {
  //하위 페이지로 이동하는 로직 구현
  let target = e.currentTarget as HTMLElement;

  console.log(target.getAttribute('page'));

  switch (target.getAttribute('page')) {
    case 'default':
      window.open('/#/default', '_blank');
      break;
    case 'my-report':
      window.open('/#/my-report', '_blank');
      break;
    case 'notice':
      window.open('/#/notice', '_blank');
      break;
    default:
      window.location.href = '/';
  }
}

const gnbList = ref<GnbList[]>([
  {
    name: 'My page',
    // link: '/my-page'
  },
  {
    name: 'Report',
    // link: '/report'
  },
  {
    name: 'Analysis',
  }
])

const menuList01 = ref<MenuList01[]>([
  //맨 첫번째 메뉴가 타이틀
  {
    name: '일반분석',
    link: '/analysis'
  },
  {
    name : 'Analysis 대표기능',
    link: '/analysis'
  },
  {
    name : 'Analysis 대표기능',
    link: '/analysis'
  },
  {
    name : 'Analysis 대표기능',
    link: '/analysis'
  },
])

const menuList02 = ref<MenuList02[]>([
  //맨 첫번째 메뉴가 타이틀
  {
    name: 'Map 분석',
    link: '/analysis'
  },
  {
    name : 'Analysis 대표기능',
    link: '/analysis'
  },
  {
    name : 'Analysis 대표기능',
    link: '/analysis'
  },
  {
    name : 'Analysis 대표기능',
    link: '/analysis'
  },

])

const menuList03 = ref<MenuList03[]>([
  //맨 첫번째 메뉴가 타이틀
  {
    name: 'Map 분석33',
    link: '/analysis'
  },
  {
    name : 'Analysis 대표기능',
    link: '/analysis'
  },
  {
    name : 'Analysis 대표기능',
    link: '/analysis'
  },
  {
    name : 'Analysis 대표기능',
    link: '/analysis'
  },

])

const menuList04 = ref<MenuList04[]>([
  //맨 첫번째 메뉴가 타이틀
  {
    name: 'Map 분석4444',
    link: '/analysis'
  },
  {
    name : 'Analysis 대표기능',
    link: '/analysis'
  },
  {
    name : 'Analysis 대표기능',
    link: '/analysis'
  },
  {
    name : 'Analysis 대표기능',
    link: '/analysis'
  },

])

const favoriteList = ref([
  { name: 'My task' },
  { name: 'My Report' },
  { name: 'Map' }
]);

const favoritecolumns = [
  { key: 'name', label: '', class: 'favorite-name' },
  { key: 'action', label: '', class: 'favorite-action' }
];

const alarmList = ref([
  { name: '알림유형1', desc: '알림유형1 설명문구', class: 'bg' },
  { name: '알림유형2', desc: '알림유형2 설명문구', class: 'bg' },
  { name: '알림유형3', desc: '알림유형3 설명문구', class: 'bg' },
  { name: '알림유형4알림유형4알림유형4', desc: '알람 제목이 길어질 때에는… 표시로 됩니다. 알람 제목이 길어질 때에는… 표시로 됩니다.' },
  { name: '알림유형5', desc: '홍길동 님이 보낸 Task 가 도착하였습니다.' },
  { name: '알림유형6', desc: '홍길동 님이 Report를 공유하였습니다.' },
]);

const alarmcolumns = [
  { key: 'name', label: '', class: 'alarm-name' },
  { key: 'desc', label: '', class: 'alarm-desc' }
];

const userPopupColumns = [
  { key: 'name', label: '', class: 'user-popup-name' }
];

const userPopupData = [
  { name: '대메뉴  >  중메뉴  >  메뉴명' },
  { name: '대메뉴  >  중메뉴  >  메뉴명' },
  { name: '대메뉴  >  중메뉴  >  메뉴명' },
  { name: '대메뉴  >  중메뉴  >  메뉴명' },
  { name: '대메뉴  >  중메뉴  >  메뉴명' },
  { name: '대메뉴  >  중메뉴  >  메뉴명' }
]

const columns = [
  { key: 'group', label: 'Group', class: 'w-160 left font-bold' },
  { key: 'groupValue', label: '' },
  { key: 'line', label: 'Line', class: 'w-160 left font-bold' },
  { key: 'lineValue', label: '' },
]

const data = [
  {
    group: 'Group',
    groupValue: '16-17L',
    line: 'Line',
    lineValue: '전체',
  },
  {
    group: 'Process',
    groupValue: '전체',
    line: 'Review step',
    lineValue: '전체',
  },
  {
    group: 'Eqp ID',
    groupValue: '전체',
    line: 'Lot ID',
    lineValue: '전체',
  },
  {
    group: 'Operator',
    groupValue: '전체',
    line: '작업 상태',
    lineValue: '전체',
  },
  {
    group: '내 작업만 보기',
    groupValue: 'checkbox1',
    line: '조회기간 자동 업데이트\n (최근 7일)',
    lineValue: 'checkbox2',
  },
]

const onlyMyWork = ref(true)
const autoUpdate = ref(true)


//돔요소는 밖에 먼저 타입선언
//onMounted 안에서 변수.vlue 에 돔 요소 할당
//스코프 상관없이 다른 함수에서 쓸 수 있음
//스테이트 요소는 그냥 ref(상태) 하면 됨
//ref 는 동적인 값 앞에 붙여줌

const isOpen = ref(false);
const $GNB = ref<HTMLElement | null>(null);
const openedTooltip = ref<null | 'favorite' | 'setting' | 'user' | 'alarm'>(null);


//처음에 gnb가 닫힌 모습
onMounted(() => {
  // 먼저 Analysis 리스트와 탭을 활성화
  isAnalysis.value = true;
  
  nextTick(() => {
    $GNB.value = document.querySelector('#GNB');
    gsap.set('#GNB', {
      y: -1 * Number($GNB.value?.clientHeight) - 1,
    })

    //gnb 가로스크롤
    window.addEventListener('scroll', () => { 
      const bwLeft = window.scrollX;
      if($GNB.value){
        $GNB.value.style.left = `-${String(bwLeft)}px`;
      }
    });
  })
})

// 함수 모음
const handleClickTap = (name: string) => {
  //리스트 탭 만들면 될 것 같음
  //누른 버튼의 이름과, 탭컨텐츠 섹션의 이름이 같으면 띄워주기
  //맨 처음 탭컨텐츠 섹션은 마운팅 시 띄워주기

  // 모든 탭 상태 초기화
  isAnalysis.value = false;
  firstmylist.value = false;
  mypage.value = false;
  report.value = false;
  
  // 선택된 탭 활성화
  if(name === 'My page'){
    mypage.value = true;
  }else if(name === 'Report'){
    report.value = true;
  }else if(name === 'Analysis'){
    isAnalysis.value = true;
  }else if(name === 'New List'){
    firstmylist.value = true;
  }
}

const handleAddList = () => {
  //리스트 총 7개 까지만 추가 가능
  if(gnbList.value.length >= 7){
    return;
  }

  gnbList.value.push({
    name: 'New List',
    // 새로 추가되는 버튼도 클릭 이벤트가 동작하도록 link 속성을 제거
  })
}

// 딤 오버레이 관련 함수들 제거

const handleGnbToggle = () => { 
  const { createDeemOverlay, removeDeemOverlay } = useDeemOverlay('gnb');
  
  if(!isOpen.value){
    isOpen.value = true;
    gsap.to('#GNB', {
      duration: 0.3,
      y:0,
      boxShadow: '0px 2px 4px 0px #0000000F',
      ease: 'power2.inOut'
    })
    createDeemOverlay(handleGnbToggle);
  }else{
    isOpen.value = false;
    openedTooltip.value = null; // GNB 닫을 때 모든 툴크 닫기
    gsap.to('#GNB', {
      duration: 0.3,
      y: -1 * Number($GNB.value?.clientHeight) - 1,
      boxShadow: 'none',
      ease: 'power2.inOut'
    })
    removeDeemOverlay();
  }
}

const handleListActive = (e: MouseEvent) => {
  const $target = e.currentTarget as HTMLElement;
  const $gnbLists = document.querySelectorAll('.gnb-list li');

  $gnbLists.forEach(item => {
    item.classList.remove('is-active');
  })

  $target.classList.add('is-active');
}

const handleChangeMode = (mode: string) => {

  screenMode.value = mode;

  if(mode === 'light'){
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  }else{
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/common/_mixin' as *;
@use '@/assets/common/_variables' as *;

#GNB.main-gnb{
  .btn-gnb-toggle{
    span{
      color: var(--color-white);
      &:after{
        background-image: url('/portal-ui/icon/icon-arrow-down-white.svg');
      }
    }
    .img{
      .white-handle{
        // display: none;
        opacity: 0;
      }
      .black-handle{
        // display: block;
        opacity: 1;
      }
    }
    &:hover{
      span{
        color: var(--color-black1);
        &:after{
          background-image: url('/portal-ui/icon/icon-arrow-down-black.svg');
        }
      }
      .img{
        .white-handle{
          // display: block;
          opacity: 1;
        }
        .black-handle{
          // display: none;
          opacity: 0;
        }
      }
    }
  }
}

  #GNB { 
    position: fixed;
    min-width: 1440px;
    width: 100%;
    background-color: var(--color-white);
    color: var(--color-black1);
    border-bottom: 1px solid var(--color-black1);
    // box-shadow: 0px 2px 4px 0px #0000000F;
    max-height: 720px;
    z-index: 100;
    &.is-open{
      .btn-gnb-toggle{
        span{
          color: var(--color-black1);
          &:after{
            background-image: url('/portal-ui/icon/icon-arrow-down-black.svg');
          }
        }
        span:after{
          transform: rotate(180deg);
        }
        .img{
          .white-handle{
            // display: block;
            opacity: 1;
          }
          .black-handle{
            // display: none;
            opacity: 0;
          }
        }
      }
    }
    .gnb-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--color-gray4);
      background-color: var(--color-white);
      .gnb-navs{
        display: flex;
        align-items: center;
        gap: 60px;
        .logo-link{
          display: inline-block;
          width: 121px;
          height: 36px;
          padding-left: 24px;
          box-sizing: content-box;
          img{
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
        nav.gnb-list{
          display: flex;
          align-items: center;
          gap: 32px;
          height: 56px;
          ul{
            display: flex;
            align-items: center;
            gap: 32px;
            height: 100%;
            li{
              position: relative;
              height: 100%;
              &.is-active{
                .gnb-btn{
                  color: var(--color-wafer-blue1);
                  font-weight: 700 !important;
                }
                &:after{
                  width: 100%;
                  opacity: 1;
                }
              }
              &:after{
                content: '';
                display: block;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                opacity: 0;
                height: 4px;
                background-color: var(--color-wafer-blue1);
                transition: width 0.2s $ease-out-rowan, opacity 0.2s $ease-out-rowan;
              }
              @include hoverable{
                &:hover{
                  a.gnb-link-btn,button.gnb-btn{
                    color: var(--color-wafer-blue1);
                    font-weight: 700 !important;
                  }
                  &:after{
                    content: '';
                    width: 100%;
                    opacity: 1;
                  }
                }
              }
              a.gnb-link-btn,button.gnb-btn{
                display: inline-block;
                height: 100%;
                padding: 14px 18px;
                opacity: 1;
                transition: color 0.2s $ease-out-rowan, font-weight 0.1s $ease-out-rowan;
                font-weight: 700 !important;
                color: var(--color-gray2);
                &:after{
                  content: attr(title);
                  display: block;
                  font-weight: 700 !important;
                  height: 0px;
                  visibility: hidden;
                }
              }
            }
          }
          .btn-add-list{
            display: block;
            width: 32px; height: 32px;
          }
        }
      }
      .gnb-tooltips{
        display: flex;
        align-items: center;
        .tooltip{
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 56px; height: 56px;
          cursor: pointer;
          border-left: 1px solid var(--color-gray5);
          background-color: var(--color-white);
          transition: background-color 0.2s $ease-out-rowan;
          @include hoverable{
            &:hover{
              background-color: var(--color-gray5);
            }
          }
          img{
            width: 24px;
            height: 24px;
            object-fit: contain;
          }
          &.tooltip-alarm{
            position: relative;
            .badge{
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              top:40%;
              left:60%;
              transform: translate(-50%, -50%);
              width: 16px;
              height: 16px;
              background-color: var(--color-wafer-blue1);
              border-radius: 50%;
              color: var(--color-white);
              font-size: 10px;
              font-weight: 700;
              line-height: 130%;
              text-align: center;
              // @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
              //   em{
              //     position: relative;
              //     top: 1px;
              //   }
              // }              
            }
          }
        }
      }
    }
    .gnb-contents{
      padding-top: 40px;
      background-color: var(--color-white);
      .gnb-contents-inner{
        display: flex;
        gap: 80px;//menu-list 3개일 때 60임
        padding-left: 223px;
        &.three-list{
          gap: 60px;
          .section-banner{
            padding-right: 60px;
          }
          .section-inner{
            gap: 60px;
          }
        }
      }
      .section-menu{
        // min-height: 230px;
        max-height: calc(720px - $gnb-header-height - 40px); //gnb-contents paddingtop
        overflow: auto;
        padding-bottom: 60px;
        &::-webkit-scrollbar{
        width: 4px !important;
        background-color: transparent !important;
        }
        &::-webkit-scrollbar-thumb{
          background-color: var(--color-gray4) !important;
          border-radius: 8px !important;
        }
        &::-webkit-scrollbar-track{
          margin: 4px !important;
        }
        .section-inner{
          display: flex;
          gap: 80px;//menu-list 3개일 때 60임
          height: max-content;
        }
        .menu-list{
          min-height: 230px;
          width: 200px;
          border-right: 1px solid var(--color-gray5);
          ul{
            li{
              a{
                display: inline-block;
                margin-top: 16px;
                opacity: 1;
                transition: opacity 0.2s $ease-out-rowan;
                @include hoverable{
                  &:hover{
                    opacity: 0.8;
                  }
                }
                &.title{
                  display: flex;
                  align-items: center;
                  margin-top: 0;
                  margin-bottom: 20px;
                  font-weight: 700 !important;
                  &:after{
                    content: '';
                    display: block;
                    width: 20px;
                    height: 20px;
                    margin-left: 8px;
                    background-image: url('/portal-ui/icon/icon-arrow-right-black.svg');
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                  }
                }
              }
            }
          }
        }
      }
      .section-banner{
        height: 230px;
        padding-right: 80px;//menu-list 3개일 때 60임
        border-right: 1px solid var(--color-gray5);
        & > a{
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 12px;
        }
        .img-banner{
          width: 320px;
          img{
            object-fit: contain;
          }
        }
        .desc-banner{
          color: var(--color-gray1);
        }
      }
      .section-button{
        padding-right: 80px;
        & > div{
          margin-top: 12px;
          &:first-child{
            margin-top: 0;
          }
        }
      }
    }
    .btn-gnb-toggle{
      display: inline-block;
      position: absolute;
      bottom: -28px;
      left: 50%;
      transform: translateX(-50%);
      width: 112px; height: 32px;
      span{
        font-family: var(--font-family-en);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 13px;
        line-height: 140%;
        font-weight: 700;
        letter-spacing: 1px;
        transition: color 0.2s $ease-out-rowan;
        &:after{
          content: '';
          display: block;
          width: 16px;
          height: 16px;
          background-image: url('/portal-ui/icon/icon-arrow-down-black.svg');
          background-size: contain;
          background-repeat: no-repeat;
          transition: transform 0.2s $ease-out-rowan, background-image 0.2s $ease-out-rowan;
        }
      }
      .img{
        position: relative;
        width: 100%; height: 100%;
        img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: opacity 0.2s $ease-out-rowan;
          &.black-handle{
            // display: none;
            opacity: 0;
          }
        }
      }
    }
  }

  .tooltip-custom-popover{
    .tooltip-custom-header{
      text-align: start;
    }
    .tooltip-custom-content{
      margin-top: 12px;
      :deep(.data-table){
        width: 360px;
        thead{display: none;}
        th,tr,td{
          border-right: none;
        }
        td{
          padding: 0;
        }
        tr {
          height: 54px;
          &:hover {
            background-color: var(--color-white);
          }
        }
      }
    }
    .tooltip-custom-bottom{
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
  }

  .tooltip-favorite-popover{
    .tooltip-favorite-content{
      :deep(.data-table){
        td.favorite-name{
          font-size: 13px;
          font-weight: 700;
          line-height: 140%;
          text-align: start;
          padding-left: 20px;
        }
        td.favorite-action{
          padding-right: 20px;
          .btn{
            margin-left: auto;
          }
        }
      }
    }
  }
  .tooltip-alarm-popover{
    .tooltip-custom-content{
      :deep(.data-table){
        tr{
          height: 40px;
          cursor: pointer;
          &.bg{
            background-color: var(--color-gray5);
          }
          @include hoverable{
            &:hover{
              opacity: 0.8;
            }
          }
        }
        td.alarm-name{
          max-width: 100px;
          width: 100px;
          padding: 10px 10px 10px 20px;
          border-right: 1px solid var(--color-gray4);
          .alarm-title{
            font-size: 13px;
            font-weight: 700;
            line-height: 140%;
            text-align: start;
            display: block;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        td.alarm-desc{
          max-width: 260px;
          width: 260px;
          padding: 10px;
          .alarm-desc-text{
            display: block;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
          }
        }
      }
    }

  }

  .tooltip-setting-content{
    .change-mode{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      .mode{
        width: 170px;
        height: 96px;
        border-radius: 8px;
        background-color: var(--color-gray4);
        transition: opacity 0.2s $ease-out-rowan;
        &.active{
          border: 2px solid var(--color-black1);
        }
        @include hoverable{
          &:hover:not(.active){
            opacity: 0.7;
          }
        }
      }
      .light-mode, .dark-mode{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
        p{
          font-size: 13px;
          font-weight: 700;
          line-height: 140%;
        }
      }
    }
    .lang{
      margin-top: 20px;
      padding-bottom: 50px;
      .title-lang {
        text-align: left;
        strong{
          font-weight: 700 !important;
          text-align: left;
        }
      }
      .content-lang{
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 12px;
        margin-bottom: 12px;
        .radio-lang{
          width: 120px;
        }
      }
    }
  }

  .tooltip-user-popover{
    .tooltip-user-content{
      width: 240px;
      .user-info{
        display: flex;
        align-items: center;
        gap: 16px;
        .user-img{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #B3E8F6;
          span{
            font-size: 32px;
            font-weight: 700;
            line-height: 130%;
          }
        }
        .user-detail{
          .user-name{
            font-weight: 700 !important;
          }
          .user-group{
            margin-top: 8px;
          }
        }
      }
    }
    .tooltip-user-footer{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
    :deep(.tooltip-close-custombtn){
      display: none;
    }
  }

  .user-popup{
    .user-popup-content{
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 20px;
    }
    .left{
      padding-top: 42px;
      :deep(.data-table){
        width: 180px;
        thead{
          display: none;
        }
        td{
          font-size: 13px;
          // font-weight: 700;
          line-height: 140%;
          // text-align: start;
          // padding-left: 20px;
          // padding-right: 20px;
          // padding-top: 10px;
        }
      }
    }
    .right{
      position: relative;
      padding-left: 20px;
      padding-top: 4px;
      padding-bottom: 6px;
      &:before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 1px;
        height: 100%;
        background: var(--color-gray5);
        // padding-right: 20px;
      }
      .right-top{
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 12px;
        .title span{
          font-weight: 700 !important;
        }
        .tooltip{
          position: relative;
          width: 16px; height: 16px;
          cursor: pointer;
          img{
            width: 100%;
            object-fit: contain;
          }
          .user-tooltip{
            :deep(.tooltip-close){
              display: none;
            }
            :deep(.tooltip-close-custombtn){
              display: none;
            }
            :deep(.tooltip-arrow){
              right: auto;
              left: 33px;
            }
            .text{
              color: var(--color-gray2);
            }
          }
        }
      }
      :deep(.data-table){
        thead{
          display: none;
        }
        td{
          font-size: 13px;
          line-height: 140%;
          padding: 8px 12px;
          white-space: pre-line; //줄바꿈
          &.font-bold{
            font-weight: 700;
          }
        }
        .input-wrapper{
          input{
            width: 222px;
          }
        }
        // .checkbox-wrapper{
        //   .checkbox{
        //     width: 20px;
        //   }
        // }
      }
    }
  }

</style>