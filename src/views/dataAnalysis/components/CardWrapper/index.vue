<template lang="html">
  <div class="card-wrapper">
    <h3>
      {{ label }}
      <slot name="sub-title" />
    </h3>
    <div class="content-wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardWrapper',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  background-color: #fff;
  padding: 20px;

  h3 {
    font-size: 20px;
    line-height: 30px;
    position: relative;
    padding-left: 15px;
    margin-bottom: 20px;

    &::after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      width: 6px;
      height: 22px;
      background-color: #2F75F5;
      margin-top: -11px;
    }
  }
}
</style>
