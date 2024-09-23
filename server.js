app.post('/send', (req, res) => {
  const { name, email, phone, address, message } = req.body;

  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'tiyashaghorui15@gmail.com', 
          pass: 'Tiyasha@2002'   
      }
  });

  let mailOptions = {
      from: email,
      to: 'tiyashaghorui15@gmail.com',  
      subject: `New Contact Form Message from ${name}`,
      text: `You have a new message from:

      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Address: ${address}

      Message:
      ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return res.status(500).json({ error: 'Failed to send message' });
      }
      res.status(200).json({ success: 'Message sent successfully!' });
  });
});
