import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import errorHandler from '../errorHandler';
import api from '../api';

export const addTask = createAsyncThunk(
  'task/add',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('/tasks/add', userInput);
      if (response.status === 201 && response?.data?.details) {
        return response.data.details;
      } else {
        throw Error('Failed to add todo');
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

export const tasksList = createAsyncThunk(
  'task/list',
  async (pagination, { rejectWithValue }) => {
    try {
      let { pageIndex, pageSize } = pagination;
      const response = await api.get(
        `/tasks?page=${pageIndex}&limit=${pageSize}`
      );
      if (response.status === 200 && response?.data?.details) {
        return response.data.details;
      } else {
        throw Error('Failed to fetch tasks');
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  'task/update',
  async ({ editTask, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/tasks/${editTask}`, data);
      if (response.status === 200 && response?.data?.details) {
        return response.data.details;
      } else {
        throw Error('Failed to update task');
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

export const removeTask = createAsyncThunk(
  'task/remove',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      if (response.status === 200) {
        return { taskId: taskId };
      } else {
        throw Error('Failed to update todo');
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    loading: false,
    error: null,
    tasks: [],
    totalTasks: 0,
    currentTask: [],
  },
  reducers: {
    getCurrentTask: (state, action) => {
      state.currentTask = state.tasks.filter((v) => v._id === action.payload);
    },
    clearCurrentTask: (state) => {
      state.currentTask = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentTask = [];
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      })
      .addCase(tasksList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentTask = [];
        state.tasks = [];
        state.totalTasks = 0;
      })
      .addCase(tasksList.fulfilled, (state, action) => {
        console.log('sdd ', action.payload);
        state.loading = false;
        state.tasks = action.payload.data
          ? action.payload.data.map((data) => {
              data.createdAt = new Date(data.createdAt).toLocaleString();
              return data;
            })
          : [];
        state.totalTasks = action.payload.total ? action.payload.total : 0;
      })
      .addCase(tasksList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const { _id } = action.payload;
        action.payload.createdAt = new Date(
          action.payload.createdAt
        ).toLocaleString();
        state.tasks = state.tasks.map((value) => {
          return value._id === _id ? action.payload : value;
        });
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      })
      .addCase(removeTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.loading = false;
        const { taskId } = action.payload;
        state.tasks = state.tasks.filter((value) => value._id !== taskId);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      });
  },
});

export const { getCurrentTask, clearCurrentTask } = taskSlice.actions;

export default taskSlice.reducer;
