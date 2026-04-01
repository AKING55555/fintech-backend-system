const recordService = require('../services/recordService');

const create = async (req, res, next) => {
  try {
    const record = await recordService.createRecord(req.body);

    res.status(201).json({
      message: 'Record created successfully',
      data: record
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const data = await recordService.getRecords(req.query);

    res.json({
      message: 'Records fetched successfully',
      ...data
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const record = await recordService.updateRecord(
      req.params.id,
      req.body
    );

    res.json({
      message: 'Record updated successfully',
      data: record
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await recordService.deleteRecord(req.params.id);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, getAll, update, remove };