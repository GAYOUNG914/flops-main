<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
    :style="{
      ...buttonStyle, 
      ...(props.lineColor ? {border: `1px solid var(--color-${props.lineColor})`} : {}),
      ...(props.underlineColor ? {borderBottom: `1px solid var(--color-${props.underlineColor})`} : {}),
      ...(props.hoverColor ? {'--hover-bg-color': `var(--color-${props.hoverColor})`} : {}),
      ...(props.hoverFontColor ? {'--hover-font-color': `var(--color-${props.hoverFontColor})`} : {}),
      ...(props.hoverLineColor ? {'--hover-line-color': `var(--color-${props.hoverLineColor})`} : {}),
      }"
  >
    <span v-if="search" class="icon-search">
      <img src="/portal-ui/icon/icon-search.svg" alt="search icon">
    </span>

    <span class="button-text" :class="buttonTextClass" :style="{color: `var(--color-${props.fontColor})`}">
      <slot>{{ text }}</slot>
      <span v-if="onlyTextClose14 || onlyTextClose16" class="icon-close">
        <img src="/portal-ui/icon/icon-close.svg" alt="close icon">
      </span>
    </span>

    <span v-if="link" class="icon-arrow-right">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6L15 12L9 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <!-- <img src="/portal-ui/icon/btn-arrow-right.svg" alt="right arrow"> -->
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'



//버튼 props들의 ts 타입 정의
export interface ButtonProps {
  text?: string
  /** 버튼 크기 */
  size?: string
  /** 비활성화 상태 */
  disabled?: boolean
  /** HTML button type*/
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean
  /** 최소 너비 설정 */
  minWidth?: string
  /** 아이콘 표시 여부 */
  search?: boolean
  /** 링크 표시 여부 */
  link?: boolean
  /** 텍스트만 표시 여부 */
  onlyText14?: boolean,
  onlyText16?: boolean,
  onlyTextClose14?: boolean,
  onlyTextClose16?: boolean
  /** 컬러 */
  backgroundColor?: string,
  /** 폰트 컬러 */
  fontColor?: string,
  /** 라인 컬러 */
  lineColor?: string,
  /** 탭 모양 여부 */
  rectangular?: boolean,
  round?: boolean,
  /** 라인 표시 여부 */
  /** 폰트 크기 */
  fontSize?: string,
  /** 텍스트 클래스 */
  buttonTextClasses?: string, 
  /** 언더라인 컬러 */
  underlineColor?: string,
  /** 텍스트 크기 */
  // onlyText?: boolean,
  /** 호버 액션 여부 */
  hoverAction?: boolean,
  /** 호버 컬러 */
  hoverColor?: string,
  /** 호버 폰트 컬러 */
  hoverFontColor?: string,
  /** 호버 라인 컬러 */
  hoverLineColor?: string,
  /** 호버 축소 액션 여부 */
  hoverShrinkAction?: boolean,
  /** 호버 채우기 액션 여부 */
  hoverFillAction?: boolean,
}

//버튼 props들의 기본값 설정 - prop을 쓰기 위함
const props = withDefaults(defineProps<ButtonProps>(), {
  text: '텍스트',
  size: '40',
  disabled: false,
  fullWidth: false,
  search: false,
  link: false,
  onlyText14: false,
  onlyText16: false,
  onlyTextClose14: false,
  onlyTextClose16: false,
  // onlyText: false,
  backgroundColor:'black',
  fontColor:'white',
  lineColor: undefined,
  rectangular: false,
  round: false,
  fontSize: '16',
  buttonTextClasses: '',
  underlineColor: undefined,
  hoverAction: false,
  hoverColor: undefined,
  hoverFontColor: undefined,
  hoverLineColor: undefined,
  hoverShrinkAction: false,
  hoverFillAction: false,
})

//버튼 클래스 계산
const buttonClasses = computed(() => {
  // onlyText 관련 속성 중 하나라도 true인지 확인
  const isOnlyTextButton = props.onlyText14 || props.onlyText16 || props.onlyTextClose14 || props.onlyTextClose16
  
  const classes: Record<string, boolean> = {
    'btn': true,
    'btn--search': props.search,
    'btn--link': props.link,
    'btn--disabled': props.disabled,
    'btn--full-width': props.fullWidth,
    'btn--only-text-14': props.onlyText14,
    'btn--only-text-16': props.onlyText16,
    'btn--only-text-close-14': props.onlyTextClose14,
    'btn--only-text-close-16': props.onlyTextClose16,
    'transparent': props.backgroundColor === 'transparent',
    'waferblue1': props.backgroundColor === 'waferblue1' || props.backgroundColor === 'wafer-blue1',
    'waferblue2': props.backgroundColor === 'waferblue2' || props.backgroundColor === 'wafer-blue2',
    'gray2': props.backgroundColor === 'gray2' || props.backgroundColor === 'gray-2',
    'gray3': props.backgroundColor === 'gray3' || props.backgroundColor === 'gray-3',
    'gray4': props.backgroundColor === 'gray4' || props.backgroundColor === 'gray-4',
    'gray5': props.backgroundColor === 'gray5' || props.backgroundColor === 'gray-5',
    'black1' : props.backgroundColor === 'black' || props.backgroundColor === 'black1',
    'white' : props.backgroundColor === 'white',
    'btn--rectangular' : props.rectangular,
    'btn--round' : props.round,
    // 'btn--only-text' : props.onlyText,
    'btn--hover-action': props.hoverAction,
    'btn--hover-color': props.hoverColor ? true : false,
    'btn--hover-font-color': props.hoverFontColor ? true : false,
    'btn--hover-line-color': props.hoverLineColor ? true : false,
    'btn--hover-shrink-action': props.hoverShrinkAction,
    'btn--hover-fill-action': props.hoverFillAction,
  }
  
  // onlyText 속성이 없을 때만 size와 variant 클래스 추가
  if (!isOnlyTextButton) {
    classes[`btn--${props.size}`] = true
  }
  
  // 최소 너비 클래스 (조건부 추가)
  // if (props.minWidth && !isOnlyTextButton) {
  //   classes[`btn--min-width-${props.minWidth.replace('px', '')}`] = true
  // }
  
  return classes
})

//버튼 클릭 이벤트 정의
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
  if(props.onlyTextClose14 || props.onlyTextClose16){
    emit('click', event)
    // if(event.currentTarget){
    //   (event.currentTarget as HTMLElement).remove()
    // }
  }
}

const buttonStyle = computed(() => {
  if (props.minWidth) {
    return { minWidth: props.minWidth + 'px' }
  }
  return {}
})

const buttonTextClass = computed(() => {
  // 원하는 기본 클래스 + props로 받은 클래스
  return props.buttonTextClasses || ''
})


</script>

<style lang="scss" scoped>
@use '@/assets/common/_mixin' as *;
@use '@/assets/common/_variables' as *;

  .btn {
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 14px;
    border-radius: 4px;
    background-color: #03091D;
    color: #fff;
    cursor: pointer;
    transition: opacity 0.2s $ease-out-rowan, background-color 0.2s $ease-out-rowan;
    @include hoverable{
      &:hover:not(.btn--disabled){
        opacity: 0.8;
        &.white{
          background-color: var(--color-gray5) !important;
        }
      }
    }
    .button-text{
      position: relative;
      z-index: 1;
    }
    
    // hover action이 활성화된 경우 커스텀 hover 효과
    &.btn--hover-color:not(.btn--hover-action) {
      @include hoverable {
        &:hover:not(.btn--disabled) {
          opacity: 1; // 기본 opacity 효과 제거
          // 배경색 변경
          background-color: var(--hover-bg-color, var(--color-black1)) !important;
        }
      }
    }
    &.btn--hover-font-color:not(.btn--hover-action){
      @include hoverable {
        &:hover:not(.btn--disabled) {
          opacity: 1; // 기본 opacity 효과 제거
          // 폰트색 변경
          .button-text {
            color: var(--hover-font-color, var(--color-white)) !important;
          }
        }
      }
    }
    &.btn--hover-line-color:not(.btn--hover-action){
      @include hoverable {
        &:hover:not(.btn--disabled) {
          opacity: 1; // 기본 opacity 효과 제거
          // 테두리색 변경
          border-color: var(--hover-line-color, var(--color-gray3)) !important;
        }
      }
    }

    &.btn--hover-action{
      position: relative;
      overflow: hidden;
      transition: background-color 0.3s $ease-out-rowan, border 0.3s $ease-out-rowan;
      .button-text{
        transition: color 0.3s $ease-out-rowan;
      }
      &:before{
        content:'';
        display: inline-block;
        position: absolute;
        top: 0;
        right: 100%;
        width: 150%;
        height: 100%;
        background: var(--color-wafer-blue1);
        transition: right 0.3s $ease-out-rowan;
        border-radius: 0 20px 20px 0;
      }
      @include hoverable {
        &:hover:not(.btn--disabled) {
          opacity: 1; // 기본 opacity 효과 제거
          border: 1px solid transparent !important;
          .button-text{
            color: var(--color-white) !important;
          }
          &:before{
            right: -30%;
          }
        }
      }
      &.btn--hover-color{
        @include hoverable {
          &:hover:not(.btn--disabled) {
            &:before{
              background-color: var(--hover-bg-color) !important;
            }
          }
        }
      }
      &.btn--hover-font-color{
        @include hoverable {
          &:hover:not(.btn--disabled) {
            .button-text{
              color: var(--hover-font-color) !important;
            }
          }
        }
      }
      &.btn--hover-line-color{
        @include hoverable {
          &:hover:not(.btn--disabled) {
            border-color: var(--hover-line-color) !important;
          }
        }
      }
    }

    &.btn--hover-shrink-action{
      position: relative;
      opacity: 1 !important;
      transition: background-color 0.5s;

      path{
        transition: stroke 0.5s;
      }

      .button-text{
        transition: color 0.5s;
      }

      &:hover{
        background-color: transparent !important;
        .button-text{
          color: var(--color-black1) !important;
        }
        path{
          stroke: var(--color-black1);
        }
      }
  
      &::after{
        content: "";
        position: absolute;
        display: inline-block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: 2px solid var(--color-black1);
        border-radius: 60px;
        opacity: 0;
        transform: scaleX(1.05) scaleY(1.2);
        transition: .5s;
        pointer-events: none;
      }
      
      &:hover::after{
        opacity: 1;
        transform: scaleX(1) scaleY(1);
      }
    }

    &.btn--hover-fill-action{
      overflow: hidden;
      position: relative;
      opacity: 1 !important;
      .button-text{
        transition: color 0.5s;
        z-index: 1;
      }
      .icon-arrow-right{
        z-index: 1;
      }
      path{
        transition: stroke 0.5s;
      }
      &:hover{
        .button-text{
          color: var(--color-black1) !important;
        }
        path{
          stroke: var(--color-black1);
        }
      }
      &::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        height: 300px;
        background-color: var(--color-wafer-blue1);
        border-color: transparent;
        border-radius: 50%;
        // transform: translate(-20px, -70px) scale(0.1);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.1);
        opacity: 0;
        // z-index: -1;
        transition: transform 0.5s, opacity 0.5s, background-color 0.5s;
      }
      &:hover::after{
        opacity: 1;
        transform-origin: 100px 100px;
        // transform: scale(1) translate(-20px, -70px);
        transform: scale(1) translate(-50%, -50%) ;
      }
    }
    
    &.btn--24 {
      height: 24px;
      min-width: 68px;
      .button-text{
        font-size: 12px;
        line-height: 140%;
        font-weight: 400;
      }
    }
    &.btn--32 {
      height: 32px;
      min-width: 86px;
      .button-text{
        font-size: 13px;
        line-height: 140%;
        font-weight: 400;
      }
    }
    &.btn--40 {
      height: 40px;
      padding: 0 20px;
      min-width: 120px;
      .button-text{
        font-size: 16px;
        line-height: 150%;
        font-weight: 600;
      }
    }
    &.btn--48 {
      height: 48px;
      padding: 0 20px;
      min-width: 160px;
      .button-text{
        font-size: 16px;
        line-height: 150%;
        font-weight: 600;
      }
    }
    &.btn--min-width-55{
      min-width: 55px;
    }
    &.btn--min-width-78{
      min-width: 78px;
    }
    &.btn--min-width-86{
      min-width: 86px;
    }
    &.btn--min-width-120{
      min-width: 120px;
    }
    &.btn--min-width-160{ 
      min-width: 160px;
    }
    &.black1{
      background-color: var(--color-black1);
      color: var(--color-white);
    }
    &.white{
      background-color: var(--color-white);
      border: 1px solid var(--color-gray4);
      color: var(--color-gray1);
    }
    &.btn--full-width{
      width: 100%;
    }
    &.btn--search{
      .icon-search{
        width: 20px;
        height: 20px;
        img{
          object-fit: contain;
          width: 100%;
        }
      }
    }
    &.btn--link{
      // justify-content: space-between;
      padding: 15px 20px 15px 32px;
      min-width: 224px;
      border-radius: 60px;
      height: auto;
      justify-content: space-between;
      .button-text{
        font-size: 16px;
        line-height: 160%;
        font-weight: 400;
      }
      .icon-arrow-right{
        width: 24px;
        height: 24px;
        img{
          object-fit: contain;
        }
      }
      // &.gray3{
      //   @include hoverable{
      //     &:hover{
      //       background-color: var(--color-wafer-blue1);
      //       opacity: 1;
      //     }
      //   }
      // }
    }
    &.btn--only-text-14,&.btn--only-text-16,&.btn--only-text-close-14,&.btn--only-text-close-16{
      background-color: transparent !important;
      border: none;
      height: auto;
      padding: 0;
      min-width: 0;
      .button-text{
        color: var(--color-black1) !important;
      }
      &.btn--only-text-close-14{
        .button-text{
          font-size: 12px;
          font-weight: 600;
          line-height: 160%;
        }
      }
      &.btn--only-text-16,&.btn--only-text-close-16{
        .button-text{
          font-size: 16px;
          font-weight: 600;
        }
      }
      .button-text{
        font-size: 14px;
        line-height: 160%;
        font-weight: 500;
        padding: 0;

        background-image: linear-gradient(#03091D, #03091D);
        background-position: 0% 100%;
        background-repeat: no-repeat;
        background-size: 100% 1px;
      }
    }
    &.btn--only-text-close-14,&.btn--only-text-close-16{
      &.btn--only-text-close-16{
        .button-text{
          gap: 10px;
        }
      }
      .button-text{
        display: flex;
        justify-content: center;
        align-items: center;
        background: none;
        gap: 8px;
      }
      .icon-close{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px; height: 20px;
        img{
          object-fit: contain;
        }
      }
    }
    &.btn--only-text{
      background: none !important;
      border: none !important;
      color: var(--color-black1) !important;
      font-size: 14px;
      line-height: 160%;
      font-weight: 500;
      padding: 0;
      min-width: 0;
    }
    &.btn--round{
      border-radius: 100px;
      padding: 8px 22px;
      &.btn--32{
        padding: 7px 20px;
      }
    }
    &.btn--tab-round{
      border-radius: 100px;
      padding: 8px 22px;
      // border: 1px solid var(--color-gray4);
      background-color: var(--color-white);
      border: 1px solid var(--color-wafer-blue1);
      color: var(--color-wafer-blue1);
      font-size: 16px;
      line-height: 150%;
      font-weight: 700;
      letter-spacing: -1px;
      &.btn--32{
        padding: 7px 20px;
      }
    }
    &.btn--rectangular{
      border: none;
      border-radius: 0;

    }
    &.btn--disabled{
      color: var(--color-white) !important;
      background-color: var(--color-gray4) !important;
      cursor: not-allowed !important;
      // @include hoverable{
      //   &:hover{
      //     opacity: 1;
      //   }
      // }
      //disabled 는 호버 절대 안되게 해야함
      &.white{
        color: var(--color-gray4) !important;
        background-color: #fff !important;
        border: 1px solid var(--color-gray4) !important;
      }
    }
  }

  // 예외
  //필터 내 테이블 추가 제거 버튼 폰트 크기
  .add-table-button,
  .remove-table-button{
    padding: 0 vw(w, 14);
    .button-text{
      font-size: vw(w, 14) !important;
    }
  }
</style>

<script lang="ts">
export default {
  name: 'CustomButton'
};
</script>
