import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { getAllUsers } from '../../api/api';

const Login = ({ setLoginUser, setIsAuthenticated }) => {
  const [form, setForm] = useState({ username: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedUsername = form.username.trim();
    const trimmedEmail = form.email.trim();

    if (!trimmedUsername || !trimmedEmail) {
      setError('Введіть username та email');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      // Отримуємо список користувачів для валідації
      const users = await getAllUsers();

      // Перевіряємо чи існує користувач з такими даними
      const validUser = users.find(
        (user) =>
          String(user.username || '')
            .trim()
            .toLowerCase() === trimmedUsername.toLowerCase() &&
          String(user.email || '')
            .trim()
            .toLowerCase() === trimmedEmail.toLowerCase()
      );

      if (!validUser) {
        setError('Невірний username або email');
        setIsLoading(false);
        return;
      }

      // Якщо валідація пройшла успішно
      setLoginUser({ username: trimmedUsername, email: trimmedEmail });
      setIsAuthenticated(true);
      navigate('/todo-list');
    } catch (err) {
      console.error('Login error:', err);
      setError('Помилка авторизації. Спробуйте ще раз');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 140px)',
      padding: '20px',
      background: '#f8fafc',
    },
    card: {
      width: '100%',
      maxWidth: '420px',
      background: '#ffffff',
      padding: '22px',
      borderRadius: '10px',
      boxShadow: '0 8px 24px rgba(16,24,40,0.06)',
    },
    field: {
      display: 'block',
      width: '95%',
      marginBottom: '12px',
      padding: '10px 12px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      fontSize: '14px',
    },
    actions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '14px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginTop: 0 }}>Вхід</h2>
        <form onSubmit={handleSubmit}>
          <input
            name='username'
            placeholder='username'
            style={styles.field}
            value={form.username}
            onChange={handleChange}
            disabled={isLoading}
          />
          <input
            name='email'
            placeholder='email'
            style={styles.field}
            value={form.email}
            onChange={handleChange}
            disabled={isLoading}
          />

          {error && (
            <div style={{ color: '#b91c1c', marginBottom: '12px' }}>
              {error}
            </div>
          )}

          <div style={styles.actions}>
            <button
              type='submit'
              disabled={isLoading}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                background: '#2563eb',
                color: '#fff',
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? 'Зачекайте...' : 'Увійти'}
            </button>
          </div>
        </form>
      </div>

      {isLoading && <Loader />}
    </div>
  );
};

export default Login;
