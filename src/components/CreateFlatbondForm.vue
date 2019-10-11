<template>
  <div class="create-flatbond-form">
    <h1>Welcome to flatfair!</h1>
    <p>Enter your rent and post code to create your personal Flatbond.</p>
    <b-form-group
      id="rent-input-fieldset"
      label="Your rent"
      label-for="rent"
      :invalid-feedback="invalidFeedbackRent"
      :state="stateRent"
    >
      <b-input-group size="lg" prepend="£" append=".00">
        <b-form-input
          id="rent"
          v-model="rent"
          :state="stateRent"
          trim
        ></b-form-input>
      </b-input-group>
    </b-form-group>

    <b-form-group>
      <b-form-radio
        v-model="paymentPeriod"
        name="payment-period-radios"
        value="weekly"
        >Weekly</b-form-radio
      >
      <b-form-radio
        v-model="paymentPeriod"
        name="payment-period-radios"
        value="monthly"
        >Monthly</b-form-radio
      >
    </b-form-group>

    <b-form-group
      id="fieldset-1"
      label="Your postcode"
      label-for="postcode"
      :invalid-feedback="invalidFeedbackPostcode"
      :state="statePostcode"
    >
      <b-form-input
        id="postcode"
        v-model="postcode"
        :state="statePostcode"
        trim
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
import { BFormGroup, BFormInput, BFormRadio, BInputGroup } from "bootstrap-vue";

export default {
  name: "CreateFlatbondForm",
  components: {
    "b-form-group": BFormGroup,
    "b-form-input": BFormInput,
    "b-form-radio": BFormRadio,
    "b-input-group": BInputGroup
  },
  data() {
    return {
      paymentPeriod: "",
      rent: "",
      postcode: ""
    };
  }
};
</script>

<style scoped lang="scss">
.create-flatbond-form {
  text-align: left;
  max-width: 480px;
  margin: 0 auto;
}
</style>
