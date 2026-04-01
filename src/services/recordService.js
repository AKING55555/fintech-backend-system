const Record = require('../models/Record');

const getSummary = async () => {
  // 🔥 OVERVIEW (income vs expense)
  const totals = await Record.aggregate([
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  let totalIncome = 0;
  let totalExpense = 0;

  totals.forEach(item => {
    if (item._id === 'income') totalIncome = item.total;
    if (item._id === 'expense') totalExpense = item.total;
  });

  const netBalance = totalIncome - totalExpense;

  // 🔥 CATEGORY BREAKDOWN WITH PERCENTAGE
  const categoryRaw = await Record.aggregate([
    {
      $group: {
        _id: { category: "$category", type: "$type" },
        total: { $sum: "$amount" }
      }
    }
  ]);

  const categories = {
    income: [],
    expense: []
  };

  categoryRaw.forEach(item => {
    const { category, type } = item._id;
    const total = item.total;

    const base = type === 'income' ? totalIncome : totalExpense;

    categories[type].push({
      category,
      total,
      percentage: base
        ? Number(((total / base) * 100).toFixed(2)) // ✅ FIXED
        : 0
    });
  });

  // 🔥 MONTHLY TRENDS
  const trends = await Record.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type"
        },
        total: { $sum: "$amount" }
      }
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 }
    }
  ]);

  const trendMap = {};

  trends.forEach(item => {
    const { year, month, type } = item._id;
    const key = `${year}-${month}`;

    if (!trendMap[key]) {
      trendMap[key] = {
        year,
        month,
        income: 0,
        expense: 0
      };
    }

    trendMap[key][type] = item.total;
  });

  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const trendArray = Object.values(trendMap).map(t => ({
    month: `${monthNames[t.month - 1]} ${t.year}`, // ✅ formatted
    income: t.income,
    expense: t.expense
  }));

  // 🔥 RECENT TRANSACTIONS (CLEANED)
  const recentRaw = await Record.find()
    .sort({ createdAt: -1 })
    .limit(5);

  const recent = recentRaw.map(r => {
    const obj = r.toObject();
    delete obj.__v;
    delete obj.createdBy; // ✅ removed
    return obj;
  });

  return {
    overview: {
      totalIncome,
      totalExpense,
      netBalance
    },
    categories,
    trends: trendArray,
    recent
  };
};

module.exports = { getSummary };