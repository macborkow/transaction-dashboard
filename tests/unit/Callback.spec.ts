import { mount } from '@vue/test-utils';
import CallbackView from '@/views/Callback.vue';
import Spinner from '@/components/Spinner.vue';

describe('CallbackView', () => {
  it('renders the Spinner component', () => {
    const wrapper = mount(CallbackView);

    expect(wrapper.findComponent(Spinner).exists()).toBe(true);
  });
});
