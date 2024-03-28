import { auditReportCSV } from '@/services';
import { message, Spin } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { useRef, useState } from 'react';
import { CSVLink } from 'react-csv';

const headers = [
  { label: 'Issue ID', key: 'id' },
  { label: 'Date', key: 'date' },
  { label: 'Auditor', key: 'auditor' },
  { label: 'Status', key: 'status' },
  { label: 'Type', key: 'type' },
  { label: 'Region', key: 'region' },
  { label: 'Station Manager', key: 'stationManager' },
  { label: 'Date Identified', key: 'dateIdentified' },
  { label: 'Station/City', key: 'station' },
  { label: 'Issue Details', key: 'details' },
  { label: 'Days Open', key: 'daysOpen' },
  { label: 'Resolve Days', key: 'daysResolved' },
  { label: 'Resolved By', key: 'resolvedByName' },
  { label: 'Date Of Closure', key: 'dateOfClosure' },
];

const GenerateAuditCSV = ({ filters }) => {
  const csvRef = useRef(null);

  const [data, setData] = useState({
    loading: false,
    reports: [],
  });

  const fetchReports = () => {
    setData({ ...data, loading: true });

    let modifiedFilters = filters;
    if (modifiedFilters.date)
      modifiedFilters = {
        ...modifiedFilters,
        date: [
          moment(modifiedFilters.date[0]).format('YYYY-MM-DD'),
          moment(modifiedFilters.date[1]).format('YYYY-MM-DD'),
        ],
      };

    if (modifiedFilters.dateIdentified)
      modifiedFilters = {
        ...modifiedFilters,
        dateIdentified: [
          moment(modifiedFilters.dateIdentified[0]).format('YYYY-MM-DD'),
          moment(modifiedFilters.dateIdentified[1]).format('YYYY-MM-DD'),
        ],
      };

    auditReportCSV({ filters: modifiedFilters })
      .then((res) => {
        setData({
          loading: false,
          reports: res.data.reports,
        });
        if (res.data.reports?.length > 0) csvRef.current.link.click();
        else message.error('No data for CSV!');
      })
      .catch(() => {
        setData({ loading: false, reports: [] });
        message.error('Unable to download CSV');
      });
  };

  if (data.loading)
    return (
      <div style={{ width: '50px', textAlign: 'center' }}>
        <Spin />
      </div>
    );

  return (
    <>
      <a onClick={fetchReports}>Download CSV</a>
      <CSVLink
        target="_blank"
        filename={
          _.isEmpty(filters)
            ? `Audit Report - ${moment().format('MMMM Do YYYY, h:mm:ss a')}.csv`
            : `Audit Report - With Filters - ${moment().format('MMMM Do YYYY, h:mm:ss a')}.csv`
        }
        headers={headers}
        data={data.reports}
        style={{ display: 'none' }}
        ref={csvRef}
      >
        Download CSV
      </CSVLink>
    </>
  );
};

export default GenerateAuditCSV;
