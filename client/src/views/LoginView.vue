<template>
  <div class="block">
    <form @submit="register">
      <label>Account Address:</label>
      <input v-model="ethAddress" name="ethAddress" type="text" disabled />
      <button type="submit">{{ btn }}</button>
    </form>
  </div>
</template>

<script>
import {ethers} from "ethers";
import {useUserStore} from "@/stores/user";

export default {
  setup() {
    const user = useUserStore();

    return {
      user,
    };
  },
  data() {
    return {
      ethAddress: "Please connect with Metamask...",
      btn: "REGISTER",
      errors: [],
    };
  },
  mounted() {
    this.connectMetamask();
    console.log(this.user.provider);
  },
  methods: {
    register(e) {
      e.preventDefault();
      if (!this.user.provider) {
        this.connectMetamask();
      } else {
        this.$router.push({name: "vote"});
      }
    },
    async connectMetamask() {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []).catch((e) => {
        alert("Error while connecting to the MetaMask, reason: " + e.message);
      });
      this.user.storeProvider(provider);
      this.ethAddress = await provider.getSigner().getAddress();
      this.btn = "CONTINUE..";
    },
  },
};
</script>
