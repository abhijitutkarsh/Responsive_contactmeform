// const express = require('express')
// const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars')
// const nodemailer = require('nodemailer')
// const path = require('path');
// const app = express();

// //view engine setup
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// //static folder
// app.use('/public', express. static(path.join(__dirname,'public')));

// // Body Parser Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


// app.get('/', (req,res)=>{
//     res.render("contact", {
//         layout: false,
//         name: req.body.name,
//         quote: req.body.quote
//         });
// });

// app.post('/send', (req, res)=>{
//     const output =`
//     <p>you have a new contact request</p>
//     <h3>Contact form </h3>
//     <ul>
//         <li>Name: ${req.body.name}</li>
//         <li>Company: ${req.body.company}</li>
//         <li>Email: ${req.body.email}</li>
//         <li>Phone: ${req.body.phone}</li>
//     </ul>
//     <h3>MESSAGE</h3>
//     <p>${req.body.message}</p>
//     `;
//     let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: 'abhijitu18@gmail.com', // generated ethereal user
//       pass: 'GITcontribution123#', // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Nodemailer Contact" <abhijitu18@gmail.com>', // sender address
//     to: "abhijitu17@gmail.com", // list of receivers
//     subject: "Node Contact Request ", // Subject line
//     text: "Hello world?", // plain text body
//     html: output, // html body
//   });

//   transporter.sendMail(mailOptions, (error,info) => {
//       if(error) {
//           return console.log(error);
//       }
      
//       console.log("Message sent: %s", info.messageId);
//       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      
//       res.render('contact', {msg:'email has been sent'})
//     });
// });

// app.listen(3000,() =>  console.log('started...'))

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors({
  origin: '*'
}));
// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact',{
    layout: false
  });
});

app.post('/send', (req, res) => {
  
      // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader('Access-Control-Allow-Methods', 'POST');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // res.setHeader("Access-Control-Allow-Origin", "*");

  console.log(req);
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.username}</li>
      <li>Mobile: ${req.body.mobile}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abhijitu18@gmail.com',
      pass: 'ryihgeddruimjage' // naturally, replace both with your real credentials or an application-specific password
    }
  });
  
  const mailOptions = {
    from: 'abhijitu18@gmail.com',
    to: 'abhijitu17@gmail.com',
    subject: 'Node Contact Request',
    text: 'Hello',
    html: output,
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    }
       console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          
        res.render('contact', {
          msg:'email has been sent',
          layout: false,

        })
  });
})

app.listen(process.env.PORT || 3000, () => console.log('Server started...'));