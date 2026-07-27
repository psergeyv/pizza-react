import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const FAVORITE_PERSISTENT_STATE = "favoriteData";

export interface FavoriteItem {
  user: number; // ID пользователя
  item: {
    // Данные самого продукта
    id: number;
    name: string;
    price: number;
    ingredients: string[];
    image: string;
    rating: number;
  };
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

    // Удалить конкретный товар по его ID
    remove: (state, action: PayloadAction<number>) => {
      // 🔥 ИСПРАВЛЕНИЕ: Сравниваем с i.item.id, так как id теперь внутри объекта item
      state.items = state.items.filter((i) => i.item.id !== action.payload);

      // Перезаписываем глобальный localStorage (если используется общая синхронизация)
      localStorage.setItem(FAVORITE_PERSISTENT_STATE, JSON.stringify(state));
    },

    // Добавить товар в избранное
    add: (state, action: PayloadAction<FavoriteItem>) => {
      const { user, item } = action.payload;

      // 🔥 ИСПРАВЛЕНИЕ: Ищем товар по его id внутри item и проверяем, что он принадлежит текущему пользователю
      const existed = state.items.find(
        (i) => i.item.id === item.id && i.user === user,
      );

      // Если такого товара у этого пользователя еще нет в избранном — добавляем
      if (!existed) {
        state.items.push(action.payload);

        // КРИТИЧЕСКОЕ ТРЕБОВАНИЕ: Дополнительно дублируем сохранение в персональный ключ пользователя!
        localStorage.setItem(
          `favoriteData_${user}`,
          JSON.stringify(state.items.filter((i) => i.user === user)),
        );
        localStorage.setItem(FAVORITE_PERSISTENT_STATE, JSON.stringify(state));
      }
    },

    // Переключатель (Toggle)
    toggle: (state, action: PayloadAction<FavoriteItem>) => {
      const { user, item } = action.payload;

      // 🔥 ИСПРАВЛЕНИЕ: Ищем индекс с учетом вложенности item.id
      const index = state.items.findIndex(
        (i) => i.item.id === item.id && i.user === user,
      );

      if (index !== -1) {
        state.items.splice(index, 1); // Удаляем, если нашли
      } else {
        state.items.push(action.payload); // Добавляем, если не нашли
      }

      // Синхронизируем персональный localStorage пользователя
      localStorage.setItem(
        `favoriteData_${user}`,
        JSON.stringify(state.items.filter((i) => i.user === user)),
      );
      localStorage.setItem(FAVORITE_PERSISTENT_STATE, JSON.stringify(state));
    },
  },
});

export default favoriteSlice.reducer;
export const favoriteActions = favoriteSlice.actions;
