// models/userModel.js
const client = require("../config/db"); // import MongoDB client instance

// Get database and collection
const db = client.db("Users"); 
const usersCollection = db.collection("users");

// Export collection
module.exports = usersCollection;
