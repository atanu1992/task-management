import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import errorHandler from '../errorHandler';

export const login = createAsyncThunk(
  'auth/login',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/login', userInput);
      if (response.status === 200 && response?.data?.details) {
        return response.data.details;
      } else {
        throw Error('Invalid Credentials');
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/register', userInput);
      if (response.status === 201 && response?.data?.details) {
        return response.data.details;
      } else {
        throw Error('Failed to register user');
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('userToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token, refreshToken } = action.payload;
        state.loading = false;
        state.user = user;
        state.token = token;
        state.refreshToken = refreshToken;
        state.error = null;
        localStorage.setItem('userToken', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.loading = false;
        state.user = user;
        state.token = token;
        state.error = null;
        localStorage.setItem('userToken', token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
