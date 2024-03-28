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
import { useState } from 'react';

import { useAppContext } from '@/contexts/AppContext';
import { deleteInitiativeReport } from '@/services';
import InitiativeEdit from './InitiativeEdit';
import InitiativeInfo from './InitiativeInfo';

function InitiativeDetails({ item, tableRef }) {
  const [formDisabled, setFormDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user } = useAppContext();

  let editButton = null;

  const deleteItem = () => {
    setLoading(true);
    deleteInitiativeReport(item._id)
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

  // If the currrent user is the one who added this initiative
  if (user?._id?.toString() === item.auditorId?.toString()) {
    editButton = (
      <Row justify="center" align="end">
        <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
          <Typography.Text>Edit initiative </Typography.Text>
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
  } // If the current user is viewer
  else if (user?.role === 'viewer') {
    editButton = (
      <Row justify="center" align="end">
        <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
          <Typography.Text>Edit initiative </Typography.Text>
        </Col>
        <Col>
          <Tooltip title="A viewer can not edit issues">
            <Switch checkedChildren="Off" unCheckedChildren="On" checked={false} disabled />
          </Tooltip>
        </Col>
      </Row>
    );
  } else {
    editButton = (
      <Row justify="center" align="end">
        <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
          <Typography.Text>Edit initiative </Typography.Text>
        </Col>
        <Col>
          <Tooltip title={`Only ${item.auditorName} can edit this issue`}>
            <Switch checkedChildren="Off" unCheckedChildren="On" checked={false} disabled />
          </Tooltip>
        </Col>
      </Row>
    );
  }

  let content = formDisabled ? (
    <InitiativeInfo item={item} />
  ) : (
    <InitiativeEdit item={item} tableRef={tableRef} setFormDisabled={setFormDisabled} />
  );

  if (loading)
    content = (
      <div style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
        <Spin />
      </div>
    );

  return (
    <Card>
      <Row justify="center">
        <Col span={12}>
          {user?.role === 'admin' ? (
            <Popconfirm
              title="Are you sure to delete this?"
              onConfirm={deleteItem}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          ) : null}
        </Col>
        <Col span={12}>{editButton}</Col>
      </Row>
      <Divider />
      {content}
    </Card>
  );
}

export default InitiativeDetails;
