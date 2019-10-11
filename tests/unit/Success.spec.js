import { shallowMount } from "@vue/test-utils";
import Success from "@/views/Success";

describe("Create view", () => {
  const build = () => {
    const wrapper = shallowMount(Success);

    return {
      wrapper
    };
  };

  it("renders the component and matches snapshot", () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
