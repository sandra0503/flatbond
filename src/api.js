import axios from "axios";
import httpAdapter from "axios/lib/adapters/http";

const instance = axios.create({
  baseURL: "https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production",
  adapter: httpAdapter
});

export async function fetchConfig() {
  let feeConfig = {};

  await instance
    .get("/config")
    .then(result => {
      Object.assign(feeConfig, {
        fixedMembershipFee: result.data.fixed_membership_fee,
        fixedMembershipFeeAmount: result.data.fixed_membership_fee_amount
      });
      return feeConfig;
    })
    .catch(err => console.log(err));

  return feeConfig;
}

export async function createFlatbond(rent, postcode) {
  let status;

  await instance
    .post("/flatbond", {
      rent: rent,
      postcode: postcode
    })
    .then(result => {
      status = result.data;
    })
    .catch(err => console.log(err));

  return status;
}
