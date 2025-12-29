import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodoById, updateTodo } from '../../api/api';
import Loader from '../../components/Loader/Loader';
import { useState, useEffect } from 'react';

const TodoEdit = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => getTodoById(id),
    enabled: !!id,
  });

  const [form, setForm] = useState({ title: '', description: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data) setForm({ title: data.title, description: data.description });
  }, [data]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    try {
      await updateTodo(id, { ...data, ...form });
      await queryClient.invalidateQueries(['todosList']);
      await queryClient.invalidateQueries(['todo', id]);

      // Always navigate current tab back to /todo-list after save
      navigate('/todo-list');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 140px)',
      padding: '20px',
      background: '#f8fafc',
    },
    card: {
      width: '100%',
      maxWidth: '760px',
      background: '#ffffff',
      padding: '22px',
      borderRadius: '10px',
      boxShadow: '0 8px 24px rgba(16,24,40,0.06)',
    },
    field: {
      display: 'block',
      width: '100%',
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
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={{ marginTop: 0 }}>Редагування Туду Ліст</h1>
        {isFetching ? (
          <Loader />
        ) : (
          <form onSubmit={handleSave}>
            <input
              name='title'
              style={styles.field}
              value={form.title}
              onChange={handleChange}
            />
            <textarea
              name='description'
              style={{ ...styles.field, minHeight: '120px' }}
              value={form.description}
              onChange={handleChange}
            />

            <div style={styles.actions}>
              <Link
                to='/todo-list'
                className='action-link'
                onClick={handleSave}
                aria-disabled={isSaving}
              >
                {isSaving ? 'Зберігаю...' : 'Зберегти'}
              </Link>
              <Link to='/todo-list' className='action-link'>
                Скасувати
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TodoEdit;
