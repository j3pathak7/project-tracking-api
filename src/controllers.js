const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const models = require("./models");
const services = require("./services");
const utils = require("./utils");

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new models.UserModel({
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await models.UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const trackingNumber = utils.generateTrackingNumber();
    const product = new models.ProductModel({
      name,
      description,
      trackingNumber,
    });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const product = await models.ProductModel.findByIdAndUpdate(
      id,
      { name, description, status },
      { new: true }
    );
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await models.ProductModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await models.ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const createTrackingEvent = async (req, res, next) => {
  try {
    const { productId, status, location } = req.body;
    const event = new models.TrackingEventModel({
      productId,
      status,
      location,
    });
    await event.save();
    res
      .status(201)
      .json({ message: "Tracking event created successfully", event });
  } catch (error) {
    next(error);
  }
};

const getTrackingEvents = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const events = await models.TrackingEventModel.find({ productId });
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

const sendNotification = async (req, res, next) => {
  try {
    const { email, subject, message } = req.body;
    await services.sendEmail(email, subject, message);
    res.status(200).json({ message: "Email notification sent successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  createTrackingEvent,
  getTrackingEvents,
  sendNotification,
};
