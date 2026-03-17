<template>
  <div class="screen-alarm" style="display: flex;">
    <div class="dash-board">
      <div class="dash-board-navigator">
        <Breadcrumb />
      </div>
      <main class="main-content">
        <div class="main-content-inner">
          <div class="inner">
            <div class="alarm-header">
              <div class="search">
                <CustomDropdown
                    :options="[{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }]"
                    placeholder="선택"
                    class="search-dropdown"
                  />
                  <TextInput placeholder="검색" search class="search-input"/>
                  <Button fontColor="white" bgColor="black" size="32" minWidth="86" class="search-button">검색</Button>
              </div>
              <div class="register">
                <div class="left">
                  <span class="b3_ko_s">알림은 최대 1달만 보관됩니다.</span>
                </div>
                <div class="right">
                  <div class="register-total">
                    <span class="b5_ko_s" style="color: var(--color-gray2);">
                      Total: <em>105</em>
                    </span>
                  </div>
                  <CustomDropdown
                    :options="[{ value: '1', label: '10개씩 보기' }, { value: '2', label: '20개씩 보기' }, { value: '3', label: '30개씩 보기' }]"
                    placeholder="10개씩 보기"
                    class="register-dropdown"
                  />
                </div>
              </div>
            </div>
            <div class="alarm-main">
              <DataTable 
                :columns="columns" 
                :data="tableData"
                :mergeRules="mergeRules"
                :header-merge-rules="headerMergeRules"
                class="alarm-table"
              />
            </div>
            <div class="alarm-bottom">
              <Pagination class="pagination"/>
            </div>
          </div>
        </div>
      </main>
    </div>
    <SplitScreen ref="splitScreenRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Button from './Button.vue';
import Breadcrumb from './Breadcrumb.vue';
import SplitScreen from './SplitScreen.vue';
import Pagination from './Pagination.vue'
import CustomDropdown from './Dropdown.vue';  
import TextInput from './TextInput.vue';
import DataTable from './DataTable.vue';
import { useEventBus } from '../composables/useEventBus';

// SplitScreen 인스턴스 타입 정의
interface SplitScreenInstance {
  toggleSplitScreen: () => void;
}

const splitScreenRef = ref<SplitScreenInstance | null>(null);
const { on } = useEventBus();

// 테이블 컬럼 정의
const columns = ref([
  { key: 'no', label: 'No', class: 'w-100' },
  { key: 'type', label: '유형', class: 'w-200' },
  { key: 'title', label: '제목', class: 'left' },
  { key: 'number', label: '개수', class: 'w-200' },
  { key: 'admin', label: '관리인', class: 'w-200' },
  { key: 'date', label: '수신일자', class: 'w-200' }
])

const headerMergeRules = ref([
  {
    start: 2, // 순서 컬럼 시작
    end: 4,   // 순서 컬럼 끝
    label: '제목',
  }
])

// 병합 규칙 정의
const mergeRules = ref({
  0: [{ start: 2, end: 4, value: '읽지 않은 알림105' }], // 105번 행: 요청,개수 컬럼 병합
  1: [{ start: 2, end: 4, value: '읽지 않은 알림104' }]  // 104번 행: 요청,개수 컬럼 병합
})


// 테이블 데이터
const tableData = ref([
  {
    no: 105,
    type: '-',
    title: '', // 병합되므로 사용안함
    number: '', // 병합되므로 사용안함
    admin: '',// 병합되므로 사용안함
    date: '2025-04-11 10:45:07'
  },
  {
    no: 104,
    type: '-',
    title: '', // 병합되므로 사용안함
    number: '', // 병합되므로 사용안함
    admin: '',// 병합되므로 사용안함
    date: '2025-04-11 10:45:07'
  },
  {
    no: 103,
    type: '-',
    title: '읽지 않은 알림103',
    number: 5,
    admin: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: 102,
    type: '-',
    title: '읽지 않은 알림102',
    number: 8,
    admin: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: 101,
    type: '-',
    title: '읽지 않은 알림101',
    number: 120,
    admin: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: 100,
    type: '-',
    title: '읽지 않은 알림100',
    number: 125,
    admin: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: 99,
    type: '-',
    title: '읽지 않은 알림99',
    number: 255,
    admin: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: 98,
    type: '-',
    title: '읽지 않은 알림98',
    number: 254,
    admin: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: 97,
    type: '-',
    title: '읽지 않은 알림97',
    number: 276,
    admin: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: 96,
    type: '-',
    title: '읽지 않은 알림96',
    number: 383,
    admin: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  }
])


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

<style scoped lang="scss">
  .screen-alarm{
    width: 100%;
    height: 100%;
  }
  .dash-board{
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px 20px;
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
      .alarm-header{
        display: flex;
        flex-direction: column;
        gap: 16px;
        .search{
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
          &-dropdown{
            width: 160px;
          }
          &-input{
            width: 240px;
            :deep(input){
              width: 240px;
            }
          }
        }
        .register{
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          .left{
            span{
              color: var(--color-gray2);
            }
          }
          .right{
            display: flex;
            align-items: center;
            gap: 16px;
          }
          &-dropdown{
            width: 200px;
          }
        }
      }
      .alarm-main{
        margin-top: 16px;
        .alarm-table{
          :deep(tbody){
            td{
              padding: 0;
              &.left{
                text-align: left;
                padding-left: 20px;
              }
              a{
                display: block;
                width: 100%;
                padding: 11px 20px;
              }
            }
            .empty-cell {
              position: relative;
              
              &::before,
              &::after {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                width: 1px;
                background-color: transparent;
              }
              
              &::before {
                left: -12px;
              }
              
              &::after {
                right: -12px;
              }
            }
          }
        }
      }
      .alarm-bottom{
        margin-top: 16px;
        .pagination{
          justify-content: center;
        }
      }
    }
  }

  :deep(.data-table .table td:has(.empty-cell)) {
  border-left: none;
  border-right: none;
}
</style>