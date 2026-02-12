// controllers/userController.js
const usersCollection = require("../models/usermodel.js");

// POST: Save a new contact form submission
exports.createMessage = async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, Email, and Message are required" });
    }

    const newMessage = {
      fullName,
      email,
      phone: phone || "",
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await usersCollection.insertOne(newMessage);

    res.status(201).json({
      success: true,
      id: result.insertedId,
      data: newMessage,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET: Fetch all messages (optional for admin dashboard)
exports.getMessages = async (req, res) => {
  try {
    const messages = await usersCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
