<template>
  <div class="create">
    <div class="create__introduction">
      <h1>Welcome to flatfair!</h1>
      <p>
        To create your personal flatbond, we need some details about your new
        home.
      </p>
    </div>
    <CreateFlatbondForm
      @submitted="createFlatbond"
      v-if="isMembershipFeeConfigPresent"
    />
    <Illustration :imageSrc="require('@/assets/house.png')" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CreateFlatbondForm from "@/components/CreateFlatbondForm.vue";
import Illustration from "@/components/Illustration.vue";

export default {
  name: "create",
  components: {
    CreateFlatbondForm,
    Illustration
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
  },
  methods: {
    createFlatbond(flatbondData) {
      const { rent, postcode, fee } = flatbondData;

      this.$store
        .dispatch("CREATE_FLATBOND", {
          rent: rent,
          postcode: postcode
        })
        .then(() => {
          this.$store.dispatch("SET_FEE", fee);
          this.$router.push("/success");
        })
        .catch(() => {
          this.error = true;
        });
    }
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
</style>
