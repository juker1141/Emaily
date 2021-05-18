const express = require('express'); // nodeJS 基本上還是採用commonJS的寫法
// 就算寫 import express from 'express';(ES2015) 也還是需要編譯
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport'); // 因為該檔案沒有export, 所以只需要執行該程式

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    // 使用 cookieSession 可以將我們的資料整個塞入cookie
    // 但因為我們只關心用戶的 ID 所以不需要很多資料
    // 若是有一堆的用戶資料，那可能可以選擇使用expressSession
    maxAge: 30 * 24 * 60 * 60 * 1000,// cookie的時效，並且要轉換為毫秒(此範例為30天)
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // 這裡的 route 將會 export 一個 function
require('./routes/billingRoutes')(app); // 所以在後方加入() 來執行他
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // 確保 Express 會在 production 模式下運行 main.js or main.css
  app.use(express.static('client/build'));
  // 讓 Express 知道 如果有一些識別不了的路由 可以去這個路徑找找看

  // 如果 Express 不能識別前端的路由 確保會運行 index.html
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
  // 如果真的完全找不到該路徑 直接回傳 index.html

};

const PORT = process.env.PORT || 5000;

app.listen(PORT);
