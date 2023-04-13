import { mount } from '@vue/test-utils';
import NotFound from '@/views/404.vue';

describe('NotFound', () => {
  it('should render a heading with the text "Path not found."', () => {
    const wrapper = mount(NotFound);
    expect(wrapper.find('h2').text()).toBe('Path not found.');
  });

});
