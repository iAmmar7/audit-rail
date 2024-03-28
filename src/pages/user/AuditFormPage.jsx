import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, Card, message } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';

import { useAppContext } from '@/contexts/AppContext';
import { getUserByRole, submitAuditReport } from '@/services';
import AuditForm from '../../components/Audit/AuditForm';

const PrioritiesForm = () => {
  const [loading, setLoading] = useState(false);
  const [evidenceFileList, setEvidenceFileList] = useState([]);
  const [stationManagers, setStationManagers] = useState([]);
  const { user } = useAppContext();

  useEffect(() => {
    const fetch = async () => {
      const sm = await getUserByRole('sm');
      setStationManagers(sm.data.users);
    };
    fetch();
  }, []);

  const submitForm = async (values) => {
    setLoading(true);

    submitAuditReport(values, evidenceFileList)
      .then((res) => {
        if (res.data.success) {
          message.success('Issue has been successfully published!');
          history.push('/user/reports/audit-reports');
        }
      })
      .catch(() => {
        message.error('Unable to publish issue!', 10);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const alertMessage = () => {
    const roleMessages = {
      admin:
        'You have signed up as admin, you cannot submit an issue. Please sign up as auditor in order to raise an issue.',
      sm: 'You have signed up as station manager, you cannot submit an issue. Please sign up as auditor in order to raise an issue.',
      viewer:
        'You have signed up as viewer, you cannot submit an issue. Please sign up as auditor in order to raise an issue.',
    };

    let messageText = roleMessages[user?.role];

    return (
      messageText && (
        <Alert
          style={{
            marginBottom: 24,
          }}
          message={messageText}
          type="error"
          showIcon
        />
      )
    );
  };

  return (
    <PageHeaderWrapper content="Raise an issue here by completing the form below">
      {alertMessage()}
      <Card>
        <AuditForm
          loading={loading}
          submitForm={submitForm}
          evidenceFileList={evidenceFileList}
          setEvidenceFileList={setEvidenceFileList}
          stationManagers={stationManagers}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default PrioritiesForm;
