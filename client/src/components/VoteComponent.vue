<template>
  <div v-if="!voter.voted">
    <table>
      <th></th>
      <th>NAME</th>
      <th>AGE</th>
      <th>CULT</th>
      <tr v-for="(c, k) in candidates">
        <td><input type="radio" v-model="picked" :value="k" /></td>
        <td>{{ c.name }}</td>
        <td>{{ c.age }}</td>
        <td>{{ c.cult }}</td>
      </tr>
    </table>
    <span v-if="picked">Vote For: {{ candidates[picked].name }}</span>

    <form @submit="vote">
      <input min="1" type="number" placeholder="Enter ammount of WKND tokens to spend..." v-model="tokensToSpend" />
      <button type="submit">VOTE</button>
    </form>
  </div>
  <div v-else>
    <h2>You Already Voted!</h2>
    <rankings-component></rankings-component>
  </div>

  <a href="#" @click="showLeads()">{{ leadsHidden ? "Show Leads" : "Hide Leads" }}</a>
  <div class="leads" v-if="!leadsHidden">
    <p v-for="(l, k) in leads">
      {{ k + 1 + ": " + candidates[l].name }}
    </p>
  </div>
</template>

<script>
import {ethers} from "ethers";
import RankingsComponent from "./RankingsComponent.vue";

export default {
  components: {RankingsComponent},
  data() {
    return {
      tokensToSpend: 1,
      picked: null,
      candidates: {},
      leads: [0, 0, 0],
      leadsHidden: true,
    };
  },
  props: ["voteControllerContract", "wakandaTokenContract", "address", "voter"],
  mounted() {
    this.getCandidates();
    this.getLeads();
    /*
    window.setInterval(() => {
      this.getLeads();
    }, 3000);
    */
  },
  methods: {
    getCandidates() {
      fetch(import.meta.env.VITE_CANDIDATES_URL)
        .catch((response) => {
          alert("Error getting list of candidates!: " + response);
        })
        .then((response) => response.json())
        .then((data) => (this.candidates = data.candidates));
    },
    async showLeads() {
      this.leadsHidden = !this.leadsHidden;
    },
    async vote(e) {
      e.preventDefault();
      if (!this.picked == null) {
        alert("Please, pick a candidate to cast a vote!");
        return;
      }
      if (this.tokensToSpend < 1) {
        alert("You need to put at least one token to cast a vote!");
        return;
      }

      // Approve a vote
      try {
        let tx = await this.wakandaTokenContract.approve(
          import.meta.env.VITE_VOTE_CONTROLLER_ADDRESS,
          ethers.utils.parseEther(this.tokensToSpend.toString())
        );
        let receipt = await tx.wait();
        if (receipt.status) {
          // Cast a vote
          try {
            let tx = await this.voteControllerContract.vote(this.picked, this.tokensToSpend);
            let receipt = await tx.wait();
            if (receipt.status) {
              alert("You voted for: " + this.candidates[this.picked].name);
              this.getLeads();
              console.log(receipt.transactionHash);
            }
          } catch (error) {
            alert(error.reason);
          }
        }
      } catch (error) {
        alert(error.reason ? error.reason : error);
      }
    },

    async getLeads() {
      await this.voteControllerContract.winningCandidates().then(
        async (result) => {
          this.leads = result.toString().split(",");
        },
        (error) => {
          alert(error.reason);
        }
      );
    },
  },
};
</script>
