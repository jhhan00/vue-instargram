<template>
<div style="padding : 10px">
  <h4>팔로워</h4>
  <input placeholder="?" />
  <!-- <div class="post-header">
    <div class="profile"></div>
    <span class="profile-name">{{followers}}</span>
  </div> -->
  <div class="post-header" v-for="(follower, index) in followers" :key="index">
    <div class="profile" :style="`background-image:url(${follower.image})`"></div>
    <span class="profile-name">{{follower.id}} {{follower.name}}</span>
  </div>
</div>
</template>

<script>
import {onMounted, ref} from 'vue';
import axios from 'axios';

export default {
    name : 'MyPageComponent',
    setup() {
        /**
         * setup() 이라는 hook은 created 라이프사이클과 비슷함
         * 컴포넌트를 만들기 전에 실행이 되는 코드라고 볼 수 있음
         * ref를 안 쓰면 실시간 데이터 반영이 되지 않음
         * follower.json : public 폴더안에 존재 & build를 하더라도 영향받지 않는 공간 
         *                 -> 변경되지 않는 데이터가 있다면 public 폴더에 저장하는 것도 괜찮
         */
        let followers = ref([]);

        onMounted(() => {
            axios.get('/follower.json').then((a)=>{
                followers.value = a.data;
            });
        });

        return {followers}
    },
}
</script>

<style>

</style>