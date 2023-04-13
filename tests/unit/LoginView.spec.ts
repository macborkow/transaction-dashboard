import { mount, VueWrapper } from '@vue/test-utils';
import LoginView from '@/views/LoginView.vue';

describe('LoginView', () => {
  let wrapper: VueWrapper<any>;

  it('renders the Log in button if user is not authenticated and not loading', () => {
		const mockAuth0 = {
			user: {
				name: 'John Doe',
				email: 'john.doe@example.com',
			},
			isAuthenticated: false,
			isLoading: false,
			loginWithRedirect: jest.fn(),
			logout: jest.fn(),
		};

		wrapper = mount(LoginView, {
			global: {
				mocks: {
					$auth0: mockAuth0,
					$router: {
						push: jest.fn(),
					},
				},
			},
		});
    expect(wrapper.find('button').text()).toBe('Log in');
  });

  it('does not render the Log in button if user is not authenticated but is loading', () => {
		const mockAuth0 = {
			user: {
				name: 'John Doe',
				email: 'john.doe@example.com',
			},
			isAuthenticated: false,
			isLoading: true,
			loginWithRedirect: jest.fn(),
			logout: jest.fn(),
		};

		wrapper = mount(LoginView, {
			global: {
				mocks: {
					$auth0: mockAuth0,
					$router: {
						push: jest.fn(),
					},
				},
			},
		});
    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('renders the Log out button and user information if user is authenticated and not loading', () => {
		const mockAuth0 = {
			user: {
				name: 'John Doe',
				email: 'john.doe@example.com',
			},
			isAuthenticated: true,
			isLoading: false,
			loginWithRedirect: jest.fn(),
			logout: jest.fn(),
		};

		wrapper = mount(LoginView, {
			global: {
				mocks: {
					$auth0: mockAuth0,
					$router: {
						push: jest.fn(),
					},
				},
			},
		});
    expect(wrapper.find('button').text()).toBe('Log out');
    expect(wrapper.find('code').text()).toBe(JSON.stringify(mockAuth0.user, null, 2));
  });

  it('redirects to dashboard if user was previously loading and becomes authenticated', async () => {
		const mockAuth0 = {
			user: {
				name: 'John Doe',
				email: 'john.doe@example.com',
			},
			isAuthenticated: true,
			isLoading: false,
			loginWithRedirect: jest.fn(),
			logout: jest.fn(),
		};

		wrapper = mount(LoginView, {
			global: {
				mocks: {
					$auth0: mockAuth0,
					$router: {
						push: jest.fn(),
					},
				},
			},
		});
		wrapper.vm.wasLoading = true;
    wrapper.vm.$options.watch.isAuthenticated.call(wrapper.vm, true);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/dashboard');
  });

  it('calls loginWithRedirect when Log in button is clicked', async () => {
		const mockAuth0 = {
			user: {
				name: 'John Doe',
				email: 'john.doe@example.com',
			},
			isAuthenticated: false,
			isLoading: false,
			loginWithRedirect: jest.fn(),
			logout: jest.fn(),
		};

		wrapper = mount(LoginView, {
			global: {
				mocks: {
					$auth0: mockAuth0,
					$router: {
						push: jest.fn(),
					},
				},
			},
		});
    await wrapper.find('button').trigger('click');
    expect(mockAuth0.loginWithRedirect).toHaveBeenCalledWith({
      appState: {
        target: '/dashboard',
      },
    });
  });

  it('calls logout when Log out button is clicked', async () => {
		const mockAuth0 = {
			user: {
				name: 'John Doe',
				email: 'john.doe@example.com',
			},
			isAuthenticated: true,
			isLoading: false,
			loginWithRedirect: jest.fn(),
			logout: jest.fn(),
		};

		wrapper = mount(LoginView, {
			global: {
				mocks: {
					$auth0: mockAuth0,
					$router: {
						push: jest.fn(),
					},
				},
			},
		});
    await wrapper.find('button').trigger('click');
    expect(mockAuth0.logout).toHaveBeenCalledWith({ logoutParams: { returnTo: window.location.origin } });
  });
});
