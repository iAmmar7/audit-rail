import React from 'react';
import { LockTwoTone, MailOutlined, UserOutlined } from '@ant-design/icons';
import { ProFormSelect, ProFormText } from '@ant-design/pro-form';

export default function SignUp({ styles }) {
  return (
    <>
      <ProFormText
        type="text"
        name="name"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={styles.prefixIcon} />,
        }}
        placeholder="Enter your name"
        rules={[
          {
            required: true,
            message: 'Name is required',
          },
        ]}
      />
      <ProFormText
        type="email"
        name="email"
        fieldProps={{
          size: 'large',
          prefix: <MailOutlined className={styles.prefixIcon} />,
        }}
        placeholder="Enter your email"
        rules={[
          {
            required: true,
            message: 'Email is required',
          },
        ]}
      />
      <ProFormText.Password
        type="password"
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockTwoTone className={styles.prefixIcon} />,
        }}
        placeholder="Enter your password"
        rules={[
          {
            required: true,
            message: 'Password is required',
          },
        ]}
      />
      <ProFormSelect
        name="role"
        fieldProps={{
          size: 'large',
        }}
        hasFeedback
        valueEnum={{
          auditor: 'Auditor',
          sm: 'Station Manager',
          viewer: 'Viewer',
        }}
        placeholder="Signup as"
        rules={[{ required: true, message: 'Please select signup as' }]}
      />
    </>
  );
}
