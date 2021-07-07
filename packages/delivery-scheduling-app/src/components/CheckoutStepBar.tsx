import styles from '../styles/components/CheckoutStepBar.module.scss';
import { Steps } from 'antd';

const { Step } = Steps;

export const CheckoutStepBar: React.FC<{ current: number; }> = ({ current }: { current: number; }) => (
  <div className={styles.stepBar}>
    <Steps current={current}>
      <Step title="Dados" />
      <Step title="Morada" />
      <Step title="Horário" />
      <Step title="Pagamento" />
    </Steps>
  </div>
);
