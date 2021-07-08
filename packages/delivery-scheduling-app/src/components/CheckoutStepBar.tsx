import styles from '../styles/components/CheckoutStepBar.module.scss';
import { CheckoutScheduleStepPanel } from '../components/CheckoutScheduleStepPanel';
import { Schedule } from '../interfaces';
import { Steps } from 'antd';
import { useState } from 'react';

export interface CheckoutStepBarProps {
  currentStep: number;
  schedules: Schedule[];
  dates: string[];
}

const FallbackMessage: React.FC = () => (
  <p style={{
    margin: '50px',
    fontWeight: 'lighter',
  }}>
    Oops! O carrinho de compras encontra-se vazio...
  </p>
);

const { Step } = Steps;

export const CheckoutStepBar: React.FC<{ currentStep: number; }> = (props: CheckoutStepBarProps) => {
  const { currentStep, dates, schedules } = props;
  const [current] = useState(currentStep);
  const steps = [
    {
      title: 'Dados',
    },
    {
      title: 'Morada',
    },
    {
      title: 'Horário',
    },
    {
      title: 'Pagamento',
    },
  ];

  return(
    <div className={styles.stepBar}>
      <Steps current={current}>
        {steps.map(step => <Step title={step.title} key={step.title}/>)}
      </Steps>
      <div className="steps-content">
        { current === 0 && <FallbackMessage /> }
        { current === 2 && <CheckoutScheduleStepPanel schedules={schedules} dates={dates}/> }
      </div>
    </div>
  );};
