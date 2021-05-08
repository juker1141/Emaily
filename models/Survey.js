const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  // 使用下底線命名是因為要讓人了解 此部分的資料跟其他部分有關連
  dateSent: Date, // 讓用戶知道是何時發出此調查
  lastResponded: Date, // 讓用戶知道此調查是何時會結束
});

mongoose.model('surveys', surveySchema);