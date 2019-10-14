<template>
  <div class="create">
    <div class="create__introduction">
      <h1>Welcome to flatfair!</h1>
      <p>
        To create your personal flatbond, we need some information about your
        new home:
      </p>
    </div>
    <CreateFlatbondForm v-if="isMembershipFeeConfigPresent" />
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

<style scoped>
.create {
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
}

.create__introduction {
  margin-bottom: 25px;
}
</style>
