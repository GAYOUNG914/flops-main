<template>
  <div class="text-input" :class="[
    currentState,
    { 'has-subtext': !!subtext, 'has-error': !!error, 'is-readonly': readonly, 'is-disabled': disabled, 'is-combo': combo && combo.length, 'is-search': search, 'has-count': !!count }
  ]">
    <div class="input-wrapper">


      <input
        :type="type"
        :placeholder="combo && combo.length ? '' : placeholder"
        :disabled="disabled || currentState === 'completed'"
        :readonly="readonly || (combo && combo.length > 0)"
        v-model="inputValue"
        @focus="onFocus"
        @blur="onBlur"
        @input="$emit('update:textInput', inputValue)"
        :class="{ completed: currentState === 'completed' }"
        ref="inputRef"
      />

      <button v-if="currentState === 'pressed' && !disabled && !readonly" class="clear-btn" @click="clearInput" type="button">
        <span aria-hidden="true">
          <img src="/portal-ui/icon/icon-clear.svg" alt="close">
        </span>
      </button>

      <div v-if="search && (!combo || combo.length === 0)" class="icon-search">
        <img src="/portal-ui/icon/icon-input-search.svg" alt="search">
      </div>

      <div v-if="combo && combo.length" class="combo-list">
        <span v-for="(item, idx) in combo" :key="idx" class="combo-item b5_ko_s">
          {{ item }} <span class="combo-remove" @click="$emit('remove-combo', idx)">✕</span>
        </span>
      </div>

    </div>

    <div v-if="error" class="error-msg">{{ error }}</div>
    
    <div class="messages" v-if="subtext || count">
      <div v-if="subtext" class="subtext">{{ subtext }}</div>
      <div v-if="count" class="count">
        <span class="count-text">{{ inputValue.length }}</span>
        <span class="count-text">/</span>
        <span class="count-text">{{ count }}</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const props = defineProps({
  textInput: { type: String, default: '' },
  placeholder: { type: String, default: 'Placeholder text' },
  subtext: { type: String, default: '' },
  count: { type: String, default: '' },
  error: { type: String, default: '' },
  state: { type: String, default: 'default' }, // default, focus, pressed, completed, hover, disabled, error, readonly
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  type: { type: String, default: 'text' },
  combo: { type: Array as () => string[], default: () => [] },
  search: { type: Boolean, default: false },
});

const emit = defineEmits(['update:textInput', 'remove-combo']);
const inputValue = ref(props.textInput);
const inputRef = ref<HTMLInputElement | null>(null);

// 실제 사용할 state 계산 - 값이 있으면 pressed 상태로 변경
const currentState = computed(() => {
  // 에러나 완료 상태는 우선순위가 높음
  // if (props.state === 'error' || props.state === 'completed') {
  //   return props.state;
  // }
  
  // 값이 있으면 pressed 상태
  if (inputValue.value && inputValue.value.trim() !== '') {
    return 'pressed';
  }
  
  // 그 외에는 원래 state 사용
  return props.state;
});

watch(() => props.textInput, (val) => {
  inputValue.value = val;
});

function onFocus() {
  // 상태 관리 필요시 emit 등 활용
}
function onBlur() {
  // 상태 관리 필요시 emit 등 활용
}
function clearInput() {
  inputValue.value = '';
  emit('update:textInput', '');
  inputRef.value?.focus();
}
</script>

<style lang="scss" scoped>
@use '@/assets/common/mixin' as *;

.text-input{
  .input-wrapper {
    position: relative;
    display: inline-block;
    input {
      width: 320px;
      height: 32px;
      padding: 0 16px;
      font-size: 13px;
      font-weight: 400;
      line-height: 140%;
      border: 1px solid var(--color-gray4);
      border-radius: 4px;
      background: #fff;
      transition: border-color 0.2s, box-shadow 0.2s;
      &::placeholder {
        color: #666;
      }
      &:focus {
        border-color: #03091D;
        outline: none;
      }
      &.completed {
        // background: #f7f7f7;
      }
      &:disabled {
        // background: #f5f5f5;
        color: #bbb;
        cursor: not-allowed;
      }
      &:read-only {
        // background: #fafafa;
        color: #888;
      }
    }
    .clear-btn {
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
      background: none;
      border: none;
      width: 20px;
      height: 20px;
      padding: 0;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
      // &:hover {
      //   color: #a084fa;
      // }
    }
    .combo-list {
      display: flex;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      .combo-item {
        border-radius: 4px;
        padding: 2px 8px;
        font-size: 14px;
        display: flex;
        align-items: center;
        color: var(--color-gray2);
        font-weight: 600 !important;
        &:first-child {
          padding-left: 16px;
        }
        .combo-remove {
          margin-left: 4px;
          cursor: pointer;
          color: var(--color-gray2);
        }
      }
    }
  }
  &:hover:not(.is-disabled):not(.is-readonly):not(.completed):not(.error){
    @include hoverable{
      input{
        border-color: #03091D;
        &::placeholder {
          color: #03091D;
        }
      }
    }
  }
  &.focus input {
    border-color: #03091D;
    &::placeholder {
      color: #03091D;
    }
  }
  &.pressed{
    .input-wrapper input{
      border: 1px solid var(--color-black);
    }
  }
  &.completed input {
    border-color: var(--color-gray4);
    color: #03091D;
    &::placeholder {
      color: #03091D;
    }
  }
  &.is-disabled input {
    color: var(--color-gray4);
    &::placeholder {
      color: var(--color-gray4);
    }
  }
  &.readonly input {
    color: var(--color-gray2);
    &::placeholder {
      color: var(--color-gray2);
    }
  }
  &.error input {
    border-color: var(--color-error1);
    &:focus{
      border-color: var(--color-error1);
    }
  }
  &.is-search {
    .icon-search {
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
      width: 20px; height: 20px;
    }
    .clear-btn{
      right: 44px;
    }
  }
  .error-msg {
    color: var(--color-error1);
    font-size: 13px;
    margin-top: 8px;
  }
  .messages{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .subtext {
    font-size: 12px;
    font-weight: 400;
    line-height: 140%;
    margin-top: 8px;
    color: var(--color-gray3);
    letter-spacing: -0.1px;
    margin-right: auto;
  }
  .count {
    font-size: 12px;
    font-weight: 400;
    line-height: 140%;
    margin-top: 8px;
    letter-spacing: -0.1px;
    color: var(--color-gray3);
    margin-left: auto;
  }
}
</style>


<script lang="ts">
export default {
  name: 'TextInput'
};
</script>