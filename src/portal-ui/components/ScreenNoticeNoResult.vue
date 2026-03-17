<template>
  <div class="screen-notice-no-result" style="display: flex;">
    <div class="dash-board">
      <div class="dash-board-navigator">
        <Breadcrumb />
      </div>
      <main class="main-content">
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
            <Button class="register-button" fontColor="white" bgColor="black" size="32" minWidth="86">등록</Button>
          </div>
        </div>
        <div class="notice-main">
          <DataTable :columns="columns" class="notice-table">
          </DataTable>
          <NoResultIcon class="notice-no-result" message="검색된 내용이 없습니다. <br/>다시 검색해 주세요." iconImageTrack="./portal-ui/icon/icon-search-screen-blue.svg"/>
        </div>
      </main>
    </div>
    <SplitScreen ref="splitScreenRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';
import Breadcrumb from './Breadcrumb.vue';
import SplitScreen from './SplitScreen.vue';
import CustomDropdown from './Dropdown.vue';  
import TextInput from './TextInput.vue';
import DataTable from './DataTable.vue';
import NoResultIcon from './NoResultIcon.vue';

// 테이블 컬럼 정의
const columns = ref([
  { key: 'no', label: 'No', class: 'w-100' },
  { key: 'category', label: '유형', class: 'w-200' },
  { key: 'title', label: '제목', class: 'left' },
  { key: 'views', label: '조회수', class: 'w-200' },
  { key: 'author', label: '등록자', class: 'w-200' },
  { key: 'date', label: '등록일자', class: 'w-200' }
])
</script>

<style scoped lang="scss">
  .screen-notice-no-result{
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
      padding: 32px 20px;
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
        .notice-no-result{
          margin-top: 120px;
          :deep(.message){
            text-align: center;
          }
        }
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
</style>