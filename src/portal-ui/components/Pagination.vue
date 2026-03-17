<template>
  <nav class="pagination">
    <ul class="pagination__list">
      <li class="pagination__item arrow first"><span class="blind">left arrow to first page</span></li>
      <li class="pagination__item arrow prev"><span class="blind">left arrow</span></li>
      <li class="pagination__item number" v-for="n in 10" :key="n" :class="{ active: n === 1 }"><span class="b3_ko_s">{{ n }}</span></li>
      <li class="pagination__item arrow next"><span class="blind">right arrow</span></li>
      <li class="pagination__item arrow last"><span class="blind">right arrow to last page</span></li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;

  &__list {
    display: flex;
    // gap: 16px;
    padding: 0;
    margin: 0;
  }

  &__item {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    color: var(--color-black);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;

    &.active {
      background-color: var(--color-black); // dark navy
      color: var(--color-white);
    }

    &.arrow {
      // background-color: transparent;
      // color: #aaa;
      // font-size: 18px;
        background-size: 20px 20px;
        background-repeat: no-repeat;
        background-position: center;
      &.first{
        background-image: url('/portal-ui/icon/icon-pg-left-end.svg');
        &.disabled{
          background-image: url('/portal-ui/icon/icon-pg-left-end-gray.svg');
        }
      }
      &.prev{
        background-image: url('/portal-ui/icon/icon-pg-left.svg');
        margin-right: 16px;
        &.disabled{
          background-image: url('/portal-ui/icon/icon-pg-left-gray.svg');
        }
      }
      &.next{
        background-image: url('/portal-ui/icon/icon-pg-right.svg');
        margin-left: 16px;
        &.disabled{
          background-image: url('/portal-ui/icon/icon-pg-right-gray.svg');
        }
      }
      &.last{
        background-image: url('/portal-ui/icon/icon-pg-right-end.svg');
        &.disabled{
          background-image: url('/portal-ui/icon/icon-pg-right-end-gray.svg');
        }
      }
    }

    &.number{
      span{
        font-weight: 700 !important;
      }
    }

    &:hover:not(.active) {
      background-color: var(--color-gray5);
    }
  }
}
</style>
