// routes/userRouter.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller.js");

// POST - save new contact message
router.post("/contact", userController.createMessage);

// GET - list all contact messages (optional)
router.get("/contact", userController.getMessages);

module.exports = router;
