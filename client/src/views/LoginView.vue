<template>
  <div class="block">
    <form @submit="register">
      <label>Account Address:</label>
      <input v-model="ethAddress" name="ethAddress" type="text" />
      <span class="error">{{ errors.ethAddress }}</span>
      <button type="submit">REGISTER</button>
    </form>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import { ethers } from "ethers";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      ethAddress: "",
      errors: [],
      provider: null,
    };
  },
  mounted() {
    this.connectMetamask();
  },
  methods: {
    register(e) {
      e.preventDefault();
      this.errors = [];

      if (!this.ethAddress) {
        return (this.errors = {
          ethAddress: "'Account  Address' field is required.",
        });
      }

      if (!ethers.utils.isAddress(this.ethAddress)) {
        return (this.errors = {
          ethAddress: "Invalid 'Account  Address'.",
        });
      }

      if (this.errors.length == 0) {
        this.$router.push({ name: "vote" });
      }
    },

    async connectMetamask() {
      this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");

      await this.provider.send("eth_requestAccounts", []);

      // console.log(await this.provider.getSigner().getAddress());
      this.$store.commit("setProvider", this.provider);
      this.ethAddress = await this.provider.getSigner().getAddress();

      //console.log(store.state.provider);

      //  app.config.globalProperties.$provider = provider;
    },
  },
};
</script>
