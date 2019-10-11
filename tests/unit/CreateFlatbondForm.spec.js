import { shallowMount } from "@vue/test-utils";
import CreateFlatbondForm from "@/components/CreateFlatbondForm";

describe("CreateFlatbondForm", () => {
  const build = () => {
    const wrapper = shallowMount(CreateFlatbondForm);

    return {
      wrapper
    };
  };

  it("renders the component and matches snapshot", () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
