import styles from '../styles/pages/index.module.scss';
import { Layout } from 'antd';

const Home: React.FC = () => {
  return (
    <div className='page-container homepage'>
      <Layout.Content className={styles.homeContent}>
      // example with 1 seller /checkout/schedule?seller=WLO3RQJP26
      // example with 2 sellers /checkout/schedule?seller=WLO3RQJP26&seller=6WK9LNZMYQ
      </Layout.Content>
    </div>
  );
};

export default Home;
