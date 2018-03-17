import mailer from 'nodemailer';

const transport = mailer.createTransport({
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  // service: 'Gmail',
  auth: {
    user: 'sunnolelectronics@gmail.com',
    pass: process.env.emailPassword,
  },
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
});
const sendMail = (mailOptions) => {
  // if (env === 'development') res.body.mailReport = 'Email Sent';
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return (error);
    }
    return (info);
  });
};
export default sendMail;
