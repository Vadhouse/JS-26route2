import { Link } from 'react-router-dom';

const Home = () => {
  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 140px)',
      padding: '22px',
      background: '#f8fafc',
    },
    card: {
      width: '100%',
      maxWidth: '820px',
      background: '#fff',
      padding: '26px',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(16,24,40,0.06)',
    },
    title: {
      margin: 0,
      marginBottom: '10px',
      textAlign: 'center',
      fontSize: '26px',
    },
    paragraph: {
      margin: '8px 0 0',
      lineHeight: 1.7,
      color: '#374151',
      fontSize: '16px',
      textAlign: 'center',
    },
    button: {
      marginTop: '18px',
      display: 'inline-block',
      background: '#2563eb',
      color: '#fff',
      padding: '10px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Вітаю!</h1>
        <p style={styles.paragraph}>
          Радий допомогти вам зануритися у світ розробки. Нехай цей огляд React
          Routing стане корисним кроком у створенні ваших сучасних та швидких
          вебдодатків. Бажаю цікавого перегляду!
        </p>
        <div style={{ textAlign: 'center' }}>
          <Link to='/todo-list' style={styles.button} className='btn-link'>
            Розпочати
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
