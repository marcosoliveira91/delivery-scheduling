import styles from '../../styles/pages/admin.module.scss';
import { GetServerSideProps } from 'next';
import { Layout } from 'antd';

const { Content } = Layout;

export interface AdminProps {
  sellers: {
    code: string;
  }[]
}

const Admin: React.FC<AdminProps> = (_props: AdminProps) => {
  return (
    <div className='page-container'>
      <Content className={styles.adminContent}  style={{ width: '100%' }}>
      </Content>
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  // const api = process.env?.API_BASE_URL;

  // if (!api) {
  //   throw new Error('API not found');
  // }

  // for each seller:
  // const { data } = await axios({
  //   method: 'GET',
  //   url: `${api}/slots/:code`,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   data: body,
  // });

  return Promise.resolve({
    props: {
      sellers: [],
    },
  });
};

export default Admin;
