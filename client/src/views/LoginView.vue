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
    };
  },
  mounted() {
 
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
        this.cookies.set("address", this.ethAddress);
        this.$router.push({ name: "vote" });
      }
    },
  },
};
</script>
