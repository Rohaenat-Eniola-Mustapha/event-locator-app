const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  directory: {type: String, default: '/'} //store the directory path in the database.
});

module.exports = mongoose.model('File', fileSchema);