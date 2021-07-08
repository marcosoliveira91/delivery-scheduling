/* eslint-disable no-console */
import styles from '../styles/components/CheckoutScheduleStepPanel.module.scss';
import { Schedule } from '../interfaces/schedule.interface';
import { SchedulesProps } from '../pages/checkout/schedule/index';
import { SellerScheduleDays } from './SellerScheduleDays';
import { Button, Form } from 'antd';

interface CheckoutScheduleStepPanelProps {
  schedules: Schedule[],
  dates: string[],
}

export const CheckoutScheduleStepPanel: React.FC<SchedulesProps> = ({ schedules, dates }: CheckoutScheduleStepPanelProps) => {
  const onFinish = (values: Record<string, string>) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className={styles.checkoutScheduleStepPanel}>
      <Form
        name='schedules-form'
        onFinish={onFinish}
        className={styles.schedulesForm}
      >
        {schedules.map(sellerSchedule => (
          <Form.Item
            name={`${sellerSchedule.seller?.code }`}
            key={sellerSchedule.seller.code}
            rules={[{ required: true,
              message: 'Por favor, escolha um horário disponível antes de finalizar a sua compra.'}]}>
            <section className={styles.scheduleSection}>
              <h3 className={styles.sellerName}>{sellerSchedule.seller.name}</h3>
              <SellerScheduleDays dates={dates} sellerSlots={sellerSchedule.slots}/>
            </section>
          </Form.Item>
        ))}
        <Form.Item
          className={styles.schedulesFormButtonWrapper}
        >
          <Button
            className={styles.schedulesFormButton}
            type='primary'
            htmlType='submit'
            size={'large'}
          >
              Seguinte -&gt;
          </Button>
        </Form.Item>
      </Form>
    </div>
  );};
