<template>
  <div class="block centered">
    <span v-if="voter">
      <div v-if="!voter.registered">Registering your account...</div>
      <div v-if="voter.registered">
        <VoteComponent 
        :voteControllerContract="voteControllerContract"
        :wakandaTokenContract="wakandaTokenContract"
        :voter="voter"
         />
      </div>
    </span>
    <span v-else>Connecting to the blockchain...</span>

    <form @submit="logOut">
      <button>LOG OUT</button>
    </form>
  </div>
</template>

<script>
import VoteComponent from "../components/VoteComponent.vue";

import { useCookies } from "vue3-cookies";
import { ethers } from "ethers";
import { VoteControllerABI } from "../ethers/abi/VoteControllerABI";
import { WakandaTokenABI } from "../ethers/abi/WakandaTokenABI";

export default {
  components: {
    VoteComponent,
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      voteControllerContract: null,
      wakandaTokenContract: null,
      voter: null,
      address: null,
    };
  },

  mounted() {
    this.address = this.cookies.get("address");

    this.voteControllerContract = new ethers.Contract(
      import.meta.env.VITE_VOTE_CONTROLLER_ADDRESS,
      VoteControllerABI(),
      this.$provider.getSigner(this.address)
    );

    this.wakandaTokenContract = new ethers.Contract(
      import.meta.env.VITE_WAKANDA_TOKEN_ADDRESS,
      WakandaTokenABI(),
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
      this.voter = await this.voteControllerContract.voter(this.address);
    },
    async register() {
      await this.voteControllerContract.award().then(
        async (result) => {
          this.voter = await this.voteControllerContract.voter(this.address);
        },
        (error) => {
          alert(JSON.parse(error.body).error.message);
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
