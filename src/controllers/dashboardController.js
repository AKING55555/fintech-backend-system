const dashboardService = require('../services/dashboardService');

const getSummary = async (req, res, next) => {
  try {
    const data = await dashboardService.getSummary();

    res.json({
      message: 'Dashboard summary fetched',
      data
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSummary };