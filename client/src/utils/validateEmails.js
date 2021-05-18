//eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmails = (emails) => {
  const invalidEmails = emails
    .split(',')
    .map((email) => {
      return email.trim();
    })
    .filter((email) => {
      return re.test(email) === false;
    })

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return
};

export default validateEmails;