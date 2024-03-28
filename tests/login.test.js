import { mount } from 'enzyme';
import React from 'react';
import ProForm from '@ant-design/pro-form';
import { act } from 'react-dom/test-utils';
import LogIn from '../src/components/Auth/Login';

describe('LogIn Component', () => {
  it('updates input fields on change', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <ProForm>
          <LogIn styles={{ prefixIcon: 'test-prefix-icon' }} />
        </ProForm>
      );
    });

    wrapper.find('input[id="email"]').simulate('change', {
      target: { value: 'john.doe@example.com', name: 'email' },
    });
    wrapper.find('input[id="password"]').simulate('change', {
      target: { value: 'securepassword', name: 'password' },
    });

    expect(wrapper.find('input[id="email"]').props().value).toEqual(
      'john.doe@example.com',
    );
    expect(wrapper.find('input[id="password"]').props().value).toEqual(
      'securepassword',
    );
  });
});