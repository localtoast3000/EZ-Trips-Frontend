import { createSlice } from '@reduxjs/toolkit';

// This reducer is just a template, it can be modified
const user = createSlice({
  name: 'user',
  initialState: {
    value: false,
    favorites: [],
  },
  reducers: {
    mountUser: (state, action) => {
      state.value = action.payload;
    },
    dismountUser: (state) => {
      state.value = false;
      state.favorites = [];
    },
    addFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    deleteFavorite: (state, action) => {
      state.favorites = state.favorites.filter((trip) => trip !== action.payload);
    },
  },
});

export const { mountUser, dismountUser, addFavorites, setFavorites, deleteFavorite } = user.actions;
export const selectUser = (state) => {
  return { user: state.user.value, favorites: state.user.favorites };
};
export default user.reducer;
