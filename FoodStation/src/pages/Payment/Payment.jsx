// src/Payment/Payment.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Cart/cartContext"; // Adjust the path as necessary
import "./Payment.css";

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedUPI, setSelectedUPI] = useState("");
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext); // Access clearCart from context

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
    if (event.target.value !== "UPI") {
      setSelectedUPI("");
    }
  };

  const handleUPIChange = (event) => {
    setSelectedUPI(event.target.value);
  };

  const handleContinue = () => {
    if (!selectedPayment) {
      alert("Please select a payment method.");
    } else if (selectedPayment === "UPI" && !selectedUPI) {
      alert("Please select a UPI method.");
    } else {
      const paymentMethod =
        selectedPayment === "UPI" ? `UPI (${selectedUPI})` : selectedPayment;
      alert(`Payment successful! You selected: ${paymentMethod}`);

      clearCart(); // Clear the cart
      navigate("/"); // Redirect to the home page
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <p>How would you like to pay?</p>
      <form>
        {/* UPI Option */}
        <div className="payment-option">
          <input
            type="radio"
            id="upi"
            name="paymentMethod"
            value="UPI"
            onChange={handlePaymentChange}
          />
          <label htmlFor="upi">UPI</label>
          {selectedPayment === "UPI" && (
            <div className="upi-options">
              <p>Select UPI Method:</p>
              <div>
                <input
                  type="radio"
                  id="googlePay"
                  name="upiMethod"
                  value="Google Pay"
                  onChange={handleUPIChange}
                />
                <label htmlFor="googlePay">Google Pay</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="phonePe"
                  name="upiMethod"
                  value="PhonePe"
                  onChange={handleUPIChange}
                />
                <label htmlFor="phonePe">PhonePe</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="paytm"
                  name="upiMethod"
                  value="Paytm"
                  onChange={handleUPIChange}
                />
                <label htmlFor="paytm">Paytm</label>
              </div>
            </div>
          )}
        </div>

        {/* Credit/Debit Card Option */}
        {/* <div className="payment-option">
          <input
            type="radio"
            id="creditDebit"
            name="paymentMethod"
            value="Credit or Debit Card"
            onChange={handlePaymentChange}
          />
          <label htmlFor="creditDebit">
            Credit or Debit Card
            <div className="card-icons">
              <img src="/path/to/visa.png" alt="Visa" />
              <img src="/path/to/mastercard.png" alt="MasterCard" />
              <img src="/path/to/amex.png" alt="Amex" />
            </div>
          </label>
        </div> */}

        {/* Cash on Delivery Option */}
        <div className="payment-option">
          <input
            type="radio"
            id="cod"
            name="paymentMethod"
            value="Cash on Delivery"
            onChange={handlePaymentChange}
          />
          <label htmlFor="cod">Cash on Delivery</label>
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="continue-button"
        >
          Confirm Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
