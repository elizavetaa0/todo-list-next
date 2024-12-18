import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import { Task } from '@/type';

export interface RootState {
  tasks: {
    tasks: Task[];
  };
}

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
