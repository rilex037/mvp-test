import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {ethers} from "ethers";

const app = createApp(App);

app.use(router);

app.config.globalProperties.$provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_BLOCKCHAIN_URL);

app.mount("#app");
