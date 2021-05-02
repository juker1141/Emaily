module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  };// 警告用戶或管理者 必須登入才能使用

  next(); // 如果用戶已經登錄 讓他去下個 middlewares
};