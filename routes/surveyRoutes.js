const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url'); // node.js 裡面就有的 library
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const MailgunMailer = require('../services/MailgunMailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false }); // 告訴 mongoose 不要回傳 recipients 給我們
    // 因為我們不需要那些資料

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');// 可以更改得更好!! 讓用戶更有屋回饋的感覺
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

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // 這裡很適合寄 Email
    const mailer = new MailgunMailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    };
  });
};