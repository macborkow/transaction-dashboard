import { mount } from '@vue/test-utils';
import AmountFilter from '@/components/AmountFilter.vue';
import { Transaction } from '@/common/types';

describe('AmountFilter', () => {
  let wrapper: any;
  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2023-01-01',
      amount: 100,
      description: 'Transaction 1',
    },
    {
      id: '2',
      date: '2023-02-01',
      amount: 200,
      description: 'Transaction 2',
    },
    {
      id: '3',
      date: '2023-03-01',
      amount: 300,
      description: 'Transaction 3',
    },
  ];

  beforeEach(() => {
    wrapper = mount(AmountFilter, {
      props: {
        data: transactions,
      },
    });
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('emits filtered data when input values change', async () => {
    wrapper.find('input[type="number"]').setValue(50);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().filtered).toBeTruthy();
    expect(wrapper.emitted().filtered[0][0].length).toBe(3);
    expect(wrapper.emitted().filtered[0][0]).toEqual(transactions);
  });

  it('handles different scenarios properly', async () => {
    wrapper.find('input[type="number"]').setValue(0);
    await wrapper.vm.$nextTick();
    wrapper.findAll('input[type="number"]').at(1).setValue(250);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().filtered).toBeTruthy();
    expect(wrapper.emitted().filtered[1][0].length).toBe(2);
    expect(wrapper.emitted().filtered[1][0]).toEqual(transactions.slice(0, 2));
    wrapper.find('input[type="number"]').setValue(250);
    await wrapper.vm.$nextTick();
    wrapper.findAll('input[type="number"]').at(1).setValue(null);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().filtered).toBeTruthy();
    expect(wrapper.emitted().filtered[3][0].length).toBe(1);
    expect(wrapper.emitted().filtered[3][0]).toEqual(transactions.slice(2));
  });

  it('does not filter data when "from" input value is greater than "to" input value', async () => {
    wrapper.find('input[type="number"]').setValue(300);
    wrapper.findAll('input[type="number"]').at(1).setValue(200);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().filtered).toBeTruthy();
    expect(wrapper.emitted().filtered[0][0].length).toBe(0);
  });

  it('shows an error message when "from" input value is greater than "to" input value', async () => {
    wrapper.find('input[type="number"]').setValue(300);
    wrapper.findAll('input[type="number"]').at(1).setValue(200);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('p').text()).toBe('First amount must be lower than second amount.');
  });
});
