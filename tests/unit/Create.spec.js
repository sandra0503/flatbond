jest.mock("@/store/actions");
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Create from "@/views/Create";
import CreateFlatbondForm from "@/components/CreateFlatbondForm";
import initialState from "@/store/state";
import actions from "@/store/actions";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Create view", () => {
  let state;

  const build = () => {
    const wrapper = shallowMount(Create, {
      localVue,
      store: new Vuex.Store({
        state,
        actions
      })
    });

    return {
      wrapper,
      createFlatbondForm: () => wrapper.find(CreateFlatbondForm)
    };
  };

  beforeEach(() => {
    state = { ...initialState };
  });

  it("renders the component and matches snapshot", () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("does not render the form component when config is not present", () => {
    const { createFlatbondForm } = build();

    expect(createFlatbondForm().exists()).toBe(false);
  });

  it("renders the form component", () => {
    state.feeConfig = {
      fixedMembershipFee: false,
      fixedMembershipFeeAmount: "12000"
    };

    const { createFlatbondForm } = build();

    expect(createFlatbondForm().exists()).toBe(true);
  });

  it("fetches the configuration", () => {
    expect(actions.FETCH_CONFIG).toHaveBeenCalled();
  });

  it("creates flatbond when received 'submitted'", () => {
    state.feeConfig = {
      fixedMembershipFee: false,
      fixedMembershipFeeAmount: "12000"
    };

    const { createFlatbondForm } = build();

    const flatbondData = {
      rent: 20000,
      postcode: "WC2N 5DU",
      fee: 137
    };

    createFlatbondForm().vm.$emit("submitted", flatbondData);

    expect(actions.CREATE_FLATBOND).toHaveBeenCalled();
    expect(actions.CREATE_FLATBOND.mock.calls[0][1]).toEqual({
      rent: 20000,
      postcode: "WC2N 5DU"
    });
  });
});
