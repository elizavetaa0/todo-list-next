'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Button } from '@mui/material';
import { Task } from '@/type';

export default function TaskDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      console.error('No ID provided in useParams');
      setLoading(false);
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch task with id ${id}`);
        return res.json();
      })
      .then((data) => {
        setTask(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching task: ', err);
        setLoading(false);
      });
  }, [id]);

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
    setTask((prev) => (prev ? { ...prev, completed: !prev.completed } : null));
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
