import ProTable from '@ant-design/pro-table';
import {
  Avatar,
  Button,
  ConfigProvider,
  Form,
  message,
  Modal,
  Popconfirm,
  Tag,
  Typography,
} from 'antd';
import enUS from 'antd/lib/locale/en_US';
import moment from 'moment';
import { useState } from 'react';

import { deleteUser } from '@/services';
import AddForm from './AddForm';
import EditForm from './EditForm';

function UserTable({ onRequest, tableRef }) {
  const [form] = Form.useForm();
  const [editModeOn, setEditModeOn] = useState(false);
  const [addModeOn, setAddModeOn] = useState(false);

  const editOk = () => {
    setEditModeOn(false);
  };

  const editCancel = () => {
    setEditModeOn(false);
  };

  const addOk = () => {
    setAddModeOn(false);
  };

  const addCancel = () => {
    setAddModeOn(false);
  };

  const deleteUserHanlder = (record) => {
    deleteUser(record.id)
      .then((res) => {
        tableRef.current.reload();
        if (res.data.success) {
          message.success('User has been successfully deleted!');
        }
      })
      .catch(() => {
        message.error('Unable to delete user, please try later!', 10);
      });
  };

  const columns = [
    {
      dataIndex: 'id',
      valueType: 'avatar',
      search: false,
      width: 48,
      render: (_, props) => {
        return (
          <Avatar shape="square" size="small">
            {props.name.charAt(0)}
          </Avatar>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      sorter: () => null,
      render: (_) => <Typography.Text strong>{_}</Typography.Text>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
      sorter: () => null,
      render: (_) => <Typography.Text strong>{_}</Typography.Text>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      search: false,
      filters: [
        { text: 'Auditor', value: 'auditor' },
        { text: 'SM', value: 'sm' },
        { text: 'Admin', value: 'admin' },
        { text: 'Viewer', value: 'viewer' },
      ],
      render: (role) => {
        if (role === 'auditor') return <Tag color="purple">Auditor</Tag>;
        if (role === 'sm') return <Tag color="green">SM</Tag>;
        if (role === 'viewer') return <Tag color="blue">Viewer</Tag>;
        if (role === 'admin') return <Tag color="red">admin</Tag>;
      },
    },
    {
      title: 'Recent Activity',
      dataIndex: 'recentActivity',
      search: false,
      render: (date) => (
        <Typography.Text>
          {date.length > 1 ? moment(date).format('DD/MM/YYYY h:mma') : date}
        </Typography.Text>
      ),
    },
    {
      title: 'Operation',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            form.setFieldsValue({ id: record.id });
            form.setFieldsValue({ name: record.name });
            form.setFieldsValue({ email: record.email });
            setEditModeOn(true);
          }}
        >
          Edit
        </a>,
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => deleteUserHanlder(record)}
          okText="Yes"
          cancelText="No"
          key="delete"
        >
          <a>Delete</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
        actionRef={tableRef}
        request={onRequest}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        pagination={{
          showQuickJumper: true,
          pageSize: 20,
          pageSizeOptions: [10, 20, 50],
        }}
        options={{
          density: false,
        }}
        scroll={{ x: '650px' }}
        toolBarRender={() => [
          <Button key="add-user" type="primary" onClick={() => setAddModeOn(true)}>
            Add New User
          </Button>,
        ]}
      />
      <Modal
        title="Edit User Info"
        visible={editModeOn}
        onOk={editOk}
        onCancel={editCancel}
        footer={null}
      >
        <EditForm form={form} modalClose={editCancel} tableRef={tableRef} />
      </Modal>
      <Modal
        title="Add New User"
        visible={addModeOn}
        onOk={addOk}
        onCancel={addCancel}
        footer={null}
      >
        <AddForm modalClose={addCancel} tableRef={tableRef} />
      </Modal>
    </ConfigProvider>
  );
}

export default UserTable;
