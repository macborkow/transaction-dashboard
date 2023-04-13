import { shallowMount } from '@vue/test-utils';
import TableComponent from '@/components/Table.vue';

describe('TableComponent', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(TableComponent, {
      props: {
        data: [
          { id: 1, name: 'John Doe', age: 25 },
          { id: 2, name: 'Jane Doe', age: 30 },
        ],
        title: 'Test Table',
        sortable: true,
      },
    });
  });

  it('renders a table with proper headers', () => {
    expect(wrapper.find('table')).toBeTruthy();
    expect(wrapper.find('thead th:first-child span').text()).toEqual('Id');
    expect(wrapper.findAll('thead th').length).toEqual(3);
    expect(wrapper.find('thead th:first-child span').text()).toEqual('Id');
    expect(wrapper.find('thead th:nth-child(2) span').text()).toEqual('Name');
    expect(wrapper.find('thead th:last-child span').text()).toEqual('Age');
  });

  it('renders the data rows in the table body', async () => {
    await wrapper.findComponent({ name: 'Pagination' }).vm.$emit('truncated', wrapper.vm.data);
    expect(wrapper.findAll('tbody tr').length).toEqual(2);
    expect(wrapper.find('tbody tr:first-child td:first-child').text()).toEqual('1');
    expect(wrapper.find('tbody tr:last-child td:nth-child(2)').text()).toEqual('Jane Doe');
    expect(wrapper.find('tbody tr:last-child td:last-child').text()).toEqual('30');
  });

  it('sorts the data when header is clicked', async () => {
    await wrapper.find('thead th:last-child button').trigger('click');
    expect(wrapper.vm.sortTarget).toEqual(2);
    expect(wrapper.vm.sortDescending).toEqual(0);
    expect(wrapper.vm.refinedData[0]).toEqual({ id: 1, name: 'John Doe', age: 25 });
    expect(wrapper.vm.refinedData[1]).toEqual({ id: 2, name: 'Jane Doe', age: 30 });

    await wrapper.find('thead th:last-child button').trigger('click');
    expect(wrapper.vm.sortTarget).toEqual(2);
    expect(wrapper.vm.sortDescending).toEqual(1);
    expect(wrapper.vm.refinedData[0]).toEqual({ id: 2, name: 'Jane Doe', age: 30 });
    expect(wrapper.vm.refinedData[1]).toEqual({ id: 1, name: 'John Doe', age: 25 });

    await wrapper.find('thead th:last-child button').trigger('click');
    expect(wrapper.vm.sortTarget).toEqual(-1);
    expect(wrapper.vm.sortDescending).toEqual(-1);
    expect(wrapper.vm.refinedData[0]).toEqual({ id: 1, name: 'John Doe', age: 25 });
    expect(wrapper.vm.refinedData[1]).toEqual({ id: 2, name: 'Jane Doe', age: 30 });

    // also testing sorting on strings
    await wrapper.find('thead th:nth-child(2) button').trigger('click');
    expect(wrapper.vm.sortTarget).toEqual(1);
    expect(wrapper.vm.sortDescending).toEqual(0);
    expect(wrapper.vm.refinedData[0]).toEqual({ id: 2, name: 'Jane Doe', age: 30 });
    expect(wrapper.vm.refinedData[1]).toEqual({ id: 1, name: 'John Doe', age: 25 });
  });

  it('updates the data when pagination is triggered', async () => {
    const data = [
      { id: 3, name: 'Bob Smith', age: 35 },
      { id: 4, name: 'Alice Johnson', age: 40 },
    ];
    await wrapper.setProps({ data });

    expect(wrapper.vm.truncatedData).toEqual([]);
    await wrapper.findComponent({ name: 'Pagination' }).vm.$emit('truncated', [
      { id: 3, name: 'Bob Smith', age: 35 },
    ]);
    expect(wrapper.vm.truncatedData).toEqual([{ id: 3, name: 'Bob Smith', age: 35 }]);
  });
});
