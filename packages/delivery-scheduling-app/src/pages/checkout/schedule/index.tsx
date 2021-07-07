import DateUtils from '../../../shared/utils/date-utils';
import axios from 'axios';
import styles from '../../../styles/pages/schedule.module.scss';
import { GetServerSideProps } from 'next';
import { Layout } from 'antd';
import { Schedule, Slot } from 'delivery-scheduling-app/src/interfaces';

const { Content } = Layout;

export interface SchedulesProps {
  schedules: Schedule[],
  dates: string[],
}

const Schedules: React.FC<SchedulesProps> = (props: SchedulesProps) => (
  <div className='page-container schedule-page'>
    <Content className={styles.scheduleContent} style={{ width: '100%' }}>
      {!props?.schedules?.length && (
        <p>Oops! O carrinho de compras encontra-se vazio...</p>
      )}
      {props.schedules?.map(data => (
        <p>{ JSON.stringify(data) }</p>
      ))}
    </Content>
  </div>
);


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const api = process.env?.SERVER_API_BASE_URL;

  if (!api) {
    throw new Error('API not found');
  }

  const query = ctx.query;
  const { seller } = query;

  if(!seller) {
    return { props: {} };
  }

  const sellerCodes: string[] = Array.isArray(seller) ? seller : [...[seller]];
  const timeWindowDays = 15;
  const now = new Date();
  const twoWeeksWindow = DateUtils.getInstance().addDays(new Date(), timeWindowDays);
  const dates: string[] = DateUtils.getInstance().getDatesUntil(now, timeWindowDays);

  const promises = sellerCodes.map(async (code) => {
    const url = `${api}/slots?sellerCode=${code}&untilDate=${twoWeeksWindow.toISOString()}`;
    const { data } = await axios.get<{ slots: Slot[] }>(url);

    return {
      sellerCode: code,
      slots: data.slots,
    };
  });

  const schedules: Schedule[] = await Promise.all(promises);

  return {
    props: {
      dates,
      schedules,
    },
  };
};

export default Schedules;
