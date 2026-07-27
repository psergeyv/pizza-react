import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { type MouseEventHandler } from "react";
import type { ProductCardProps } from "./ProductCard.props";
import { useDispatch } from "react-redux";
import type { AppDispath } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispath>();

  const add: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
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
      </div>
    </Link>
  );
}

export default ProductCard;
