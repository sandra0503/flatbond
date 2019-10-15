<template>
  <div class="create">
    <div class="create__introduction">
      <h1>Welcome to flatfair!</h1>
      <p>
        To create your personal flatbond, we need some details about your new
        home.
      </p>
    </div>
    <CreateFlatbondForm v-if="isMembershipFeeConfigPresent" />
    <div class="create__illustration">
      <img src="../assets/house.png" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CreateFlatbondForm from "@/components/CreateFlatbondForm.vue";

export default {
  name: "create",
  components: {
    CreateFlatbondForm
  },
  computed: {
    ...mapState(["feeConfig"]),
    isMembershipFeeConfigPresent() {
      return (
        this.feeConfig && typeof this.feeConfig.fixedMembershipFee === "boolean"
      );
    }
  },
  created() {
    this.$store.dispatch("FETCH_CONFIG");
  }
};
</script>

<style lang="scss" scoped>
.create {
  text-align: center;
  max-width: 1024px;
  padding-top: 30px;
  margin: 0 auto;
  padding-bottom: 200px;
}

.create__introduction {
  margin-bottom: 25px;
  max-width: 480px;
  margin: auto;
}

.create__illustration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 35%;
  min-width: 300px;
  max-width: 450px;
  height: auto;
  opacity: 0.7;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
