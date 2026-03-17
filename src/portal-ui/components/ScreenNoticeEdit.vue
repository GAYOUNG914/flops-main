<template>
  <div class="screen-notice" style="display: flex;">
    <div class="dash-board">
      <div class="dash-board-navigator">
        <Breadcrumb />
      </div>
      <main class="main-content">
        <div class="main-content-inner">
          <div class="inner">
            <div class="notice-header">
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
                <Button class="register-button" fontColor="white" bgColor="black" size="32" minWidth="86" @click="openPopup">등록</Button>
              </div>
            </div>
            <div class="notice-main">
              <DataTable :columns="columns" :data="tableData" class="notice-table">
                <template #title="{ value }">
                  <a href="javascript:void(0)" class="title-link">
                    {{ value }}
                  </a>
                </template>
              </DataTable>
            </div>
            <div class="notice-bottom">
              <Pagination class="pagination"/>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- 스플릿 스크린 -->
    <SplitScreen ref="splitScreenRef" />

    <!-- 등록 팝업 -->
    <Popup ref="popupRef" :visible="isPopupVisible" @close="closePopup" width="848" class="popup-notice">
      <div class="popup-notice-content">
        <div class="notice-popup-header">
          <div class="title">
            <span class="h8_ko_s">공지사항</span>
          </div>
        </div>
        <div class="notice-popup-content">
          <ul class="input-table">
            <li>
              <div class="title">
                <span>유형 *</span>
              </div>
              <div class="content">
                <CustomDropdown
                  :options="[{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }]"
                  placeholder="선택해 주세요"
                  class="popup-dropdown"
                  disabled
                />
              </div>
            </li>
            <li>
              <div class="title">
                <span>기간 *</span>
              </div>
              <div class="content date-picker">
                <CustomDatepicker 
                  v-model="startDate" 
                  placeholder="YYYY - MM - DD"
                  variant="default"
                  class="date-picker-item"
                  disabled
                />
                <div>~</div>
                <CustomDatepicker 
                  v-model="endDate" 
                  placeholder="YYYY - MM - DD"
                  variant="default"
                  class="date-picker-item"
                  disabled
                />
              </div>
            </li>
            <li>
              <div class="title">
                <span>제목 *</span>
              </div>
              <div class="content">
                <TextInput placeholder="제목을 입력해 주세요" class="popup-input" count="100"/>
              </div>
            </li>
            <li>
              <div class="title">
                <span>중요공지 *</span>
              </div>
              <div class="content radio-group">
                <Radio class="radio-item" label="일반" v-model="radio" name="important" value="false" disabled />
                <Radio class="radio-item" label="중요" v-model="radio" name="important" value="true" disabled />
              </div>
            </li>
            <li>
              <div class="title">
                <span>메일 발송 *</span>
              </div>
              <div class="content radio-group">
                <Radio class="radio-item" label="발송 안 함" v-model="radio2" name="sending" value="false" disabled />
                <Radio class="radio-item" label="발송" v-model="radio2" name="sending" value="true" disabled />
              </div>
            </li>
            <li>
              <div class="title">
                <span>내용 *</span>
              </div>
              <div class="content textarea-content">
                <TextareaComponent placeholder="내용을 입력해 주세요" class="popup-textarea" :max-length="2500"/>
              </div>
            </li>
            <li>
              <div class="title">
                <span>첨부파일</span>
              </div>
              <div class="content file">
                <div class="file-attatch-wrap">
                  <div class="file-content">
                    <Button size="32" minWidth="86" fontColor="white" bgColor="black" class="file-button">파일찾기</Button>
                    <div class="desc">
                      <p class="b4_ko_s">
                        * 파일 크기는 최대 100MB 까지 첨부 가능합니다. <br/>
                        * 첨부 가능 확장자 : zip, gif, png, jpg, jpeg, ppt, pptx, doc, docx, xls, xlsx, hwp, pdf <br/>
                        * 다중 파일은 zip (압축파일)로 업로드해 주시기 바랍니다.
                      </p>
                      <div class="file-space">
                        <span class="b3_ko_s" style="font-weight: 700 !important;">Files to attach here</span>
                      </div>
                    </div>
                  </div>
                  <div class="file-bottom">
                    <div class="file-list">
                      <Button onlyTextClose14 class="file-item">첨부파일.xlsx</Button>
                    </div>
                    <div class="amount">
                      <span class="b5_ko_s">0 b / 0.1 GB</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="notice-popup-bottom">
          <div class="left">
            <Button class="notice-btn" size="40" minWidth="120" backgroundColor="white" fontColor="gray1" lineColor="gray4" @click="closePopup">
              삭제
            </Button>
          </div>
          <div class="right">
            <Button class="notice-btn" size="40" minWidth="120" backgroundColor="white" fontColor="gray1" lineColor="gray4" @click="closePopup">
              취소
            </Button>
            <Button class="notice-btn" size="40" minWidth="120" backgroundColor="black" fontColor="white" @click="closePopup">
              등록
            </Button>
          </div>
        </div>
      </div>
    </Popup>

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
import Popup from './Popup.vue';
import Radio from './Radio.vue';
import CustomDatepicker from './CustomDatepicker.vue';
import TextareaComponent from './Textarea.vue';
import { useEventBus } from '../composables/useEventBus';

interface SplitScreenInstance {
  toggleSplitScreen: () => void;
}

const splitScreenRef = ref<SplitScreenInstance | null>(null);
const { on } = useEventBus();

// 테이블 컬럼 정의
const columns = ref([
  { key: 'no', label: 'No', class: 'w-100' },
  { key: 'category', label: '유형', class: 'w-200' },
  { key: 'title', label: '제목', class: 'left' },
  { key: 'views', label: '조회수', class: 'w-200' },
  { key: 'author', label: '등록자', class: 'w-200' },
  { key: 'date', label: '등록일자', class: 'w-200' }
])

// 테이블 데이터
const tableData = ref([
  {
    no: '105',
    category: '시스템공지',
    title: '월차 업무 공지사항105',
    views: '0',
    author: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: '104',
    category: '공고',
    title: '월차 업무 공지사항104',
    views: '1',
    author: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: '103',
    category: '시스템공지',
    title: '월차 업무 공지사항103',
    views: '5',
    author: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: '102',
    category: '시스템공지',
    title: '월차 업무 공지사항102',
    views: '8',
    author: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: '101',
    category: '시스템공지',
    title: '월차 업무 공지사항101',
    views: '120',
    author: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: '100',
    category: '공고',
    title: '월차 업무 공지사항100',
    views: '125',
    author: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: '99',
    category: '시스템공지',
    title: '월차 업무 공지사항99',
    views: '255',
    author: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: '98',
    category: '시스템공지',
    title: '월차 업무 공지사항98',
    views: '256',
    author: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: '97',
    category: '시스템공지',
    title: '월차 업무 공지사항97',
    views: '276',
    author: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  },
  {
    no: '96',
    category: '시스템공지',
    title: '월차 업무 공지사항96',
    views: '383',
    author: '관리자(admin)',
    date: '2025-04-11 10:45:07'
  }
])

const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)

const radio = ref('false');
const radio2 = ref('false');

const isPopupVisible = ref(false);

const openPopup = () => {
  isPopupVisible.value = true;
}

const closePopup = () => {
  isPopupVisible.value = false;
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
});

</script>

<style scoped lang="scss">
  .screen-notice{
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
      .notice-header{
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
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
          &-dropdown{
            width: 200px;
          }
        }
      }
      .notice-main{
        margin-top: 16px;
        .notice-table{
          :deep(tbody){
            td{
              padding: 0;
              &.left{
                text-align: left;
              }
              a{
                display: block;
                width: 100%;
                padding: 11px 20px;
              }
            }
          }
        }
      }
      .notice-bottom{
        margin-top: 16px;
        .pagination{
          justify-content: flex-end;
        }
      }
    }
  }

  .popup-notice{
    .input-table{
      border-top: 1px solid var(--color-black);
      li{
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--color-gray4);
        .title{
          width: 176px;
          padding: 8px 20px;
          // border-right: 1px solid var(--color-gray4);
          span{
            font-size: 13px;
            line-height: 140%;
            font-weight: 700;
          }
        }
        .content{
          width: 100%;
          padding: 8px 12px;
          border-left: 1px solid var(--color-gray4);
          &.date-picker{
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--color-gray2);
            .date-picker-item{
              width: 160px;
            }
          }
          &.radio-group{
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px;
            .radio-item{
              width: 120px;
              padding: 2px 0;
            }
          }
          &.textarea-content{
            :deep(.textarea-input){
              height: 175px;
            }
          }
          &.file{
            padding: 8px 12px;
            .file-attatch-wrap{
              .file-content{
                display: flex;
                padding: 14px 18px;
                border: 1px solid var(--color-gray4);
                border-radius: 4px;
                gap: 20px;
                .desc{
                  display: flex;
                  flex-direction: column;
                  gap: 20px;
                  p{
                    color: var(--color-gray3);
                  }
                  .file-space{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 60px;
                    cursor: pointer;
                  }
                }
              }
              .file-bottom{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 8px;
                .file-list{
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  .file-item{
                    :deep(.button-text){
                      font-weight: 400 !important;
                    }
                  }
                }
                .amount{
                  color: var(--color-gray3);
                }
              }
            }
          }
        }
        .popup-dropdown{
          width: 352px;
        }
        .popup-input{
          width: 100%;
          :deep(.input-wrapper){
            width: 100%;
            input{
              width: 100%;
            }
          }
        }
      }
    }
    .notice-popup-content{
      margin-top: 20px;
    }
    .notice-popup-bottom{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 40px;
      .btn{
        :deep(.button-text){
          font-weight: 400 !important;
        }
      }
      .left{
        margin-right: auto;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .right{
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }
</style>