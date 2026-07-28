import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
// Импортируем компонент карточки, который мы настраивали ранее
import ProductCardDetail from "../../components/ProductCardDetail/ProductCardDetail";
import type { Product as ProductType } from "../../interfaces/product.interface";

export function Product() {
  // 1. 🔥 ИСПРАВЛЕНИЕ ТИПИЗАЦИИ: Указываем, что под ключом 'data' лежит именно Промис, а не готовый объект
  const data = useLoaderData() as { data: Promise<ProductType> };

  return (
    <div className="product-page-container" style={{ padding: "20px" }}>
      <Suspense fallback={<p>Загрузка карточки товара...</p>}>
        <Await
          resolve={data.data}
          errorElement={<p>Ошибка: товар не найден или сервер недоступен</p>}
        >
          {(product: ProductType) => (
            <ProductCardDetail
              key={product.id}
              description={
                product.ingredients ? product.ingredients.join(", ") : ""
              }
              {...product}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
