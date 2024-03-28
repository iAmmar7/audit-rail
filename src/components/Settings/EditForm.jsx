import { useAppContext } from '@/contexts/AppContext';
import { updateUser } from '@/services';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Button, message, Row } from 'antd';
import { useState } from 'react';

const EditForm = ({ form, tableRef, modalClose }) => {
  const [loading, setLoading] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(true);
  const { user } = useAppContext();

  const updateUserHandler = async (values) => {
    const userId = form.getFieldValue('id');
    setLoading(true);

    updateUser(userId, { ...values })
      .then((res) => {
        setLoading(false);
        modalClose();
        tableRef.current.reload();
        if (res.data.success) {
          message.success('User has been successfully updated!');
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to update user, please try later!', 10);
      });
  };

  return (
    <ProForm
      form={form}
      submitter={{
        render: (submitProps) => (
          <Row justify="end">
            <Button
              type="primary"
              loading={loading}
              justify="right"
              disabled={submitDisable || user?.role !== 'admin'}
              onClick={() => submitProps.form.submit()}
            >
              Update
            </Button>
          </Row>
        ),
      }}
      onFinish={updateUserHandler}
      onValuesChange={() => {
        setSubmitDisable(false);
      }}
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
        placeholder="Enter new password"
        rules={[{ required: true, message: 'Please write password!' }]}
      />
    </ProForm>
  );
};

export default EditForm;
