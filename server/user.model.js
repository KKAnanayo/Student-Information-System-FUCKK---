const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        First: { type: String, required: true },
        Last: { type: String, required: true },
        Middle: { type: String, required: true },
        Email: { type: String, required: true, unique: true },
        Password: { type: String, required: true },
        
    },
    { collection: "user-data" }
    );

const User = mongoose.model('User', UserSchema);

module.exports = User;