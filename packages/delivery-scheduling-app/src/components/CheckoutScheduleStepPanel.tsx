import styles from '../styles/components/CheckoutScheduleStepPanel.module.scss';
import { bookSlot } from '../pages/api/slots/book';
import { Button, Form, message } from 'antd';
import { mockGetUserSession } from '../shared/utils/session.mock';
import { Schedule } from '../interfaces/schedule.interface';
import { SchedulesProps } from '../pages/checkout/schedule/index';
import { SellerScheduleDays } from './SellerScheduleDays';
import { useEffect, useState } from 'react';

interface CheckoutScheduleStepPanelProps {
  schedules: Schedule[],
  dates: string[],
}

export const CheckoutScheduleStepPanel: React.FC<SchedulesProps> = ({ schedules, dates }: CheckoutScheduleStepPanelProps) => {
  const [loggedUser, updateLoggedUser] = useState({
    role: '',
    uuid: '',
  });

  useEffect(() => {
    updateLoggedUser({...mockGetUserSession()});
  },[]);

  const onFinish = async (values: Record<string, string>) => {

    const promises = Object.keys(values).map(sellerCode => {
      return bookSlot({
        code: values[sellerCode],
        sellerCode,
        customerCode: loggedUser?.uuid,
      });
    });

    try {
      await Promise.all(promises);
      return message.success('Horário seleccionado');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return message.error('Isto foi embaraçoso... Por favor, volte a tentar.');
    }
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
        <Form.Item className={styles.schedulesFormButtonWrapper}>
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
