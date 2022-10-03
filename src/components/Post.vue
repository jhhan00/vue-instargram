<template>
  <div class="post">
    <div class="post-header">
      <div class="profile" :style="{ backgroundImage : `url(${post.userImage})` }"></div> <!-- 프로필 사진 -->
      <span class="profile-name">{{post.name}}</span>
    </div>
    <!-- 게시물 사진 -->
    <div  
      :class="post.filter"
      class="post-body"
      :style="{ backgroundImage : `url(${post.postImage})` }"
      @click="likesOrCancel">
    </div>
    <!-- 게시물 사진 -->
    <div class="post-content">
      <p v-if="index == 0">{{$store.state.likes}} Likes </p>
      <p v-else>{{post.likes}} Likes </p>
      <p><strong>{{post.name}}</strong> {{post.content}}</p>
      <p class="date">{{post.date}}</p>
    </div>
  </div>
</template>

<script>
export default {
    name : "PostComponent",
    props : {
      post : Object,
      index : Number,
    },
    data() {
      return {
        likesClicked : true,
      }
    },
    methods : {
      likesOrCancel() {
        this.$store.commit('likesChange', this.likesClicked)
        this.likesClicked = !this.likesClicked
      },
    },
}
</script>

<style>

.post {
  width: 100%;
}
.profile {
  background-image: url("https://placeimg.com/100/100/arch");
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  background-image: url("https://placeimg.com/640/480/animals");
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
} 

</style>