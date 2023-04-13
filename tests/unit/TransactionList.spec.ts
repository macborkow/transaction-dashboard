import { shallowMount } from '@vue/test-utils';
import TransactionList from '@/components/TransactionList.vue';
import { Transaction } from '@/common/types';
import apiCall from '@/services/api.service';

jest.mock('@/services/api.service');

describe('TransactionList component', () => {
  let wrapper: any;
  const transactions: Array<Transaction> = [
    {
      id: '1',
      customerId: '1',
      date: '2022-01-01',
      amount: 100,
      description: 'foo',
    },
    {
      id: '2',
      customerId: '2',
      date: '2022-01-02',
      amount: 200,
      description: 'foo',
    },
  ];

  beforeEach(async () => {
    (apiCall as any).mockImplementation(() => Promise.resolve(
      {
        data: transactions,
        error: null,
      },
    ));
    wrapper = shallowMount(TransactionList, {
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

  it('should render DateFilter component', () => {
    expect(wrapper.findComponent({ name: 'DateFilter' }).exists()).toBeTruthy();
  });

  it('should render AmountFilter component', () => {
    expect(wrapper.findComponent({ name: 'AmountFilter' }).exists()).toBeTruthy();
  });

  it('should render Table component if transactions array is not empty', async () => {
    expect(wrapper.findComponent({ name: 'Table' }).exists()).toBeTruthy();
    await wrapper.setData({
      transactions: [],
    });
    expect(wrapper.findComponent({ name: 'Table' }).exists()).toBeFalsy();
  });

  it('should render Spinner component if transactions array is empty and error is falsy', async () => {
    expect(wrapper.findComponent({ name: 'Spinner' }).exists()).toBeFalsy();
    await wrapper.setData({
      transactions: [],
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

  it('should update dateFilteredTransactions data when DateFilter emits "filtered" event', async () => {
    const filteredData: Array<Transaction> = [
      {
        id: '1',
        customerId: '1',
        date: '2022-01-01',
        amount: 100,
        description: 'foo',
      },
    ];
    await wrapper.findComponent({ name: 'DateFilter' }).vm.$emit('filtered', filteredData);
    expect(wrapper.vm.$data.dateFilteredTransactions).toEqual(filteredData);
  });

  it('should update amountFilteredTransactions data when AmountFilter emits "filtered" event', async () => {
    const filteredData: Array<Transaction> = [
      {
        id: '1',
        customerId: '1',
        date: '2022-01-01',
        amount: 100,
        description: 'foo',
      },
    ];
    await wrapper.findComponent({ name: 'AmountFilter' }).vm.$emit('filtered', filteredData);
    expect(wrapper.vm.$data.amountFilteredTransactions).toEqual(filteredData);
  });
  it('should set transactions data correctly when fetchTransactions is called', async () => {
    await wrapper.vm.fetchTransactions();
    expect(wrapper.vm.$data.transactions).toEqual(transactions);
  });
  it('should set error data correctly when an error occurs during fetchTransactions', async () => {
    const error = 'An error occurred';
    (apiCall as any).mockImplementation(() => Promise.resolve(
      {
        data: null,
        error,
      },
    ));
    await wrapper.vm.fetchTransactions();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.error).toEqual(error);
  });
  it('should set error data to "" when no error occurs during fetchTransactions', async () => {
    await wrapper.vm.fetchTransactions();
    expect(wrapper.vm.$data.error).toEqual('');
  });
});
