const nodemailer = require('nodemailer');
const { logger } = require('../../app/utils/logger');
const {
  email: { auth, host, port },
} = require('../../app/configs');

async function sendEmail(email, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: true,
      auth,
    });

    await transporter.sendMail({
      from: auth.user,
      to: email,
      subject,
      text,
    });
  } catch (err) {
    logger.error(err);
  }
}

module.exports = {
  sendEmail,
};
