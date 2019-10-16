<template>
  <div class="success">
    <router-link to="/" class="back-link"
      ><i class="arrow-left" />Back to previous page</router-link
    >
    <div class="success__content">
      <h1>Thank you!</h1>
      <div>Your flatbond was created with the following details:</div>
      <table class="details-table">
        <tr>
          <th class="label">Monthly rent:</th>
          <td class="value rentValue">{{ formatMonthlyRent }} £</td>
        </tr>
        <tr>
          <th class="label">Postcode:</th>
          <td class="value postcodeValue">{{ postcode }}</td>
        </tr>
        <tr>
          <th class="label">Membership fee:</th>
          <td class="value feeValue">{{ fee }} £</td>
        </tr>
      </table>
    </div>
    <Illustration :imageSrc="require('@/assets/home.png')" position="right" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";
import Router from "vue-router";
import Illustration from "@/components/Illustration.vue";

Vue.use(Router);

export default {
  name: "success",
  components: {
    Illustration
  },
  computed: {
    ...mapState(["rent", "postcode", "fee"]),
    formatMonthlyRent() {
      return (this.rent / 100).toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped>
.success {
  text-align: center;
  max-width: 1024px;
  margin: 0 auto;
}

.success__content {
  padding: 30px 0 250px;
}

.back-link {
  width: 100%;
  display: inline-block;
  text-align: left;
  color: var(--blue);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #4166ff;
  }
}

.arrow-left {
  border: solid var(--blue);
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  margin-right: 4px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

.details-table {
  margin: 25px auto;

  .label,
  .value {
    width: 50%;
    text-align: right;
    padding: 5px;
  }

  .value {
    text-align: left;
  }
}
</style>
