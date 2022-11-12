import { createSlice } from '@reduxjs/toolkit';

// A reducer for switching the theme from light and dark mode
// DO NOT TOUCH
const theme = createSlice({
  name: 'theme',
  initialState: {
    value: 'light',
  },
  reducers: {
    setTheme: (state, action) => {
      state.value = action.payload;
    },
    toggleTheme: (state) => {
      state.value = state.value === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { toggleTheme, setTheme } = theme.actions;
export const selectTheme = (state) => state.theme.value;
export default theme.reducer;
