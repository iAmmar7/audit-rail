/* eslint-disable no-useless-computed-key */
import ProTable from '@ant-design/pro-table';
import { ConfigProvider, Typography } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import { useRef } from 'react';

import { issueTypeOptions, regionSelectOptions } from '@/utils/constants';
import GenerateInitiativesCSV from '../common/GenerateInitiativesCSV';

const columns = [
  {
    title: 'Initiative ID',
    dataIndex: 'id',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Date',
    minWidth: 100,
    dataIndex: 'date',
    valueType: 'dateRange',
    sorter: () => null,
    render: (_) => <Typography.Text>{_.props.text}</Typography.Text>,
  },
  {
    title: 'Auditor',
    dataIndex: 'auditor',
    render: (_) => <Typography.Text strong>{_}</Typography.Text>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    valueType: 'select',
    filters: issueTypeOptions.map((issue) => ({ text: issue.label, value: issue.value })),
    valueEnum: {
      ['Customer Experience']: { text: 'Customer Experience', type: 'Customer Experience' },
      Housekeeping: { text: 'Housekeeping', type: 'Housekeeping' },
      ['Customer Mistreatment']: { text: 'Customer Mistreatment', type: 'Customer Mistreatment' },
      Initiative: { text: 'Initiative', type: 'Initiative' },
      ['Admin Issues']: { text: 'Admin Issues', type: 'Admin Issues' },
      ['Maintenance Issues']: { text: 'Maintenance Issues', type: 'Maintenance Issues' },
      ['IT Issues']: { text: 'IT Issues', type: 'IT Issues' },
      ['Inventory Issues']: { text: 'Inventory Issues', type: 'Inventory Issues' },
      Violation: { text: 'Violation', type: 'Violation' },
      Safety: { text: 'Safety', type: 'Safety' },
      Others: { text: 'Others', type: 'Others' },
    },
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Region',
    dataIndex: 'region',
    valueType: 'select',
    filters: regionSelectOptions.map((region) => ({ text: region.label, value: region.value })),
    valueEnum: {
      Southern: { text: 'Southern', region: 'Southern' },
      ['CR-East']: { text: 'CR-East', region: 'CR-East' },
      ['CR-North']: { text: 'CR-North', region: 'CR-North' },
      ['CR-South']: { text: 'CR-South', region: 'CR-South' },
      ['ER-North']: { text: 'ER-North', region: 'ER-North' },
      ['ER-South']: { text: 'ER-South', region: 'ER-South' },
      ['WR-North']: { text: 'WR-North', region: 'WR-North' },
      ['WR-South']: { text: 'WR-South', region: 'WR-South' },
    },
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Station/City',
    dataIndex: 'station',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
];

function InitiativeTable(props) {
  const formRef = useRef(null);
  const { expandedRowRender, onRequest, tableRef } = props;

  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
        request={onRequest}
        actionRef={tableRef}
        formRef={formRef}
        rowKey="key"
        toolBarRender={() => [
          <GenerateInitiativesCSV key="csv" filters={formRef?.current?.getFieldValue()} />,
        ]}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
        }}
        expandable={{
          expandedRowRender,
        }}
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        options={{
          density: false,
        }}
        scroll={{ x: '1000px' }}
      />
    </ConfigProvider>
  );
}

export default InitiativeTable;
