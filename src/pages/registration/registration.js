import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { getAllUsers, addUser } from '../../api/api';

const Registration = ({ setLoginUser, setIsAuthenticated }) => {
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

    // Перевірка формату email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Введіть коректний email');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Отримуємо список користувачів для перевірки унікальності
      const users = await getAllUsers();

      // Перевіряємо чи існує користувач з таким username
      const existingUser = users.find(
        (user) =>
          String(user.username || '')
            .trim()
            .toLowerCase() === trimmedUsername.toLowerCase() ||
          String(user.email || '')
            .trim()
            .toLowerCase() === trimmedEmail.toLowerCase()
      );

      if (existingUser) {
        if (
          String(existingUser.username || '')
            .trim()
            .toLowerCase() === trimmedUsername.toLowerCase()
        ) {
          setError('Користувач з таким username вже існує');
        } else {
          setError('Користувач з таким email вже існує');
        }
        setIsLoading(false);
        return;
      }

      // Створюємо нового користувача
      const newId =
        users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      await addUser({
        id: newId,
        username: trimmedUsername,
        email: trimmedEmail,
      });

      // Автоматично авторизуємо користувача після реєстрації
      const userData = { username: trimmedUsername, email: trimmedEmail };
      setLoginUser(userData);
      setIsAuthenticated(true);

      // Зберігаємо дані користувача в localStorage
      localStorage.setItem('username', trimmedUsername);
      localStorage.setItem('email', trimmedEmail);

      navigate('/todo-list');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Помилка реєстрації. Спробуйте ще раз');
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
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '14px',
    },
    link: {
      color: '#2563eb',
      textDecoration: 'none',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginTop: 0 }}>Реєстрація</h2>
        <form onSubmit={handleSubmit}>
          <input
            name='username'
            placeholder='username'
            style={styles.field}
            value={form.username}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
          <input
            name='email'
            type='email'
            placeholder='email'
            style={styles.field}
            value={form.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />

          {error && (
            <div style={{ color: '#b91c1c', marginBottom: '12px' }}>
              {error}
            </div>
          )}

          <div style={styles.actions}>
            <Link to='/login' style={styles.link}>
              Вже маєте акаунт? Увійти
            </Link>
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
              {isLoading ? 'Зачекайте...' : 'Зареєструватися'}
            </button>
          </div>
        </form>
      </div>

      {isLoading && <Loader />}
    </div>
  );
};

export default Registration;
