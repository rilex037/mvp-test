<template>
  <div class="block centered">
    <form action="">
      <button @click="vote">VOTE NOW</button>
    </form>
  </div>
</template>

<script>
export default {
  setup() {},
  methods: {
    vote(e) {
      e.preventDefault();
      this.$router.push({ name: "vote" });
    },
  },
};
</script>
