<template>
  <div :class="`filter-item ${instaFilter}`" :style="`background-image : url(${imgUrl})`">
    <button class="filter-button" @click="fire">
      <slot></slot>
    </button>
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
      this.emitter.emit('filterButton', this.instaFilter);
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

.filter-button {
  border: 0;
  background-color: rgba(0, 0, 0, 0.3);
  float: right;
}
</style>