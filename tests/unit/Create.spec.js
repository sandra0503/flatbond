import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Create from "@/views/Create";
import CreateFlatbondForm from "@/components/CreateFlatbondForm";
import initialState from "@/store/state";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Create view", () => {
  let state;

  const build = () => {
    const wrapper = shallowMount(Create, {
      localVue,
      store: new Vuex.Store({
        state,
        actions: {
          FETCH_CONFIG: jest.fn()
        }
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
});
