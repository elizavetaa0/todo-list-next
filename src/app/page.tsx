'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Button } from '@mui/material';
import { TaskList } from '@/components';

import Link from 'next/link';
import { deleteTask, setTasks, toggleTaskStatus } from '@/store/taskSlice';
import { RootState } from '@/store/store';

export default function Home() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (savedTasks.length > 0) {
      dispatch(setTasks(savedTasks));
    } else {
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTasks(data));
          localStorage.setItem('tasks', JSON.stringify(data));
        })
        .catch((err) => {
          console.error('Error fetching data: ', err);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        ToDo List
      </Typography>

      <TaskList
        tasks={tasks}
        toggleTaskStatus={(id) => dispatch(toggleTaskStatus(id))} 
        deleteTask={(id) => dispatch(deleteTask(id))}
      />

      <Link href="/add-task">
        <Button variant="contained" color="primary" style={{ marginBlock: '20px' }}>
          Добавить задачу
        </Button>
      </Link>
    </Container>
  );
}
