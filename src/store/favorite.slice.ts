import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage"; // ваш хелпер для localStorage

export const FAVORITE_PERSISTENT_STATE = "favoriteData";

export interface FavoriteItem {
  id: number; // ID продукта
  user: number; // ID пользователя
}

export interface FavoriteState {
  items: FavoriteItem[];
}

const initialState: FavoriteState = loadState<FavoriteState>(
  FAVORITE_PERSISTENT_STATE,
) ?? {
  items: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    clean: (state) => {
      state.items = [];
      localStorage.setItem(FAVORITE_PERSISTENT_STATE, JSON.stringify(state));
    },

    // Переключатель (Toggle): если есть — удаляем, если нет — добавляем
    toggleFavorite: (
      state,
      action: PayloadAction<{ id: number; user: number }>,
    ) => {
      const { id, user } = action.payload;

      // Ищем товар, принадлежащий ИМЕННО этому пользователю
      const index = state.items.findIndex(
        (i) => i.id === id && i.user === user,
      );

      if (index !== -1) {
        state.items.splice(index, 1); // Удаляем из избранного
      } else {
        state.items.push({ id, user }); // Добавляем в избранное
      }

      // Сохраняем измененный стейт в localStorage
      localStorage.setItem(FAVORITE_PERSISTENT_STATE, JSON.stringify(state));
    },
  },
});

export default favoriteSlice.reducer;
export const favoriteActions = favoriteSlice.actions;
