<template>
  <div class="block centered">
    <span v-if="voter">
      <div v-if="!voter.registered">Registering your account...</div>
      <div v-if="voter.registered">
        <VoteComponent
          :voteControllerContract="voteControllerContract"
          :wakandaTokenContract="wakandaTokenContract"
          :address="address"
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

import {ethers} from "ethers";
import {VoteControllerABI} from "../ethers/abi/VoteControllerABI";
import {WakandaTokenABI} from "../ethers/abi/WakandaTokenABI";
import {useUserStore} from "@/stores/user";

export default {
  components: {
    VoteComponent,
  },
  setup() {
    const user = useUserStore();

    return {
      user,
    };
  },
  data() {
    return {
      voteControllerContract: null,
      wakandaTokenContract: null,
      voter: null,
      address: null,
    };
  },

  async mounted() {
    this.address = await this.user.provider.getSigner().getAddress();

    this.voteControllerContract = new ethers.Contract(
      import.meta.env.VITE_VOTE_CONTROLLER_ADDRESS,
      VoteControllerABI(),
      this.user.provider.getSigner(0)
    );

    this.wakandaTokenContract = new ethers.Contract(
      import.meta.env.VITE_WAKANDA_TOKEN_ADDRESS,
      WakandaTokenABI(),
      this.user.provider.getSigner()
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
      try {
        let tx = await this.voteControllerContract.award();
        let receipt = await tx.wait();
        this.voter = await this.voteControllerContract.voter(this.address);
      } catch (error) {
        console.log(error);
      }
    },
    logOut(e) {
      e.preventDefault();
      window.location.replace("/");
    },
  },
};
</script>
