import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const FAVORITE_PERSISTENT_STATE = "favoriteData";

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  image: string;
  rating: number;
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
    // Очистить всё избранное
    clean: (state) => {
      state.items = [];
    },

    // Удалить конкретный ID из избранного (Заменил дубли delete/remove на один метод)
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    // Добавить ID в избранное (Исправленная логика)
    add: (state, action: PayloadAction<FavoriteItem>) => {
      const existed = state.items.find((i) => i.id === action.payload.id);

      // Если товара нет в избранном — добавляем весь прилетевший объект
      if (!existed) {
        state.items.push(action.payload);
      }
    },

    // Опционально: Переключатель (Toggle) — если есть, удаляет, если нет — добавляет
    toggle: (state, action: PayloadAction<FavoriteItem>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.items.splice(index, 1); // Удаляем, если нашли по ID
      } else {
        state.items.push(action.payload); // Добавляем весь объект, если не нашли
      }
    },
  },
});

export default favoriteSlice.reducer;
export const favoriteActions = favoriteSlice.actions;
