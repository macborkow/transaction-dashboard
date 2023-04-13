import { createRouter, createWebHistory } from 'vue-router';
import { shallowMount } from '@vue/test-utils';
import BaseLayout from '@/App.vue';

describe('BaseLayout', () => {
  let wrapper : any;
  const isAuthenticated = true;
  const isLoading = false;

	const router = createRouter({
		history: createWebHistory(),
		routes: [{ path: '/', name: 'home', component: BaseLayout }] as any,
	});

  beforeEach(() => {
    const $auth0 = {
      isAuthenticated,
      isLoading,
    };
    const $route = {
      name: 'dashboard',
    };

    wrapper = shallowMount(BaseLayout as any, {
      global: {
        mocks: {
          $auth0,
          $route,
        },
				plugins: [router],
      },
    });
  });

  it('renders nav if checkRoute and not isLoading', () => {
    expect(wrapper.find('nav').exists()).toBe(true);
  });

  it('does not render nav if checkRoute is false', async () => {
    const $auth0 = {
      isAuthenticated,
      isLoading,
    };
    const $route = {
      name: 'wrong',
    };

    wrapper = shallowMount(BaseLayout as any, {
      global: {
        mocks: {
          $auth0,
          $route,
        },
				plugins: [router],
      },
    });
    expect(wrapper.find('nav').exists()).toBe(false);
  });

  it('does not render nav if isLoading is true', () => {
    const $auth0 = {
      isAuthenticated,
      isLoading: true,
    };
    const $route = {
      name: 'dashboard',
    };

    wrapper = shallowMount(BaseLayout as any, {
      global: {
        mocks: {
          $auth0,
          $route,
        },
				plugins: [router],
      },
    });
    expect(wrapper.find('nav').exists()).toBe(false);
  });

  it('renders both links if isAuthenticated is true', () => {
    const navLinks = wrapper.findAll('nav span router-link-stub');
    expect(navLinks).toHaveLength(2);
  });

  it('does not render dashboard and user info links if isAuthenticated is false', () => {
    const $auth0 = {
      isAuthenticated: false,
      isLoading,
    };
    const $route = {
      name: 'dashboard',
    };

    wrapper = shallowMount(BaseLayout as any, {
      global: {
        mocks: {
          $auth0,
          $route,
        },
				plugins: [router],
      },
    });
    wrapper.setData({ checkRoute: true, isAuthenticated: false });
    expect(wrapper.findAll('nav span router-link-stub')).toHaveLength(0);
  });

  it('renders Spinner if isLoading is true', () => {
    const $auth0 = {
      isAuthenticated,
      isLoading: true,
    };
    const $route = {
      name: 'dashboard',
    };

    wrapper = shallowMount(BaseLayout as any, {
      global: {
        mocks: {
          $auth0,
          $route,
        },
				plugins: [router],
      },
    });
    wrapper.setData({ checkRoute: true, isLoading: true });
    expect(wrapper.findComponent({ name: 'Spinner' }).exists()).toBe(true);
  });

  it('renders router-view', () => {
    expect(wrapper.findComponent({ name: 'router-view' }).exists()).toBe(true);
  });
});
