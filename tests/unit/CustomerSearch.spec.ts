import { shallowMount } from '@vue/test-utils';
import CustomerSearch from '@/components/CustomerSearch.vue';

describe('CustomerSearch.vue', () => {
  let wrapper: any;

  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    },
  ];

  beforeEach(() => {
    wrapper = shallowMount(CustomerSearch as any, {
      props: {
        data: customers,
      },
    });
  });

  it('renders input field', () => {
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
  });

  it('emits "filtered" event with filtered data', async () => {
    const input = wrapper.find('input');
    await input.setValue('john');
    expect(wrapper.emitted('filtered')).toBeTruthy();
    expect(wrapper.emitted('filtered')![0]).toEqual([
      [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      ],
    ]);
  });

  it('shows all data when search field is empty', () => {
    expect(wrapper.vm.filteredData).toEqual(customers);
  });

  it('filters data by name or email', async () => {
    const input = wrapper.find('input');
    await input.setValue('jane');
    expect(wrapper.vm.filteredData).toEqual([
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      },
    ]);
  });
});
