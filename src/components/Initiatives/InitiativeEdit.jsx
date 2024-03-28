/* eslint-disable no-underscore-dangle */
import { DeleteTwoTone, QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Button, Col, Image, message, Row, Tooltip, Typography, Upload } from 'antd';
import { useState } from 'react';

import { useAppContext } from '@/contexts/AppContext';
import { deleteReportImage, editInitiative } from '@/services';
import { issueTypeOptions, regionSelectOptions } from '@/utils/constants';
import styles from './Initiatives.less';

const URL = process.env.SERVER_URL;

function InitiativeEdit({ item, tableRef, setFormDisabled }) {
  const [loading, setLoading] = useState(false);
  const [evidenceBeforeFileList, setEvidenceBeforeFileList] = useState([]);
  const [evidenceAfterFileList, setEvidenceAfterFileList] = useState([]);
  const { user } = useAppContext();

  const updateInitiative = async (values) => {
    setLoading(true);

    // Send axios request
    editInitiative(values, { id: item._id, evidenceBeforeFileList, evidenceAfterFileList })
      .then((res) => {
        setLoading(false);
        setFormDisabled(true);
        tableRef.current.reload();
        if (res.data.success) {
          message.success('Initiative has been successfully updated!');
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to update initiative, please try later!', 10);
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

  const evidencesBeforeProps = {
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

  const evidencesAfterProps = {
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
    <ProForm
      initialValues={{
        ...item,
      }}
      submitter={{
        render: (props) => (
          <Button
            type="primary"
            loading={loading}
            disabled={!['auditor'].includes(user?.role)}
            onClick={() => props.form.submit()}
          >
            Submit
          </Button>
        ),
      }}
      onFinish={updateInitiative}
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
        width=" xl "
        name="details"
        label="Initiatives / Improvements / Action Taken"
        placeholder="Add initiative details"
        rules={[{ required: true, message: 'Please write initiative detail!' }]}
      />
      <Typography.Text>Evidence Before </Typography.Text>
      <Tooltip title="Supported extensions are .jpg .jpeg .png">
        <QuestionCircleOutlined style={{ color: '#959595' }} />
      </Tooltip>{' '}
      <Upload {...evidencesBeforeProps}>
        <Button icon={<UploadOutlined />}>Select multiple images</Button>
      </Upload>
      <Row style={{ padding: '15px 0px' }} gutter={[8, 8]}>
        {item?.evidencesBefore?.length > 0
          ? item?.evidencesBefore?.map((image) => (
              <Col key={image} className={styles.issue_image_container}>
                <DeleteTwoTone
                  className={styles.issue_delete_btn}
                  twoToneColor="red"
                  onClick={() => deleteImage('initiatives', 'evidenceBefore', image)}
                />
                <Image src={URL + image} className={styles.issue_image} />
              </Col>
            ))
          : null}
      </Row>
      <Typography.Text>Evidence After </Typography.Text>
      <Tooltip title="Supported extensions are .jpg .jpeg .png">
        <QuestionCircleOutlined style={{ color: '#959595' }} />
      </Tooltip>{' '}
      <Upload {...evidencesAfterProps}>
        <Button icon={<UploadOutlined />}>Select multiple images</Button>
      </Upload>
      <Row style={{ padding: '15px 0px' }} gutter={[8, 8]}>
        {item?.evidencesAfter?.length > 0
          ? item?.evidencesAfter?.map((image) => (
              <Col key={image} className={styles.issue_image_container}>
                <DeleteTwoTone
                  className={styles.issue_delete_btn}
                  twoToneColor="red"
                  onClick={() => deleteImage('initiatives', 'evidenceAfter', image)}
                />
                <Image src={URL + image} className={styles.issue_image} />
              </Col>
            ))
          : null}
      </Row>
    </ProForm>
  );
}

export default InitiativeEdit;
