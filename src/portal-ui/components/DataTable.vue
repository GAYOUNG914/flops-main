<template>
  <div class="data-table">
    <table class="table">
      <thead>
        <tr v-if="headerMergeRules">
          <!-- 병합된 헤더가 있는 경우 -->
          <th v-for="(cell, index) in getMergedHeaders()" 
              :key="index" 
              :class="cell.class"
              :colspan="cell.colspan"
              v-show="cell.show">
            {{ cell.label }}
          </th>
        </tr>
        <tr v-else>
          <!-- 일반 헤더 -->
          <th v-for="column in columns" :key="column.key" :class="column.class">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index" :class="row.class">
          <template v-if="mergeRules && mergeRules[index]">
            <!-- 병합 규칙이 있는 행 -->
            <td v-for="(cell, cellIndex) in getMergedCells(row, index)" 
                :key="cellIndex" 
                :class="cell.class"
                :colspan="cell.colspan"
                v-show="cell.show">
              <slot 
                :name="cell.key" 
                :row="row" 
                :value="cell.value" 
                :index="index"
                :moveUp="() => moveRow(index, -1)"
                :moveDown="() => moveRow(index, 1)"
                :canMoveUp="canMoveUp(index)"
                :canMoveDown="canMoveDown(index)"
              >
                {{ cell.value }}
              </slot>
            </td>
          </template>
          <template v-else>
            <!-- 일반 행 -->
            <td v-for="column in columns" :key="column.key" :class="column.class">
              <slot 
                :name="column.key" 
                :row="row" 
                :value="row[column.key]" 
                :index="index"
                :moveUp="() => moveRow(index, -1)"
                :moveDown="() => moveRow(index, 1)"
                :canMoveUp="canMoveUp(index)"
                :canMoveDown="canMoveDown(index)"
              >
                {{ row[column.key] }}
              </slot>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// import { computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true,
  },
  // 기존 병합 규칙 (행 병합)
  mergeRules: {
    type: Object,
    default: null
  },
  // 새로운 prop: 헤더 병합 규칙
  headerMergeRules: {
    type: Array,
    default: null
  },
  // 순서 변경 가능 여부
  allowReorder: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:data', 'row-moved'])

// 헤더 병합된 셀 구조를 생성하는 함수
const getMergedHeaders = () => {
  if (!props.headerMergeRules) {
    return props.columns.map(col => ({
      label: col.label,
      class: col.class,
      colspan: 1,
      show: true
    }))
  }
  
  const headers = []
  
  props.columns.forEach((column, colIndex) => {
    const merge = props.headerMergeRules.find(rule => rule.start <= colIndex && colIndex <= rule.end)
    
    if (merge && colIndex === merge.start) {
      // 병합의 시작 헤더
      headers.push({
        label: merge.label || column.label,
        class: merge.class || column.class,
        colspan: merge.end - merge.start + 1,
        show: true
      })
    } else if (merge && colIndex > merge.start) {
      // 병합된 헤더들 (숨김)
      headers.push({
        label: '',
        class: column.class,
        colspan: 1,
        show: false
      })
    } else {
      // 일반 헤더
      headers.push({
        label: column.label,
        class: column.class,
        colspan: 1,
        show: true
      })
    }
  })
  
  return headers
}

// 기존 병합된 셀 구조를 생성하는 함수
const getMergedCells = (row, rowIndex) => {
  if (!props.mergeRules || !props.mergeRules[rowIndex]) {
    return []
  }
  
  const mergeRule = props.mergeRules[rowIndex]
  const cells = []
  
  props.columns.forEach((column, colIndex) => {
    const merge = mergeRule.find(rule => rule.start <= colIndex && colIndex <= rule.end)
    
    if (merge && colIndex === merge.start) {
      // 병합의 시작 셀
      cells.push({
        key: column.key,
        value: merge.value || row[column.key],
        class: merge.class || column.class,
        colspan: merge.end - merge.start + 1,
        show: true
      })
    } else if (merge && colIndex > merge.start) {
      // 병합된 셀들 (숨김)
      cells.push({
        key: column.key,
        value: '',
        class: column.class,
        colspan: 1,
        show: false
      })
    } else {
      // 일반 셀
      cells.push({
        key: column.key,
        value: row[column.key],
        class: column.class,
        colspan: 1,
        show: true
      })
    }
  })
  
  return cells
}

// 행 이동 함수
const moveRow = (index, direction) => {
  if (!props.allowReorder) return
  
  const newIndex = index + direction
  if (newIndex < 0 || newIndex >= props.data.length) return
  
  const newData = [...props.data]
  const item = newData.splice(index, 1)[0]
  newData.splice(newIndex, 0, item)
  
  emit('update:data', newData)
  emit('row-moved', { from: index, to: newIndex, item })
}

// 위로 이동 가능 여부
const canMoveUp = (index) => {
  return props.allowReorder && index > 0
}

// 아래로 이동 가능 여부
const canMoveDown = (index) => {
  return props.allowReorder && index < props.data.length - 1
}
</script>

<script>
export default {
  name: 'DataTable'
}
</script>

<style lang="scss" scoped>
.data-table {
  // overflow-x: auto;
  
  .table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid var(--color-gray4);
    border-left: none;
    border-right: none;
    border-top: 2px solid var(--color-black);
    
    th, td {
      padding: 11px 12px;
      text-align: center;
      border-right: 1px solid var(--color-gray4);
      border-bottom: 1px solid var(--color-gray4);
      font-size: 13px;
      font-weight: 400;
      line-height: 140%;
      
      &:last-child {
        border-right: none;
      }
    }
    
    th {
      font-weight: 700;
      color: var(--color-black);
      height: 40px;
      vertical-align: middle;
      // border-top: 1px solid var(--color-black);
    }
    
    tbody {
      tr {
        height: 40px;
        &:hover {
          background-color: var(--color-bg1);
        }
        &:last-child {
          td {
            border-bottom: none;
          }
        }
      }
      
      td {
        color: var(--color-gray1);
        vertical-align: middle;
        // &.flex-center{
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        // }
        &.pd-l-20{
          padding-left: 20px !important;
        }
        &.left{
          text-align: left !important;
        }
      }
    }
  }
}

.w-60 { width: 60px }
.w-80 { width: 80px }
.w-90 { width: 90px }
.w-100 { width: 100px }
.w-120 { width: 120px }
.w-140 { width: 140px }
.w-150 { width: 150px }
.w-160 { width: 160px }
.w-176 { width: 176px }
.w-180 { width: 180px }
.w-200 { width: 200px }
.w-220 { width: 220px }
.w-240 { width: 240px }

</style>