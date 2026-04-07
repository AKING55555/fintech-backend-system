const Record = require('../models/Record');
const mongoose = require('mongoose');

// 🔹 CREATE (Admin Only)
const createRecord = async (data) => {
  // basic sanity check (keep minimal)
  if (data.amount <= 0 || data.amount > 10000000) {
    throw { status: 400, message: "Invalid amount value" };
  }

  return await Record.create(data);
};

// 🔹 GET ALL (WITH FILTERS)
const getRecords = async (query) => {
  const {
    page = 1,
    limit = 10,
    type,
    category,
    startDate,
    endDate
  } = query;

  const filter = {};

  // type filter
  if (type && ['income', 'expense'].includes(type)) {
    filter.type = type;
  }

  // category filter (case-insensitive)
  if (category) {
    filter.category = { $regex: category, $options: 'i' };
  }

  // date range filter
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const skip = (page - 1) * limit;

  const records = await Record.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Record.countDocuments(filter);

  return {
    total,
    page: Number(page),
    records
  };
};

// 🔹 UPDATE (Admin Only)
const updateRecord = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw { status: 400, message: "Invalid record ID" };
  }

  const record = await Record.findById(id);

  if (!record) {
    throw { status: 404, message: "Record not found" };
  }

  const allowedFields = ['amount', 'type', 'category', 'notes'];

  allowedFields.forEach(field => {
    if (data[field] !== undefined) {
      record[field] = data[field];
    }
  });

  // minimal sanity check
  if (data.amount !== undefined) {
    if (data.amount <= 0 || data.amount > 10000000) {
      throw { status: 400, message: "Invalid amount value" };
    }
  }

  return await record.save();
};

// 🔹 DELETE (Admin Only)
const deleteRecord = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw { status: 400, message: "Invalid record ID" };
  }

  const record = await Record.findByIdAndDelete(id);

  if (!record) {
    throw { status: 404, message: "Record not found" };
  }

  return { message: "Record deleted successfully" };
};

module.exports = {
  createRecord,
  getRecords,   // ✅ IMPORTANT (matches controller)
  updateRecord,
  deleteRecord
};