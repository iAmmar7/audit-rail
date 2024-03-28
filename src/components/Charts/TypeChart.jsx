/* eslint-disable @typescript-eslint/dot-notation */
import React from 'react';
import { Pie } from '@ant-design/charts';

const TypeChart = ({ stats }) => {
  const data = [
    {
      type: 'Customer Experience',
      count: stats.data['Customer Experience'] ?? null,
    },
    {
      type: 'Housekeeping',
      count: stats.data['Housekeeping'] ?? null,
    },
    {
      type: 'Customer Mistreatment',
      count: stats.data['Customer Mistreatment'] ?? null,
    },
    {
      type: 'Initiative',
      count: stats.data['Initiative'] ?? null,
    },
    {
      type: 'Admin Issues',
      count: stats.data['Admin Issues'] ?? null,
    },
    {
      type: 'Maintenance Issues',
      count: stats.data['Maintenance Issues'] ?? null,
    },
    {
      type: 'IT Issues',
      count: stats.data['IT Issues'] ?? null,
    },
    {
      type: 'Inventory Issues',
      count: stats.data['Inventory Issues'] ?? null,
    },
    {
      type: 'Violation',
      count: stats.data['Violation'] ?? null,
    },
    {
      type: 'Safety',
      count: stats.data['Safety'] ?? null,
    },
    {
      type: 'Others',
      count: stats.data['Others'] ?? null,
    },
  ];

  const config = {
    height: 400,
    width: 400,
    data,
    angleField: 'count',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      style: {
        fontSize: 20,
        textAlign: 'center',
        fill: 'grey',
      },
    },
    legend: {
      flipPage: false,
      itemHeight: 10,
      layout: 'horizontal',
      position: 'right',
    },
    interactions: [{ type: 'element-active' }],
  };

  return <Pie {...config} />;
};

export default TypeChart;
