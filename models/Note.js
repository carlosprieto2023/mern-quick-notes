// server/models/Note.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Associate with User
    category: { type: String, default: 'General' }, // Add category field with default
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model('Note', noteSchema);
