import { Link } from 'react-router-dom';

const ErrorPage = () => {
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
      textAlign: 'center',
    },
    title: {
      margin: 0,
      marginBottom: '10px',
      fontSize: '26px',
    },
    paragraph: {
      margin: '8px 0 0',
      lineHeight: 1.7,
      color: '#374151',
      fontSize: '16px',
    },
    link: {
      marginTop: '18px',
      display: 'inline-block',
      background: '#2563eb',
      color: '#fff',
      padding: '10px 16px',
      borderRadius: '8px',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Error</h1>
        <p style={styles.paragraph}>Something went wrong.</p>
        <Link to='/' style={styles.link} className='btn-link'>
          Повернутись на головну
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
