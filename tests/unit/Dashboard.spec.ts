import { shallowMount } from '@vue/test-utils';
import DashboardView from '@/views/Dashboard.vue';

describe('DashboardView', () => {
  let wrapper: any;
  beforeEach(async () => {
    wrapper = shallowMount(DashboardView, {
      global: {
        mocks: {
          $auth0: {
            getAccessTokenSilently: () => Promise.resolve('fake-token'),
          },
        },
      },
    });
  });

  it('displays CustomerList by default', () => {
    expect(wrapper.findComponent({ name: 'CustomerList' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TransactionList' }).exists()).toBe(false);
  });

  it('displays TransactionList when showTransactions is true', async () => {
    await wrapper.setData({ showTransactions: true });
    expect(wrapper.findComponent({ name: 'CustomerList' }).exists()).toBe(false);
    expect(wrapper.findComponent({ name: 'TransactionList' }).exists()).toBe(true);
  });

  it('toggles showTransactions when button is clicked', async () => {
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.vm.showTransactions).toBe(true);
    await button.trigger('click');
    expect(wrapper.vm.showTransactions).toBe(false);
  });
});
