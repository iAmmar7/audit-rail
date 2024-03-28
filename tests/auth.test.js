import React from 'react';
import { Tabs } from 'antd';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Auth from '../src/pages/auth';
import { useAppContext } from '../src/contexts/AppContext';
import * as authService from '../src/services/auth';

jest.mock('../src/services/auth', () => ({
  signup: jest.fn(),
  login: jest.fn(),
}));


jest.mock('../src/contexts/AppContext', () => ({
  useAppContext: jest.fn(),
}));

describe('Auth Page', () => {
  beforeAll(() => {
    // Setup global mocks if necessary, like localStorage
  });

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup default behavior for the useAppContext mock
    useAppContext.mockImplementation(() => ({
      setUser: jest.fn(),
      setToken: jest.fn(),
    }));
  });

  it('initially renders the login form', () => {
    const wrapper = mount(<Auth />);
    expect(wrapper.find('LogIn').length).toBe(1);
    expect(wrapper.find('SignUp').length).toBe(0);
  });

  it('switches to the signup form when the signup tab is clicked', async () => {
    const wrapper = mount(<Auth />);
    await act(async () => {
      wrapper.find(Tabs).prop('onChange')('signup');
    });
    wrapper.update();
    expect(wrapper.find('SignUp').length).toBe(1);
    expect(wrapper.find('LogIn').length).toBe(0);
  });

  it('submits the login form and calls the login service', async () => {
    authService.login.mockResolvedValue({
      data: {
        success: true,
        message: 'Login successful',
      },
    });

    const wrapper = mount(<Auth />);
    await act(async () => {
      wrapper.find(Tabs).prop('onChange')('login');
    });
    wrapper.update();
  
    // Simulating user input for text inputs directly
    await act(async () => {
      wrapper.find('input[id="email"]').simulate('change', { target: { value: 'test@example.com', name: 'email' } });
      wrapper.find('input[id="password"]').simulate('change', { target: { value: 'password123', name: 'password' } });
    });
  
    // Submitting the form
    await act(async () => {
      wrapper.find('form').simulate('submit'); 
    });
  
    // Now you check if the API was called
    expect(authService.login).toHaveBeenCalledWith(expect.objectContaining({
      email: 'test@example.com',
      password: 'password123',
    }));
  });
  
});
