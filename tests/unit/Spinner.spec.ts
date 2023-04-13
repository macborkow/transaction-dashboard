import { mount } from '@vue/test-utils';
import SpinnerComponent from '@/components/Spinner.vue';

describe('SpinnerComponent', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(SpinnerComponent);
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('noabs');
  });

  it('renders correctly with "abs" prop set to true', () => {
    const wrapper = mount(SpinnerComponent, {
      props: {
        abs: true,
      },
    });
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('abs');
  });

  it('renders correctly with "abs" prop set to false', () => {
    const wrapper = mount(SpinnerComponent, {
      props: {
        abs: false,
      },
    });
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('noabs');
  });
});
