import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface tokenState {
  token: string;
}

const initialState = { token: '' } satisfies tokenState as tokenState;

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
  selectors: {
    getToken: (state) => state.token,
  },
});

export const { setToken } = tokenSlice.actions;
export const { getToken } = tokenSlice.selectors;
export default tokenSlice.reducer;
