import { initiativeReportCSV } from '@/services';
import { message, Spin } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { useRef, useState } from 'react';
import { CSVLink } from 'react-csv';

const URL = process.env.SERVER_URL;

const headers = [
  { label: 'Initiative ID', key: 'id' },
  { label: 'Date', key: 'date' },
  { label: 'Auditor', key: 'auditor' },
  { label: 'Type', key: 'type' },
  { label: 'Region', key: 'region' },
  { label: 'Details', key: 'details' },
  { label: 'Station/City', key: 'station' },
];

const GenerateInitiativesCSV = ({ filters }) => {
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

    initiativeReportCSV({ filters: modifiedFilters })
      .then((res) => {
        console.log('data', res.data);
        setData({ loading: false, reports: res.data.reports });
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
            ? `Initiatives Report - ${moment().format('MMMM Do YYYY, h:mm:ss a')}.csv`
            : `Initiatives Report - With Filters - ${moment().format(
                'MMMM Do YYYY, h:mm:ss a',
              )}.csv`
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

export default GenerateInitiativesCSV;
