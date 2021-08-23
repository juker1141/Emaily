const keys = require('../../config/keys');

module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <p>${survey.body}</p>
          <div>
            <a
              style="margin-right: 24px"
              href="${keys.redirectDomain}/api/surveys/${survey.id}/yes"
            >
              Yes
            </a>
            <a
              href="${keys.redirectDomain}/api/surveys/${survey.id}/no"
            >
              No
            </a>
          </div>
        </div>
      </body>
    </html>
  `;
};