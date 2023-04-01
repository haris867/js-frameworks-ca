import React, { useReducer, createContext, useContext } from "react";
import useApi from "../../hooks/api";

const products = [
  {
    id: 0,
    title: "Milk",
    price: 19.99,
    discountedPrice: 19.99,
  },
  {
    id: 1,
    title: "Bread",
    price: 12.99,
    discountedPrice: 12.99,
  },
  {
    id: 2,
    title: "Cheese",
    price: 25.99,
    discountedPrice: 25.99,
  },
];

export const initialState = { cart: [], total: 0 };

export function reducer(state, action) {
  let productIndex;
  let newTotal;
  let cart;

  switch (action.type) {
    // Adding a product
    case "addProduct":
      // Create a new cart so we don't mutate our state
      cart = [...state.cart];
      // Get the product index
      productIndex = cart.findIndex(
        (product) => product.id === action.payload.id
      );
      if (productIndex === -1) {
        // If productIndex is -1, it doesn't exist so we add it
        cart.push({ ...action.payload, quantity: 1 });
      } else {
        // The product does exist so we increase the quantity
        // We do not want to mutate quantity so we are creating a new array with
        // quantity incremented.
        cart = [
          ...cart.slice(0, productIndex),
          { ...cart[productIndex], quantity: cart[productIndex].quantity + 1 },
          ...cart.slice(productIndex + 1),
        ];
      }
      // Set the new total so we don't have to keep calculating it
      newTotal = cart.reduce((currentTotal, product) => {
        currentTotal += product.discountedPrice * product.quantity;
        return currentTotal;
      }, 0);
      return { ...state, cart: cart, total: newTotal };

    // Removing a product
    case "removeProduct":
      cart = [...state.cart];
      // Get the product index
      productIndex = cart.findIndex(
        (product) => product.id === action.payload.id
      );
      // If the product index is not -1 then it exists
      if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
          // Remove 1 from quantity is quantity is higher than 1
          // We do not want to mutate cart so we recreate it
          cart = [
            ...cart.slice(0, productIndex),
            {
              ...cart[productIndex],
              quantity: cart[productIndex].quantity - 1,
            },
            ...cart.slice(productIndex + 1),
          ];
        } else {
          // Remove the item entirely if quantity is going to be 0
          cart = [
            ...cart.slice(0, productIndex),
            ...cart.slice(productIndex + 1),
          ];
        }
      }
      // Set the new total so we don't have to keep calculating it
      newTotal = cart.reduce((currentTotal, product) => {
        currentTotal += product.discountedPrice * product.quantity;
        return currentTotal;
      }, 0);
      return { ...state, cart: cart, total: newTotal };

    // Clearing a cart
    case "clearCart":
      return { cart: [], total: 0 };

    default:
      return state;
  }
}

export const CartContext = createContext();

export function CartProvider(props) {
  const { state, dispatch } = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
}

export default function ShoppingCart() {
  const [data, isLoading, error] = useApi();
  const { state, dispatch } = useContext(CartContext);
  // return (
  //   <div>
  //     {data.map((product) => (
  //       <div key={product.id}>
  //         <button
  //           onClick={() => dispatch({ type: "addProduct", payload: product })}
  //         >
  //           Add {product.title}
  //         </button>
  //         <button
  //           onClick={() =>
  //             dispatch({ type: "removeProduct", payload: product })
  //           }
  //         >
  //           Remove {product.title}
  //         </button>
  //       </div>
  //     ))}
  //     <div>
  //       <hr />
  //       <button onClick={() => dispatch({ type: "clearCart" })}>
  //         Clear cart
  //       </button>
  //       <button onClick={() => dispatch({ type: "getTotal" })}>
  //         Get total
  //       </button>
  //     </div>
  //     <div>{state.total}</div>
  //     <hr />
  //     <div>
  //       {state.cart.map((product) => (
  //         <div key={product.id}>
  //           {product.quantity} - {product.title} - {product.discountedPrice}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <div>
      {data.map((product) => (
        <div key={product.id}>
          <button
            className="me-2"
            onClick={() => dispatch({ type: "addProduct", payload: product })}
          >
            Add {product.title} for {product.discountedPrice}
          </button>
          <button
            onClick={() =>
              dispatch({ type: "removeProduct", payload: product })
            }
          >
            Remove {product.title}
          </button>
        </div>
      ))}
      <div>
        <hr />
        <button onClick={() => dispatch({ type: "clearCart" })}>
          Clear cart
        </button>
        <button onClick={() => dispatch({ type: "getTotal" })}>
          Get total
        </button>
      </div>
      <div>{state.total}</div>
      <hr />
      <div>
        {state.cart.map((product) => (
          <div key={product.id}>
            {product.quantity} - {product.title} - {product.discountedPrice}
          </div>
        ))}
      </div>
    </div>
  );
}

// import React, { useReducer } from "react";
// import useApi from "../../hooks/api";
// import { url } from "../../utils/constants";

// export const initialState = { cart: [], total: 0 };

// export function reducer(state, action) {
//   let productIndex;
//   let newTotal;
//   let cart;

//   switch (action.type) {
//     // Adding a product
//     case "addProduct":
//       // Create a new cart so we don't mutate our state
//       cart = [...state.cart];
//       // Get the product index
//       productIndex = cart.findIndex(
//         (product) => product.id === action.payload.id
//       );
//       if (productIndex === -1) {
//         // If productIndex is -1, it doesn't exist so we add it
//         cart.push({ ...action.payload, quantity: 1 });
//       } else {
//         // The product does exist so we increase the quantity
//         // We do not want to mutate quantity so we are creating a new array with
//         // quantity incremented.
//         cart = [
//           ...cart.slice(0, productIndex),
//           { ...cart[productIndex], quantity: cart[productIndex].quantity + 1 },
//           ...cart.slice(productIndex + 1),
//         ];
//       }
//       // Set the new total so we don't have to keep calculating it
//       newTotal = cart.reduce((currentTotal, product) => {
//         currentTotal += product.discountedPrice * product.quantity;
//         return currentTotal;
//       }, 0);
//       return { ...state, cart: cart, total: newTotal };

//     // Removing a product
//     case "removeProduct":
//       cart = [...state.cart];
//       // Get the product index
//       productIndex = cart.findIndex(
//         (product) => product.id === action.payload.id
//       );
//       // If the product index is not -1 then it exists
//       if (productIndex !== -1) {
//         if (cart[productIndex].quantity > 1) {
//           // Remove 1 from quantity is quantity is higher than 1
//           // We do not want to mutate cart so we recreate it
//           cart = [
//             ...cart.slice(0, productIndex),
//             {
//               ...cart[productIndex],
//               quantity: cart[productIndex].quantity - 1,
//             },
//             ...cart.slice(productIndex + 1),
//           ];
//         } else {
//           // Remove the item entirely if quantity is going to be 0
//           cart = [
//             ...cart.slice(0, productIndex),
//             ...cart.slice(productIndex + 1),
//           ];
//         }
//       }
//       // Set the new total so we don't have to keep calculating it
//       newTotal = cart.reduce((currentTotal, product) => {
//         currentTotal += product.discountedPrice * product.quantity;
//         return currentTotal;
//       }, 0);
//       return { ...state, cart: cart, total: newTotal };

//     // Clearing a cart
//     case "clearCart":
//       return { cart: [], total: 0 };

//     default:
//       return state;
//   }
// }

// export default function ShoppingCart() {
//   const [data, isLoading, error] = useApi(url);
//   const [state, dispatch] = useReducer(reducer, initialState);
//   console.log(state);
//   return (
//     <div>
//       {data.map((product) => (
//         <div key={product.id}>
//           <button
//             className="me-2"
//             onClick={() => dispatch({ type: "addProduct", payload: product })}
//           >
//             Add {product.title} for {product.discountedPrice}
//           </button>
//           <button
//             onClick={() =>
//               dispatch({ type: "removeProduct", payload: product })
//             }
//           >
//             Remove {product.title}
//           </button>
//         </div>
//       ))}
//       <div>
//         <hr />
//         <button onClick={() => dispatch({ type: "clearCart" })}>
//           Clear cart
//         </button>
//         <button onClick={() => dispatch({ type: "getTotal" })}>
//           Get total
//         </button>
//       </div>
//       <div>{state.total}</div>
//       <hr />
//       <div>
//         {state.cart.map((product) => (
//           <div key={product.id}>
//             {product.quantity} - {product.title} - {product.discountedPrice}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
