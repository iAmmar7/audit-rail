import React, { useRef, useEffect, useState } from 'react';
import { Modal, Badge, Typography } from 'antd';
import { Bar } from '@ant-design/charts';

import TypeChart from './TypeChart';

const RegionChart = ({ stats }) => {
  const [selectedData, setSelectedData] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);

  const handleOk = () => {
    setDisplayModal(false);
  };

  const handleCancel = () => {
    setDisplayModal(false);
  };

  // const data = [
  //   {
  //     region: 'Southern',
  //     status: 'Resolved',
  //     count: 1,
  //   },
  //   {
  //     region: 'CR-East',
  //     status: 'Pending',
  //     count: 1,
  //   },
  //   {
  //     region: 'WR-South',
  //     status: 'Pending',
  //     count: 6,
  //   },
  //   {
  //     region: 'Southern',
  //     status: 'Pending',
  //     count: 2,
  //   },
  //   {
  //     region: 'ER-North',
  //     status: 'Resolved',
  //     count: 1,
  //   },
  //   {
  //     region: 'WR-South',
  //     status: 'Resolved',
  //     count: 2,
  //   },
  //   {
  //     region: 'CR-East',
  //     status: 'Cancelled',
  //     count: 1,
  //   },
  //   {
  //     region: 'CR-East',
  //     status: 'Resolved',
  //     count: 2,
  //   },
  //   {
  //     region: 'CR-South',
  //     status: 'Resolved',
  //     count: 2,
  //   },
  //   {
  //     region: 'ER-South',
  //     status: 'Resolved',
  //     count: 2,
  //   },
  //   {
  //     region: 'CR-North',
  //     status: 'Resolved',
  //     count: 3,
  //   },
  //   {
  //     region: 'CR-South',
  //     status: 'Pending',
  //     count: 1,
  //   },
  // ];

  const config = {
    data: stats,
    xField: 'count',
    yField: 'region',
    seriesField: 'status',
    isPercent: false,
    isStack: true,
    // eslint-disable-next-line consistent-return
    color: (_ref) => {
      if (_ref.status === 'Pending') return '#f5222d';
      if (_ref.status === 'Resolved') return '#a0d911';
      if (_ref.status === 'Maintenance') return '#FFD700';
    },
    label: {
      position: 'middle',
      content: function content(item) {
        return item.count;
      },
      style: { fill: '#fff' },
    },
    // tooltip: false,
    // tooltip: {
    //   customContent: (title, values) => {
    //     console.log(title, values);
    //     return (
    //       <div style={{ padding: '2px 6px' }}>
    //         <Row style={{ margin: '8px 0px' }}>
    //           <Typography.Text strong>{title}</Typography.Text>
    //         </Row>
    //         <TypeChart />
    //         {/* {values.map((item) => (
    //           <div style={{ marginBottom: '12px' }} key={item.name}>
    //             <Row>
    //               <Badge
    //                 color={item.color}
    //                 text={
    //                   <Typography.Text>
    //                     {item.name} <Typography.Text strong>{item.value}</Typography.Text>
    //                   </Typography.Text>
    //                 }
    //               />
    //             </Row>
    //             <Row style={{ margin: '4px 0px', paddingLeft: '12px' }}>
    //               <Typography.Text>
    //                 Customer Experience {item.data['Customer Experience'] ?? 0}
    //               </Typography.Text>
    //             </Row>
    //             <Row style={{ marginBottom: '4px', paddingLeft: '12px' }}>
    //               <Typography.Text>Violation {item.data['Violation'] ?? 0}</Typography.Text>
    //             </Row>
    //             <Row style={{ marginBottom: '4px', paddingLeft: '12px' }}>
    //               <Typography.Text>Housekeeping {item.data['Housekeeping'] ?? 0}</Typography.Text>
    //             </Row>
    //             <Row style={{ marginBottom: '4px', paddingLeft: '12px' }}>
    //               <Typography.Text>
    //                 Customer Mistreatment {item.data['Customer Mistreatment'] ?? 0}
    //               </Typography.Text>
    //             </Row>
    //             <Row style={{ marginBottom: '4px', paddingLeft: '12px' }}>
    //               <Typography.Text>Initiative {item.data['Initiative'] ?? 0}</Typography.Text>
    //             </Row>
    //             <Row style={{ marginBottom: '4px', paddingLeft: '12px' }}>
    //               <Typography.Text>Admin Issues {item.data['Admin Issues'] ?? 0}</Typography.Text>
    //             </Row>
    //             <Row style={{ marginBottom: '4px', paddingLeft: '12px' }}>
    //               <Typography.Text>Safety {item.data['Safety'] ?? 0}</Typography.Text>
    //             </Row>
    //             <Row style={{ marginBottom: '4px', paddingLeft: '12px' }}>
    //               <Typography.Text>Others {item.data['Others'] ?? 0}</Typography.Text>
    //             </Row>
    //           </div>
    //         ))} */}
    //       </div>
    //     );
    //   },
    // },
  };

  const ref = useRef();
  useEffect(() => {
    // element adds a click event, element refers to label|point, etc.
    ref.current.on('element:click', (e) => {
      setSelectedData(e.data ?? null);
      setDisplayModal(true);
    });
  }, []);

  return (
    <>
      <Bar {...config} chartRef={ref} />
      <Modal
        title={
          <>
            <Typography.Title level={4}>{selectedData?.data?.region}</Typography.Title>
            <Badge
              color={`${selectedData?.color}`}
              text={`${selectedData?.data?.status} ${selectedData?.data?.count}`}
            />
          </>
        }
        visible={displayModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={600}
        bodyStyle={{
          height: '320px',
        }}
      >
        <TypeChart stats={selectedData} />
      </Modal>
    </>
  );
};
export default RegionChart;
