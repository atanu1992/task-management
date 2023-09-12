import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './reducers/AuthSlice';
import taskSlice from './reducers/taskSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    task: taskSlice,
  },
  devTools: import.meta.env.DEV,
});

export default store;
