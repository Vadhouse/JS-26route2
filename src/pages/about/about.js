import { Link } from 'react-router-dom';

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 70px)',
    padding: '24px',
    background: '#f6f8fb',
  },
  card: {
    width: '100%',
    maxWidth: '820px',
    background: '#ffffff',
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 8px 22px rgba(16,24,40,0.08)',
    color: '#111827',
  },
  title: {
    margin: 0,
    marginBottom: '10px',
    fontSize: '26px',
    textAlign: 'center',
  },
  paragraph: {
    margin: '10px 0',
    lineHeight: 1.7,
    color: '#374151',
    fontSize: '15px',
  },
  link: {
    display: 'inline-block',
    marginTop: '14px',
    background: '#2563eb',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
  },
};

const About = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Про застосунок</h1>
        <p style={styles.paragraph}>
          React Router — це бібліотека, яка дозволяє створювати маршрути в
          односторінкових додатках (SPA). Вона синхронізує URL-адресу з
          компонентами інтерфейсу, забезпечуючи навігацію без повного
          перезавантаження сторінки.
        </p>
        <p style={styles.paragraph}>
          Технології та підходи: <strong>React.js</strong>,{' '}
          <strong>React Router DOM</strong>, <strong>History API</strong> та
          Hooks (наприклад, <code>useNavigate</code>, <code>useParams</code>).
        </p>
        <p style={styles.paragraph}>
          Автори та історія: Майкл Джексон і Раян Флоренс — одні з ключових
          авторів React Router. Вони багато внесли в розвиток архітектури
          фронтенд-додатків і пов'язаних інструментів.
        </p>
        <Link style={styles.link} to='/'>
          Повернутися на головну
        </Link>
      </div>
    </div>
  );
};

export default About;
