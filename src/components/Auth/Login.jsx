import React from 'react';
import { LockTwoTone, MailOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-form';

export default function LogIn({ styles }) {
  return (
    <>
      <ProFormText
        name="email"
        type="email"
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
        name="password"
        type="password"
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
    </>
  );
}
