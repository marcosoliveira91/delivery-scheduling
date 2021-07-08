import axios from 'axios';
import { mockGetUserSession } from '../shared/utils/session.mock';
import styles from '../styles/components/CheckoutScheduleStepPanel.module.scss';
import { Button, Form, message } from 'antd';
import { Schedule } from '../interfaces/schedule.interface';
import { SchedulesProps } from '../pages/checkout/schedule/index';
import { SellerScheduleDays } from './SellerScheduleDays';
/* eslint-disable no-console */

interface CheckoutScheduleStepPanelProps {
  schedules: Schedule[],
  dates: string[],
}

export const CheckoutScheduleStepPanel: React.FC<SchedulesProps> = ({ schedules, dates }: CheckoutScheduleStepPanelProps) => {
  const onFinish = async (values: Record<string, string>) => {
    console.log('Received values of form: ', values);
    try {
      const promises = Object.keys(values).map(sellerCode => {
        const api = process.env.apiBaseUrl;
        const url = `${String(api)}/slots/${values[sellerCode]}/book`;

        return axios.put<{customerCode: string; sellerCode: string;}>(
          url,
          {
            customerCode: mockGetUserSession().uuid,
            sellerCode,
          });
      });

      const data = await Promise.all(promises);

      console.log(data);
      return message.success('Horário seleccionado');
    } catch (err) {
      console.error(err);
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
