const express = require('express'); // nodeJS 基本上還是採用commonJS的寫法
// 就算寫 import express from 'express';(ES2015) 也還是需要編譯
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport'); // 因為該檔案沒有export, 所以只需要執行該程式

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,// cookie的時效，並且要轉換為毫秒(此範例為30天)
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
