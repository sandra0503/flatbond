<template>
  <div class="success">
    <router-link to="/">back</router-link>
    <h1>Thank you!</h1>
    <div>Your flatbond was created with the following details:</div>
    <div>Monthly rent:</div>
    <div class="rentValue">{{ formatMonthlyRent }} £</div>
    <div>Membership fee:</div>
    <div class="feeValue">{{ fee }} £</div>
    <div>Postcode:</div>
    <div class="postcodeValue">{{ postcode }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default {
  name: "success",
  computed: {
    ...mapState(["rent", "postcode", "fee"]),
    formatMonthlyRent() {
      return (this.rent / 100).toFixed(2);
    }
  }
};
</script>

<style scoped>
.success {
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
}
</style>
