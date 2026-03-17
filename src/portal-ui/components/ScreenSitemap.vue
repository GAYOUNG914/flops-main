<!-- 슬롯이 없는 기본 화면 템플릿 -->

<template>
  <div class="screen-favorites" style="display: flex;">
    <div class="dash-board">
      <div class="dash-board-navigator">
        <Breadcrumb />
      </div>
      <div class="main-content-wrap">
        <section class="main-content main-content-sitemap">
          <div class="main-content-inner">
            <div class="inner">
              <div class="header">
                <div class="search-wrap">
                  <div class="text">
                    <span class="b3_ko_s">메뉴 찾기</span>
                  </div>
                  <TextInput placeholder="메뉴명을 입력해 주세요" search class="search-input"/>
                  <Button class="search-button" fontColor="white" bgColor="black" size="32" minWidth="86">검색</Button>
                </div>
              </div>
              <div class="sitemap-table-container">
                <div class="sitemap-table-wrap">
                  <div class="sitemap-table">
                    <div v-for="(group, gIdx) in sitemapData" :key="gIdx" class="sitemap-group">
                      <div class="sitemap-depth1"><span class="b2_ko_s">{{ group.label }}</span></div>
                      <div
                        v-for="(sub, sIdx) in group.children"
                        :key="sIdx"
                        class="sitemap-depth2-wrap"
                      >
                        <div class="sitemap-depth2"><span class="b2_ko_s">{{ sub.label }}</span></div>
                        <div
                          v-for="(item, iIdx) in sub.children"
                          :key="iIdx"
                          class="sitemap-row"
                        >
                          <span class="sitemap-depth3 b3_ko_s">{{ item.label }}</span>
                          <button class="star" :class="{ active: item.favorite }">
                            <img src="/portal-ui/icon/icon-star.svg" alt="">
                            <img src="/portal-ui/icon/icon-star-filled.svg" alt="">
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="sitemap-table-wrap">
                  <div class="sitemap-table">
                    <div v-for="(group, gIdx) in sitemapData" :key="gIdx" class="sitemap-group">
                      <div class="sitemap-depth1"><span class="b2_ko_s">{{ group.label }}</span></div>
                      <div
                        v-for="(sub, sIdx) in group.children"
                        :key="sIdx"
                        class="sitemap-depth2-wrap"
                      >
                        <div class="sitemap-depth2"><span class="b2_ko_s">{{ sub.label }}</span></div>
                        <div
                          v-for="(item, iIdx) in sub.children"
                          :key="iIdx"
                          class="sitemap-row"
                        >
                          <span class="sitemap-depth3 b3_ko_s">{{ item.label }}</span>
                          <button class="star" :class="{ active: item.favorite }">
                            <img src="/portal-ui/icon/icon-star.svg" alt="">
                            <img src="/portal-ui/icon/icon-star-filled.svg" alt="">
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="sitemap-table-wrap">
                  <div class="sitemap-table">
                    <div v-for="(group, gIdx) in sitemapData" :key="gIdx" class="sitemap-group">
                      <div class="sitemap-depth1"><span class="b2_ko_s">{{ group.label }}</span></div>
                      <div
                        v-for="(sub, sIdx) in group.children"
                        :key="sIdx"
                        class="sitemap-depth2-wrap"
                      >
                        <div class="sitemap-depth2"><span class="b2_ko_s">{{ sub.label }}</span></div>
                        <div
                          v-for="(item, iIdx) in sub.children"
                          :key="iIdx"
                          class="sitemap-row"
                        >
                          <span class="sitemap-depth3 b3_ko_s">{{ item.label }}</span>
                          <button class="star" :class="{ active: item.favorite }">
                            <img src="/portal-ui/icon/icon-star.svg" alt="">
                            <img src="/portal-ui/icon/icon-star-filled.svg" alt="">
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <SplitScreen ref="splitScreenRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from './Button.vue'
import TextInput from './TextInput.vue'
import Breadcrumb from './Breadcrumb.vue'
import SplitScreen from './SplitScreen.vue'
import { useEventBus } from '../composables/useEventBus'

// 타입 정의
interface SplitScreenInstance {
  toggleSplitScreen: () => void;
}

const splitScreenRef = ref<SplitScreenInstance | null>(null);
const { on } = useEventBus();


const sitemapData = ref([
  {
    label: '1 depth',
    children: [
      {
        label: '2 depth',
        children: [
          { label: '3 depth', favorite: false },
          { label: '3 depth', favorite: true },
          { label: '3 depth', favorite: true },
          { label: '3 depth', favorite: false },
          { label: '3 depth', favorite: false },
        ]
      }
    ]
  },
  {
    label: '1 depth',
    children: [
      {
        label: '2 depth',
        children: [
          { label: '3 depth', favorite: false },
          { label: '3 depth', favorite: true },
          { label: '3 depth', favorite: false },
          { label: '3 depth', favorite: true },
          { label: '3 depth', favorite: false },
        ]
      },
      {
        label: '2 depth',
        children: [
          { label: '3 depth', favorite: false },
          { label: '3 depth', favorite: false },
          { label: '3 depth', favorite: false },
          { label: '3 depth', favorite: false },
          { label: '3 depth', favorite: false },
        ]
      }
    ]
  }
]);

// const sitemapData2 = ref([
//   {
//     label: '1 depth',
//     children: [
//       {
//         label: '2 depth',
//         children: [
//           { label: '3 depth', favorite: false },
//           { label: '3 depth', favorite: true },
//           { label: '3 depth', favorite: true },
//           { label: '3 depth', favorite: false },
//           { label: '3 depth', favorite: false },
//         ]
//       }
//     ]
//   },
//   {
//     label: '1 depth',
//     children: [
//       {
//         label: '2 depth',
//         children: [
//           { label: '3 depth', favorite: false },
//           { label: '3 depth', favorite: true },
//           { label: '3 depth', favorite: false },
//           { label: '3 depth', favorite: true },
//           { label: '3 depth', favorite: false },
//         ]
//       },
//       {
//         label: '2 depth',
//         children: [
//           { label: '3 depth', favorite: false },
//           { label: '3 depth', favorite: false },
//           { label: '3 depth', favorite: false },
//           { label: '3 depth', favorite: false },
//           { label: '3 depth', favorite: false },
//         ]
//       },
//       {
//         label: '2 depth',
//         children: [
//           { label: '3 depth', favorite: false },
//           { label: '3 depth', favorite: false },
//           { label: '3 depth', favorite: false },
//           { label: '3 depth', favorite: false },
//           { label: '3 depth', favorite: false },
//         ]
//       }
//     ]
//   }
// ]);


// Star 버튼 토글 함수 (범용) - 오버로드
const toggleStar = (eventOrButton: MouseEvent | HTMLButtonElement) => {
  let starButton: HTMLButtonElement;
  
  if (eventOrButton instanceof MouseEvent) {
    // 직접 이벤트에서 호출된 경우
    eventOrButton.stopPropagation();
    starButton = eventOrButton.currentTarget as HTMLButtonElement;
  } else {
    // 이벤트 위임에서 호출된 경우
    starButton = eventOrButton;
  }
  
  const isActive = starButton.classList.contains('active');
  
  if (isActive) {
    starButton.classList.remove('active');
    starButton.setAttribute('data-starred', 'false');
  } else {
    starButton.classList.add('active');
    starButton.setAttribute('data-starred', 'true');
  }
}

onMounted(() => {
  // SplitScreen 토글 이벤트 리스너 등록
  on('toggle-split-screen', () => {
    splitScreenRef.value?.toggleSplitScreen(); 
  });

  // SplitScreen 리사이즈 이벤트 리스너 등록
  on('split-screen-resize', () => {
    // 필요한 경우 리사이즈 로직 추가
  });

  // 이벤트 위임으로 star 버튼 클릭 처리
  const container = document.querySelector('.screen-favorites');
  if (container) {
    container.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      
      // star 버튼 또는 그 자식 요소가 클릭된 경우
      const starButton = target.closest('.star') as HTMLButtonElement;
      // if (starButton) {
        toggleStar(starButton);
      // }
    });
  }

  //랜덤한 스타 버튼 여러개에 active 클래스 추가 
  const $starBtns = document.querySelectorAll('.star');
  $starBtns.forEach(($starBtn) => {

    const random = Math.random();
    if(random < 0.5){
      $starBtn.classList.add('active');
    }
  });
});
</script>

<style lang="scss" scoped>
.screen-favorites{
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
      // justify-content: space-between;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      .main-content-tab-list{
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
    .main-content-wrap{
      display: flex;
      gap: 20px;
      height: 95%;
    }
    .main-content{
      width: 100%;
      // height: 85%;
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
          // min-width: 1100px;
          min-height: 600px;
        }
      }
      .table{
        display: block;
        margin-top: 20px;
        overflow: auto;
        max-height: 380px;
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
        :deep(.data-table){
          td{
            padding: 4px 20px;
            color: var(--color-gray1);
          }
        }
      }
      &.main-content-sitemap{
        .inner{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .header{
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-bottom: 16px;
          align-self: flex-end;
          .search-wrap{
            display: flex;
            align-items: center;
            .text{
              margin-right: 16px;
              color: var(--color-gray2);
            }
            .search-input{
              margin-right: 8px;
              :deep(input){
                width: 200px;
              }
            }
          }
        }
        .sitemap-table-container{
          display: flex;
          gap: 60px;
          align-items: flex-start;
          width: 73%;
        }
        .sitemap-table-wrap{
          width: 33.33%;
          max-height: 810px;
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
        }
        .sitemap-table {
          // width: 33.33%;
          background: var(--color-white);
          border: 1px solid var(--color-gray5);
          border-bottom: none;
        }
        .sitemap-depth1 {
          text-align: center;
          background: var(--color-bg1);
          border-bottom: 1px solid var(--color-gray5); 
          padding: 8px 0;
          span{
            font-weight: 700 !important;
          }
        }
        .sitemap-depth2 {
          padding: 7px 16px;
          border-bottom: 1px solid var(--color-gray5);
        }
        .sitemap-row {
          display: flex;
          align-items: center;
          padding: 0 10px 0 28px;
          border-bottom: 1px solid var(--color-gray5);
          height: 40px;
          background: var(--color-white);
        }
        .sitemap-depth3 {
          flex: 1;
          color: #222;
        }
        .sitemap-row .star {
          margin-left: 8px;
        }
      }
    }
  }

}

// Star 버튼 스타일
.star {
  img {
    width: 20px;
    height: 20px;
    display: none;
     &:first-child {
      display: inline;
    }
  }
  
  &.active{
    img:first-child {
      display: none;
    }
    img:last-child {
      display: inline;
    }
  }

}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  .value {
    flex: 1;
  }
  
  .star-wrap {
    flex-shrink: 0;
    margin-left: 8px;
  }
}

.order-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  .order-btn {
    width: 20px;
    height: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>
