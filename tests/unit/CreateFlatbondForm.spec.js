import { mount, createLocalVue } from "@vue/test-utils";
import CreateFlatbondForm from "@/components/CreateFlatbondForm";
import Vuelidate from "vuelidate";

const localVue = createLocalVue();

localVue.use(Vuelidate);

describe("CreateFlatbondForm", () => {
  const build = () => {
    const wrapper = mount(CreateFlatbondForm, { localVue });

    return {
      wrapper,
      rentInput: () => wrapper.find("#rent-input"),
      postcodeInput: () => wrapper.find("#postcode-input"),
      submitButton: () => wrapper.find(".btn.btn-primary")
    };
  };

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
});
