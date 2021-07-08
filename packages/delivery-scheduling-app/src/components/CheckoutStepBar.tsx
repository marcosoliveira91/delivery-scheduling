import styles from '../styles/components/CheckoutStepBar.module.scss';
import { Steps } from 'antd';
// import { useState } from 'react';

const { Step } = Steps;

export const CheckoutStepBar: React.FC<{ current: number; }> = ({ current }: { current: number; }) => {
  // const [current, setCurrent] = useState(0);
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

  // const next = () => {
  //   setCurrent(current + 1);
  // };

  return(
    <div className={styles.stepBar}>
      <Steps current={current}>
        {steps.map(step => <Step title={step.title} key={step.title}/>)}
      </Steps>
      {/* <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
      </div> */}
    </div>
  );};
