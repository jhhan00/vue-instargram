// vuex 파일 관리 전용 js 파일
// 보통 store.js 라는 이름으로 많이 쓰인다

import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            name : 'Kim',
            age : 29,
            likes : 33,
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
            if(payload) {
                state.likes += 1
            } else {
                state.likes -= 1
            }
        },
    },
})

export default store;