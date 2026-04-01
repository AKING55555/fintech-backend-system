const validateRecord = (data) => {
  const { amount, type, category } = data;

  if (!amount || amount <= 0) {
    throw { status: 400, message: 'Amount must be positive' };
  }

  if (!['income', 'expense'].includes(type)) {
    throw { status: 400, message: 'Invalid type' };
  }

  if (!category || category.trim() === '') {
    throw { status: 400, message: 'Category is required' };
  }
};

module.exports = { validateRecord };