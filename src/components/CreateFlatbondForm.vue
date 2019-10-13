<template>
  <b-form class="create-flatbond-form" @submit="onSubmit">
    <b-form-group
      :invalid-feedback="invalidFeedbackRent"
      :state="$v.form.rent.$dirty ? !$v.form.rent.$error : null"
      label="Your rent"
      label-for="rent"
    >
      <b-input-group prepend="£" append=".00">
        <b-form-input
          :state="$v.form.rent.$dirty ? !$v.form.rent.$error : null"
          :number="true"
          v-model="form.rent"
          placeholder="Enter your rent"
          id="rent-input"
          trim
          @input="setRent"
        ></b-form-input>
      </b-input-group>
    </b-form-group>

    <b-form-group>
      <b-form-radio
        v-model="form.rentPeriod"
        name="payment-period-radios"
        value="weekly"
        >Weekly</b-form-radio
      >
      <b-form-radio
        v-model="form.rentPeriod"
        name="payment-period-radios"
        value="monthly"
        >Monthly</b-form-radio
      >
    </b-form-group>

    <b-form-group
      :invalid-feedback="invalidFeedbackPostcode"
      :state="$v.form.postcode.$dirty ? !$v.form.postcode.$error : null"
      class="fieldset-postcode"
      label="Your postcode"
      label-for="postcode"
    >
      <b-form-input
        :state="$v.form.postcode.$dirty ? !$v.form.postcode.$error : null"
        v-model="form.postcode"
        id="postcode-input"
        placeholder="Enter your postcode"
        trim
        @input="setPostcode"
      ></b-form-input>
    </b-form-group>
    <b-button
      :disabled="$v.form.$invalid"
      type="submit"
      class="submitButton"
      variant="primary"
      >Submit</b-button
    >
  </b-form>
</template>

<script>
import {
  between,
  minLength,
  numeric,
  required
} from "vuelidate/lib/validators";

import {
  MINIMUM_MONTHLY,
  MAXIMUM_MONTHLY,
  MINIMUM_WEEKLY,
  MAXIMUM_WEEKLY
} from "../config.json";

import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BFormRadio,
  BInputGroup
} from "bootstrap-vue";

const PERIODS = {
  MONTHLY: "monthly",
  WEEKLY: "weekly"
};

export default {
  name: "CreateFlatbondForm",
  components: {
    "b-button": BButton,
    "b-form": BForm,
    "b-form-group": BFormGroup,
    "b-form-input": BFormInput,
    "b-form-radio": BFormRadio,
    "b-input-group": BInputGroup
  },
  data() {
    return {
      form: {
        rent: null,
        rentPeriod: PERIODS.WEEKLY,
        postcode: null
      }
    };
  },
  computed: {
    minimumRent() {
      return this.form.rentPeriod === PERIODS.MONTHLY
        ? MINIMUM_MONTHLY
        : MINIMUM_WEEKLY;
    },
    maximumRent() {
      return this.form.rentPeriod === PERIODS.MONTHLY
        ? MAXIMUM_MONTHLY
        : MAXIMUM_WEEKLY;
    },
    invalidFeedbackRent() {
      if (this.form.rentPeriod === PERIODS.MONTHLY) {
        return `Your monthly rent should be a number between ${MINIMUM_MONTHLY} and ${MAXIMUM_MONTHLY}.`;
      }
      return `Your weekly rent should be a number between ${MINIMUM_WEEKLY} and ${MAXIMUM_WEEKLY}.`;
    },
    invalidFeedbackPostcode() {
      return "Please enter a valid postcode.";
    }
  },
  validations() {
    return {
      form: {
        rent: {
          required,
          numeric,
          between: between(this.minimumRent, this.maximumRent)
        },
        postcode: {
          required,
          minLength: minLength(3)
        }
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("on submit");
    },
    setRent(rentValue) {
      this.rent = rentValue;
      this.$v.form.rent.$model = this.rent;
    },
    setPostcode(postcode) {
      this.postcode = postcode.toUpperCase();
      this.$v.form.postcode.$model = this.postcode;
    }
  }
};
</script>

<style scoped lang="scss">
.create-flatbond-form {
  text-align: left;
}

.fieldset-postcode {
  margin-top: 25px;
}

.btn {
  margin: 25px auto;
  display: block;
}
</style>
