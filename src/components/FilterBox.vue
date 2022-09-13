<template>
  <div :class="`filter-item ${instaFilter}`" :style="`background-image : url(${imgUrl})`">
    <slot></slot>
    <button @click="fire">button</button>
  </div>
</template>

<script>
export default {
  name : 'FilterBoxComponent',
  props : {
    imgUrl : String,
    instaFilter : String,
  },
  data() {
    return {

    }
  },
  methods : {
    fire() {
      // 사용법 : this.emitter.emit('작명', '데이터');
      this.emitter.emit('작명', '데이터');
    },
  },
}
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}
</style>