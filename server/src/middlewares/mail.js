import mailer from 'nodemailer';

const transport = mailer.createTransport({
  host: 'smtp.gmail.com', 
  secureConnection: true,
  port: 465,
  auth: {
    user: 'sunnolelectronics@gmail.com',
    pass: process.env.emailPassword,
  },
  transportMethod: 'SMTP',
});
const sendMail = (mailOptions) => {
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return (error);
    }
    return (info);
  });
};
export default sendMail;
