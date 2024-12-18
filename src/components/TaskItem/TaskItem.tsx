'use client';

import { Box, Button, Checkbox, ListItemText } from '@mui/material';
import { TaskItemProps } from './type';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export function TaskItem({ task, toggleTaskStatus, deleteTask }: TaskItemProps) {
  const { id, title, completed } = task;
  const router = useRouter();

  const handleToggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTaskStatus(id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(id);
  }

  const handleNavigation = () => {
    router.push(`/tasks/${id}`);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      padding="8px"
      borderBottom="1px solid #ddd"
      onClick={handleNavigation}
      style={{ cursor: 'pointer' }}
    >
      <Checkbox
        checked={completed}
        onClick={handleToggleStatus}
        onChange={() => {}}
      />
      <ListItemText
        primary={`${id}. ${title}`}
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
      />
      <Button
        color="primary"
        onClick={handleDelete}
        aria-label="удалить задачу"
      >
        <Trash2 />
      </Button>
    </Box>
  );
}
