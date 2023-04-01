// import useApi from "../../hooks/api";
// import { useParams } from "react-router-dom";
// import ProductCard from "../../components/product";
// import { url } from "../../utils/constants";

// export default function SingleProduct() {
//   let { id } = useParams();
//   const [data, isLoading, error] = useApi(url + `${id}`);

//   console.log(data);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       <ProductCard product={data} />
//     </div>
//   );
// }

import useApi from "../../hooks/api";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product";
import { url } from "../../utils/constants";
import React, { useReducer } from "react";
// import { reducer, initialState } from "../../components/cart";

export default function SingleProduct() {
  let { id } = useParams();
  const [data, isLoading, error] = useApi(url + `${id}`);
  // const [state, dispatch] = useReducer(reducer, initialState);

  // const addToCart = (product) => {
  //   dispatch({ type: "addProduct", payload: product });
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ProductCard product={data} />
    </div>
  );
}
