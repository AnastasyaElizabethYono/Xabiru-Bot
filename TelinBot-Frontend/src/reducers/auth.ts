import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout, getUserInfo } from '@/services/auth';
import { AuthState } from '@/types/auth/AuthState';
import { User } from '@/types/auth/User';
import { UserLoginState } from '@/types/auth/UserLoginState';
import api from '@/services/api';
import { JWTState } from '@/types/auth/JWTState';
import { RootState } from '@/types/auth/RootState';

const initialUser = {
  id: null,
  first_name: null,
  last_name: null,
  position: null,
  groups: [],
};

const initialToken = { access: null, refresh: null };

const initialState: AuthState = {
  user: initialUser,
  token: initialToken,
  isAuthenticated: false,
  status: 'idle',
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (token: string) => {
    // Set header authorization
    api.defaults.headers.common['Authorization'] = `Bearer ${token?.access}`;
    // Set user state
    const user = await getUserInfo();
    return { user, token };
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const refreshToken = state.auth.token?.refresh;
    if (refreshToken) {
      await logout(state.auth.token?.refresh);
      delete api.defaults.headers.common['Authorization'];
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    resetState: (state) => {
      state.user = initialUser;
      state.isAuthenticated = false;
      state.token = initialToken;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{ user: User; token: JWTState | undefined }>
        ) => {
          const { user, token } = action.payload;
          state.status = 'succeeded';
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
        }
      )
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = initialUser;
        state.isAuthenticated = false;
        state.token = initialToken;
        state.status = 'idle';
      });
  },
});

export const { resetState } = authSlice.actions;
// Export reducer
export default authSlice.reducer;
