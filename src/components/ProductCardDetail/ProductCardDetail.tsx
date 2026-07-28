import styles from "./ProductCardDetail.module.css";
import { type MouseEventHandler } from "react";
import type { ProductCardProps } from "./ProductCardDetail.props";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispath, RootState } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import { favoriteActions } from "../../store/favorite.slice";

function ProductCardDetail(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispath>();
  const currentUserId = useSelector(
    (s: RootState) => s.user?.profile?.id || s.user?.profile?.id || 0,
  );
  const add: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };
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
    <div className={styles["product"]}>
      <div className={styles["head"]}>
        <button className={styles["back-link"]} onClick={add}>
          <img src="/icons/back.svg" alt="" />
        </button>
        <h1>{props.name}</h1>
        <button className={styles["add-to-cart"]} onClick={add}>
          <img src="/icons/add-cart.svg" alt="" />
        </button>
      </div>
      <div>
        <div className={styles["product-info"]}>
          <div className={styles["product-image-block"]}>
            <img src={props.image} alt="" className={styles["product-image"]} />
          </div>
          <div className={styles["product-props"]}>
            <div className={styles["row-price"]}>
              <span className={styles["row-title"]}>Цена</span>
              <div className={styles["price"]}>
                {props.price} <span className={styles["currency"]}>₽</span>
              </div>
            </div>

            <div className={styles["row"]}>
              <span className={styles["row-title"]}>Рейтинг</span>
              <div className={styles["rating"]}>
                {props.rating}
                <img
                  className={styles["star-rating"]}
                  src="/icons/star-rating.svg"
                  alt=""
                />
              </div>
            </div>

            <div className={styles["ingredients"]}>
              <p className={styles["p-head"]}>Состав:</p>
              <ul className={styles["ul-list"]}>
                {props.ingredients.map((item, index) => (
                  // Используем комбинацию значения и индекса в качестве уникального ключа
                  <li key={`${item}_${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["favorite"]}>
        {isFavorite ? (
          "♥ В избранном"
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
  );
}

export default ProductCardDetail;
