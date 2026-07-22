import { useParams } from "react-router-dom";

export function Product() {
  const { id } = useParams();
  return (
    <>
      <h1>Карточка {id}</h1>
    </>
  );
}
