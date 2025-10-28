// server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, address, phone, message } = req.body;

  // setup mail transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your_email@gmail.com",
      pass: "your_app_password"
    }
  });

  const mailOptions = {
    from: email,
    to: "your_email@gmail.com",
    subject: `Portfolio Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nAddress: ${address}\nPhone: ${phone}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error sending message." });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
