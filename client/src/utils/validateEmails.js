export default (emails) => {
  const emailsArray = emails.split(',').map((email) => {
    return email.trim();
  });
};