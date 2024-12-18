'use client';

import { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addTask } from '@/store/taskSlice';

export default function AddTask() {
  const [taskTitle, setTaskTitle] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (taskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        completed: false,
      };
      dispatch(addTask(newTask));
      router.push('/');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Добавить задачу
      </Typography>
      <TextField
        label="Название задачи"
        variant="outlined"
        fullWidth
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Добавить
      </Button>
    </Container>
  );
}