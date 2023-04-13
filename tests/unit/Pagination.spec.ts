import { mount } from '@vue/test-utils';
import PaginationComponent from '@/components/Pagination.vue';

describe('PaginationComponent', () => {
  let wrapper: any;

  beforeEach(() => {
    const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    wrapper = mount(PaginationComponent, {
      props: {
        data,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders a nav tag if lastPage > 0', () => {
    expect(wrapper.find('nav').exists()).toBe(true);
  });

  it('emits a "truncated" event when data prop changes', async () => {
    const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
    await wrapper.setProps({ data });
    expect(wrapper.emitted('truncated')).toBeTruthy();
  });

  it('displays the correct number of rows based on the selected amountRows', async () => {
    const select = wrapper.find('select');
    await select.setValue('10');
    expect(wrapper.vm.numberOfRows).toBe(10);
    expect(wrapper.vm.visibleData).toHaveLength(10);
  });

  it('changes the current page when changePage method is called', async () => {
    const select = wrapper.find('select');
    await select.setValue('5');
    expect(wrapper.vm.currentPage).toBe(0);
    await wrapper.vm.changePage(1);
    expect(wrapper.vm.currentPage).toBe(1);
  });

  it('does not change the current page when changePage method is called with an out of bounds value', async () => {
    await wrapper.vm.changePage(-1);
    expect(wrapper.vm.currentPage).toBe(0);
    await wrapper.vm.changePage(100);
    expect(wrapper.vm.currentPage).toBe(wrapper.vm.lastPage);
  });

  it('displays the correct quick navigation pages', async () => {
    const data = Array.from(Array(100).keys());
    await wrapper.setProps({ data });
    await wrapper.vm.changePage(2);
    expect(wrapper.vm.quickNavigationPages).toEqual([0, 1, 2, 3, 4]);
    await wrapper.vm.changePage(6, false);
    expect(wrapper.vm.quickNavigationPages).toEqual([4, 5, 6, 7, 8]);
    await wrapper.vm.changePage(-2);
    expect(wrapper.vm.quickNavigationPages).toEqual([2, 3, 4, 5, 6]);
  });
});
