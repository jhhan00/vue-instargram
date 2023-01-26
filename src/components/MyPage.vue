<template>
<div style="padding : 10px">
  <h4>팔로워</h4>
  <input placeholder="?" v-model="search" @input="doThis" />
  <!-- class들은 Post.vue 파일의 style을 가져온 것임.. 
      style tag에 넣어놓으면 빌드 후 다 같이 사용 가능-->
  <div class="post-header" v-for="(follower, index) in followers" :key="index">
    <div class="profile" :style="`background-image:url(${follower.image})`"></div>
    <span class="profile-name">{{follower.id}} {{follower.name}}</span>
  </div>
</div>
</template>

<script>
import {computed, onMounted, ref, toRefs, watch} from 'vue';
import axios from 'axios';
import {useStore} from 'vuex'

export default {
    name : 'MyPageComponent',
    props : {
      one : Number,
    },
    setup(props) {
        /**
         * setup() 이라는 hook은 created 라이프사이클과 비슷함 - 확실하지 않음
         * 컴포넌트를 만들기 전에 실행이 되는 코드라고 볼 수 있음
         * ref를 안 쓰면 실시간 데이터 반영이 되지 않음
         * follower.json : public 폴더안에 존재 & build를 하더라도 영향받지 않는 공간 
         *                 -> 변경되지 않는 데이터가 있다면 public 폴더에 저장하는 것도 괜찮
         */
        let followers = ref([]);
        let search = ref("");

        // props를 사용하기 위함
        let { one } = toRefs(props);
        // console.log("one = " + one.value);

        // watch 사용
        watch(one, () =>{ console.log("one change.. : " + one.value); });

        // computed 사용
        let result1 = computed(() => { return 10; });
        console.log(result1.value);

        // vuex 사용
        let store = useStore();
        console.log(store.state.name);
        // mapState는 Composition API에서는 아직 사용불가능

        function getFollower() {
          axios.get('/follower.json').then((r) => {
            followers.value = r.data;
          });
        }

        onMounted(() => {
            getFollower();
        });

        // methods 구현 방식
        function doThis() {
          if(search.value === "") {
            getFollower();
          } else {
            followers.value = followers.value.filter(a => a.name.includes(search.value));
          }
        }

        return {followers, search, doThis}
    },
}
</script>

<style>

</style>