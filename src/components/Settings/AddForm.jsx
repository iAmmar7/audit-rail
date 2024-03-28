import { useAppContext } from '@/contexts/AppContext';
import { addUser } from '@/services';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Alert, Button, message, Row } from 'antd';
import { useState } from 'react';

const AddForm = ({ tableRef, modalClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAppContext();

  const addUserHandler = async (values) => {
    setLoading(true);

    addUser({ ...values })
      .then((res) => {
        setLoading(false);
        modalClose();
        tableRef.current.reload();
        if (res.data.success) {
          message.success('User has been successfully added!');
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message);
        setLoading(false);
        message.error('Unable to add user, please try again!', 10);
      });
  };

  return (
    <>
      {error ? (
        <Alert
          style={{
            marginBottom: 24,
          }}
          message={error || 'Unknown error'}
          type="error"
          showIcon
        />
      ) : null}
      <ProForm
        submitter={{
          render: (submitProps) => (
            <Row justify="end">
              <Button
                type="primary"
                loading={loading}
                justify="right"
                disabled={user?.role !== 'admin'}
                onClick={() => submitProps.form.submit()}
              >
                Add
              </Button>
            </Row>
          ),
        }}
        onFinish={addUserHandler}
      >
        <ProFormText
          name="name"
          label="Name"
          placeholder="Enter name"
          rules={[{ required: true, message: 'Please write user name!' }]}
        />
        <ProFormText
          name="email"
          label="Email"
          placeholder="Enter email address"
          rules={[{ required: true, message: 'Please write user email!' }]}
        />
        <ProFormText
          name="password"
          label="Password"
          placeholder="Enter password"
          rules={[{ required: true, message: 'Please write user password!' }]}
        />
        <ProFormSelect
          name="role"
          label="User role"
          valueEnum={{
            auditor: 'Auditor',
            sm: 'Station Manager',
            admin: 'Admin',
            viewer: 'Viewer',
          }}
          placeholder="Signup as"
          rules={[{ required: true, message: 'Please select signup as' }]}
        />
      </ProForm>
    </>
  );
};

export default AddForm;
