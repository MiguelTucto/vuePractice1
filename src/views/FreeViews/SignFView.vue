<template>
<pv-button label="Next" @click="openNext" />
</template>

<script>
export default {
  name: "SignFView",
  methods: {
    openNext() {
      this.$router.push("/User");
    }
  }
};
</script>

<style scoped>

</style>