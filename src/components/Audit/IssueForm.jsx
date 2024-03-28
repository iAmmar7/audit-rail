import { DeleteTwoTone, QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Button, Col, Divider, Image, message, Row, Tag, Tooltip, Typography, Upload } from 'antd';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';

import { useAppContext } from '@/contexts/AppContext';
import { deleteReportImage, editAuditReport, updateAuditReport } from '@/services';
import {
  issuePriorityOptions,
  issueStatusOptions,
  issueTypeOptions,
  regionSelectOptions,
} from '@/utils/constants';
import styles from './Audit.less';

const URL = process.env.SERVER_URL;

function IssueForm(props) {
  const { item, tableRef, setFormDisabled, stationManagers } = props;
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(item.status);
  const [evidenceBeforeFileList, setEvidenceBeforeFileList] = useState([]);
  const [evidenceAfterFileList, setEvidenceAfterFileList] = useState([]);
  const { user } = useAppContext();

  useEffect(() => {
    if (formRef.current) {
      window.scrollTo({ behavior: 'smooth', top: formRef.current.offsetTop + 200 });
    }
  }, []);

  let color = null;
  if (item.status === 'Pending') color = 'red';
  if (item.status === 'Resolved') color = 'green';
  if (item.status === 'Maintenance') color = 'gold';

  const updateFormByAuditor = async (values) => {
    setLoading(true);

    // Send axios request
    editAuditReport(values, { id: item._id, evidenceBeforeFileList })
      .then((res) => {
        setLoading(false);
        setFormDisabled(true);
        tableRef.current.reload();
        if (res.data.success) {
          message.success('Issue has been successfully updated!');
        }
      })
      .catch((error) => {
        setLoading(false);
        message.error('Unable to update issue, please try later!', 10);
      });
  };

  const updateFormBySM = async (values) => {
    setLoading(true);

    // Send axios request
    updateAuditReport(values, { id: item._id, evidenceAfterFileList })
      .then((res) => {
        setLoading(false);
        setFormDisabled(true);
        tableRef.current.reload();
        if (res.data.success) {
          message.success('Issue has been successfully updated!');
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to update issue, please try later!', 10);
      });
  };

  const deleteImage = async (requestType, imageType, image) => {
    setLoading(true);
    deleteReportImage({ id: item._id, requestType, imageType, url: image })
      .then(() => {
        setLoading(false);
        tableRef.current.reload();
        message.success('Image deleted successfully');
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to delete image');
      });
  };

  const issueDetails = (
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
          Business Excellence Team:{' '}
          <Typography.Text strong>{item.auditor ?? 'N/A'}</Typography.Text>
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
      <Row>
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
    </>
  );

  if (user?.role === 'auditor') {
    const evidencesProps = {
      name: 'evidencesBefore',
      listType: 'picture',
      onRemove: (file) => {
        const index = evidenceBeforeFileList.indexOf(file);
        const newFileList = evidenceBeforeFileList.slice();
        newFileList.splice(index, 1);
        setEvidenceBeforeFileList(newFileList);
      },
      beforeUpload: (file) => {
        if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
          message.error(`Supported image formats are png, jpg and jpeg`);
        }
        setEvidenceBeforeFileList([...evidenceBeforeFileList, file]);
        return false;
      },
      evidenceBeforeFileList,
    };

    return (
      <ProForm
        initialValues={{
          ...item,
          stationManager: item.stationManagerId,
          priority: item.isPrioritized ? 'Priority' : 'Observation',
        }}
        submitter={{
          render: (props) => (
            <Button
              type="primary"
              loading={loading}
              disabled={user?.role !== 'auditor'}
              onClick={() => props.form.submit()}
            >
              Submit
            </Button>
          ),
        }}
        onFinish={updateFormByAuditor}
      >
        <ProForm.Group>
          <ProFormDatePicker
            width="s"
            name="date"
            label="Date"
            placeholder="Select date"
            rules={[{ required: true, message: 'Please select date!' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            name="region"
            label="Region"
            placeholder="Select region"
            options={regionSelectOptions}
            rules={[{ required: true, message: 'Please select region!' }]}
            style={{ width: '150px' }}
          />
          <ProFormSelect
            name="stationManager"
            label="Station Manager"
            placeholder="Select station manager"
            options={stationManagers.map((sm) => ({ value: sm._id, label: sm.name }))}
            rules={[{ required: true, message: 'Please select station manager name!' }]}
            style={{ width: '250px' }}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            name="type"
            label="Type"
            placeholder="Select issue type"
            options={issueTypeOptions}
            rules={[{ required: true, message: 'Please select issue type!' }]}
            style={{ width: '250px' }}
          />
          <ProFormText
            name="station"
            label="Station/City"
            placeholder="Enter station"
            rules={[{ required: true, message: 'Please write station!' }]}
          />
        </ProForm.Group>
        <ProFormTextArea
          width="xl"
          name="details"
          label="Audit Issue Details"
          placeholder="Add issue details"
          rules={[{ required: true, message: 'Please add details!' }]}
        />
        <ProForm.Group>
          <ProFormDatePicker
            width="s"
            name="dateIdentified"
            label="Date Identified/Listed"
            placeholder="Select date"
            rules={[{ required: true, message: 'Please select date!' }]}
          />
          <ProFormSelect
            width="s"
            name="priority"
            label="Priority"
            placeholder="Select Priority"
            options={issuePriorityOptions}
            rules={[{ required: true, message: 'Please select issue priority!' }]}
            disabled={item.isPrioritized}
          />
        </ProForm.Group>
        <Typography.Text>Evidence </Typography.Text>
        <Tooltip title="Supported extensions are .jpg .jpeg .png">
          <QuestionCircleOutlined style={{ color: '#959595' }} />
        </Tooltip>{' '}
        <Upload {...evidencesProps}>
          <Button icon={<UploadOutlined />}>Select multiple images</Button>
        </Upload>
        <Row style={{ padding: '20px 0px' }} gutter={[8, 8]}>
          {item?.evidencesBefore?.length > 0
            ? item?.evidencesBefore?.map((image) => (
                <Col key={image} className={styles.issue_image_container}>
                  <DeleteTwoTone
                    className={styles.issue_delete_btn}
                    twoToneColor="red"
                    onClick={() => deleteImage('issues', 'evidenceBefore', image)}
                  />
                  <Image src={URL + image} className={styles.issue_image} />
                </Col>
              ))
            : null}
        </Row>
      </ProForm>
    );
  }

  if (user?.role === 'sm') {
    const evidencesProps = {
      name: 'evidencesAfter',
      listType: 'picture',
      onRemove: (file) => {
        const index = evidenceAfterFileList.indexOf(file);
        const newFileList = evidenceAfterFileList.slice();
        newFileList.splice(index, 1);
        setEvidenceAfterFileList(newFileList);
      },
      beforeUpload: (file) => {
        if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
          message.error(`Supported image formats are png, jpg and jpeg`);
        }
        setEvidenceAfterFileList([...evidenceAfterFileList, file]);
        return false;
      },
      evidenceAfterFileList,
    };

    return (
      <>
        {issueDetails}
        <Divider />
        <div ref={formRef}>
          <ProForm
            initialValues={{
              ...item,
              status: undefined,
            }}
            submitter={{
              render: (props) => (
                <Row>
                  <Button
                    type="primary"
                    loading={loading}
                    disabled={user?.role !== 'sm'}
                    onClick={() => props.form.submit()}
                  >
                    Submit
                  </Button>
                </Row>
              ),
            }}
            onFinish={updateFormBySM}
            onValuesChange={(_, values) => {
              if (values.status) {
                setStatus(values.status);
              }
            }}
          >
            <ProForm.Group>
              <ProFormTextArea
                width="l"
                name="actionTaken"
                label="Action Taken"
                placeholder="Write taken action"
                rules={[{ required: true, message: 'Please write taken action!' }]}
              />
              <ProFormTextArea
                width="l"
                name="feedback"
                label="Feedback from Sales Operation / Comment"
                placeholder="Write feedback"
                rules={[{ required: true, message: 'Please write feedback!' }]}
              />
            </ProForm.Group>
            <Typography.Text>Evidence </Typography.Text>
            <Tooltip title="Supported extensions are .jpg .jpeg .png">
              <QuestionCircleOutlined style={{ color: '#959595' }} />
            </Tooltip>{' '}
            <Upload {...evidencesProps}>
              <Button icon={<UploadOutlined />}>Select multiple images</Button>
            </Upload>
            <Row style={{ padding: '20px 0px' }} gutter={[8, 8]}>
              {item?.evidencesAfter?.length > 0
                ? item?.evidencesAfter?.map((image) => (
                    <Col key={image} className={styles.issue_image_container}>
                      <DeleteTwoTone
                        className={styles.issue_delete_btn}
                        twoToneColor="red"
                        onClick={() => deleteImage('issues', 'evidenceAfter', image)}
                      />
                      <Image src={URL + image} className={styles.issue_image} />
                    </Col>
                  ))
                : null}
            </Row>
            <ProFormTextArea
              width="l"
              name="maintenanceComment"
              label="Maintenance Team's Comment"
              placeholder="Write comment"
            />
            <ProForm.Group>
              <ProFormSelect
                options={issueStatusOptions}
                name="status"
                label="Status"
                placeholder="Select..."
                rules={[{ required: true, message: 'Status is required!' }]}
                style={{ width: '150px' }}
              />
              <ProFormDatePicker
                disabled={status !== 'Resolved'}
                width="s"
                name="dateOfClosure"
                label="Date of Closure"
                placeholder="Select date"
                tooltip="If status is resolved, date of closure is required"
                rules={[{ required: status === 'Resolved', message: 'Please select date!' }]}
              />
            </ProForm.Group>
          </ProForm>
        </div>
      </>
    );
  }
}

export default IssueForm;
