import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { useEffect } from "react";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
    navigate("auth/login");
  };

  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          <img className={styles["avatar"]} src="/icons/avatar.svg" alt="" />
          <div className={styles["name"]}>{profile?.name}</div>

          <a className={styles["email"]} href={`mailto:${profile?.email}`}>
            {profile?.email}
          </a>
        </div>
        <div className={styles["menu"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles.active]: isActive,
              })
            }
          >
            <img src="/icons/menu.svg" alt="" />
            Меню
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles.active]: isActive,
              })
            }
          >
            <img src="/icons/cart.svg" alt="" />
            Корзина {items.reduce((acc, item) => (acc += item.count), 0)}
          </NavLink>
        </div>
        <Button className={styles["exit"]} onClick={logout}>
          <img src="/icons/logout.svg" alt="" />
          Выход
        </Button>
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}
