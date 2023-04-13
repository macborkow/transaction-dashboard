import { mount } from '@vue/test-utils';
import ErrorComponent from '@/components/Error.vue';

describe('ErrorComponent', () => {
  it('renders error message correctly', () => {
    const message = 'This is an error message.';
    const wrapper = mount(ErrorComponent, {
      props: {
        message,
      },
    });
    expect(wrapper.text()).toContain(message);
  });

  it('emits router push event when button is clicked', () => {
    const message = 'This is an error message.';
    const $router = {
      push: jest.fn(),
    };
    const wrapper = mount(ErrorComponent, {
      global: {
        mocks: {
          $router,
        },
      },
      props: {
        message,
      },
    });
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/');
  });
});
