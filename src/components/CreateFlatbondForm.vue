<template>
  <b-form class="create-flatbond-form" @submit.prevent="onSubmit">
    <b-form-group
      :invalid-feedback="invalidFeedbackRent"
      :state="$v.form.rent.$dirty ? !$v.form.rent.$error : null"
      label="Rent:"
      label-for="rent"
    >
      <b-input-group prepend="£" append=".00">
        <b-form-input
          :state="$v.form.rent.$dirty ? !$v.form.rent.$error : null"
          :number="true"
          v-model="form.rent"
          placeholder="Your rent"
          id="rent-input"
          trim
          @input="setRent"
        ></b-form-input>
      </b-input-group>
    </b-form-group>

    <div>
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
    </div>

    <b-form-group
      :invalid-feedback="invalidFeedbackPostcode"
      :state="$v.form.postcode.$dirty ? !$v.form.postcode.$error : null"
      class="fieldset-postcode"
      label="Postcode:"
      label-for="postcode"
    >
      <b-form-input
        :state="$v.form.postcode.$dirty ? !$v.form.postcode.$error : null"
        v-model="form.postcode"
        id="postcode-input"
        placeholder="Postcode"
        trim
        @input="setPostcode"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Your one-off membership fee:" label-for="fee">
      <div class="membership-fee">£ {{ membershipFee }}</div>
    </b-form-group>

    <div class="error" v-if="error">
      Ooops. Something went wrong. Please check your data and try again.
    </div>
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
import { mapState } from "vuex";

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
  MAXIMUM_WEEKLY,
  VAT_FACTOR,
  WEEKLY_FACTOR,
  MINIMUM_MEMBERSHIP_FEE
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
      },
      error: false
    };
  },
  computed: {
    ...mapState(["feeConfig"]),
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
    },
    weeklyRent() {
      if (!Number.isInteger(parseFloat(this.form.rent))) {
        return null;
      }

      return this.form.rentPeriod === PERIODS.WEEKLY
        ? this.form.rent
        : this.form.rent / WEEKLY_FACTOR;
    },
    monthlyRentInPence() {
      if (!this.weeklyRent) {
        return null;
      }
      return this.form.rentPeriod === PERIODS.WEEKLY
        ? (this.weeklyRent * WEEKLY_FACTOR * 100).toFixed()
        : (this.form.rent * 100).toFixed();
    },
    membershipFee() {
      if (this.weeklyRent && this.feeConfig.fixedMembershipFee) {
        return this.fixedFee ? this.fixedFee : null;
      }

      return this.flexibleFee;
    },
    fixedFee() {
      const fee =
        this.feeConfig.fixedMembershipFeeAmount &&
        this.feeConfig.fixedMembershipFeeAmount / 100;
      return this.getRoundNumber(this.addVAT(fee));
    },
    flexibleFee() {
      if (!this.weeklyRent) {
        return 0;
      }

      const feeBasis = Math.max(MINIMUM_MEMBERSHIP_FEE, this.weeklyRent);

      return this.getRoundNumber(this.addVAT(feeBasis));
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
      this.$store
        .dispatch("CREATE_FLATBOND", {
          rent: this.monthlyRentInPence,
          postcode: this.form.postcode
        })
        .then(() => {
          this.$store.dispatch("SET_FEE", this.membershipFee);
          this.$router.push("/success");
        })
        .catch(() => {
          this.error = true;
        });
    },
    setRent(rentValue) {
      this.rent = rentValue;
      this.$v.form.rent.$model = this.rent;
      this.resetErrorMessage();
    },
    setPostcode(postcode) {
      this.postcode = postcode.toUpperCase();
      this.$v.form.postcode.$model = this.postcode;
      this.resetErrorMessage();
    },
    resetErrorMessage() {
      this.error = false;
    },
    addVAT(amount) {
      return amount * VAT_FACTOR;
    },
    getRoundNumber(number) {
      return parseInt(number.toFixed());
    }
  }
};
</script>

<style scoped lang="scss">
.create-flatbond-form {
  text-align: left;
  max-width: 480px;
  margin: auto;
}

.error {
  color: var(--red);
}

.btn {
  margin: 25px auto;
  display: block;
}

.membership-fee {
  font-family: "Lato", sans-serif;
  font-weight: 700;
  background: #f3f5f6;
  border-radius: 0.25rem;
  text-align: center;
  padding: 10px 50px;
}
</style>
