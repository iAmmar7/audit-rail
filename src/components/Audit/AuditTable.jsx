import ProTable from '@ant-design/pro-table';
import { ConfigProvider, Tag, Typography } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import { useRef } from 'react';

import { issueTypeOptions, regionSelectOptions } from '@/utils/constants';
import GenerateAuditCSV from '../common/GenerateAuditCSV';
import styles from './Audit.less';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '90px',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Date',
    width: '9%',
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
    title: 'Status',
    dataIndex: 'status',
    // search: false,
    valueType: 'select',
    filters: [
      { text: 'Resolved', value: 'Resolved' },
      { text: 'Pending', value: 'Pending' },
      { text: 'Maintenance', value: 'Maintenance' },
    ],
    valueEnum: {
      Resolved: { text: 'Resolved', status: 'Resolved' },
      Pending: { text: 'Pending', status: 'Pending' },
      Maintenance: { text: 'Maintenance', status: 'Maintenance' },
    },
    render: ({ props }) => {
      return props?.text?.text === 'Cancelled' ? (
        <Typography.Text>{props?.text?.text}</Typography.Text>
      ) : (
        <Tag color={props?.text?.color}>{props?.text?.text}</Tag>
      );
    },
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
    width: '9%',
    minWidth: 100,
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
    render: (_) => <Tag>{_}</Tag>,
  },
  {
    title: 'Station Manager',
    dataIndex: 'stationManager',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Date Identified',
    width: '9%',
    minWidth: 100,
    key: 'dateIdentified',
    dataIndex: 'dateIdentified',
    valueType: 'dateRange',
    sorter: () => null,
    render: (_) => <Typography.Text>{_.props.text}</Typography.Text>,
  },
  {
    title: 'Station/City',
    dataIndex: 'station',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Days Open',
    dataIndex: 'daysOpen',
    search: false,
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Resolve Days',
    dataIndex: 'daysResolved',
    search: false,
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
];

function AuditTable(props) {
  const formRef = useRef(null);
  const { expandedRowRender, onRequest, tableRef } = props;

  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
        request={onRequest}
        formRef={formRef}
        actionRef={tableRef}
        rowKey="key"
        toolBarRender={() => {
          return [<GenerateAuditCSV key="csv" filters={formRef?.current?.getFieldValue()} />];
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
        }}
        expandable={{
          expandedRowRender,
          // rowExpandable: (record) => record.status.text !== 'Cancelled',
        }}
        search={{
          labelWidth: 'auto',
          // defaultCollapsed: false,
          // collapseRender: () => false,
          // span: 8,
        }}
        dateFormatter="string"
        options={{
          density: false,
        }}
        scroll={{ x: '1050px' }}
        rowClassName={(record) => (record.status.text === 'Cancelled' ? styles.cancelledRow : '')}
        // className={styles.issueTable}
        // tableClassName={styles.issueTable}
        tableStyle={{
          zIndex: -1000000,
        }}
        dropdownStyle={{
          zIndex: 1000000,
        }}
        // postData={(value1, value2, value3) => {
        //   console.log('POST data', value1, value2, value3);
        //   return value1;
        // }}
        // toolBarRender={() => [
        //   <ProForm.Group style={{ paddingTop: '12%' }}>
        //     <ProFormSelect
        //       name="status"
        //       hasFeedback
        //       valueEnum={{
        //         pending: 'Pending',
        //         resolved: 'Resolved',
        //       }}
        //       placeholder="Status"
        //     />
        //     <ProFormSelect
        //       name="region"
        //       hasFeedback
        //       valueEnum={{
        //         region1: 'Region1',
        //         region2: 'Region2',
        //       }}
        //       placeholder="Region"
        //     />
        //   </ProForm.Group>,
        // ]}
      />
    </ConfigProvider>
  );
}

export default AuditTable;
