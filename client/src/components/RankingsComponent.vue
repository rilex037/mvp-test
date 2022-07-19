<template>
  <table>
    <th>NAME</th>
    <th>AGE</th>
    <th>CULT</th>
    <th>VOTES</th>
    <tr v-for="(c, k) in candidates">
      <td>{{ c.name }}</td>
      <td>{{ c.age }}</td>
      <td>{{ c.cult }}</td>
      <td class="centered">{{ c.votes }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {candidates: null};
  },

  mounted() {
    this.getRankings();
  },
  methods: {
    getRankings() {
      fetch(import.meta.env.VITE_APIURL + "/v1/votes")
        .catch((response) => {
          alert("Error getting list of candidates!: " + response);
        })
        .then((response) => response.json())
        .then((data) => (this.candidates = data.candidates));
    },
  },
};
</script>
