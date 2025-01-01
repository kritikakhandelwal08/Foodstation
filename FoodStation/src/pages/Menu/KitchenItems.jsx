import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import kitchenData from "../../api/kitchenData.json";
import menuData from "../../api/menuData.json";
import "./KitchenItems.css";
import { CartContext } from "../Cart/cartContext"; // Import the Cart Context

const KitchenItems = () => {
  const { menuItemId } = useParams();
  const [kitchenItems, setKitchenItems] = useState([]);
  const { addToCart } = useContext(CartContext); // Access addToCart from context
  const [message, setMessage] = useState("");
  const [menuItemName, setMenuItemName] = useState("");

  // Fetch filtered kitchen data
  useEffect(() => {
    const filteredItems = kitchenData.items.filter(
      (item) => item.menuItemId === parseInt(menuItemId)
    );
    setKitchenItems(filteredItems);
  }, [menuItemId]);

  // Set menu item name based on ID
  useEffect(() => {
    const menuItem = menuData.menuItems.find(
      (item) => item.id === parseInt(menuItemId)
    );
    if (menuItem) {
      setMenuItemName(menuItem.name);
    }
  }, [menuItemId]);

  // Handle Add to Cart
  const handleAddToCart = (item) => {
    addToCart(item);
    setMessage(`${item.name} has been added to your cart!`);
    setTimeout(() => {
      setMessage(""); // Clear the message after 3 seconds
    }, 3000);
  };

  // Fetch Aloo Paratha Data
  useEffect(() => {
    const fetchaloodata = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/alooparatha/alooparatha"
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await res.json();
        setKitchenItems(json); // Update kitchen items with fetched data
      } catch (error) {
        console.error("Error fetching the menu:", error);
      }
    };
    fetchaloodata();
  }, []);

  return (
    <div className="kitchen-items-container">
      {message && <div className="popup-message">{message}</div>}{" "}
      {/* Popup message */}
      <h1>{menuItemName}</h1>
      <p>Explore a wide variety of {menuItemName} to satisfy your cravings.</p>
      <h3>Kitchens to Explore</h3>
      <div className="kitchen-item-grid">
        {kitchenItems.map((item) => (
          <div key={item.id} className="kitchen-card">
            <img
              src={item.imageURL}
              alt={item.name}
              className="kitchen-item-image"
            />
            <div className="kitchen-card-details">
              <h4>{item.name}</h4>
              <p>
                {item.name} ({item.portion})
              </p>
              <p>₹ {item.price}</p>
              <p>{item.location}</p>
              <div className="kitchen-card-rating">
                <span>⭐ {item.rating}</span>
              </div>
            </div>
            <button
              className="add-item-btn"
              onClick={() => handleAddToCart(item)}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitchenItems;
