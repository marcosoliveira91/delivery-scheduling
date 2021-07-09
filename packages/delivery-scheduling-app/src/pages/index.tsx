import styles from '../styles/pages/index.module.scss';
import { Layout } from 'antd';
import { mockNewUserSession } from '../shared/utils/session.mock';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  const [loggedUser, updateLoggedUser] = useState({
    role: '',
    uuid: '',
  });

  useEffect(() => {
    updateLoggedUser({...mockNewUserSession('customer')});
  },[]);

  return (
    <div className='page-container homepage'>
      <Layout.Content className={styles.homeContent}>
        { loggedUser && <h1 className={styles.welcomeMessage}>👋 !</h1> }
        <p><b>Exemplos de casos de uso:</b></p>
        <br></br>
        <Link href='/checkout/schedule?seller=2VO6Q8XGMD'>
          <a>Exemplo 1: Checkout com 1 loja</a>
        </Link>
        <br></br>
        <Link href='/checkout/schedule?seller=WLO3RQJP26&seller=6WK9LNZMYQ&seller=2VO6Q8XGMD'>
          <a>Exemplo 2: Checkout com 3 lojas</a>
        </Link>
        <p>Para outros exemplos:</p>
        <ul>
          <li>1. listar lojas através da API
            <Link href='/api/sellers'>
              <a><code>/api/sellers</code></a>
            </Link>
          </li>
          <li>2. navegar para checkout através da página
            <Link href='/checkout/schedule?'>
              <a><code>/checkout/schedule?seller=[CODE]</code></a>
            </Link>
          </li>
        </ul>
      </Layout.Content>
    </div>
  );
};

export default Home;
