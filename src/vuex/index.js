import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    current:0
}

//异步
const actions = {
    changeCurrent(ctx,value){
        ctx.commit("changeCurrent",value);
    }
}
//同步,这里改值
const mutations = {
    changeCurrent(state,value){
        state.current = value;
    }
}

const store = new Vuex.Store({
    state,mutations,actions
});
export default store;