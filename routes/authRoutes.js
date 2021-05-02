const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    // 'google'會從 GoogleStrategy裡面去尋找
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
      // 重新導向至 '/surveys'
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
