require("dotenv").config();
const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (toEmail, username) => {
  // Replace with your actual Gmail & App Password (not your Gmail password)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_MAIL, // Ensure this is the correct environment variable name
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log(`Sending email to ${toEmail}`);

  const mailOptions = {
    from: `"Notes App" <${process.env.MY_MAIL}>`,
    to: toEmail,
    subject: "Welcome to Notes App! 🎉",
    html: `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f7fc;
          margin: 0;
          padding: 0;
        }
        .email-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          font-size: 24px;
          color: #333333;
        }
        .body-text {
          font-size: 16px;
          color: #555555;
          line-height: 1.5;
        }
        .cta-button {
          display: inline-block;
          margin-top: 20px;
          background-color: #4CAF50;
          color: #ffffff;
          padding: 12px 20px;
          font-size: 16px;
          text-decoration: none;
          border-radius: 5px;
        }
        .cta-button:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h2>Hi ${username},</h2>
        </div>
        <div class="body-text">
          <p>Thanks for signing up for <strong>Notes App</strong>. We're glad to have you!</p>
          <p>Start taking your notes today and organize your thoughts in the best way possible.</p>
          <a href="https://your-notes-app.com" class="cta-button">Start Now</a>
        </div>
      </div>
    </body>
  </html>
`,
  };
  await transporter.sendMail(mailOptions);
  console.log(`Email sent to ${toEmail}`);
};

module.exports = sendWelcomeEmail;
