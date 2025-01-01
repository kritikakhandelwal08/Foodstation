import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Breakfast, Lunch
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
});

const Menu = mongoose.model('menu', foodSchema);
export default Menu;
