// src/Cart/CartPage.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from './cartContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const CartPage = () => {
  // Access cartItems and related functions from CartContext
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  // State for delivery information form
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
  };

  // Calculate Subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 50; // Assume a fixed delivery fee for simplicity.
  const total = subtotal + deliveryFee;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Delivery Information Submitted: ', deliveryInfo);
    // Process the delivery info (e.g., send to an API)
  };

  const handleProceedToPayment = () => {
    // Validate delivery info before navigating
    const isDeliveryInfoValid = Object.values(deliveryInfo).every(
      (field) => field !== ""
    );
    if (!isDeliveryInfoValid) {
      alert("Please complete the delivery information before proceeding.");
      return;
    }

    navigate("/payment"); // Use absolute path
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {/* Cart Items Table */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.name} />
                </td>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </td>
                <td>₹{item.price * item.quantity}</td>
                <td>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delivery Information Form */}
      <div className="delivery-info">
        <h3>Delivery Information</h3>
        <form onSubmit={handleFormSubmit}>
          <input
            required
            type="text"
            name="firstName"
            placeholder="First Name"
            value={deliveryInfo.firstName}
            onChange={handleInputChange}
          />
          <input
            required
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={deliveryInfo.lastName}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={deliveryInfo.email}
            onChange={handleInputChange}
          />
          <input
            required
            type="text"
            name="street"
            placeholder="Street"
            value={deliveryInfo.street}
            onChange={handleInputChange}
          />
          <input
            required
            type="text"
            name="city"
            placeholder="City"
            value={deliveryInfo.city}
            onChange={handleInputChange}
          />
          <input
            required
            type="text"
            name="state"
            placeholder="State"
            value={deliveryInfo.state}
            onChange={handleInputChange}
          />
          <input
            required
            type="text"
            name="pinCode"
            placeholder="Pin Code"
            value={deliveryInfo.pinCode}
            onChange={handleInputChange}
          />
          <input
            required
            type="text"
            name="country"
            placeholder="Country"
            value={deliveryInfo.country}
            onChange={handleInputChange}
          />
          <input
            required
            type="text"
            name="phone"
            placeholder="Phone"
            value={deliveryInfo.phone}
            onChange={handleInputChange}
          />
          <button type="submit">Save</button>
        </form>
      </div>

      {/* Cart Totals */}
      <div className="cart-totals">
        <h3>Cart Totals</h3>
        <div className="totals-row">
          <p>Subtotal:</p>
          <p>₹{subtotal}</p>
        </div>
        <hr />
        <div className="totals-row">
          <p>Delivery Fee:</p>
          <p>₹{deliveryFee}</p>
        </div>
        <hr />
        <div className="totals-row">
          <p>Total:</p>
          <p>₹{total}</p>
        </div>
        <button onClick={handleProceedToPayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CartPage;