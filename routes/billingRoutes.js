const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post('/api/creat-checkout-session', requireLogin, async (req, res) => {
    const seesion = await stripe.checkout.sessions.create({
      success_url: `${keys.redirectDomain}/surveys/addcredits/success/session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${keys.redirectDomain}/surveys/addcredits/cancel`,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price: 'price_1IqdShJvP55xkEyB7tTSZziM',
        quantity: req.body.quantity,
      }],
    })
    return res.json({
      id: seesion.id,
    });
  });

  app.get('/api/checkout/success', requireLogin, async (req, res) => {
    req.user.credits += 5; // 若成功進入success網頁, 增加 5個額度給已付費的使用者
    const user = await req.user.save();

    res.send(user);
  });
};
