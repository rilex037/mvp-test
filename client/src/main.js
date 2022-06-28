import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {ethers} from "ethers";

const app = createApp(App);

app.use(router);

app.config.globalProperties.$provider = new ethers.providers.JsonRpcProvider(`http://localhost:8545`);

app.mount("#app");
