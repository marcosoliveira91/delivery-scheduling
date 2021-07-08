import axios from 'axios';
import DateUtils from '../../../shared/utils/date-utils';
import styles from '../../../styles/pages/schedule.module.scss';
// import { CheckoutScheduleStepPanel } from '../../../components/CheckoutScheduleStepPanel';
import { CheckoutStepBar } from '../../../components/CheckoutStepBar';
import { GetServerSideProps } from 'next';
import { Layout } from 'antd';
import { Schedule, Slot } from 'delivery-scheduling-app/src/interfaces';
import { Seller } from 'delivery-scheduling-app/src/interfaces/seller.interface';

const { Content } = Layout;

export interface SchedulesProps {
  schedules: Schedule[],
  dates: string[],
}

const CheckoutSchedule: React.FC<SchedulesProps> = ({ schedules, dates }: SchedulesProps) => (
  <div className='page-container schedule-page'>
    <Content className={styles.scheduleContent} style={{ width: '100%' }}>
      <CheckoutStepBar
        currentStep={schedules?.length ? 2 : 0}
        {...{
          schedules,
          dates}
        }
      />
    </Content>
  </div>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const api = process.env?.SERVER_API_BASE_URL;

  if (!api) {
    throw new Error('API not found');
  }

  const query = ctx.query;
  const sellerCode = query.seller;

  if (!sellerCode) {
    return { props: {} };
  }

  const timeWindowDays = 15;
  const now = new Date();
  const twoWeeksWindow = DateUtils.getInstance().addDays(new Date(), timeWindowDays);
  const dates: string[] = DateUtils.getInstance().getDatesUntil(now, timeWindowDays);
  const sellerCodes: string[] = Array.isArray(sellerCode) ? sellerCode : [...[sellerCode]];
  const sellersResp = await axios.get<{ sellers: Seller[] }>(`${api}/sellers`);

  const promises = sellerCodes.map(async (code) => {
    const foundSeller: Seller = sellersResp?.data?.sellers.find(el => el.code === code);

    const url = `${api}/slots?sellerCode=${code}&untilDate=${twoWeeksWindow.toISOString()}`;
    const { data } = await axios.get<{ slots: Slot[] }>(url);

    return {
      seller: {
        code,
        name: foundSeller.name,
      },
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

export default CheckoutSchedule;
