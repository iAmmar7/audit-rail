/* eslint-disable react/no-unescaped-entities */
import { Alert, Col, Divider, Image, Row, Tag, Typography } from 'antd';
import moment from 'moment';

import styles from './Audit.less';

const URL = process.env.SERVER_URL;

function IssueDetail({ item }) {
  let color = null;
  if (item.status === 'Pending') color = 'red';
  if (item.status === 'Resolved') color = 'green';
  if (item.status === 'Maintenance') color = 'gold';

  return (
    <>
      <Row style={{ marginTop: '15px' }}>
        <Col col={8} style={{ marginRight: '15px' }}>
          Date:{' '}
          <Typography.Text strong>{moment(item.date).format('Do MMMM, YYYY')}</Typography.Text>
        </Col>
        <Col col={8}>
          Region:{' '}
          <Tag>
            <Typography.Text strong>{item.region ?? 'N/A'}</Typography.Text>
          </Tag>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={8} style={{ marginRight: '15px' }}>
          Auditor: <Typography.Text strong>{item.auditor ?? 'N/A'}</Typography.Text>
        </Col>
        <Col col={8} style={{ marginRight: '15px' }}>
          Station Manager: <Typography.Text strong>{item.stationManager ?? 'N/A'}</Typography.Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={12} style={{ marginRight: '15px' }}>
          Status: <Tag color={color}>{item.status}</Tag>
        </Col>
        <Col col={12}>
          Type:{' '}
          <Tag>
            <Typography.Text strong>{item.type}</Typography.Text>
          </Tag>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={24}>
          Issue Details: <Typography.Text strong>{item.details ?? 'N/A'}</Typography.Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={12} style={{ marginRight: '15px' }}>
          Date Identified:{' '}
          <Typography.Text strong>
            {moment(item.dateIdentified).format('Do MMMM, YYYY')}
          </Typography.Text>
        </Col>
        <Col col={12}>
          Station/City: <Typography.Text strong>{item.station ?? 'N/A'}</Typography.Text>
        </Col>
      </Row>

      {/* Evidences Before */}
      <Row style={{ marginTop: '15px' }}>
        <Col>Evidences Before: </Col>
      </Row>
      <Row style={{ padding: '20px 0px' }} gutter={[8, 8]}>
        {item.evidencesBefore.length > 0 ? (
          item.evidencesBefore.map((image) => (
            <Col key={image} className={styles.issue_image_container}>
              <Image src={URL + image} className={styles.issue_image} />
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Typography.Text strong>No image available</Typography.Text>
          </Col>
        )}
      </Row>

      <Divider />

      <Row style={{ marginTop: '15px' }}>
        <Col col={24}>
          Action Taken:{' '}
          <Typography.Text strong>{item.actionTaken ? item.actionTaken : 'N/A'}</Typography.Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={24}>
          Feedback from Sales Operation:{' '}
          <Typography.Text strong>{item.feedback ? item.feedback : 'N/A'}</Typography.Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={24}>
          Maintenance Team's Comment:{' '}
          <Typography.Text strong>
            {item.maintenanceComment ? item.maintenanceComment : 'N/A'}
          </Typography.Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={8} style={{ marginRight: '15px' }}>
          Days Open: <Typography.Text strong>{item.daysOpen}</Typography.Text>
        </Col>
        <Col col={8} style={{ marginRight: '15px' }}>
          Date of Closure:{' '}
          <Typography.Text strong>
            {item.dateOfClosure ? moment(item.dateOfClosure).format('Do MMMM, YYYY') : 'N/A'}
          </Typography.Text>
        </Col>
      </Row>
      {/* Evidences After */}
      <Row style={{ marginBottom: '5px', marginTop: '15px' }}>
        <Col>Evidences After: </Col>
      </Row>
      <Row style={{ padding: '20px 0px' }} gutter={[8, 8]}>
        {item.evidencesAfter.length > 0 ? (
          item.evidencesAfter.map((image) => (
            <Col key={image} className={styles.issue_image_container}>
              <Image src={URL + image} className={styles.issue_image} />
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Typography.Text strong>No image available</Typography.Text>
          </Col>
        )}
      </Row>

      <Divider />

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Alert
            message={
              <Typography.Text>
                Date Identified:{' '}
                <Typography.Text strong>
                  {moment(item.dateIdentified).format('Do MMMM, YYYY')}
                </Typography.Text>
              </Typography.Text>
            }
            type="info"
            showIcon
          />
        </Col>
        <Col span={12}>
          {item?.dateOfClosure && item?.status === 'Resolved' ? (
            <Alert
              message={
                <Typography.Text>
                  Date of Closure:{' '}
                  <Typography.Text strong>
                    {moment(item.dateOfClosure).format('Do MMMM, YYYY')}
                  </Typography.Text>
                </Typography.Text>
              }
              type="success"
              showIcon
            />
          ) : (
            <Alert
              message={
                <Typography.Text>
                  Date of Closure: <Typography.Text strong>Not resolved</Typography.Text>
                </Typography.Text>
              }
              type="error"
              showIcon
            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default IssueDetail;
