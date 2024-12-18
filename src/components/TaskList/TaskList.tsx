import { List, Typography } from '@mui/material';
import { TaskListProps } from './type';
import { TaskItem } from '../TaskItem/TaskItem';

export function TaskList ({ tasks, toggleTaskStatus, deleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return <Typography variant="h6" gutterBottom>Задач пока нет</Typography>
  }

  return (
    <List>
      {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTaskStatus={toggleTaskStatus}
            deleteTask={deleteTask}
          />
      ))}
    </List>
  );
};
