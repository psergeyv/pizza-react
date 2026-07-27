import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { type MouseEventHandler } from "react";
import type { ProductCardProps } from "./ProductCard.props";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispath, RootState } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import { favoriteActions } from "../../store/favorite.slice";

function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispath>();
  const userID = useSelector(
    (s: RootState) => s.user?.profile?.id || s.user?.profile?.id || 0,
  );
  const add: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };

  const addFavorite: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(
      favoriteActions.add({
        user: userID,
        item: {
          id: props.id,
          name: props.name,
          price: props.price,
          image: props.image,
          rating: props.rating,
          ingredients: props.description ? props.description.split(", ") : [],
        },
      }),
    );
  };

  return (
    <Link to={`/product/${props.id}`} className={styles["link"]}>
      <div className={styles["card"]}>
        <div
          className={styles["head"]}
          style={{ backgroundImage: `url('${props.image}')` }}>
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
          <button className={styles["add-to-favorite"]} onClick={addFavorite}>
            В избранное
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
