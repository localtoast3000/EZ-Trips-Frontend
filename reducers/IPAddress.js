import { createSlice } from '@reduxjs/toolkit';

const IPAddress = createSlice({
  name: 'IPAddress',
  initialState: {
    value: '172.20.10.4',
  },
  reducers: {
    addIP: (state, action) => {
      state.value = '172.20.10.4';
    },
  },
});

export const { addIP } = IPAddress.actions;
export default IPAddress.reducer;
