import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            provider: null,
        };
    },
    mutations: {
        setProvider(state, provider) {
            state.provider = provider;
            console.log(state.provider);
        },
    },
});
export default store;
