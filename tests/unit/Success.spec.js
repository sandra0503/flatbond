import { shallowMount, createLocalVue } from "@vue/test-utils";
import Success from "@/views/Success";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Success view", () => {
  let state;

  const build = () => {
    const wrapper = shallowMount(Success, {
      localVue,
      store: new Vuex.Store({
        state
      })
    });

    return {
      wrapper,
      rentValue: () => wrapper.find(".rentValue"),
      postcodeValue: () => wrapper.find(".postcodeValue"),
      feeValue: () => wrapper.find(".feeValue")
    };
  };

  beforeEach(() => {
    state = { rent: 20000, postcode: "WC2N 5DU", fee: 144 };
  });

  it("renders the component and matches snapshot", () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders main content elements", () => {
    const { rentValue, postcodeValue, feeValue } = build();
    expect(rentValue().exists()).toBe(true);
    expect(postcodeValue().exists()).toBe(true);
    expect(feeValue().exists()).toBe(true);
  });

  it("formats the rent value correctly", () => {
    const { rentValue } = build();
    expect(rentValue().text()).toBe("200.00 £");
  });
});
