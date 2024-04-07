const transporter = require("../config/NodeMailerTransporter");

exports.contactAdmin = async (req, res) => {
    try {
      const { email, subject, message } = req.body;
      console.log(email, subject, message);
      htmlContent = `
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              p {
                margin-bottom: 0;
                padding-bottom: 0;
              }
            </style>
          </head>
          <body>
            <h3>Hey Admin, there is a message for you.</h3>
            <p><b>Subject: </b></p>
            <p><b>${subject}</b></p>
            <p><b>Message: </b><br/></p>
            <p>${message}</p>
          </body>
        </html>
      `;
      const info = await transporter.sendMail({
        from: `${email}`,
        to: "moviemate.web@gmail.com",
        subject: subject,
        html: htmlContent,
      });
  
      return res.status(200).json({
        success: true,
        message: "Message send to admin successfully!",
      });
    } 
    catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error while sending message to admin",
        error: error.message
      });
    }
  };