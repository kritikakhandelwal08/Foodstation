import express from "express";
import axios from "axios";

const router = express.Router();

router.get('/recommendations', async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  try {
    const response = await axios.post(
      'http://127.0.0.1:5000/recommend',
      { user_id },
      { timeout: 5000 } // Optional timeout
      
    );
    console.log(response.data); 

    // Validate Flask API response structure
    if (!response.data || !Array.isArray(response.data.recommendations)) {
      throw new Error("Invalid response format from recommendation service");
    }

    const recommendations = response.data.recommendations;

    if (recommendations.length === 0) {
      return res.json({
        success: true,
        message: "No recommendations found for this user",
        data: { recommendations: [] },
      });
    }

    res.json({ success: true, data: { recommendations } });
  } catch (error) {
    console.error(`Error fetching recommendations for user_id ${user_id}:`, error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching recommendations",
      error: error.response ? error.response.data : error.message,
    });
  }
});

export default router;
