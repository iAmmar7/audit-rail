import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import React from 'react';
import ProForm from '@ant-design/pro-form';
import SignUp from '../src/components/Auth/Signup';

describe('SignUp Component', () => {
  it('updates input fields on change', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <ProForm>
          <SignUp styles={{ prefixIcon: 'test-prefix-icon' }} />
        </ProForm>
      );
    });

    wrapper.find('input[id="name"]').simulate('change', {
      target: { value: 'John Doe', name: 'name' },
    });
    wrapper.find('input[id="email"]').simulate('change', {
      target: { value: 'john.doe@example.com', name: 'email' },
    });
    wrapper.find('input[id="password"]').simulate('change', {
      target: { value: 'securepassword', name: 'password' },
    });

    expect(wrapper.find('input[id="name"]').props().value).toEqual(
      'John Doe',
    );
    expect(wrapper.find('input[id="email"]').props().value).toEqual(
      'john.doe@example.com',
    );
    expect(wrapper.find('input[id="password"]').props().value).toEqual(
      'securepassword',
    );
  });
});
