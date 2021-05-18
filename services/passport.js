const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // 這裡的第一個參數 - user 是來自下方的 done 裡面的第二個參數
  // 也就是資料庫裏面的單一 user 資料
  // 不使用 google 的個人 ID 是因為用戶不一定是使用 google (也許是FB)
  done(null, user.id);
  // 這邊的 user.id 指的不是 google 用戶的id
  // 這邊的 id 是使用 mongoDB 時，自動分配給此物件的 _id
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    // 這裡要從 cookie 裡面拿出 id 然後拿去給 server 比較
    // 所以使用的是 model class -- User
    .then((user) => {
      done(null, user);
    })
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true,
  },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })
      // 尋找是否有相符的ID
      if (existingUser) {
        // 我們已有此使用者資料
        return done(null, existingUser);
        // 第一個參數是錯誤訊息的Object，然而在此範例中
        // 我們不關心錯誤訊息， 所以使用 null
      }
      // 我們沒有此使用者的資料，建立一位新的使用者
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    })
);