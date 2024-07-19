// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport("SMTP",{
//   service: 'Gmail',
//   auth: {
//     user: 'sainavya.pallerla@gmail.com',
//     pass: 'Sainavya@2003'
//   }
// });

// var mailOptions = {
//   from: 'sainavya.pallerla@gmail.com',
//   to: 'sainavya.pallerla@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// }); 



var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport("SMTP", {
    service: 'Gmail',
    auth: {
        user: 'sainavya.pallerla@gmail.com',
        pass: 'Sainavya@2003'
    }
});

var http = require('http');
var httpServer = http.createServer(function (request, response)
{
    transporter.sendMail({
       from: 'sainavya.pallerla@gmail.com',
       to: 'sainavya.pallerla@gmail.com',
       subject: 'hello world!',
       text: 'hello world!'
    });
}).listen(8080);
