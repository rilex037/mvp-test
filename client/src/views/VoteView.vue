<template>
  <div class="block centered">
    <span v-if="voter">
      <div v-if="!voter.registered">Registering your account...</div>
      <div v-if="voter.registered && !voter.voted">
        DISPLAY IF ABLE TO VOTE!
      </div>
    </span>
    <span v-else>Connecting to the blockchain...</span>

    <form action="">
      <button @click="logOut">LOG OUT</button>
    </form>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import { ethers } from "ethers";
import { VoteControllerABI } from "../ethers/abi/VoteControllerABI";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      contract: null,
      voter: null,
      address: null,
    };
  },
  mounted() {
    this.address = this.cookies.get("address");

    this.contract = new ethers.Contract(
      import.meta.env.VITE_VOTE_CONTROLLER_ADDRESS,
      VoteControllerABI(),
      this.$provider.getSigner(this.address)
    );

    this.getVoter().then(() => {
      if (!this.voter.registered) {
        this.register();
      }
    });
  },
  methods: {
    async getVoter() {
      this.voter = await this.contract.voter(this.address);
    },
    async register() {
      await this.contract.award().then(
        async (result) => {
          this.voter = await this.contract.voter(this.address);
        },
        (error) => {
          alert(error);
        }
      );
    },
    logOut(e) {
      e.preventDefault();
      this.cookies.remove("address");
      this.$router.push({ name: "home" });
    },
  },
};
</script>
