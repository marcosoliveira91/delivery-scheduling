import DateUtils from '../shared/utils/date-utils';
import styles from '../styles/components/SellerScheduleDays.module.scss';
import { Tabs, Radio } from 'antd';
import { Slot } from '../interfaces';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

const { TabPane } = Tabs;

interface SellerScheduleDaysProps {
 dates: string[];
 sellerSlots: Slot[]
}

export const SellerScheduleDays: React.FC<SellerScheduleDaysProps> = ({ dates, sellerSlots }: SellerScheduleDaysProps) => {
  // let readyResult: { sellerCode: string, slotCode: string };
  // const [ready, setReady] = useState(readyResult);
  // const url = `${process.env?.NEXT_PUBLIC_SERVER_API_BASE_URL as string}/slots/${ready.sellerCode}`;

  // useEffect(() => {
  //   async function fetchAPI() {
  //     if(ready) {
  //       const { data } = await axios.put<{ customerCode: string, sellerCode: string }>(url);

  //       // eslint-disable-next-line no-console
  //       console.log(data);
  //     }
  //   }

  //   void fetchAPI();
  // });

  const SlotsList: React.FC<{ slots: Slot[] }> = ({ slots }: { slots: Slot[] }) => {
    const DateUtil = DateUtils.getInstance();

    return (
      <div className={styles.slotsList}>
        <Radio.Group
          key={slots[0].sellerCode}
          buttonStyle='solid'
          optionType='button'
          size='middle'
          style={{ marginTop: 16 }}>
          {
            slots?.map(slot => {
              const [from, to]: string[] = DateUtil.toTimeSlotFormat(slot.startDate, slot.endDate);

              return (
                <Radio.Button key={slot.code} value={slot.code} disabled={!slot.isAvailable}>
                  {from} - {to}
                </Radio.Button>
              );
            })
          }
        </Radio.Group>
      </div>
    );
  };

  return (
    <Tabs className={styles.datesTabs} defaultActiveKey="0" tabPosition={'top'} centered type='card'>
      {dates.map(day => {
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
        const slotsFilterdByDay = sellerSlots.filter(slot => (slot.startDate as string).split('T')[0] === day);

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
