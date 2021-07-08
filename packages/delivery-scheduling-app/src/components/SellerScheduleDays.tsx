import DateUtils from '../shared/utils/date-utils';
import styles from '../styles/components/SellerScheduleDays.module.scss';
import { SlotsList } from './SlotsList';
import { Tabs } from 'antd';
import { Slot } from '../interfaces';

const { TabPane } = Tabs;

interface SellerScheduleDaysProps {
 dates: string[];
 sellerSlots: Slot[]
}

export const SellerScheduleDays: React.FC<SellerScheduleDaysProps> = ({ dates, sellerSlots }: SellerScheduleDaysProps) => {
  return (
    <Tabs className={styles.datesTabs} defaultActiveKey='0' tabPosition={'top'} centered type='card'>
      {dates.sort().map(day => {
        const DateUtil = DateUtils.getInstance();
        const threeLetterDay: string = DateUtil.format(day, { weekday: 'short' }).slice(0, 3);
        const dayDigit: string = DateUtil.format(day, { day: 'numeric' });
        const formattedDay = DateUtil.format(day, {
          day: 'numeric',
          month: 'long',
          weekday: 'long',
        });
        const tabItem = (
          <span className={styles.tabItem}>
            <div>{dayDigit}</div>
            <div>{threeLetterDay}</div>
          </span>
        );
        const slotsFilterdByDay = sellerSlots
          .filter(slot => (slot.startDate as string).split('T')[0] === day);

        return (
          <TabPane className={styles.datesTabPane} tab={tabItem} key={day}>
            <p className={styles.availabilityLabel}>Disponibilidade para {formattedDay}</p>
            {
              slotsFilterdByDay.length ?
                <SlotsList slots={slotsFilterdByDay} /> :
                <p className={styles.noSlotsMessage}>Não disponível. Por favor, Seleccione outro horário.</p>
            }
          </TabPane>
        );
      })}
    </Tabs>
  );
};
