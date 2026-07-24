import { Await, useLoaderData } from "react-router-dom";
import type { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";

export function Movie() {
  const data = useLoaderData() as { data: Product };

  return (
    <>
      <Suspense fallback={<p>Загружаю...</p>}>
        <Await
          resolve={data.data}
          errorElement={<div>Фильм не найден (Ошибка 404)</div>}
        >
          {(data) => <>{data.name}</>}
        </Await>
      </Suspense>
    </>
  );
}
