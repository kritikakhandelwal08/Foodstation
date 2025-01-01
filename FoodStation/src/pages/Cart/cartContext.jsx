// import React, { createContext, useState } from "react";

// // Create the context
// export const CartContext = createContext();

// // Create a provider component
// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // Add item to cart or increase quantity if it already exists
//   const addToCart = (item) => {
//     console.log("Adding item:", item); // Debug log
//     setCartItems((prevItems) => {
//       const itemExists = prevItems.find(
//         (cartItem) => cartItem.id === item.id
//       );

//       console.log("Current cart items:", prevItems); // Debug log
//       console.log("Item exists:", itemExists); // Debug log

      
//       if (itemExists) {
//         return prevItems.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       } else {
//         return [...prevItems, { ...item, quantity: 1 }];
//       }
//     });
//   };

//   // Increment quantity of a cart item
//   const increaseQuantity = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   // Decrement quantity of a cart item, but not less than 1
//   const decreaseQuantity = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   // Remove an item from the cart
//   const removeItem = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.filter((item) => item.id !== id)
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         increaseQuantity,
//         decreaseQuantity,
//         removeItem
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useState } from "react";

// Create the context
export const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // // Add item to cart or increase quantity if it already exists
  // const addToCart = (item) => {
  //   console.log("Adding item:", item); // Debug log

  //   // Check for unique IDs or console log ids
  //   setCartItems((prevItems) => {
  //     const itemExists = prevItems.find(
  //       (cartItem) => cartItem.id === item.id
  //     );

  //     console.log("Current cart items:", prevItems); // Debug log
  //     console.log("Checking if item exists by id:", item.id, "Item exists:", !!itemExists); // Debug log

  //     if (itemExists) {
  //       // Increase quantity if item exists
  //       return prevItems.map((cartItem) =>
  //         cartItem.id === item.id
  //           ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //           : cartItem
  //       );
  //     } else {
  //       // Add new item if it does not exist
  //       return [...prevItems, { ...item, quantity: 1 }];
  //     }
  //   });
  // };

  const addToCart = (item) => {
    // Debug log: Check the id of the item being added
    console.log("Adding item:", item);
    console.log("Item ID:", item.id); // This will print the item's ID
    console.log("Item Name:", item.name); // This will print the item's Name
    
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
  
      console.log("Current cart items:", prevItems); // Debug log: Current cart state
      console.log("Checking if item exists by id:", item.id, "Item exists:", !itemExists); // Debug log: Check if the item exists
  
      if (itemExists) {
        // If item exists, increase the quantity
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If the item does not exist, add it to the cart
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };
  

  // Increment quantity of a cart item
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement quantity of a cart item, but not less than 1
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove an item from the cart
  const removeItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};