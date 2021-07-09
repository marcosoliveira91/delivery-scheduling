import DateUtils from '../../../shared/utils/date-utils';
import styles from '../../../styles/pages/schedule.module.scss';
import { CheckoutStepBar } from '../../../components/CheckoutStepBar';
import { getSellers } from '../../api/sellers';
import { GetServerSideProps } from 'next';
import { getSlots } from '../../api/slots';
import { Layout } from 'antd';
import { Schedule, Seller } from '../../../interfaces';

export interface SchedulesProps {
  schedules: Schedule[],
  dates: string[],
}

const { Content } = Layout;

const CheckoutSchedule: React.FC<SchedulesProps> = ({ schedules, dates }: SchedulesProps) => (
  <div className='page-container schedule-page'>
    <Content className={styles.scheduleContent} style={{ width: '100%' }}>
      <CheckoutStepBar
        currentStep={schedules?.length ? 2 : 0}
        {...{
          schedules,
          dates,
        }}
      />
    </Content>
  </div>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.query;
  const sellerCode = query.seller;
  const DateUtil = DateUtils.getInstance();

  if (!sellerCode) {
    return { props: {} };
  }

  const timeWindowDays = 15;
  const now = new Date();
  const twoWeeksWindow = DateUtil.addDays(new Date(), timeWindowDays);
  const dates: string[] = DateUtil.getDatesUntil(now, timeWindowDays);
  const sellerCodes: string[] = Array.isArray(sellerCode) ? sellerCode : [...[sellerCode]];
  const { sellers } = await getSellers();

  const promises = sellerCodes.map(async (code) => {
    const foundSeller: Seller = sellers?.find(seller => seller.code === code);

    const { slots } = await getSlots({
      sellerCode: code,
      untilDate: twoWeeksWindow.toISOString(),
    });

    return {
      seller: {
        code,
        name: foundSeller?.name,
      },
      slots,
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
