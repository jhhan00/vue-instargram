<template>
  <div>
    <div v-if="nowTab == 0">
      <Post 
        v-for="(post, idx) in postData"
        :key="idx"
        :post="postData[idx]"
        :index="idx">
      </Post>
    </div>

    <div v-if="nowTab == 1">
      <!-- 필터선택페이지 -->
      <div :class="choosedFilter" class="upload-image" :style="`background-image : url(${imgUrl})`"></div>
      <div class="filters">
        <FilterBox
          v-for="(filter, idx) in filterArray" :key="idx"
          :imgUrl="imgUrl"
          :instaFilter="filterArray[idx]">
          <span>{{filter}}</span> <!-- slot 문법용 -->
        </FilterBox>
      </div>
    </div>

    <div v-if="nowTab == 2">
      <!-- 글작성페이지 -->
      <div :class="choosedFilter" class="upload-image" :style="{ backgroundImage : `url(${imgUrl})` }"></div>
      <div style="margin-top: 10px;">
        <span>name</span>
        <input style="margin-left: 5px;" v-model="newName"/>
      </div>
      <div class="write" style="margin-top: 3px;">
        <textarea class="write-box" v-model="newContent"></textarea>
      </div>
    </div>

    <div v-if="nowTab == 3">
      <MyPage></MyPage>
    </div>

  </div>
</template>

<script>

import Post from './Post.vue';
import FilterBox from './FilterBox.vue';
import MyPage from './MyPage.vue'

export default {
  name : "ContainerComponent",
  components : {
    Post,
    FilterBox,
    MyPage,
  },
  props : {
    postData : Array,
    nowTab : Number,
    imgUrl : String,
  },
  data() {
    return {
      newName : "name",
      newContent : "content",
      filterArray : [ 
        "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
        "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
        "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"
      ],
      choosedFilter : "",
    }
  },
  watch : {
    newName() {
      this.$emit('updateName', this.newName);
    },
    newContent() {
      this.$emit('updateContent', this.newContent);
    },
    nowTab() {
      this.newName = "name";
      this.newContent = "content";
      
      if(this.nowTab === 0) this.choosedFilter = "";
    },
  },
  mounted() {
    this.emitter.on('filterButton', (filter) => {
      this.choosedFilter = filter;
    });
  },
}
</script>

<style>

.upload-image{
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size : cover;
}
.filters{
  overflow-x:scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
.filters::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}

</style>