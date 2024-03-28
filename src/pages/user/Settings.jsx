/* eslint-disable no-underscore-dangle */
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, message } from 'antd';
import moment from 'moment';
import { useRef } from 'react';

import { useAppContext } from '@/contexts/AppContext';
import { getAllUsers } from '@/services';
import UserTable from '../../components/Settings/UserTable';

moment.locale('en');

const Settings = () => {
  const { user } = useAppContext();
  const tableRef = useRef();

  const onRequest = async (parameters, sorter, filter) => {
    const result = await getAllUsers({
      params: parameters,
      sorter: {
        nameSorter: sorter?.name,
      },
      filter: {
        roleFilter: filter?.role,
      },
    });

    if (!result) {
      message.error('Unable to fetch users, reload');
    }

    const tableList = [];
    for (let i = 0; i < result.data.users.length; i += 1) {
      tableList.push({
        id: result.data.users[i]._id,
        name: result.data.users[i].name,
        email: result.data.users[i].email,
        role: result.data.users[i].role,
        recentActivity: result.data.users[i].recentActivity,
      });
    }

    return {
      data: tableList,
      total: result?.data?.total,
      success: true,
    };
  };

  return (
    <PageHeaderWrapper content="All registered users">
      {!user?.role === 'admin' ? (
        <Alert
          style={{
            marginBottom: 24,
          }}
          message="You are not authorized to see the details of this page"
          type="error"
          showIcon
        />
      ) : (
        <UserTable onRequest={onRequest} tableRef={tableRef} />
      )}
    </PageHeaderWrapper>
  );
};

export default Settings;
