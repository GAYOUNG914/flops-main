<template>
  <div class="dropdown-wrapper" ref="dropdownRef">
    <!-- 드롭다운 트리거 -->
    <div 
      class="custom-dropdown"
      :class="[
        variantClass,
        { 'p-invalid': hasError },
        { 'radio-dropdown': radioStyle },
        { 'dropdown-disabled': disabled },
        { 'dropdown-readonly': readonly },
        { 'dropdown-error': hasError },
        { 'dropdown-completed': variant === 'completed' },
        { 'dropdown-open': isOpen },
        { 'dropdown-filled': hasValue }
      ]"
      @click.prevent="toggleDropdown"
      @keydown.enter.space.prevent="toggleDropdown"
      @keydown.escape="closeDropdown"
      tabindex="0"
    >
      <!-- 선택된 값 표시 영역 -->
      <div class="custom-dropdown-content">
        <!-- 다중 선택 칩들 -->
        <div v-if="multiple && selectedChips.length" class="chips-container">
          <div 
            v-for="chip in selectedChips" 
            :key="chip.value"
            class="chip"
          >
            <span class="chip-label">{{ chip.label }}</span>
            <button 
              v-if="!disabled && !readonly"
              class="chip-remove"
              @click.stop.prevent="removeChip(chip.value)"
              type="button"
            >
              <img src="/portal-ui/icon/icon-close-gray.svg" alt="remove">
            </button>
          </div>
        </div>
        
        <!-- 단일 선택 라벨 또는 플레이스홀더 -->
        <span 
          v-if="!multiple || !selectedChips.length"
          class="custom-dropdown-label"
        >
          {{ displayLabel }}
        </span>
      </div>
      
      <!-- 클리어 버튼 -->
      <button 
        v-if="showClear && hasValue && !disabled && !readonly"
        class="clear-button"
        @click.stop.prevent="clearSelection"
        type="button"
      >
        <img src="/portal-ui/icon/icon-close-gray.svg" alt="clear">
      </button>
      
      <!-- 드롭다운 화살표 -->
      <div class="custom-dropdown-icon" :class="{ 'rotated': isOpen }">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    
    <!-- 드롭다운 옵션 리스트 -->
    <Teleport to="body">
      <Transition name="dropdown-overlay" appear>
        <div 
          v-if="isOpen"
          ref="overlayRef"
          class="dropdown-overlay"
          :class="{ 'radio-dropdown-overlay': radioStyle }"
          :style="overlayStyle"
        >
          <!-- 검색 입력창 -->
          <div v-if="searchable" class="search-header">
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              type="text"
              class="search-input"
              :placeholder="searchPlaceholder"
              @keydown.escape="closeDropdown"
              @click.stop
            >
          </div>
          
          <!-- 옵션 리스트 -->
          <div class="options-container">
            <div 
              v-for="option in filteredOptions"
              :key="option.value"
              class="dropdown-option"
              :class="{ 
                'selected': isSelected(option.value),
                'disabled': option.disabled 
              }"
              @click="selectOption(option)"
              @keydown.enter.space.prevent="selectOption(option)"
              tabindex="0"
            >
              <!-- 라디오 스타일 체크 -->
              <span v-if="radioStyle" class="option-check">
                <span class="radio-icon" :class="{ 'selected': isSelected(option.value) }"></span>
              </span>
              
              <!-- 다중 선택 체크박스 -->
              <span v-else-if="multiple" class="option-check">
                <div class="checkbox" :class="{ 'checked': isSelected(option.value) }">
                  <img v-if="isSelected(option.value)" src="/portal-ui/icon/checkbox-checked.svg" alt="checked">
                </div>
              </span>
              
              <!-- 옵션 라벨 -->
              <span class="option-label">{{ option.label }}</span>
              
              <!-- 단일 선택 체크 아이콘 -->
              <span v-if="showCheckIcon && isSelected(option.value) && !radioStyle && !multiple" class="option-check" :class="{ 'img-checked': isSelected(option.value) }">
                <img src="/portal-ui/icon/icon-dropdown-selected.svg" alt="selected">
              </span>
            </div>
            
            <!-- 검색 결과 없음 -->
            <div v-if="searchable && searchQuery && !filteredOptions.length" class="no-results">
              검색 결과가 없습니다.
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    
    <!-- 에러 메시지 -->
    <small v-if="hasError && errorMessage" class="p-error b5_ko_s">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

// 타입 정의
interface DropdownOption {
  value: string | number
  label: string
  disabled?: boolean
}

type VariantType = 'default' | 'focus' | 'pressed' | 'completed' | 'hover' | 'disabled' | 'error' | 'readonly'

interface Props {
  modelValue?: string | number | (string | number)[] | null
  options: DropdownOption[]
  placeholder?: string
  searchable?: boolean
  searchPlaceholder?: string
  multiple?: boolean
  disabled?: boolean
  readonly?: boolean
  variant?: VariantType
  errorMessage?: string
  showClear?: boolean
  showCheckIcon?: boolean
  radioStyle?: boolean
}

// Props 정의
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  options: () => [],
  placeholder: 'Select Option',
  searchable: false,
  searchPlaceholder: '검색어를 입력해 주세요',
  multiple: false,
  disabled: false,
  readonly: false,
  variant: 'default',
  errorMessage: '',
  showClear: false,
  showCheckIcon: false,
  radioStyle: false
})

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[] | null]
  'change': [value: string | number | (string | number)[] | null]
  'show': []
  'hide': []
}>()

// 반응형 데이터
const dropdownRef = ref<HTMLElement>()
const overlayRef = ref<HTMLElement>()
const searchInputRef = ref<HTMLInputElement>()
const isOpen = ref(false)
const searchQuery = ref('')
const overlayStyle = ref({})

// 계산된 속성들
const hasError = computed(() => props.variant === 'error')

const variantClass = computed(() => {
  const baseClasses = 'dropdown-component'
  
  switch (props.variant) {
    case 'completed':
      return `${baseClasses} dropdown-completed`
    case 'error':
      return `${baseClasses} dropdown-error`
    case 'readonly':
      return `${baseClasses} dropdown-readonly`
    default:
      return baseClasses
  }
})

const selectedValues = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) ? props.modelValue : []
  } else {
    return props.modelValue !== null && props.modelValue !== undefined ? [props.modelValue] : []
  }
})

const hasValue = computed(() => {
  return selectedValues.value.length > 0
})

const selectedChips = computed(() => {
  if (!props.multiple) return []
  return props.options.filter(option => 
    selectedValues.value.includes(option.value)
  )
})

const displayLabel = computed(() => {
  if (!hasValue.value) return props.placeholder
  
  if (props.multiple) {
    return selectedChips.value.length > 0 ? '' : props.placeholder
  } else {
    const selected = props.options.find(option => option.value === props.modelValue)
    return selected ? selected.label : props.placeholder
  }
})

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }
  
  return props.options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 메서드들
const isSelected = (value: string | number): boolean => {
  return selectedValues.value.includes(value)
}

const toggleDropdown = (): void => {
  if (props.disabled || props.readonly) return
  
  // 현재 스크롤 위치와 활성 요소 저장
  const currentScrollY = window.scrollY
  const currentScrollX = window.scrollX
  const activeElement = document.activeElement
  
  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
  
  // 스크롤 위치가 변경되었다면 즉시 복원
  requestAnimationFrame(() => {
    if (window.scrollY !== currentScrollY || window.scrollX !== currentScrollX) {
      window.scrollTo(currentScrollX, currentScrollY)
    }
  })
}

const openDropdown = async (): Promise<void> => {
  if (props.disabled || props.readonly) return
  
  // 현재 스크롤 위치 저장
  const currentScrollY = window.scrollY
  
  isOpen.value = true
  emit('show')
  
  await nextTick()
  
  // 스크롤 위치 복원
  window.scrollTo(0, currentScrollY)
  
  updateOverlayPosition()
  
  if (props.searchable && searchInputRef.value) {
    searchInputRef.value.focus()
  }
}

const closeDropdown = (): void => {
  isOpen.value = false
  searchQuery.value = ''
  emit('hide')
}

const selectOption = (option: DropdownOption): void => {
  if (option.disabled) return
  
  if (props.multiple) {
    const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = currentValues.indexOf(option.value)
    
    if (index > -1) {
      currentValues.splice(index, 1)
    } else {
      currentValues.push(option.value)
    }
    
    emit('update:modelValue', currentValues)
    emit('change', currentValues)
  } else {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    closeDropdown()
  }
}

const removeChip = (value: string | number): void => {
  if (props.disabled || props.readonly) return
  
  const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const index = currentValues.indexOf(value)
  
  if (index > -1) {
    currentValues.splice(index, 1)
    emit('update:modelValue', currentValues)
    emit('change', currentValues)
  }
}

const clearSelection = (): void => {
  if (props.disabled || props.readonly) return
  
  const newValue = props.multiple ? [] : null
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const updateOverlayPosition = (): void => {
  if (!dropdownRef.value || !overlayRef.value || !isOpen.value) return
  
  // 현재 스크롤 위치 저장
  const currentScrollY = window.scrollY
  const currentScrollX = window.scrollX
  
  const rect = dropdownRef.value.getBoundingClientRect()
  const overlayHeight = overlayRef.value.offsetHeight
  const windowHeight = window.innerHeight
  
  let top = rect.bottom + currentScrollY
  let maxHeight = windowHeight - rect.bottom - 20
  
  // 아래 공간이 부족하면 위로 표시
  if (rect.bottom + overlayHeight > windowHeight && rect.top > overlayHeight) {
    top = rect.top + currentScrollY - overlayHeight
    maxHeight = rect.top - 20
  }
  
  overlayStyle.value = {
    position: 'absolute',
    top: `${top}px`,
    left: `${rect.left + currentScrollX}px`,
    width: `${rect.width}px`,
    maxHeight: `${Math.min(maxHeight, 200)}px`,
    zIndex: 1000
  }
  
  // 혹시 모를 스크롤 위치 변화 방지
  if (window.scrollY !== currentScrollY || window.scrollX !== currentScrollX) {
    window.scrollTo(currentScrollX, currentScrollY)
  }
}

const handleClickOutside = (event: Event): void => {
  if (!dropdownRef.value || !overlayRef.value) return
  
  const target = event.target as Node
  if (!dropdownRef.value.contains(target) && !overlayRef.value.contains(target)) {
    closeDropdown()
  }
}

// 라이프사이클
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', updateOverlayPosition)
  window.addEventListener('scroll', updateOverlayPosition)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', updateOverlayPosition)
  window.removeEventListener('scroll', updateOverlayPosition)
})

// 감시자
watch(isOpen, (newValue) => {
  if (newValue) {
    nextTick(() => updateOverlayPosition())
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/common/_mixin' as *;
@use '@/assets/common/_variables' as *;

.dropdown-wrapper {
  width: 100%;
  position: relative;

  .custom-dropdown {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0;
    position: relative;
    border: 1px solid var(--color-gray4);
    border-radius: 6px;
    height: 32px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: none;
    background: white;
    outline: none;

    &:hover:not(.dropdown-disabled, .dropdown-error, .dropdown-completed, .dropdown-readonly) {
      border: 1px solid var(--color-black);
      
      .custom-dropdown-label {
        color: var(--color-black);
      }
    }

    &.dropdown-open,
    &:focus {
      border: 1px solid var(--color-black);
    }

    &.dropdown-filled {
      border: 1px solid var(--color-black);
      
      .custom-dropdown-label {
        color: var(--color-black);
      }
    }

    &.dropdown-disabled {
      background: none;
      cursor: not-allowed;
      border: 1px solid var(--color-gray4);
      
      .custom-dropdown-label {
        color: var(--color-gray3);
      }
      
      .custom-dropdown-icon {
        color: var(--color-gray4);
      }
    }

    &.dropdown-completed {
      border: 1px solid var(--color-gray3);
      
      .custom-dropdown-label {
        color: var(--color-gray3);
      }
      
      .custom-dropdown-icon {
        color: var(--color-gray3);
      }
    }

    &.dropdown-error {
      border: 1px solid var(--color-error1);
      
      .custom-dropdown-label {
        color: var(--color-black);
      }
    }

    &.dropdown-readonly {
      border: 1px solid var(--color-gray3);
      cursor: not-allowed;
      
      .custom-dropdown-label {
        color: var(--color-gray2);
      }
      
      .custom-dropdown-icon {
        color: var(--color-gray3);
      }
    }

    .custom-dropdown-content {
      flex: 1;
      overflow: hidden;
      padding-left: 16px;
      min-height: 18px;
      display: flex;
      align-items: center;

      .chips-container {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        width: 100%;

        .chip {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 0;
          background: none;

          .chip-label {
            color: var(--color-gray2);
            font-size: 12px;
            line-height: 160%;
            font-weight: 600;
          }

          .chip-remove {
            width: 20px;
            height: 20px;
            border: none;
            background: none;
            cursor: pointer;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
        }
      }

      .custom-dropdown-label {
        font-size: 13px;
        line-height: 140%;
        font-weight: 400;
        color: #666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .clear-button {
      width: 20px;
      height: 20px;
      border: none;
      background: none;
      cursor: pointer;
      margin-right: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .custom-dropdown-icon {
      // width: 16px;
      // height: 16px;
      width: 20px;
      height: 20px;
      margin-right: 16px;
      color: var(--color-gray3);
      transition: transform 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &.rotated {
        transform: rotate(180deg);
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  .p-error {
    display: block;
    margin-top: 8px;
    color: var(--color-error1);
  }
}
</style>

<style lang="scss">
@use '@/assets/common/_mixin' as *;
@use '@/assets/common/_variables' as *;

.dropdown-overlay {
  background: white;
  border: 1px solid #222222;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transform-origin: top center;
  pointer-events: auto;
  will-change: transform, opacity;

  .search-header {
    // border-bottom: 1px solid var(--color-gray4);
    // border-radius: 4px;
    position: relative;
    
    &:after{
      content: '';
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      background-image: url('/portal-ui/icon/icon-input-search.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 20px;
      height: 20px;
      position: absolute;
    }

    .search-input {
      width: 100%;
      padding: 7px 16px;
      border: none;
      border-bottom: 1px solid var(--color-gray4);
      border-radius: 4px;      
      outline: none;
      font-size: 13px;
      line-height: 140%;
      font-weight: 400;
      color: #666;
      box-sizing: border-box;

      &::placeholder {
        color: #999;
      }
    }
  }

  .options-container {
    max-height: 160px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-gray4);
      border-right: 4px solid transparent;
      background-clip: padding-box;
    }

    &::-webkit-scrollbar-track {
      margin: 4px;
    }

    .dropdown-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 16px;
      font-size: 14px;
      line-height: 140%;
      font-weight: 400;
      color: #222;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover:not(.disabled) {
        background: #F8F8F8;
      }

      &.disabled {
        color: #999;
        cursor: not-allowed;
        pointer-events: none;
        opacity: 0.7;
      }

      .option-check {
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;

        &.img-checked{
          margin-right: 0;
        }

        .radio-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid var(--color-gray3);
          background: white;
          position: relative;

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: transparent;
            transition: background 0.2s ease;
          }

          &.selected::after {
            background: var(--color-black);
          }
        }

        .checkbox {
          width: 20px;
          height: 20px;
          border: 1px solid var(--color-gray3);
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;

          &.checked{
            border: none;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .option-label {
        flex: 1;
        text-align: left;
      }
    }

    .no-results {
      padding: 12px 16px;
      color: var(--color-gray3);
      font-size: 14px;
      text-align: center;
    }
  }

  &.radio-dropdown-overlay {
    .dropdown-option {
      justify-content: flex-start;
      padding: 8px 18px;
      // gap: 10px;

      .option-check .radio-icon {
        border: 1px solid var(--color-gray4);

        &.selected {
          border: none;
          background: var(--color-gray2);

          &::after {
            background: white;
          }
        }
      }

      &:has(.radio-icon.selected) .option-label {
        font-weight: 700;
      }
    }
  }
}

// Dropdown overlay animations
.dropdown-overlay-enter-active {
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dropdown-overlay-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-overlay-enter-from {
  opacity: 0;
}

.dropdown-overlay-leave-to {
  opacity: 0;
}

.dropdown-overlay-enter-to,
.dropdown-overlay-leave-from {
  opacity: 1;
}
</style>

<script lang="ts">
export default {
  name: 'CustomDropdown'
}
</script>