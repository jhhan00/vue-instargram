// vuex 파일 관리 전용 js 파일
// 보통 store.js 라는 이름으로 많이 쓰인다

import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            name : 'Kim',
        }
    },
})

export default store;