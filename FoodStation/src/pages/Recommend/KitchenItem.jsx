// import React from "react";
// import "./KitchenItem.css";

// const FoodItem = ({ item }) => {
//   const { name, description, location, price, rating, image } = item;

//   return (
//     <div className="food-item">
//       <img src={image} alt={name} className="food-image" />
//       <div className="food-details">
//         <h3>{name}</h3>
//         <p>{description}</p>
//         <p>{location}</p>
//         <div className="food-meta">
//           <span>₹{price}</span>
//           <span>⭐ {rating}</span>
//         </div>
//       </div>
//       <button className="add-to-cart">+</button>
//     </div>
//   );
// };

// export default FoodItem;

import React from "react";
import "./KitchenItem.css";

const KitchenItem = ({ item }) => {
  const { name, description, location, price, rating, image } = item;

  return (
    <div className="kitchen-item">
      <img src={image} alt={name} className="item-image" />
      <div className="item-details">
        <h3 className="item-name">{name}</h3>
        <p className="item-description">{description}</p>
        <p className="item-location">{location}</p>
        <div className="item-meta">
          <span className="item-price">₹{price}</span>
          <span className="item-rating">⭐ {rating}</span>
        </div>
      </div>
      <button className="add-to-cart">+</button>
    </div>
  );
};

export default KitchenItem;
