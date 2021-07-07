import styles from '../styles/components/CheckoutScheduleStepPanel.module.scss';
import { Schedule } from '../interfaces/schedule.interface';
import { SchedulesProps } from '../pages/checkout/schedule/index';
import { SellerScheduleDays } from './SellerScheduleDays';

interface CheckoutScheduleStepPanelProps {
  schedules: Schedule[],
  dates: string[],
}

export const CheckoutScheduleStepPanel: React.FC<SchedulesProps> = ({ schedules, dates }: CheckoutScheduleStepPanelProps) => (
  <div className={styles.checkoutScheduleStepPanel}>
    {schedules.map(sellerSchedule => (
      <section className={styles.scheduleSection} key={sellerSchedule.seller.name}>
        <h3 className={styles.sellerName}>{sellerSchedule.seller.name}</h3>
        <SellerScheduleDays dates={dates} sellerSlots={sellerSchedule.slots}/>
      </section>
    ))}
  </div>
);
