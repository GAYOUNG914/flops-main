<template>
    <nav aria-label="breadcrumb" class="breadcrumb-wrap">
      <ol class="breadcrumb">
        <li><a href="javascript:void(0)"><span class="blind">홈</span><img src="/portal-ui/icon/icon-home.svg" alt=""></a></li>
        <li><a href="javascript:void(0)" class="b3_ko_s">1Depth</a></li>
        <li><a href="javascript:void(0)" class="b3_ko_s">2Depth</a></li>
        <li aria-current="page" class="b3_ko_s"><a href="javascript:void(0)" class="b3_ko_s">3Depth</a></li>
      </ol>
    </nav>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@use '@/assets/common/_mixin' as *;
@use '@/assets/common/_variables' as *;

.breadcrumb {
 display: flex;
 align-items: center;
 list-style: none;
 padding: 0;
 margin: 0;
 li {
  display: flex;
  align-items: center;
  &:not(:last-child)::after {
    content: "";
    background-image: url('/portal-ui/icon/icon-slash.svg');
    background-size: contain;
    background-repeat: no-repeat;
    width: 16px;
    height: 16px;
    margin: 0 8px;
    }
  &[aria-current="page"] a{
    color: var(--color-black1);
    }
  }
  a {
    color: var(--color-gray3);
    font-weight: 700 !important;
    text-decoration:none;
  }
  
}


</style>