const _ = require('lodash');
const { Path } = require('path-parser');
const path = require('path');
const { URL } = require('url'); // node.js 裡面就有的 library
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const MailgunMailer = require('../services/MailgunMailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const cardColors = require('../utils/cardColors');
const { divide } = require('lodash');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.delete('/api/surveys/delete', requireLogin, async (req, res) => {
    // const survey = await Survey.findOne()
    await Survey.deleteOne({ _id: req.body.SurveyId })
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false }); // 告訴 mongoose 不要回傳 recipients 給我們
    // 因為我們不需要那些資料

    res.send(surveys);
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false }); // 告訴 mongoose 不要回傳 recipients 給我們
    // 因為我們不需要那些資料

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.sendFile(path.resolve('feedbackpage/index.html'));// 可以更改得更好!! 讓用戶更有屋回饋的感覺
  });

  app.post('/api/surveys/webhooks', bodyParser.urlencoded(), (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    const { recipient: email, url, event } = req.body["event-data"];
    const match = p.test(new URL(url).pathname);

    if (match && event === "clicked") {
      Survey.updateOne({
        _id: match.surveyId,
        recipients: {
          $elemMatch: { email: email, responded: false }
        },
      }, {
        $inc: { [match.choice]: 1 },
        $set: { 'recipients.$.responded': true },
        lastResponded: new Date(),
      }).exec();
    }

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const cardColor = cardColors[Math.floor(Math.random() * cardColors.length)];

    const emails = recipients.split(",").map((email) => ({ email: email.trim() }));


    const survey = new Survey({
      title,
      subject,
      body,
      recipients: emails,
      recipientsNum: emails.length,
      _user: req.user.id,
      dateSent: Date.now(),
      cardColor,
    });


    // 這裡很適合寄 Email
    // 
    // mailer.sendSingleEmail();

    try {

      emails.map(async ({ email }) => {
        const mailer = new MailgunMailer(subject, email, surveyTemplate(survey));

        await mailer.send();
      });
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    };
  });
};