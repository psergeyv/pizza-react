import type { Product } from "../../interfaces/product.interface";
import styles from "./Favorite.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { PREFIX } from "../../helpers/API";
import { useEffect, useState } from "react";
import axios from "axios";

import ProductCart from "../../components/ProductCardFavorite/ProductCardFavorite";

export function Favorite() {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  const currentUserId = useSelector(
    (s: RootState) => s.user?.profile?.id || s.user?.profile?.id || 0,
  );

  // Получаем список ID избранных товаров для текущего пользователя
  const favoriteIds = useSelector((s: RootState) =>
    s.favorite.items
      .filter((item) => item.user === currentUserId)
      .map((item) => item.id),
  );
  // получаем все свойства товара
  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };
  // Получаем ВСЕ продукты из меню для сопоставления
  const loadAllItems = async () => {
    const res = await Promise.all(favoriteIds.map((i) => getItem(i)));
    setFavoriteProducts(res);
  };
  // Оставляем только те продукты, которые есть в списке favoriteIds
  useEffect(() => {
    loadAllItems();
  }, [favoriteIds]);

  if (favoriteIds.length === 0) {
    return (
      <div className={styles.empty}>У вас пока нет избранных товаров.</div>
    );
  }

  // 4. Добавляем состояние "ничего не найдено" (Критичная проблема, которую мы исправляли)
  if (favoriteIds.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Избранное</h2>
        <p>У вас пока нет избранных товаров.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className={styles.title}>Избранное</h1>
      <div className={styles.wrapper}>
        {favoriteProducts.map((i) => {
          const product = favoriteProducts.find((p) => p.id === i.id);
          if (!product) {
            return;
          }
          return (
            <ProductCart
              key={product.id}
              description={product.ingredients.join(", ")}
              {...product}
            />
          );
        })}
      </div>
    </>
  );
}
