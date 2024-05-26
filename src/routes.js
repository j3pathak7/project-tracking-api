const express = require("express");
const router = express.Router();
const controllers = require("./controllers");
const middlewares = require("./middlewares");
const { body } = require("express-validator");

// User Authentication
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  controllers.register
);
router.post(
  "/login",
  body("email").isEmail(),
  body("password").exists(),
  controllers.login
);

// Products
router.post(
  "/products",
  middlewares.authenticateToken,
  middlewares.authorizeRoles(["admin"]),
  controllers.createProduct
);
router.put(
  "/products/:id",
  middlewares.authenticateToken,
  middlewares.authorizeRoles(["admin"]),
  controllers.updateProduct
);
router.delete(
  "/products/:id",
  middlewares.authenticateToken,
  middlewares.authorizeRoles(["admin"]),
  controllers.deleteProduct
);
router.get("/products", middlewares.authenticateToken, controllers.getProducts);

// Tracking Events
router.post(
  "/events",
  middlewares.authenticateToken,
  middlewares.authorizeRoles(["admin"]),
  controllers.createTrackingEvent
);
router.get(
  "/events/:productId",
  middlewares.authenticateToken,
  controllers.getTrackingEvents
);

// Notifications
router.post(
  "/notify",
  middlewares.authenticateToken,
  middlewares.authorizeRoles(["admin"]),
  controllers.sendNotification
);

module.exports = router;
