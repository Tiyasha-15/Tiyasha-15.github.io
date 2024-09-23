const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST route to handle form submission
app.post('https://tiyasha-15.github.io/send', (req, res) => {
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
        subject: `New Contact Message from ${name}`,
        text: `You have a new message from ${name}:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Address: ${address}

        Message:
        ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to send message' });
        }
        res.status(200).json({ success: 'Message sent successfully!' });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
