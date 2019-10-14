import { fetchConfig, createFlatbond } from "../api.js";

async function FETCH_CONFIG({ commit }) {
  try {
    const config = await fetchConfig();
    commit("SET_CONFIG", config);
  } catch (error) {
    console.log(error);
  }
}

function CREATE_FLATBOND({ commit }, flatbondData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await createFlatbond(flatbondData);
      const { status } = response;
      if (status && status === "created") {
        const { rent, postcode } = flatbondData;
        commit("SET_RENT", rent);
        commit("SET_POSTCODE", postcode);
        resolve(status);
      }
    } catch (error) {
      reject(error);
    }
  });
}

function SET_FEE({ commit }, fee) {
  commit("SET_FEE", fee);
}

export default {
  FETCH_CONFIG,
  CREATE_FLATBOND,
  SET_FEE
};
