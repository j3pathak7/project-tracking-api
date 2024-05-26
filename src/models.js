const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "customer"], default: "customer" },
});
const UserModel = mongoose.model("User", UserSchema);

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  trackingNumber: { type: String, unique: true },
  status: {
    type: String,
    enum: ["created", "in transit", "delivered"],
    default: "created",
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "TrackingEvent" }],
});
const ProductModel = mongoose.model("Product", ProductSchema);

const TrackingEventSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  status: {
    type: String,
    enum: ["created", "in transit", "delivered"],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  location: String,
});
const TrackingEventModel = mongoose.model("TrackingEvent", TrackingEventSchema);

module.exports = {
  UserModel,
  ProductModel,
  TrackingEventModel,
};
