export default {
  SET_CONFIG(state, config) {
    state.feeConfig = config;
  },
  SET_RENT(state, rent) {
    state.rent = rent;
  },
  SET_POSTCODE(state, postcode) {
    state.postcode = postcode;
  },
  SET_FEE(state, fee) {
    state.fee = fee;
  }
};
