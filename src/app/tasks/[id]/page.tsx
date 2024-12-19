'use client';

import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, CircularProgress, Button } from '@mui/material';
import { RootState } from '@/store/store';
import { toggleTaskStatus } from '@/store/taskSlice';
import { useEffect, useState } from 'react';

export default function TaskDetail() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t.id === Number(id))
  );

  useEffect(() => {
    if (task) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [task]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: '10px' }}>
          Загрузка данных...
        </Typography>
      </Container>
    );
  }

  if (!task) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Задача не найдена или произошла ошибка
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push('/')}
          style={{ marginTop: '10px' }}
        >
          Вернуться
        </Button>
      </Container>
    );
  }

  const toggleCompletion = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Задача #{task.id}
      </Typography>
      <Typography variant="h6">Заголовок: {task.title}</Typography>
      <Typography>
        Статус: {task.completed ? 'Выполнена' : 'Не выполнена'}
      </Typography>
      <Button
        variant="contained"
        color={task.completed ? 'secondary' : 'primary'}
        onClick={toggleCompletion}
        style={{ marginTop: '10px' }}
      >
        {task.completed ? 'Сделать не выполненной' : 'Сделать выполненной'}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => router.push('/')}
        style={{ marginTop: '10px', marginLeft: '10px' }}
      >
        Вернуться
      </Button>
    </Container>
  );
}
