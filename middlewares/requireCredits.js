module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not eniugh credits!' });
  }; // 確保用戶或管理者有至少一個的 credits

  next(); // 如果用戶擁有 credits 讓他去下個 middlewares
};