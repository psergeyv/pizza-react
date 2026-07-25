import { Await, useLoaderData } from "react-router-dom";
import type { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";

export function Product() {
  const data = useLoaderData() as { data: Product };

  return (
    <>
      <Suspense fallback={<p>Загружаю...</p>}>
        <Await resolve={data.data}>{(data) => <>{data.name}</>}</Await>
      </Suspense>
    </>
  );
}
