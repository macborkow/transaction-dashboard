import { mount } from '@vue/test-utils';
import DateFilter from '@/components/DateFilter.vue';
import { Transaction } from '@/common/types';

describe('DateFilter', () => {
  const transactions: Transaction[] = [
    {
      id: '1', date: '2022-04-12T00:00:00.000Z', amount: 100, customerId: '', description: '',
    },
    {
      id: '2', date: '2022-04-06T00:00:00.000Z', amount: 200, customerId: '', description: '',
    },
    {
      id: '3', date: '2022-04-02T00:00:00.000Z', amount: 300, customerId: '', description: '',
    },
  ];

  it('filters data based on date range', async () => {
    const wrapper = mount(DateFilter, {
      props: { data: transactions },
    });

    // Set the filter dates to exclude the middle transaction
    await wrapper.find('input[type="date"].from').setValue('2022-04-03');
    await wrapper.vm.$nextTick();
    await wrapper.find('input[type="date"].until').setValue('2022-04-07');
    await wrapper.vm.$nextTick();

    // Assert that only selected entries are emitted.
    // First take the initial emission which leaves until empty thus settings it to infinity,
    // then with a proper until value.
    expect(wrapper.emitted('filtered')![0][0]).toHaveLength(2);
    expect(wrapper.emitted('filtered')![0][0]).toEqual([
      {
        id: '1', date: '2022-04-12T00:00:00.000Z', amount: 100, customerId: '', description: '',
      },
      {
        id: '2', date: '2022-04-06T00:00:00.000Z', amount: 200, customerId: '', description: '',
      },
    ]);
    expect(wrapper.emitted('filtered')![1][0]).toHaveLength(1);
    expect(wrapper.emitted('filtered')![1][0]).toEqual([
      {
        id: '2', date: '2022-04-06T00:00:00.000Z', amount: 200, customerId: '', description: '',
      },
    ]);
  });

  it('displays an error message when "from" date is later than "until" date', async () => {
    const wrapper = mount(DateFilter, {
      props: { data: transactions },
    });

    // Set the filter dates to be in the wrong order
    await wrapper.find('input[type="date"].from').setValue('2022-04-15');
    await wrapper.find('input[type="date"].until').setValue('2022-04-14');

    // Assert that the error message is displayed
    expect(wrapper.find('p').text()).toBe('Date from must be earlier than date until');
  });

  it('does not display an error message when dates are in the correct order', async () => {
    const wrapper = mount(DateFilter, {
      props: { data: transactions },
    });

    // Set the filter dates to be in the correct order
    await wrapper.find('input[type="date"].from').setValue('2022-04-10');
    await wrapper.find('input[type="date"].until').setValue('2022-04-12');

    // Assert that no error message is displayed
    expect(wrapper.find('p').text()).toBe('');
  });
});
