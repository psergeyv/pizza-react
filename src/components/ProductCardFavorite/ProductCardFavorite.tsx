import type { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../../store/store";
import { favoriteActions } from "../../store/favorite.slice";
import type { ProductCardProps } from "../ProductCard/ProductCard.props";
import styles from "../ProductCard/ProductCard.module.css";
import { cartActions } from "../../store/cart.slice";

function ProductCardFavorite(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispath>();

  // 1. Получаем ID текущего пользователя
  const currentUserId = useSelector(
    (s: RootState) => s.user?.profile?.id || s.user?.profile?.id || 0,
  );
  const add: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };
  // 2. Проверяем, находится ли ИМЕННО ЭТОТ товар в избранном у ИМЕННО ЭТОГО пользователя
  const isFavorite = useSelector((s: RootState) =>
    s.favorite.items.some((i) => i.id === props.id && i.user === currentUserId),
  );

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Останавливаем переход по ссылке <Link>

    // Отправляем плоский объект со всеми нужными ID
    dispatch(
      favoriteActions.toggleFavorite({
        id: props.id,
        user: currentUserId,
      }),
    );
  };

  return (
    <Link to={`/product/${props.id}`} className={styles["link"]}>
      <div className={styles["card"]}>
        <div
          className={styles["head"]}
          style={{ backgroundImage: `url('${props.image}')` }}
        >
          <div className={styles["price"]}>
            {props.price} <span className={styles["currency"]}>₽</span>
          </div>
          <button className={styles["add-to-cart"]} onClick={add}>
            <img src="/icons/add-cart.svg" alt="" />
          </button>
          <div className={styles["rating"]}>
            {props.rating}
            <img
              className={styles["star-rating"]}
              src="/icons/star-rating.svg"
              alt=""
            />
          </div>
        </div>
        <div className={styles["footer"]}>
          <div className={styles["title"]}>{props.name}</div>
          <div className={styles["description"]}>{props.description}</div>
        </div>
        <div className={styles["favorite"]}>
          {isFavorite ? (
            <button
              className={styles["add-to-favorite"]}
              onClick={handleFavoriteClick}
            >
              ♥ В избранном
            </button>
          ) : (
            <button
              className={styles["add-to-favorite"]}
              onClick={handleFavoriteClick}
            >
              В избранное
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCardFavorite;
