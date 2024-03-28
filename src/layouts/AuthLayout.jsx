import { footerText, tagLine } from '@/utils/constants';
import jwt_decode from 'jwt-decode';
import { connect, Link, Redirect } from 'umi';

import { useAppContext } from '@/contexts/AppContext';
import styles from './AuthLayout.less';

const AuthLayout = ({ children }) => {
  const { token } = useAppContext();

  // Check for Token
  if (token) {
    // Decode token and get user info and expression
    const decoded = jwt_decode(token);
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp > currentTime) {
      // Redirect to respective page if token has not expired
      return <Redirect to={`/user/`} />;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/AuditRail_LOGO.png" />
            </Link>
          </div>
          <div className={styles.desc}>{tagLine}</div>
        </div>
        {children}
      </div>
      <div className={styles.footer}>{footerText}</div>
    </div>
  );
};

export default connect(({ settings }) => ({ ...settings }))(AuthLayout);
