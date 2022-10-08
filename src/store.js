// vuex 파일 관리 전용 js 파일
// 보통 store.js 라는 이름으로 많이 쓰인다

import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state () {
        return {
            name : 'Kim',
            age : 29,
            likes : [36, 20, 49],
            morePost : {},
        }
    },
    mutations: {
        nameChange(state) {
            state.name = 'Han'
        },
        agePlus(state, payload) {
            state.age += payload
        },
        likesChange(state, payload) {
            if(payload.likesClicked) {
                state.likes[payload.index] += 1
            } else {
                state.likes[payload.index] -= 1
            }
        },
        setMorePost(state, payload) {
            state.morePost = payload
        },
    },
    actions: {
        // ajax를 사용할 때 혹은 오래 걸리는 작업들을 넣는 곳
        getMorePostData(context) {
            axios.get(`https://codingapple1.github.io/vue/more0.json`)
            .then((a) => {
                context.commit('setMorePost', a.data)
            })
        },
    },
})

export default store;