import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuelidate from "vuelidate";
import CreateFlatbondForm from "@/components/CreateFlatbondForm";
import initialState from "@/store/state";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuelidate);

describe("CreateFlatbondForm", () => {
  let state;

  const build = () => {
    const wrapper = mount(CreateFlatbondForm, {
      localVue,
      store: new Vuex.Store({ state })
    });

    return {
      wrapper,
      rentInput: () => wrapper.find("#rent-input"),
      postcodeInput: () => wrapper.find("#postcode-input"),
      submitButton: () => wrapper.find(".btn.btn-primary")
    };
  };

  beforeEach(() => {
    state = { ...initialState };
  });

  it("renders the component and matches snapshot", () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders main content elements", () => {
    const { rentInput, postcodeInput, submitButton } = build();
    expect(rentInput().exists()).toBe(true);
    expect(postcodeInput().exists()).toBe(true);
    expect(submitButton().exists()).toBe(true);
  });

  it("disables the button initially", () => {
    const { submitButton } = build();

    expect(submitButton().classes()).toContain("disabled");
  });

  it("should mark rent as invalid when rent is zero", async () => {
    const { wrapper, rentInput } = build();

    rentInput().vm.$emit("input", "0");
    wrapper.vm.$forceUpdate();

    expect(rentInput().classes()).toContain("is-invalid");
  });

  it("should mark rent as invalid when input is other than numeric", async () => {
    const { wrapper, rentInput } = build();

    rentInput().vm.$emit("input", "ABC");
    wrapper.vm.$forceUpdate();

    expect(rentInput().classes()).toContain("is-invalid");
  });

  it("should mark rent as valid for valid input", () => {
    const { wrapper, rentInput } = build();
    rentInput().vm.$emit("input", "300");
    wrapper.vm.$forceUpdate();

    expect(rentInput().classes()).toContain("is-valid");
  });

  it("should mark postcode as invalid", async () => {
    const { wrapper, postcodeInput } = build();

    postcodeInput().vm.$emit("input", "AB");
    wrapper.vm.$forceUpdate();

    expect(postcodeInput().classes()).toContain("is-invalid");
  });

  it("should mark postcode as valid for valid input", () => {
    const { wrapper, postcodeInput } = build();
    postcodeInput().vm.$emit("input", "WC2N 5DU");
    wrapper.vm.$forceUpdate();

    expect(postcodeInput().classes()).toContain("is-valid");
  });

  it("enables the button for valid input of rent and postcode", () => {
    const { wrapper, rentInput, postcodeInput, submitButton } = build();
    rentInput().vm.$emit("input", "300");
    postcodeInput().vm.$emit("input", "WC2N 5DU");
    wrapper.vm.$forceUpdate();

    expect(submitButton().classes()).not.toContain("disabled");
  });

  describe("membership fee calculation", () => {
    it("returns a number", () => {
      const { wrapper } = build();
      expect(typeof wrapper.vm.membershipFee).toBe("number");
    });

    it("returns zero when no rent is put in", () => {
      const { wrapper } = build();
      expect(wrapper.vm.membershipFee).toBe(0);
    });

    it("returns zero when no rent is put in", () => {
      const { wrapper } = build();
      expect(wrapper.vm.membershipFee).toBe(0);
    });

    it("returns zero when input is invalid", () => {
      const { wrapper, rentInput } = build();

      rentInput().vm.$emit("input", "abc2323");
      expect(wrapper.vm.membershipFee).toBe(0);
    });

    it("returns zero when input is invalid", () => {
      const { wrapper, rentInput } = build();

      rentInput().vm.$emit("input", "12.12");
      expect(wrapper.vm.membershipFee).toBe(0);
    });

    it("returns the fixed membership fee when fixed fee is true", () => {
      state.feeConfig = {
        fixedMembershipFee: true,
        fixedMembershipFeeAmount: "12000"
      };
      const { wrapper, rentInput } = build();

      rentInput().vm.$emit("input", "500");

      expect(wrapper.vm.membershipFee).toBe(144);
    });

    it("returns variable membership fee when fixed fee is false", () => {
      state.feeConfig = {
        fixedMembershipFee: false,
        fixedMembershipFeeAmount: "12000"
      };
      const { wrapper, rentInput } = build();

      rentInput().vm.$emit("input", "600");
      wrapper.vm.form.rentPeriod = "monthly";

      expect(wrapper.vm.membershipFee).toBe(166);
    });

    it("returns the minimum membership fee", () => {
      const { wrapper, rentInput } = build();

      rentInput().vm.$emit("input", "1");
      expect(wrapper.vm.membershipFee).toBe(144);
    });

    it("returns the correct membership fee for monthly rent 1257", () => {
      const { wrapper, rentInput } = build();

      wrapper.vm.form.rentPeriod = "monthly";

      rentInput().vm.$emit("input", "1257");
      expect(wrapper.vm.membershipFee).toBe(348);
    });

    it("returns the correct membership fee", () => {
      const { wrapper, rentInput } = build();

      wrapper.vm.form.rentPeriod = "monthly";

      rentInput().vm.$emit("input", "1500");
      expect(wrapper.vm.membershipFee).toBe(415);
    });

    it("returns the correct membership fee", () => {
      const { wrapper, rentInput } = build();

      wrapper.vm.form.rentPeriod = "monthly";

      rentInput().vm.$emit("input", "9999");
      expect(wrapper.vm.membershipFee).toBe(2769);
    });
  });
});
