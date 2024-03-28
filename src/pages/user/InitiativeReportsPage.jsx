import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { message } from 'antd';
import moment from 'moment';
import { useRef } from 'react';

import { getInitiativeReports } from '@/services';
import InitiativeDetails from '../../components/Initiatives/InitiativeDetails';
import InitiativeTable from '../../components/Initiatives/InitiativeTable';

moment.locale('en');

let allData = [];
const InitiativeReportsPage = () => {
  const tableRef = useRef(null);

  const onRequest = async (parameters, sorter, filter) => {
    const result = await getInitiativeReports({
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
    });

    if (!result) {
      message.error('Unable to fetch data, reload');
    }

    allData = result.data.reports;

    const tableList = [];
    for (let i = 0; i < result.data.reports.length; i += 1) {
      tableList.push({
        key: result.data.reports[i]._id,
        id: result.data.reports[i].id,
        date: moment(result.data.reports[i].date).format('DD-MMM-YY'),
        auditor: result.data.reports[i].auditorName,
        type: result.data.reports[i].type,
        region: result.data.reports[i].region,
        station: result.data.reports[i].station,
        details: result.data.reports[i].details,
      });
    }

    return {
      data: tableList,
      success: true,
      total: result.data.totalReports,
    };
  };

  const expandedRowRender = (item) => {
    const filteredItem = allData.filter((data) => item.key === data._id);

    return <InitiativeDetails item={filteredItem[0]} tableRef={tableRef} />;
  };

  return (
    <PageHeaderWrapper content="Initiative - Improvement - Action Taken">
      <InitiativeTable
        expandedRowRender={expandedRowRender}
        onRequest={onRequest}
        tableRef={tableRef}
      />
    </PageHeaderWrapper>
  );
};

export default InitiativeReportsPage;
