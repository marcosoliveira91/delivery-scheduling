import styles from '../styles/components/SlotsList.module.scss';
import DateUtils from '../shared/utils/date-utils';
import { Radio } from 'antd';
import { Slot } from '../interfaces';

export const SlotsList: React.FC<{ slots: Slot[] }> = ({ slots }: { slots: Slot[] }) => {
  const DateUtil = DateUtils.getInstance();

  slots.sort((a,b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return (
    <div className={styles.slotsList}>
      <Radio.Group
        name={`radiogroup-${slots[0].sellerCode}`}
        key={slots[0].sellerCode}
        buttonStyle='solid'
        optionType='button'
        size='middle'
        style={{ marginTop: 16 }}>
        {
          slots?.map(slot => {
            const [from, to]: string[] = DateUtil.toTimeSlotFormat(slot.startDate, slot.endDate);

            return (
              <Radio.Button key={slot.code} value={slot.code} disabled={!slot.isAvailable} defaultChecked={false}>
                {from} - {to}
              </Radio.Button>
            );
          })
        }
      </Radio.Group>
    </div>
  );
};
