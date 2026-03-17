<!-- 슬롯이 없는 기본 화면 템플릿 -->

<template>
  <div class="screen-task" style="display: flex;">
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
      <section class="main-content main-content-1">
        <div class="main-content-inner">
          <div class="inner">
            <div class="progress">
              <div class="state-wrap wrap01">
                <div class="state">
                  <div class="title">
                    <span class="b3_ko_s">지연</span>
                  </div>
                  <div class="data-wrap">
                    <span class="number"><em>0</em>/<em>0</em></span>
                  </div>
                </div>
                <div class="state">
                  <div class="title">
                    <span class="b3_ko_s">임박</span>
                  </div>
                  <div class="data-wrap">
                    <span class="number"><em>0</em>/<em>0</em></span>
                  </div>
                </div>
              </div>
              <div class="state-wrap wrap02">
                <div class="state">
                  <div class="title">
                    <span class="b3_ko_s">완료율</span>
                  </div>
                  <div class="data-wrap">
                    <span class="number"><em>0.00</em>%</span>
                  </div>
                </div>
              </div>
              <div class="state-wrap wrap03">
                <div class="state">
                  <div class="title">
                    <span class="b3_ko_s">단계별 현황</span>
                  </div>
                  <div class="data-wrap">
                    <div class="data">
                      <div class="title"><span class="b5_ko_s">In Progress</span></div>
                      <span class="number">1</span>
                    </div>
                    <div class="data">
                      <div class="title"><span class="b5_ko_s">Resolved</span></div>
                      <span class="number">1</span>
                    </div>
                    <div class="data">
                      <div class="title"><span class="b5_ko_s">Closed</span></div>
                      <span class="number">1</span>
                    </div>
                    <div class="data">
                      <div class="title"><span class="b5_ko_s">Reopened</span></div>
                      <span class="number">0</span>
                    </div>
                  </div>

                </div>
              </div>
              <div class="state-wrap wrap04">
                <div class="conditions">
                  <div class="condition">
                    <div class="title">
                      <span class="b5_ko_s">조건 1</span>
                    </div>
                    <div class="content-wrap">
                      <CustomDropdown
                      v-model="defaultValue"
                      :options="basicOptions"                      
                        placeholder="드롭다운 1"
                        variant="default"
                        class="board-dropdown"
                      />
                    </div>
                  </div>
                  <div class="condition">
                    <div class="title">
                      <span class="b5_ko_s">조건 2</span>
                    </div>
                    <div class="content-wrap">
                      <CustomDropdown
                      v-model="defaultValue2"
                      :options="basicOptions2"                      
                        placeholder="드롭다운 1"
                        variant="default"
                        class="board-dropdown"
                      />
                    </div>
                  </div>
                  <div class="condition">
                    <div class="title">
                      <span class="b5_ko_s">조건 3</span>
                    </div>
                    <div class="content-wrap">
                      <CustomDatepicker 
                        v-model="inactiveDate" 
                        placeholder="YYYY - MM - DD"
                        variant="default"
                      />
                    </div>
                  </div>
                  <div class="condition">
                    <div class="title">
                      <span class="b5_ko_s">조건 3</span>
                    </div>
                    <div class="content-wrap">
                      <CustomDatepicker 
                        v-model="inactiveDate2" 
                        placeholder="YYYY - MM - DD"
                        variant="default"
                      />
                    </div>
                  </div>
                </div>
                <Button size="48" backgroundColor="wafer-blue1" fontColor="white" search>검색</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="main-content main-content-2">
        <div class="main-content-inner">
          <div class="inner">
            <div class="data-header">
              <div class="register">
                <div class="left">
                  <span class="b3_ko_s">알림은 최대 1달만 보관됩니다.</span>
                </div>
                <div class="right">
                  <div class="register-total">
                    <span class="b5_ko_s" style="color: var(--color-gray2);">
                      Total: <em>0</em>
                    </span>
                  </div>
                  <CustomDropdown
                    :options="[{ value: '1', label: '10개씩 보기' }, { value: '2', label: '20개씩 보기' }, { value: '3', label: '30개씩 보기' }]"
                    placeholder="10개씩 보기"
                    class="register-dropdown"
                  />
                  <Button size="32" minWidth="93" backgroundColor="black" fontColor="white">엑셀 다운로드</Button>
                  <Button size="32" minWidth="93" backgroundColor="black" fontColor="white" @click="openPopup">등록</Button>
                </div>
              </div>
            </div>
            <div class="data-main">
              <DataTable :columns="columns" :data="tableData">
                <template #status="{ value }">
                  <span style="display: flex; align-items: center; gap: 6px;">
                    <span :style="{ backgroundColor: value.color }" class="icon"></span>
                    <span class="b4_ko_s">{{ value.text }}</span>
                  </span>
                </template>
              </DataTable>
            </div>
          </div>
        </div>
      </section>
      <NoResultIcon class="task-no-result" message="등록된 내용이 없습니다." iconImageTrack="./portal-ui/icon/icon-tutorials-blue.svg"/>
    </div>
    <SplitScreen ref="splitScreenRef" />

    <!-- 태스크 팝업 -->
    <Popup ref="popupRef" :visible="isPopupVisible" @close="closePopup" width="848" class="popup-task">
      <div class="popup-task-content">
        <div class="notice-popup-header">
          <div class="title">
            <span class="h8_ko_s">Task 등록</span>
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
                />
              </div>
            </li>
            <li>
              <div class="title">
                <span>Task 명 *</span>
              </div>
              <div class="content">
                <TextInput placeholder="제목을 입력해 주세요" class="popup-input" count="100" subtext="* 최대 100자까지 입력 가능합니다."/>
              </div>
            </li>
            <li>
              <div class="title">
                <span>담당자 *</span>
              </div>
              <div class="content">
                <div class="select-user">
                  <Button size="32" minWidth="86" backgroundColor="black" fontColor="white">사용자 찾기</Button>
                  <Checkbox class="checkbox-item" label="나에게" v-model:checked="checkbox4" name="myself" labelClass="b3_ko_s" />
                </div>
                <div class="selected-user">
                  <Button onlyTextClose14>홍길동</Button>
                  <Button onlyTextClose14>홍길동</Button>
                </div>
              </div>
            </li>
            <li>
              <div class="title">
                <span>참조자</span>
              </div>
              <div class="content">
                <div class="select-user">
                  <Button size="32" minWidth="86" backgroundColor="black" fontColor="white">사용자 찾기</Button>
                </div>
                <div class="selected-user">
                  <Button onlyTextClose14>홍길동</Button>
                  <Button onlyTextClose14>홍길동</Button>
                </div>
              </div>
            </li>
            <li>
              <div class="title">
                <span>완료기한 *</span>
              </div>
              <div class="content date-picker">
                <CustomDatepicker 
                  v-model="dummyDate" 
                  placeholder="YYYY - MM - DD"
                  variant="default"
                  class="date-picker-item"
                />
              </div>
            </li>
            <li>
              <div class="title">
                <span>완료조건 *</span>
              </div>
              <div class="content">
                <CustomDropdown
                  :options="[{ value: '1-1', label: '1-1' }, { value: '1-2', label: '1-2' }, { value: '1-3', label: '1-3' }]"
                  placeholder="선택해 주세요"
                  class="popup-dropdown"
                />
              </div>
            </li>
            <li>
              <div class="title">
                <span>선택사항</span>
              </div>
              <div class="content checkbox-group">
                <Checkbox class="checkbox-item" label="담당자 Mailing" v-model:checked="checkbox" name="normal" labelClass="b5_ko_s" />
                <Checkbox class="checkbox-item" label="참조자 Mailing" v-model:checked="checkbox2" name="normal" labelClass="b5_ko_s" />
                <Checkbox class="checkbox-item" label="긴급" v-model:checked="checkbox3" name="normal" labelClass="b5_ko_s" />
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
          <!-- <div class="left"></div> -->
          <div class="right">
            <Button class="notice-btn" size="40" minWidth="120" backgroundColor="white" fontColor="gray1" lineColor="gray4" @click="closePopup">
              취소
            </Button>
            <Button class="notice-btn" size="40" minWidth="120" backgroundColor="white" fontColor="gray1" lineColor="gray4" @click="closePopup">
              임시저장
            </Button>
            <Button class="notice-btn" size="40" minWidth="120" backgroundColor="black" fontColor="white" @click="closePopup">
              발행
            </Button>
          </div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from './Button.vue'
import Breadcrumb from './Breadcrumb.vue'
import SplitScreen from './SplitScreen.vue'
import { useEventBus } from '../composables/useEventBus'
import CustomDropdown from './Dropdown.vue';  
import CustomDatepicker from './CustomDatepicker.vue';
import DataTable from './DataTable.vue';
import NoResultIcon from './NoResultIcon.vue';
import Popup from './Popup.vue';
import TextInput from './TextInput.vue';
import TextareaComponent from './Textarea.vue';
import Checkbox from './Checkbox.vue';

// 상단 탭 버튼들의 토글 상태 관리
const activeMainTab = ref('tab1')

// SplitScreen 인스턴스 타입 정의
interface SplitScreenInstance {
  toggleSplitScreen: () => void;
}

const splitScreenRef = ref<SplitScreenInstance | null>(null);
const { on } = useEventBus();

const inactiveDate = ref<Date | null>(null)
const inactiveDate2 = ref<Date | null>(null)
const dummyDate = ref<Date | null>(null)

const defaultValue = ref('')
const defaultValue2 = ref('')

const checkbox = ref(true)
const checkbox2 = ref(true)
const checkbox3 = ref(false)
const checkbox4 = ref(true)

const isPopupVisible = ref(false)

const openPopup = () => {
  isPopupVisible.value = true
}

const closePopup = () => {
  isPopupVisible.value = false
}
const basicOptions = ref([
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
])
const basicOptions2 = ref([
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
])

// 테이블 컬럼 정의
const columns = ref([
  { key: 'taskId', label: 'Task ID', class: 'w-160' },
  { key: 'type', label: '유형', class: 'w-100' },
  { key: 'title', label: 'Task 명', class: 'left' },
  { key: 'status', label: '상태', class: 'w-160 td-status left' },
  { key: 'due', label: '완료기한', class: 'w-160' },
  { key: 'manager', label: '담당자', class: 'w-100' },
  { key: 'requester', label: '요청자', class: 'w-100' },
  { key: 'requestDate', label: '요청일', class: 'w-160' },
  { key: 'completer', label: '완료자', class: 'w-100' },
  { key: 'completeDate', label: '완료일', class: 'w-160' }
])

// 테이블 데이터
const tableData = ref([
  {
    taskId: 'Task 250501-01',
    type: '긴급',
    title: 'My Task 긴급 요청 건입니다.',
    status: { text: 'Closed', color: '#0077C8' },
    due: '2025.05.09 17:30',
    manager: '김길동',
    requester: '설공찬',
    requestDate: '2025.05.01 09:30',
    completer: '홍길동',
    completeDate: '2025.05.07 13:30'
  },
  {
    taskId: 'Task 250504-02',
    type: '정기',
    title: 'My Task 정기 요청 건입니다.',
    status: { text: 'Delayed (D+2)', color: '#D62323' },
    due: '2025.05.09 17:30',
    manager: '김길동',
    requester: '설공찬',
    requestDate: '2025.05.01 09:30',
    completer: '홍길동',
    completeDate: '-'
  },
  {
    taskId: 'Task 250507-03',
    type: '검토',
    title: 'My Task 검토 요청 건입니다.',
    status: { text: 'Progess', color: '#33C2E8' },
    due: '2025.05.09 17:30',
    manager: '김길동',
    requester: '설공찬',
    requestDate: '2025.05.01 09:30',
    completer: '홍길동',
    completeDate: '-'
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

<style lang="scss" scoped>
@use '@/assets/common/_mixin' as *;
@use '@/assets/common/_variables' as *;

.screen-task{
  width: 100%;
  height: 100%;
  .dash-board{
    display: flex;
    flex-direction: column;
    // gap: 20px;
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
      // height: 85%;
      border: 1px solid var(--color-gray4);
      border-radius: 16px;
      background-color: var(--color-white);
      padding: 10px 10px;
      .main-content-inner{
        // height: 100%;
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
          padding: 0;
          .progress{
            display: flex; align-items: center;
            justify-content: center;
            height: 144px;
            .state-wrap{
              padding: 0 vw(w, 50);
              position: relative;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center; 
              &:before{
                content: '';
                display: inline-block;
                position: absolute;
                top: 0;
                left: 0;
                width: 1px;
                height: 100%;
                background-color: var(--color-gray5);
              }
              .state{
                display: flex;
                align-items: center;
                .title{
                  span{
                    color: var(--color-gray2);
                    font-weight: 700 !important;
                  }
                }
                .data-wrap{
                  .number{
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--color-wafer-blue1);
                  }
                }
              }
              &.wrap01{
                padding-left:0;
                flex-direction: column;
                .state{
                  &:nth-of-type(2){
                    margin-top: 16px;
                  }
                }
                .data-wrap{
                  margin-left: 16px;
                }
                &:before{
                  display: none;
                }
              }
              &.wrap02{
                .data-wrap{
                  margin-left: vw(w, 32);
                }
              }
              &.wrap03{
                .state{
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .data-wrap{
                  margin-left: vw(w, 32);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: vw(w, 28);
                  .data{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    .title{
                      span{
                        color: var(--color-gray3);
                        font-weight: 400 !important;
                      }
                    }
                  }
                }
              }
              &.wrap04{
                // padding: vw(w, 32) vw(w, 40) vw(w, 32) vw(w, 60);
                padding-right: 0;
                padding-top: vw(w, 32);
                padding-bottom: vw(w, 32);
                display: flex;
                gap: vw(w, 36);
                .conditions{
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 16px;
                  .condition{
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    &:nth-of-type(2n){
                      margin-left: 44px;
                    }
                    .title{
                      width: vw(w, 140); 
                    }
                    .content-wrap{
                      .datepicker-wrapper, .dropdown-wrapper{
                        width: 164px;
                      }
                    }
                  }
                }
                .btn{
                  align-self: flex-end;
                }
              }
            }
          }
        }
      }
      &.main-content-1{
        margin-top: 20px;
        .main-content-inner{
          padding: 0;
          .inner{
            min-width: 1700px;
          }
        }
      }
      &.main-content-2{
        margin-top: 20px;
        .main-content-inner{
          padding: 10px;
          .inner{
            min-width: 1700px;
            .data-header{
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
            .data-main{
              margin-top: 16px;
              .data-table{
                :deep(tbody){
                  td{
                    &.left{
                      text-align: left;
                      padding-left: 20px;
                    }
                    &.td-status{
                      .icon{
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background-color: #0077C8;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .task-no-result{
      :deep(.icon-wrap){
        background: var(--color-white);
      }
    }
  }

  .popup-task{
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
          &.checkbox-group{
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px;
            .checkbox-item{
              width: 112px;
              padding: 2px 0;
              :deep(.checkbox-label){
                font-size: 13px;
                line-height: 140%;
                font-weight: 400;
              }
            }
          }
          &.textarea-content{
            :deep(.textarea-input){
              height: 135px;
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
          .select-user{
            display: flex;
            align-items: center;
            gap: 18px;
          }
          .selected-user{
            display: flex;
            align-items: center;
            gap: 16px;
            margin-top: 12px;
            .btn{
              :deep(.button-text){
                color: var(--color-gray2) !important;
                gap: 2px;
                .icon-close{
                  opacity: 0.7;
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
}

</style>
