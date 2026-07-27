import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Favorite.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../../store/store";

export function Favorite() {
  const dispatch = useDispatch<AppDispath>();

  // 1. Достаем массив ID из Redux-слайса избранного (исходя из вашего favoriteSlice)
  const favoriteIds = useSelector((s: RootState) => s.favorite.items); // [{ id: 1 }, { id: 2 }]

  // 2. Достаем ПОЛНЫЙ список всех продуктов из слайса меню (подставьте имя вашего слайса, например s.menu.items)
  const allProducts = useSelector((s: RootState) => s.favorite.items);

  // 3. Фильтруем продукты: оставляем только те, чей ID сохранен в избранном
  const favoriteProducts = allProducts.filter((product) =>
    favoriteIds.some((fav) => fav.id === product.id),
  );

  // 4. Добавляем состояние "ничего не найдено" (Критичная проблема, которую мы исправляли)
  if (favoriteProducts.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Ничего не найдено</h2>
        <p>Вы еще не добавили ни одного товара в избранное.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className={styles.title}>Favorites</h1>
      <div className={styles.wrapper}>
        {/* Итерируемся по уже отфильтрованным ПОЛНЫМ данным продуктов */}
        {favoriteProducts.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            description={
              p.ingredients ? p.ingredients.join(", ") : p.ingredients
            }
            image={p.image}
            price={p.price}
            rating={p.rating}
          />
        ))}
      </div>
    </>
  );
}
