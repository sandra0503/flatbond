import { fetchConfig, createFlatbond } from "../api.js";

async function FETCH_CONFIG({ commit }) {
  try {
    const config = await fetchConfig();
    commit("SET_CONFIG", config);
  } catch (error) {
    console.log(error);
  }
}

function CREATE_FLATBOND({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      const status = await createFlatbond();
      console.log("actions.js: config", status);
      commit("SET_FLATBOND", status);
      resolve(status);
    } catch (error) {
      reject(error);
    }
  });
}

export default {
  FETCH_CONFIG,
  CREATE_FLATBOND
};
