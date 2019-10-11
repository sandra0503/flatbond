import { shallowMount } from "@vue/test-utils";
import Create from "@/views/Create";
import CreateFlatbondForm from "@/components/CreateFlatbondForm";

describe("Create view", () => {
  const build = () => {
    const wrapper = shallowMount(Create);

    return {
      wrapper,
      createFlatbondForm: () => wrapper.find(CreateFlatbondForm)
    };
  };

  it("renders the component and matches snapshot", () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders child components", () => {
    const { createFlatbondForm } = build();

    expect(createFlatbondForm().exists()).toBe(true);
  });
});
