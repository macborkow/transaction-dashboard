import { shallowMount } from '@vue/test-utils';
import CustomerList from '@/components/CustomerList.vue';
import { Customer } from '@/common/types';
import apiCall from '@/services/api.service';

jest.mock('@/services/api.service');

describe('CustomerList component', () => {
  let wrapper: any;
  const customers: Array<Customer> = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com' },
  ];

  beforeEach(async () => {
    (apiCall as any).mockImplementation(() => Promise.resolve(
      {
        data: customers,
        error: null,
      },
    ));
    wrapper = shallowMount(CustomerList, {
      global: {
        mocks: {
          $auth0: {
            getAccessTokenSilently: () => Promise.resolve('fake-token'),
          },
        },
      },
    });

    await wrapper.vm.$nextTick();
  });

  it('should render CustomerSearch component', () => {
    expect(wrapper.findComponent({ name: 'CustomerSearch' }).exists()).toBeTruthy();
  });

  it('should render Table component if customers array is not empty', async () => {
    expect(wrapper.findComponent({ name: 'Table' }).exists()).toBeTruthy();
    await wrapper.setData({
      customers: [],
    });
    expect(wrapper.findComponent({ name: 'Table' }).exists()).toBeFalsy();
  });

  it('should render Spinner component if customers array is empty and error is falsy', async () => {
    expect(wrapper.findComponent({ name: 'Spinner' }).exists()).toBeFalsy();
    await wrapper.setData({
      customers: [],
    });
    expect(wrapper.findComponent({ name: 'Spinner' }).exists()).toBeTruthy();
  });

  it('should render Error component if error is truthy', async () => {
    expect(wrapper.findComponent({ name: 'Error' }).exists()).toBeFalsy();
    await wrapper.setData({
      error: 'An error occurred',
    });
    expect(wrapper.findComponent({ name: 'Error' }).exists()).toBeTruthy();
  });

  it('should update filteredCustomers data when CustomerSearch emits "filtered" event', async () => {
    const filteredData: Array<Customer> = [
      {
        id: '1',
        email: 'email@foo',
        name: 'foo',
      },
    ];
    await wrapper.findComponent({ name: 'CustomerSearch' }).vm.$emit('filtered', filteredData);
    expect(wrapper.vm.$data.filteredCustomers).toEqual(filteredData);
  });

  it('should set customers data correctly when fetchCustomers is called', async () => {
    await wrapper.vm.fetchCustomers();
    expect(wrapper.vm.$data.customers).toEqual(customers);
  });
  it('should set error data correctly when an error occurs during fetchCustomers', async () => {
    const error = 'An error occurred';
    (apiCall as any).mockImplementation(() => Promise.resolve(
      {
        data: null,
        error,
      },
    ));
    await wrapper.vm.fetchCustomers();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.error).toEqual(error);
  });
  it('should set error data to "" when no error occurs during fetchTransactions', async () => {
    await wrapper.vm.fetchCustomers();
    expect(wrapper.vm.$data.error).toEqual('');
  });
});
