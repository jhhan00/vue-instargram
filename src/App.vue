<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="cancelPost">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <!-- <li v-if="nowTab == 0" @click="nowTab++;">Upload</li> -->
      <li v-if="nowTab == 1" @click="nowTab++;">Next</li>
      <li v-if="nowTab == 2" @click="createPost">Post</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!-- <h4>Hello {{ $store.state.name }}</h4>
  <h5>age : {{ $store.state.age }}</h5>
  <button @click="$store.commit('nameChange')">vuex 변경1</button>
  <button @click="$store.commit('agePlus', 3)">vuex 변경2</button>

  <p>{{ $store.state.morePost }}</p>
  <button @click="$store.dispatch('getMorePostData')">더보기</button> -->

  <h5>computed : {{ getName }}</h5>
  <h5>mapState [] : {{name}} {{age}} {{likes}}</h5>
  <h5>mapState {} : {{stateName}} {{stateAge}} {{stateLikes}}</h5>
  <button @click="agePlus(5)">click..</button>

  <Container
    :postData="instaData"
    :nowTab="nowTab"
    :imgUrl="imgUrl"
    @updateName="setName"
    @updateContent="setContent">
  </Container>
  <button v-if="nowTab == 0" @click="btn_more" style="margin-left: 400px;">더보기</button>

  <div class="footer" v-if="nowTab == 0">
    <ul class="footer-button-plus">
      <!-- 이미지 업로드 버튼 -->
      <input @change="fileUpload" type="file" id="file" class="inputfile" accept="image/*" />
      <label for="file" class="input-plus">Upload</label>
    </ul>
 </div>

</template>

<script>

import Container from './components/Container.vue';
import postData from './js/postData';
import axios from 'axios';
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'App',
  components: {
    Container,
  },
  data() {
    return {
      instaData : postData,
      clickCnt : 0,
      nowTab : 0,
      imgUrl : "",
      newName : "a",
      newContent : "b",
      newFilter : "",
    }
  },
  mounted() {
    this.emitter.on('filterButton', (filter) => {
      this.newFilter = filter;
    });
  },
  computed : {
    // computed : 계산 결과 저장용 함수 모음들
    // 처음에만 실행되고, 나중에는 실행이 되지 않음
    // 실제 사용 시 소괄호는 빼고 사용하기
    // 성능이 좋아질 수 있음
    // 주의 - 항상 return 해줘야 함
    getName() {
      return this.$store.state.name;
    },
    ...mapState(['name', 'age', 'likes']),
    ...mapState({ stateName : 'name', stateAge : 'age', stateLikes : 'likes' }),
  },
  methods : {
    ...mapMutations(['agePlus']),
    btn_more() {
      let url = `https://codingapple1.github.io/vue/more${this.clickCnt}.json`;      
      this.clickCnt++;

      axios.get(url)
        .then((result) => {
          this.instaData.push(result.data);
        }).catch((err) => {
          console.log(err);
          alert("불러오지 못했습니다.");
        });
    },
    fileUpload(e) {
      let file = e.target.files;
      this.nowTab = 1;

      let url = URL.createObjectURL(file[0]);
      this.imgUrl = url;
    },
    createPost() {
      let date = new Date();
      let yy = date.getFullYear();
      let mo = String(date.getMonth()+1).padStart(2, "0");
      let dy = String(date.getDate()).padStart(2, "0");

      let newPost = {
        name: this.newName,
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.imgUrl,
        likes: 0,
        date: `${yy} ${mo} ${dy}`,
        liked: false,
        content: this.newContent,
        filter: this.newFilter
      };
      this.instaData.unshift(newPost);
      this.nowTab = 0;
    },
    cancelPost() {
      this.imgUrl = "";
      this.nowTab = 0;
    },
    setName(data) {
      this.newName = data;
    },
    setContent(data) {
      this.newContent = data;
    },
  },
}
</script>

<style>

/* @import 'css/style1.css'; */

body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
