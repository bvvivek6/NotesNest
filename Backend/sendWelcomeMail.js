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
              <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
              <style>
                body {
                  background-color: #f2f2f2;
                  font-family: 'Roboto', sans-serif;
                  margin: 0;
                  padding: 0;
                }
                .email-wrapper {
                  max-width: 600px;
                  border-width: 1px;
                  border: 1px solid #DADCE0;
                  margin: 40px auto;
                  background-color: #ffffff0;
                  border-radius: 8px;
                  padding: 32px;
                }
                .logo {
                  margin-bottom: 24px;
                }
                .banner-checkered {
                  width: 100%;
                  height: 120px;
                  background-image: 
                    linear-gradient(45deg, #ffffff 25%, transparent 25%), 
                    linear-gradient(-45deg, #ffffff 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, #ffffff 75%), 
                    linear-gradient(-45deg, transparent 75%, #ffffff 75%);
                  background-size: 40px 40px;
                  background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
                  background-color: #1a73e8;
                }

                .title {
                  font-size: 20px;
                  font-weight: 500;
                  color: #202124;
                  text-align: center;
                  margin-bottom: 8px;
                }
                .subtitle {
                  font-size: 16px;
                  color: #5f6368;
                  text-align: center;
                  margin-bottom: 24px;
                }
                .content {
                  font-size: 14px;
                  color: #3c4043;
                  line-height: 1.6;
                }
                .content strong {
                  font-weight: 500;
                }
                .cta-link {
                  display: inline-block;
                  margin-top: 20px;
                  text-decoration: none;
                  background-color: #1a73e8;
                  color: #ffffff;
                  padding: 10px 20px;
                  border-radius: 4px;
                  font-size: 14px;
                  font-weight: 500;
                }
                .footer {
                  font-size: 12px;
                  color: #9aa0a6;
                  text-align: center;
                  margin-top: 32px;
                  line-height: 1.5;
                }
              </style>
            </head>
            <body>
              <div class="email-wrapper">
                <div class="logo">
                    <div class="banner-checkered"></div>
                </div>
                <div class="title">Welcome to Notes App</div>
                <div class="subtitle">${username}</div>
                <div class="content">
                  <p>Thanks for signing up for <strong>Notes App</strong>! We're excited to have you.</p>
                  <p>Start organizing your thoughts, making quick notes, and keeping everything in sync — all in one place.</p>
                  <a class="cta-link" href="https://your-notes-app.com">Get Started</a>
                </div>
                <div class="footer center">
                  &copy; ${new Date().getFullYear()} Notes App · <br>
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
