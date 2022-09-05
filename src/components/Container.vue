<template>
  <div>
    <!-- <div v-for="(post, idx) in postData" :key="idx">
      <Post :post="post"></Post>
    </div> -->
    <Post 
      v-for="(post, idx) in postData"
      :key="idx"
      :post="postData[idx]">
    </Post>
  </div>
</template>

<script>

import Post from './Post.vue';

export default {
  name : "ContainerComponent",
  components : {
    Post
  },
  props : {
    postData : Array,
  },
}
</script>

<style>

</style>