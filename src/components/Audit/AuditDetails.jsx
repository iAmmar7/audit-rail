import { DeleteOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  message,
  Popconfirm,
  Row,
  Spin,
  Switch,
  Tooltip,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';

import { useAppContext } from '@/contexts/AppContext';
import { deleteAuditReport, getUserByRole } from '@/services';
import IssueDetail from './IssueDetail';
import IssueForm from './IssueForm';

function AuditDetails({ item, tableRef }) {
  const [formDisabled, setFormDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [stationManagers, setStationManagers] = useState([]);
  const { user } = useAppContext();

  useEffect(() => {
    const fetch = async () => {
      const sm = await getUserByRole('sm');
      setStationManagers(sm.data.users);
    };
    fetch();
  }, []);

  const deleteIssue = () => {
    setLoading(true);
    deleteAuditReport(item._id)
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          message.success('Issue deleted successfully');
          tableRef.current.reload();
        }
      })
      .catch(() => {
        message.error('Unable to delete the issue');
        setLoading(false);
      });
  };

  let editButton = null;

  // If issue has resolved
  if (item.status === 'Resolved') {
    if (user?._id?.toString() === item?.resolvedById?.toString()) {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Update Response </Typography.Text>
          </Col>
          <Col>
            <Switch
              checkedChildren="Off"
              unCheckedChildren="On"
              checked={!formDisabled}
              onClick={() => {
                setFormDisabled(!formDisabled);
              }}
            />
          </Col>
        </Row>
      );
    } else {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Update Response </Typography.Text>
          </Col>
          <Col>
            <Tooltip title={`Only ${item.resolvedByName} can update this issue now`}>
              <Switch checkedChildren="Off" unCheckedChildren="On" checked={false} disabled />
            </Tooltip>
          </Col>
        </Row>
      );
    }
  }

  // if issue is pending
  if (item.status === 'Pending' || item.status === 'Maintenance') {
    if (user?.role === 'sm') {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Update Status </Typography.Text>
          </Col>
          <Col>
            <Switch
              checkedChildren="Off"
              unCheckedChildren="On"
              checked={!formDisabled}
              onClick={() => setFormDisabled(!formDisabled)}
            />
          </Col>
        </Row>
      );
    } else if (item?.auditorId?.toString() === user?._id?.toString()) {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Edit issue </Typography.Text>
          </Col>
          <Col>
            <Switch
              checkedChildren="Off"
              unCheckedChildren="On"
              checked={!formDisabled}
              onClick={() => setFormDisabled(!formDisabled)}
            />
          </Col>
        </Row>
      );
    } else {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Edit issue </Typography.Text>
          </Col>
          <Col>
            <Tooltip title={`Only ${item.auditor} can edit this issue`}>
              <Switch checkedChildren="Off" unCheckedChildren="On" checked={false} disabled />
            </Tooltip>
          </Col>
        </Row>
      );
    }
  }

  // For viewer account
  if (user?.role === 'viewer') {
    editButton = (
      <Row justify="center" align="end">
        <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
          <Typography.Text>Edit status </Typography.Text>
        </Col>
        <Col>
          <Tooltip title="A viewer can not edit issues">
            <Switch checkedChildren="Off" unCheckedChildren="On" checked={false} disabled />
          </Tooltip>
        </Col>
      </Row>
    );
  }

  let content = formDisabled ? (
    <IssueDetail item={item} />
  ) : (
    <IssueForm
      item={item}
      tableRef={tableRef}
      setFormDisabled={setFormDisabled}
      stationManagers={stationManagers}
    />
  );

  if (loading) {
    content = (
      <div style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
        <Spin />
      </div>
    );
  }

  return (
    <Card>
      <Row justify="center">
        <Col span={12}>
          {user?.role === 'admin' ? (
            <Row>
              <Popconfirm
                title="Are you sure to delete this?"
                onConfirm={deleteIssue}
                okText="Yes"
                cancelText="No"
              >
                <Button danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </Row>
          ) : null}
          {item?.status === 'Resolved' && item?.resolvedByName && (
            <Row style={{ marginTop: '6px' }}>
              <Col span={24}>
                <Typography.Text>
                  Issue is resolved by:{' '}
                  <Typography.Text type="warning" strong>
                    {item.resolvedByName}
                  </Typography.Text>
                </Typography.Text>
              </Col>
            </Row>
          )}
        </Col>
        <Col span={12}>{editButton}</Col>
      </Row>
      <Divider />
      {content}
    </Card>
  );
}

export default AuditDetails;
