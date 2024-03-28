import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PauseCircleOutlined,
  StockOutlined,
} from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Col, Row, Select, Spin, Statistic, Typography } from 'antd';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';

import { getReportChart } from '@/services';
import RegionChart from '../../components/Charts/RegionChart';

moment.locale('en');
const monthsList = [
  { value: 'allTime', text: 'All Time' },
  { value: moment().format('YYYY-MM-DD'), text: moment().format('MMMM Y') },
];
for (let i = 1; i <= 11; i += 1) {
  monthsList.push({
    value: moment().subtract(i, 'month').format('YYYY-MM-DD'),
    text: moment().subtract(i, 'month').format('MMMM Y'),
  });
}

const Landing = () => {
  const [data, setData] = useState({
    loading: true,
    regionStats: [],
    overallStats: [],
    count: 0,
  });

  const getStats = useCallback((query) => {
    getReportChart()
      .then((res) => {
        if (res.data.success) {
          setData({
            loading: false,
            regionStats: res.data.regionStats,
            overallStats: res.data.overallStats,
            total: res.data.total,
          });
        } else {
          setData((currentData) => ({
            ...currentData,
            loading: false,
          }));
        }
      })
      .catch(() => {
        setData({
          loading: false,
          regionStats: [],
          overallStats: [],
          total: 0,
        });
      });
  }, []);

  useEffect(() => {
    getStats('allTime');
  }, [getStats]);

  let statCards = null;
  if (!data.loading && data.overallStats.length > 0) {
    statCards = data.overallStats.map((item) => {
      let color;
      let icon;
      if (item.status === 'Pending') {
        color = '#f5222d';
        icon = <PauseCircleOutlined />;
      }
      if (item.status === 'Resolved') {
        color = '#a0d911';
        icon = <CheckCircleOutlined />;
      }
      if (item.status === 'Maintenance') {
        color = '#FFD700';
        icon = <CloseCircleOutlined />;
      }
      return (
        <Col col={6} key={item.status}>
          <Card>
            <Statistic
              title={item.status}
              value={item.count}
              valueStyle={{ color }}
              prefix={icon}
            />
          </Card>
        </Col>
      );
    });
  }

  return (
    <PageHeaderWrapper content="Business Excellence - EDER (Early Detection Early Resolution)">
      <Card>
        <Row justify="space-between">
          <Col>
            <Typography.Title level={3}>Report Statistics</Typography.Title>
          </Col>
          <Col align="right">
            <Select
              defaultValue="allTime"
              style={{ width: 150 }}
              align="left"
              onChange={(value) => getStats(value)}
            >
              {monthsList.map((item) => (
                <Select.Option value={item.value} key={item.value}>
                  {item.text}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        {data.loading ? (
          <div
            style={{
              textAlign: 'center',
              paddingTop: '30px',
              paddingBottom: '30px',
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <>
            <RegionChart stats={data.regionStats} total={data.total} />
            <Row
              gutter={[8, 8]}
              justify="center"
              style={{ paddingTop: '30px' }}
            >
              <Col col={6}>
                <Card>
                  <Statistic
                    title="All"
                    value={data.total}
                    valueStyle={{ color: '#262626' }}
                    prefix={<StockOutlined />}
                  />
                </Card>
              </Col>
              {statCards}
            </Row>
          </>
        )}
      </Card>
    </PageHeaderWrapper>
  );
};

export default Landing;
