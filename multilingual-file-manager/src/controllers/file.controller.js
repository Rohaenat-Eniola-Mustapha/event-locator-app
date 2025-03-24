const File = require('../models/file.model');
const fs = require('fs').promises;
const path = require('path');

exports.uploadFile = async (req, res) => {
  try {
    const { filename, path: filepath, mimetype } = req.file;
    const owner = req.userId;
    const file = new File({ filename, filepath, owner });
    await file.save();
    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await File.find({ owner: req.userId });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFile = async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(req.params.fileId, req.body, { new: true });
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    await fs.unlink(file.filepath);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDirectory = async (req, res) => {
  try {
    const { directoryName } = req.body;
    const directoryPath = path.join('uploads', directoryName);
    await fs.mkdir(directoryPath, { recursive: true });
    res.status(201).json({ message: 'Directory created successfully', directoryPath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};