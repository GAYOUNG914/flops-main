<template>
  <div class="datepicker-wrapper">
    <div 
      class="datepicker-input"
      :class="[
        `datepicker-input--${currentVariant}`,
        {
          'datepicker-input--open': isOpen,
          'datepicker-input--disabled': disabled,
          'datepicker-input--error': error || currentVariant === 'error',
          'datepicker-input--completed': currentVariant === 'completed',
          'datepicker-input--focus': currentVariant === 'focus',
          'datepicker-input--pressed': currentVariant === 'pressed'
        }
      ]"
      @click="togglePicker"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    >
      <span class="selected-date b4_ko_s" :class="{ 'placeholder': !modelValue }">
        {{ formattedDate }}
      </span>
      <span class="datepicker-icon"></span>
    </div>

    <!-- Error message -->
    <div v-if="(error || currentVariant === 'error') && errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div v-if="isOpen" class="datepicker-overlay" @click="closePicker">
      <div class="datepicker-popup" @click.stop>
        <!-- Header with year/month selectors -->
        <div class="datepicker-header">
          <button @click="previousMonth" class="nav-btn">
              <!-- <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg> -->
              <img src="/portal-ui/icon/icon-date-arrow-left.svg" alt="">
            </button>
          <div class="year-month-selectors">
            <select v-model="selectedYear" @change="updateCalendar" class="year-selector">
              <option v-for="year in yearOptions" :key="year" :value="year">
                <span class="b4_ko_s">{{ year }}</span>
              </option>
            </select>
            <select v-model="selectedMonth" @change="updateCalendar" class="month-selector">
              <option v-for="(month, index) in monthNames" :key="index" :value="index">
                <span class="b4_ko_s">{{ String(index + 1).padStart(2, '0') }}</span>
              </option>
            </select>
          </div>
          <button @click="nextMonth" class="nav-btn">
            <!-- <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> -->
            <img src="/portal-ui/icon/icon-date-arrow-right.svg" alt="">
          </button>
        </div>

        <!-- Calendar Grid -->
        <div class="calendar-grid">
          <!-- Day headers -->
          <div class="day-headers">
            <div v-for="day in dayNames" :key="day" class="day-header">
              <span class="b3_ko_s">{{ day }}</span>
            </div>
          </div>

          <!-- Calendar days -->
          <div class="calendar-days">
            <button
              v-for="day in calendarDays"
              :key="`${day.year}-${day.month}-${day.date}`"
              :class="[
                'calendar-day b3_ko_s',
                {
                  'calendar-day--prev-month': day.isPrevMonth,
                  'calendar-day--next-month': day.isNextMonth,
                  'calendar-day--today': day.isToday,
                  'calendar-day--selected': day.isSelected,
                  'calendar-day--weekend': day.isWeekend,
                  'calendar-day--saturday': day.isSaturday,
                  'calendar-day--sunday': day.isSunday
                }
              ]"
              @click="selectDate(day)"
            >
              {{ day.date }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue?: Date | null
  placeholder?: string
  disabled?: boolean
  variant?: string
  error?: boolean
  errorMessage?: string
}

interface CalendarDay {
  date: number
  month: number
  year: number
  isPrevMonth: boolean
  isNextMonth: boolean
  isToday: boolean
  isSelected: boolean
  isWeekend: boolean
  isSaturday: boolean
  isSunday: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  placeholder: 'Select date',
  variant: 'default',
  error: false,
  errorMessage: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | null]
}>()

const isOpen = ref(false)
const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth())
const isPressed = ref(false)

// 날짜가 선택되면 pressed 상태로 변경
const currentVariant = computed(() => {
  if (props.modelValue && props.variant === 'default') {
    return 'pressed'
  }
  return props.variant
})

const monthNames = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
const dayNames = ['일', '월', '화', '수', '목', '금', '토']

const yearOptions = computed(() => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    years.push(i)
  }
  return years
})

const formattedDate = computed(() => {
  if (props.modelValue) {
    const year = props.modelValue.getFullYear()
    const month = String(props.modelValue.getMonth() + 1).padStart(2, '0')
    const day = String(props.modelValue.getDate()).padStart(2, '0')
    return `${String(year)}-${String(month)}-${String(day)}`
  }
  return props.placeholder
})

const calendarDays = computed((): CalendarDay[] => {
  const year = selectedYear.value
  const month = selectedMonth.value
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  
  const days: CalendarDay[] = []
  
  // Previous month days
  const prevMonth = new Date(year, month - 1, 0)
  const daysInPrevMonth = prevMonth.getDate()
  
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = daysInPrevMonth - i
    const dayDate = new Date(year, month - 1, date)
    days.push({
      date,
      month: month - 1,
      year,
      isPrevMonth: true,
      isNextMonth: false,
      isToday: isToday(dayDate),
      isSelected: isSelected(dayDate),
      isWeekend: dayDate.getDay() === 0 || dayDate.getDay() === 6,
      isSaturday: dayDate.getDay() === 6,
      isSunday: dayDate.getDay() === 0
    })
  }
  
  // Current month days
  for (let date = 1; date <= daysInMonth; date++) {
    const dayDate = new Date(year, month, date)
    days.push({
      date,
      month,
      year,
      isPrevMonth: false,
      isNextMonth: false,
      isToday: isToday(dayDate),
      isSelected: isSelected(dayDate),
      isWeekend: dayDate.getDay() === 0 || dayDate.getDay() === 6,
      isSaturday: dayDate.getDay() === 6,
      isSunday: dayDate.getDay() === 0
    })
  }
  
  // Next month days
  const remainingDays = 42 - days.length
  for (let date = 1; date <= remainingDays; date++) {
    const dayDate = new Date(year, month + 1, date)
    days.push({
      date,
      month: month + 1,
      year,
      isPrevMonth: false,
      isNextMonth: true,
      isToday: isToday(dayDate),
      isSelected: isSelected(dayDate),
      isWeekend: dayDate.getDay() === 0 || dayDate.getDay() === 6,
      isSaturday: dayDate.getDay() === 6,
      isSunday: dayDate.getDay() === 0
    })
  }
  
  return days
})

const isToday = (date: Date): boolean => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const isSelected = (date: Date): boolean => {
  if (!props.modelValue) return false
  return date.toDateString() === props.modelValue.toDateString()
}

const togglePicker = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const closePicker = () => {
  isOpen.value = false
}

const selectDate = (day: CalendarDay) => {
  const selectedDate = new Date(day.year, day.month, day.date)
  emit('update:modelValue', selectedDate)
  isOpen.value = false
}

const updateCalendar = () => {
  // Calendar will update reactively
}

const previousMonth = () => {
  if (selectedMonth.value === 0) {
    selectedMonth.value = 11
    selectedYear.value--
  } else {
    selectedMonth.value--
  }
}

const nextMonth = () => {
  if (selectedMonth.value === 11) {
    selectedMonth.value = 0
    selectedYear.value++
  } else {
    selectedMonth.value++
  }
}

const handleMouseDown = () => {
  if (!props.disabled) {
    isPressed.value = true
  }
}

const handleMouseUp = () => {
  isPressed.value = false
}

// Initialize with current date if modelValue exists
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    selectedYear.value = newValue.getFullYear()
    selectedMonth.value = newValue.getMonth()
  }
}, { immediate: true })

// Handle outside clicks
const handleOutsideClick = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.datepicker-wrapper')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<style scoped lang="scss">
.datepicker-wrapper {
  position: relative;
  width: 100%;
}

.datepicker-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 16px;
  height: 32px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover:not(&--disabled) {
    border-color: var(--color-black);
    .selected-date{
      color: var(--color-black);
    }
  }

  // &--open {
  //   border-color: #3b82f6;
  // }

  &--disabled {
    // background: #f9fafb;
    border-color: var(--color-gray4);
    cursor: not-allowed;
    
    .selected-date {
      color: var(--color-gray4);
      &.placeholder{
        color: var(--color-gray4);
      }
    }
    
    .datepicker-icon {
      color: var(--color-gray4);
    }
  }

  &--error {  
    border-color: var(--color-error1);
    .selected-date{
      color: var(--color-black);
      &.placeholder{
        color: var(--color-black);
      }
    }
  }

  &--completed {
    // background: #f0f9ff;
    border-color: var(--color-gray4);
    .selected-date{
      color: var(--color-black);
      &.placeholder{
        color: var(--color-black);
      }
    }

  }

  &--focus {
    border-color: var(--color-black);
    .selected-date{
      color: var(--color-gray2);
    }
    // box-shadow: 0 0 0 1px #3b82f6;
  }

  &--pressed {
    // background: #f3f4f6;
    border-color: var(--color-black);
    .selected-date{
      color: var(--color-black);
    }
  }

  &--hover {
    border-color: var(--color-black);
    .selected-date{
      color: var(--color-black);
    }
  }
}

.selected-date {
  color: var(--color-black);
  // font-size: 14px;

  &.placeholder {
    color: var(--color-gray2);
  }
}

.datepicker-icon {
  background: url('/portal-ui/icon/icon-calendar.svg') no-repeat center center;
  background-size: 100% 100%;
  width: 20px;
  height: 20px;
}

.datepicker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.datepicker-popup {
  background: var(--color-white);
  border-radius: 8px;
  border: 1px solid var(--color-black);
  // box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 24px 32px;
  min-width: 344px;
}

.datepicker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.year-month-selectors {
  display: flex;
  gap: 8px;
}

.year-selector,
.month-selector {
  width: 100px;
  height: 32px;
  padding: 7px 12px;
  border: 1px solid var(--color-gray4);
  border-radius: 4px;
  background: white;
  cursor: pointer;
  color: var(--color-gray2);
  appearance: none; //셀렉트박스 기본제공 arrow 제거
  background-image: url('/portal-ui/icon/icon-date-arrow-down-gray.svg');
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 20px 20px;
  padding-right: 32px;

  &:focus {
    outline: none;
    // border-color: #3b82f6;
  }
}

.navigation-arrows {
  display: flex;
  gap: 8px;
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--color-bg1);
  }
}

.calendar-grid {
  width: 100%;
}

.day-headers {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  margin-bottom: 8px;
}

.day-header {
  padding: 9px 14px;
  text-align: center;
  // font-size: 12px;
  // font-weight: 600;
  color: var(--color-gray2);
  // background: #f9fafb;
  span{
    font-weight: 700 !important;
  }
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.calendar-day {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  color: var(--color-black);
  cursor: pointer;
  // transition: all 0.2s;
  font-weight: 700 !important;

  &:hover {
    background: var(--color-bg1);
  }

  &--prev-month,
  &--next-month {
    color: var(--color-gray4);
  }

  // &--today {
  //   color: var(--color-wafer-blue1);
  //   font-weight: 600;
  // }

  &--selected {
    background: var(--color-wafer-blue1);
    color: var(--color-white);
  }

  &--weekend {
    color: var(--color-error2);

    &.calendar-day--prev-month,
    &.calendar-day--next-month {
      opacity: 0.2;
    }
  }

  &--saturday {
    color: var(--color-wafer-blue1);

    &.calendar-day--prev-month,
    &.calendar-day--next-month {
      // color: #93c5fd;
      opacity: 0.2;
    }
  }

  &--sunday {
    color: var(--color-error2);

    &.calendar-day--prev-month,
    &.calendar-day--next-month {
      // color: #fca5a5;
      opacity: 0.2;
    }
  }
}

.error-message {
  color: #ef4444;
  font-size: 12px;
  margin-top: 8px;
}
</style> 