import styles from '../../../styles/pages/admin.module.scss';
import { GetServerSideProps } from 'next';
import { Table, Layout } from 'antd';
import { getSellers } from '../../api/sellers';
import { Seller } from '../../../interfaces';

const { Content } = Layout;

export interface AdminProps {
  sellers: Seller[]
}
const columns = [
  {
    title: 'Ref.',
    dataIndex: 'code',
  },
  {
    title: 'Nome',
    dataIndex: 'name',
  },
];

const AdminSellers: React.FC<AdminProps> = ({ sellers }: AdminProps) => {

  return (
    <div className='page-container'>
      <Content className={styles.adminContent}  style={{ width: '100%' }}>
        <Table columns={columns} dataSource={sellers} />
      </Content>
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  const { sellers } = await getSellers();

  return {
    props: {
      sellers,
    },
  };
};

export default AdminSellers;
