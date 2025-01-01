import React, { useState, useEffect } from "react";
import axios from "axios";
import "./KitchenPage.css";
import KitchenItem from "./KitchenItem";

const KitchenPage = () => {
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const userId = 123; // Dynamic user ID if needed
        const response = await axios.post("http://127.0.0.1:5000/recommend", {
          user_id: userId,
        });
        console.log(response.data.recommendations)
        if (response.data.recommendations?.length) {
          setRecommendedItems(response.data.recommendations);
        } else {
          console.warn("No recommendations found.");
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError(err.message || "Error fetching recommendations");
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="kitchen-page">
      <div className="main-content">
        <h1 className="title">The Mom's Kitchen</h1>
        <KitchenItem
          item={{
            name: "Paneer Ki Sabji",
            description: "A delicious paneer dish with fresh spices",
            location: "Jai Circle",
            price: 119,
            rating: 4.4,
            image: "paneer.jpg",
          }}
        />
        <h2 className="subtitle">Recommended ({recommendedItems.length})</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="recommended-list">
            {recommendedItems.map((item) => (
              <KitchenItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenPage;
