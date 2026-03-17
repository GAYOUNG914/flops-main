// resizableLayout.ts
import { ref, onMounted, onUnmounted } from 'vue'

interface LayoutState {
  slotCount: number
  leftWidth: number
  topHeight: number
  isDragging: boolean
  dragType: string | null
}

export function useResizableLayout() {
  // 반응형 상태
  // 기본 값을 바꾸면 초기화의 값도 바꿔줘야함
  const state = ref<LayoutState>({
    slotCount: 3,
    leftWidth: 50,
    topHeight: 70,
    isDragging: false,
    dragType: null
  })

  let container: HTMLElement | null = null

  // DOM 요소들을 가져오는 함수
  const getElements = () => {
    return {
      container: document.getElementById('main-container'),
      btn2Slot: document.querySelectorAll('.btn-2-slot'),
      btn3Slot: document.querySelectorAll('.btn-3-slot'),
      slots: document.querySelectorAll('.slot'),
      handles: document.querySelectorAll('.drag-handle'),
      horizontalHandle: document.getElementById('horizontal-handle'),
      verticalHandle: document.getElementById('vertical-handle'),
      rightVerticalHandle: document.getElementById('right-vertical-handle'),
      cornerHandleLeft: document.getElementById('corner-handle-left'),
      cornerHandleRight: document.getElementById('corner-handle-right')
    }
  }

  // 슬롯 개수 설정
  const setSlotCount = (count: number) => {
    state.value.slotCount = count
    
    const { btn2Slot, btn3Slot } = getElements()
    
    // 버튼 상태 업데이트
    btn2Slot.forEach(btn => btn.classList.toggle('active', count === 2))
    btn3Slot.forEach(btn => btn.classList.toggle('active', count === 3))
    
    updateLayout()
  }

  // 마우스 다운 핸들러
  const handleMouseDown = (e: MouseEvent, type: string) => {
    e.preventDefault()
    state.value.isDragging = true
    state.value.dragType = type
    
    let cursor = 'ew-resize'
    if (type === 'vertical' || type === 'right-vertical') {
      cursor = 'ns-resize'
    } else if (type === 'corner') {
      cursor = 'move'
    }
    
    document.body.style.cursor = cursor
    document.body.style.userSelect = 'none'
  }

  // 마우스 이동 핸들러
  const handleMouseMove = (e: MouseEvent) => {
    if (!state.value.isDragging || !state.value.dragType || !container) return

    const rect = container.getBoundingClientRect()

    if (state.value.dragType === 'horizontal') {
      const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100
      state.value.leftWidth = Math.max(10, Math.min(90, newLeftWidth))
    } 
    else if (state.value.dragType === 'vertical') {
      const newTopHeight = ((e.clientY - rect.top) / rect.height) * 100
      state.value.topHeight = Math.max(20, Math.min(80, newTopHeight))
    }
    else if (state.value.dragType === 'right-vertical') {
      const newTopHeight = ((e.clientY - rect.top) / rect.height) * 100
      state.value.topHeight = Math.max(20, Math.min(80, newTopHeight))
    }
    else if (state.value.dragType === 'corner') {
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      const newLeftWidth = (mouseX / rect.width) * 100
      state.value.leftWidth = Math.max(10, Math.min(90, newLeftWidth))
      
      const newTopHeight = (mouseY / rect.height) * 100
      state.value.topHeight = Math.max(20, Math.min(80, newTopHeight))
    }

    updateLayout()
  }

  // 마우스 업 핸들러
  const handleMouseUp = () => {
    state.value.isDragging = false
    state.value.dragType = null
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  // 레이아웃 업데이트 (슬롯 개수 자동 감지)
  const updateLayout = () => {
    const { slots, handles } = getElements()
    
    // 모든 슬롯과 핸들 초기화
    slots.forEach(slot => {
      if (slot instanceof HTMLElement) {
        slot.style.display = 'none'
      }
    })
    handles.forEach(handle => {
      if (handle instanceof HTMLElement) {
        handle.style.display = 'none'
      }
    })
    
    if (state.value.slotCount === 2) {
      update2SlotLayout()
    } else if (state.value.slotCount === 3) {
      update3SlotLayout()
    }
  }

  // 2슬롯 레이아웃 업데이트
  const update2SlotLayout = () => {
    const leftSlot = document.getElementById('left-slot')
    const rightSlot = document.getElementById('right-slot')
    const horizontalHandle = document.getElementById('horizontal-handle')
    const leftWidthText = document.getElementById('left-width-text')
    const rightWidthText = document.getElementById('right-width-text')

    // 갭(px)
    const gap = 16
    if (!container) return
    const containerWidth = container.clientWidth
    const leftWidthPx = (containerWidth - gap) * (state.value.leftWidth / 100)
    const rightWidthPx = (containerWidth - gap) * ((100 - state.value.leftWidth) / 100)

    // 2슬롯 요소들 표시
    if (leftSlot) {
      leftSlot.style.display = 'flex'
      leftSlot.style.width = `${String(leftWidthPx)}px`
      leftSlot.style.height = '100%'
      leftSlot.style.top = '0'
      leftSlot.style.left = '0'
      leftSlot.style.marginRight = `${String(gap)}px`
    }
    
    if (rightSlot) {
      rightSlot.style.display = 'flex'
      rightSlot.style.width = `${String(rightWidthPx)}px`
      rightSlot.style.height = '100%'
      rightSlot.style.top = '0'
      rightSlot.style.right = '0'
      rightSlot.style.marginLeft = '0px'
    }
    
    if (horizontalHandle) {
      horizontalHandle.style.display = 'block'
      horizontalHandle.style.left = `${String(leftWidthPx + gap/2)}px`
      horizontalHandle.style.top = '0'
      horizontalHandle.style.height = '100%'
      horizontalHandle.style.width = `${String(gap)}px`
      horizontalHandle.style.transform = 'translateX(-50%)'
    }

    // 텍스트 업데이트
    if (leftWidthText) leftWidthText.textContent = `너비: ${state.value.leftWidth.toFixed(1)}%`
    if (rightWidthText) rightWidthText.textContent = `너비: ${(100 - state.value.leftWidth).toFixed(1)}%`
  }

  // 3슬롯 레이아웃 업데이트
  const update3SlotLayout = () => {
    const topLeftSlot = document.getElementById('top-left-slot')
    const topRightSlot = document.getElementById('top-right-slot')
    const bottomSlot = document.getElementById('bottom-slot')
    const horizontalHandle = document.getElementById('horizontal-handle')
    const verticalHandle = document.getElementById('vertical-handle')
    const rightVerticalHandle = document.getElementById('right-vertical-handle')
    const cornerHandleLeft = document.getElementById('corner-handle-left')
    const cornerHandleRight = document.getElementById('corner-handle-right')
    const topLeftWidthText = document.getElementById('top-left-width-text')
    const topLeftHeightText = document.getElementById('top-left-height-text')
    const topRightWidthText = document.getElementById('top-right-width-text')
    const topRightHeightText = document.getElementById('top-right-height-text')
    const bottomHeightText = document.getElementById('bottom-height-text')

    // 갭(px)
    const gap = 16
    if (!container) return
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    // 상단(좌/우) 슬롯 width 계산 (gap 16px)
    const topLeftWidthPx = (containerWidth - gap) * (state.value.leftWidth / 100)
    const topRightWidthPx = (containerWidth - gap) * ((100 - state.value.leftWidth) / 100)
    // 상단(좌/우) 슬롯 height 계산 (gap 16px)
    const topHeightPx = (containerHeight - gap) * (state.value.topHeight / 100)
    const bottomHeightPx = (containerHeight - gap) * ((100 - state.value.topHeight) / 100)

    // 3슬롯 요소들 표시 및 위치 설정
    if (topLeftSlot) {
      topLeftSlot.style.display = 'flex'
      topLeftSlot.style.width = `${String(topLeftWidthPx)}px`
      topLeftSlot.style.height = `${String(topHeightPx)}px`
      topLeftSlot.style.top = '0'
      topLeftSlot.style.left = '0'
      topLeftSlot.style.marginRight = `${String(gap)}px`
      topLeftSlot.style.marginBottom = `${String(gap)}px`
    }
    
    if (topRightSlot) {
      topRightSlot.style.display = 'flex'
      topRightSlot.style.width = `${String(topRightWidthPx)}px`
      topRightSlot.style.height = `${String(topHeightPx)}px`
      topRightSlot.style.top = '0'
      topRightSlot.style.right = '0'
      topRightSlot.style.marginLeft = '0px'
      topRightSlot.style.marginBottom = `${String(gap)}px`
    }
    
    if (bottomSlot) {
      bottomSlot.style.display = 'flex'
      bottomSlot.style.width = '100%'
      bottomSlot.style.height = `${String(bottomHeightPx)}px`
      bottomSlot.style.bottom = '0'
      bottomSlot.style.left = '0'
      bottomSlot.style.marginTop = '0px'
    }

    // 핸들 위치 설정
    if (horizontalHandle) {
      horizontalHandle.style.display = 'block'
      horizontalHandle.style.left = `${String(topLeftWidthPx + gap/2)}px`
      horizontalHandle.style.top = '0'
      horizontalHandle.style.height = `${String(topHeightPx)}px`
      horizontalHandle.style.width = `${String(gap)}px`
      horizontalHandle.style.transform = 'translateX(-50%)'
    }
    
    if (verticalHandle) {
      verticalHandle.style.display = 'block'
      verticalHandle.style.top = `${String(topHeightPx + gap/2)}px`
      verticalHandle.style.left = '0'
      verticalHandle.style.width = `${String(topLeftWidthPx)}px`
      verticalHandle.style.height = `${String(gap)}px`
      verticalHandle.style.transform = 'translateY(-50%)'
    }
    
    if (rightVerticalHandle) {
      rightVerticalHandle.style.display = 'block'
      rightVerticalHandle.style.top = `${String(topHeightPx + gap/2)}px`
      rightVerticalHandle.style.left = `${String(topLeftWidthPx + gap)}px`
      rightVerticalHandle.style.width = `${String(topRightWidthPx)}px`
      rightVerticalHandle.style.height = `${String(gap)}px`
      rightVerticalHandle.style.transform = 'translateY(-50%)'
    }

    if (cornerHandleLeft) {
      cornerHandleLeft.style.display = 'block'
      cornerHandleLeft.style.top = `${String(topHeightPx + gap/2)}px`
      cornerHandleLeft.style.left = `${String(topLeftWidthPx + gap/2)}px`
      cornerHandleLeft.style.transform = 'translate(-50%, -50%)'
    }
    
    if (cornerHandleRight) {
      cornerHandleRight.style.display = 'block'
      cornerHandleRight.style.top = `${String(topHeightPx + gap/2)}px`
      cornerHandleRight.style.left = `${String(topLeftWidthPx + gap/2)}px`
      cornerHandleRight.style.transform = 'translate(-50%, -50%)'
    }

    // 텍스트 업데이트
    if (topLeftWidthText) topLeftWidthText.textContent = `너비: ${state.value.leftWidth.toFixed(1)}%`
    if (topLeftHeightText) topLeftHeightText.textContent = `높이: ${state.value.topHeight.toFixed(1)}%`
    if (topRightWidthText) topRightWidthText.textContent = `너비: ${(100 - state.value.leftWidth).toFixed(1)}%`
    if (topRightHeightText) topRightHeightText.textContent = `높이: ${state.value.topHeight.toFixed(1)}%`
    if (bottomHeightText) bottomHeightText.textContent = `높이: ${(100 - state.value.topHeight).toFixed(1)}%`
  }

  // 이벤트 리스너 초기화
  const initEventListeners = () => {
    const elements = getElements()
    
    // 버튼 이벤트
    elements.btn2Slot.forEach((btn: Element) => {
      btn.addEventListener('click', () => {
        setSlotCount(2)
      })
    })
    elements.btn3Slot.forEach((btn: Element) => {
      btn.addEventListener('click', () => {
        setSlotCount(3)
      })
    })

    // 드래그 핸들 이벤트
    elements.horizontalHandle?.addEventListener('mousedown', (e: MouseEvent) => {
      handleMouseDown(e, 'horizontal')
    })
    elements.verticalHandle?.addEventListener('mousedown', (e: MouseEvent) => {
      handleMouseDown(e, 'vertical')
    })
    elements.rightVerticalHandle?.addEventListener('mousedown', (e: MouseEvent) => {
      handleMouseDown(e, 'right-vertical')
    })
    elements.cornerHandleLeft?.addEventListener('mousedown', (e: MouseEvent) => {
      handleMouseDown(e, 'corner')
    })
    elements.cornerHandleRight?.addEventListener('mousedown', (e: MouseEvent) => {
      handleMouseDown(e, 'corner')
    })

    // 전역 마우스 이벤트
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    container?.addEventListener('mouseleave', handleMouseUp)
  }

  // 이벤트 리스너 제거
  const removeEventListeners = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    container?.removeEventListener('mouseleave', handleMouseUp)
  }

  // 초기화 함수
  const initialize = () => {
    // state 초기화
    state.value = {
      slotCount: 3,
      leftWidth: 50,
      topHeight: 70,
      isDragging: false,
      dragType: null
    }
    
    container = document.getElementById('main-container')
    initEventListeners()
    updateLayout()
  }

  // 반응형: window resize 시 레이아웃 업데이트
  const handleResize = () => {
    updateLayout()
  }

  // Vue3 lifecycle hooks
  onMounted(() => {
    initialize()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    removeEventListeners()
    window.removeEventListener('resize', handleResize)
  })

  return {
    state,
    setSlotCount,
    updateLayout,
    initialize
  }
}