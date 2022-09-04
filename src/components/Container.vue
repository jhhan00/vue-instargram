<template>
  <div>
    Container!!
    <Post></Post>
    <Post></Post>
  </div>
</template>

<script>

import Post from './Post.vue';

export default {
  name : "ContainerComponent",
  components : {
    Post
  },
}
</script>

<style>

</style>