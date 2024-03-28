import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Alert, Card, message } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';

import { useAppContext } from '@/contexts/AppContext';
import { getUserByRole, submitInitiative } from '@/services';
import InitiativeForm from '../../components/Initiatives/InitiativeForm';

const InitiativeFormPage = () => {
  const [loading, setLoading] = useState(false);
  const [evidenceBeforeFileList, setEvidenceBeforeFileList] = useState([]);
  const [evidenceAfterFileList, setEvidenceAfterFileList] = useState([]);
  const [stationMangers, setStationMangers] = useState([]);
  const { user } = useAppContext();

  useEffect(() => {
    const fetch = async () => {
      const sm = await getUserByRole('sm');
      setStationMangers(sm.data.users);
    };
    fetch();
  }, []);

  const submitForm = async (values) => {
    setLoading(true);

    submitInitiative(values, { evidenceBeforeFileList, evidenceAfterFileList })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          message.success('Initiative has been successfully published!');
          history.push('/user/reports/initiative-reports');
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to publish initiative!', 10);
      });
  };

  const alertMessage = () => {
    const roleMessages = {
      admin:
        'You have signed up as admin, you can not submit an initiative. Please signup as auditor in order to submit an initiative.',
      sm: 'You have signed up as station manager, you can not submit an initiative. Please signup as auditor in order to submit an initiative.',
      viewer:
        'You have signed up as viewer, you can not submit an initiative. Please signup as auditor in order to submit an initiative.',
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
    <PageHeaderWrapper content="Enter initiative details here by completing the form below">
      {alertMessage()}
      <Card>
        <InitiativeForm
          loading={loading}
          submitForm={submitForm}
          evidenceBeforeFileList={evidenceBeforeFileList}
          setEvidenceBeforeFileList={setEvidenceBeforeFileList}
          evidenceAfterFileList={evidenceAfterFileList}
          setEvidenceAfterFileList={setEvidenceAfterFileList}
          stationMangers={stationMangers}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default InitiativeFormPage;
