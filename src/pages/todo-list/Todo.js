import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTodosList,
  createTodo,
  deleteTodo,
  updateTodo,
} from '../../api/api';
import Loader from '../../components/Loader/Loader';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Todo = () => {
  const location = useLocation();
  const [editingTodo, setEditingTodo] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['todosList'],
    queryFn: getTodosList,
    refetchOnMount: true,
  });

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading: isAdding } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todosList'] }),
  });

  const { mutateAsync: deleteMutateAsync, isLoading: isDeleting } = useMutation(
    {
      mutationFn: (id) => deleteTodo(id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ['todosList'] }),
    }
  );

  const { mutateAsync: updateMutateAsync, isLoading: isUpdating } = useMutation(
    {
      mutationFn: ({ id, payload }) => updateTodo(id, payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todosList'] });
        setEditingTodo(null);
        setEditForm({ title: '', description: '' });
      },
    }
  );

  const handleAddTodo = async () => {
    const newId =
      data && data.length ? Math.max(...data.map((t) => t.id)) + 1 : 1;
    const sample =
      data && data.length
        ? data[0]
        : {
            description: 'lorem ipsum dolor sit amet, consectetur adip',
            checked: 'false',
            creationDate: 'дата створення',
          };

    await mutateAsync({
      id: newId,
      title: `todo ${newId}`,
      description: sample.description,
      checked: sample.checked,
      creationDate: sample.creationDate,
    });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm('Видалити цей todo?');
    if (!ok) return;
    await deleteMutateAsync(id);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setEditForm({ title: todo.title, description: todo.description });
  };

  const handleEditChange = (e) => {
    setEditForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editingTodo) return;
    await updateMutateAsync({
      id: editingTodo.id,
      payload: { ...editingTodo, ...editForm },
    });
  };

  const handleEditCancel = () => {
    setEditingTodo(null);
    setEditForm({ title: '', description: '' });
  };

  console.log(location.state);

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
    title: {
      margin: 0,
      marginBottom: '14px',
      textAlign: 'center',
      fontSize: '24px',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'grid',
      gap: '10px',
    },
    item: {
      padding: '12px',
      borderRadius: '8px',
      background: '#f3f4f6',
    },
    itemTitle: {
      fontWeight: 600,
      marginBottom: '6px',
    },
    itemDesc: {
      color: '#4b5563',
    },
  };

  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.title}>Туду Ліст</h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '12px',
            }}
          >
            <button
              onClick={handleAddTodo}
              disabled={isFetching || isAdding}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                background: '#2563eb',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              додати todo
            </button>
          </div>
          {isFetching && <Loader />}

          {isError && (
            <div
              style={{
                padding: '12px',
                background: '#fee2e2',
                borderRadius: '8px',
                color: '#b91c1c',
                marginBottom: '12px',
                textAlign: 'center',
              }}
            >
              Помилка завантаження todos. Переконайтеся, що локальний
              JSON-сервер запущений: <code>npm run server</code>
              {error?.message && (
                <div
                  style={{
                    marginTop: '8px',
                    fontSize: '13px',
                    color: '#7f1d1d',
                  }}
                >
                  {error.message}
                </div>
              )}
            </div>
          )}

          <ul style={styles.list}>
            {data && data.length ? (
              data.map((todo) => (
                <li key={todo.id} style={styles.item}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={styles.itemTitle}>{todo.title}</div>
                      <div style={styles.itemDesc}>{todo.description}</div>
                    </div>
                    <div
                      style={{
                        marginLeft: '12px',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                      }}
                    >
                      <button
                        onClick={() => handleEdit(todo)}
                        disabled={isFetching}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: 'none',
                          background: '#2563eb',
                          color: '#fff',
                          cursor: 'pointer',
                        }}
                      >
                        Редагувати
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        disabled={isFetching || isDeleting}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: 'none',
                          background: '#dc2626',
                          color: '#fff',
                          cursor: 'pointer',
                        }}
                      >
                        Bидалити todo
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li style={styles.item}>
                <div style={styles.itemTitle}>Немає todo</div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Модальне вікно для редагування */}
      {editingTodo && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          onClick={handleEditCancel}
        >
          <div
            style={{
              background: '#ffffff',
              padding: '22px',
              borderRadius: '10px',
              boxShadow: '0 8px 24px rgba(16,24,40,0.06)',
              width: '100%',
              maxWidth: '500px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0, marginBottom: '16px' }}>
              Редагування Туду
            </h2>
            <form onSubmit={handleEditSave}>
              <input
                name='title'
                placeholder='Назва'
                value={editForm.title}
                onChange={handleEditChange}
                style={{
                  display: 'block',
                  width: '95%',
                  marginBottom: '12px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  fontSize: '14px',
                }}
                required
              />
              <textarea
                name='description'
                placeholder='Опис'
                value={editForm.description}
                onChange={handleEditChange}
                style={{
                  display: 'block',
                  width: '95%',
                  marginBottom: '12px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  fontSize: '14px',
                  minHeight: '120px',
                  resize: 'vertical',
                }}
                required
              />
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end',
                }}
              >
                <button
                  type='button'
                  onClick={handleEditCancel}
                  disabled={isUpdating}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    background: '#ffffff',
                    color: '#374151',
                    cursor: 'pointer',
                  }}
                >
                  Скасувати
                </button>
                <button
                  type='submit'
                  disabled={isUpdating}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#2563eb',
                    color: '#fff',
                    cursor: isUpdating ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isUpdating ? 'Зберігаю...' : 'Зберегти'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
