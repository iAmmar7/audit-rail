/* eslint-disable no-underscore-dangle */
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { message } from 'antd';
import moment from 'moment';
import { useRef } from 'react';

import { getAuditReports } from '@/services';
import AuditDetails from '../../components/Audit/AuditDetails';
import AuditTable from '../../components/Audit/AuditTable';

moment.locale('en');

const URL = process.env.SERVER_URL;

let allData = [];
const AuditReports = () => {
  const tableRef = useRef(null);

  const onRequest = async (parameters, sorter, filter) => {
    const queryData = {
      isPrioritized: true,
      params: parameters,
      sorter: {
        dateSorter: sorter?.date,
        dateIdentifiedSorter: sorter?.dateIdentified,
        daysOpenSorter: sorter?.daysOpen,
      },
      filter: {
        statusFilter: filter?.status,
        typeFilter: filter?.type,
        regionFilter: filter?.region,
      },
    };

    const result = await getAuditReports(queryData);
    if (!result) {
      message.error('Unable to fetch data, reload');
    }

    allData = result.data.reports;

    const tableList = [];
    for (let i = 0; i < result.data.reports.length; i += 1) {
      let status;
      if (result.data.reports[i].status === 'Pending') {
        status = {
          color: 'red',
          text: result.data.reports[i].status,
        };
      } else if (result.data.reports[i].status === 'Resolved') {
        status = {
          color: 'green',
          text: result.data.reports[i].status,
        };
      } else {
        status = {
          color: 'gold',
          text: result.data.reports[i].status,
        };
      }

      tableList.push({
        key: result.data.reports[i]._id,
        id: result.data.reports[i].id,
        date: moment(result.data.reports[i].date).format('DD-MMM-YY'),
        auditor: result.data.reports[i].auditor,
        status,
        type: result.data.reports[i].type,
        region: result.data.reports[i].region,
        stationManager: result.data.reports[i].stationManager,
        dateIdentified: moment(result.data.reports[i].dateIdentified).format(
          'DD-MMM-YY',
        ),
        station: result.data.reports[i].station,
        daysOpen:
          result.data.reports[i].status === 'Resolved'
            ? null
            : result.data.reports[i].daysOpen,
        daysResolved:
          result.data.reports[i].status === 'Resolved'
            ? result.data.reports[i].daysOpen
            : null,
      });
    }

    return {
      data: tableList,
      success: true,
      total: result.data.totalReports,
    };
  };

  const expandedRowRender = (item) => {
    const filteredItem = allData.find((data) => item.key === data._id);

    return <AuditDetails item={filteredItem} tableRef={tableRef} />;
  };

  return (
    <PageHeaderWrapper content="EDER - Early Detection Early Resolution">
      <AuditTable
        expandedRowRender={expandedRowRender}
        onRequest={onRequest}
        tableRef={tableRef}
      />
    </PageHeaderWrapper>
  );
};

export default AuditReports;
