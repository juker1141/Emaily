const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // 第二個參數沒有執行的原因是 我們希望只有使用者來到這個api時才調用
    // 而不是程式開啟時就調用
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id,
    });

    req.user.credits += 5; // 增加 5個額度給已付費的使用者
    const user = await req.user.save();

    res.send(user);
  });
};