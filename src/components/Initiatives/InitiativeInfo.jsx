import { Col, Image, Row, Tag, Typography } from 'antd';
import moment from 'moment';

import styles from './Initiatives.less';

const URL = process.env.SERVER_URL;

function InitiativeInfo({ item }) {
  return (
    <>
      <Row style={{ marginTop: '15px' }}>
        <Col col={12} style={{ marginRight: '15px' }}>
          Date:{' '}
          <Typography.Text strong>{moment(item.date).format('Do MMMM, YYYY')}</Typography.Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={8}>
          Auditor: <Typography.Text strong>{item.auditorName ?? 'N/A'}</Typography.Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={8}>
          Type:{' '}
          <Tag>
            <Typography.Text strong>{item.type ?? 'N/A'}</Typography.Text>
          </Tag>
        </Col>
        <Col col={8}>
          Region:{' '}
          <Tag>
            <Typography.Text strong>{item.region ?? 'N/A'}</Typography.Text>
          </Tag>
        </Col>
        <Col col={8}>
          Station/City: <Typography.Text strong>{item.station ?? 'N/A'}</Typography.Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={24}>
          Initiative Details: <Typography.Text strong>{item.details ?? 'N/A'}</Typography.Text>
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

      {/* Evidences After */}
      <Row style={{ marginTop: '15px' }}>
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
    </>
  );
}

export default InitiativeInfo;
