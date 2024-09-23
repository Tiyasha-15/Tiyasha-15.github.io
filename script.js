const circles = document.querySelectorAll('.shape');
circles.forEach(elem => {
  const dots = parseInt(elem.getAttribute("data-dots"));
  const percent = parseInt(elem.getAttribute("data-percent"));
  const marked = Math.floor(dots * percent / 100);
  let points = "";
  const rotate = 360 / dots;

  for (let i = 0; i < dots; i++) {
    points += `<div class="points" style="--i:${i}; --rot:${rotate * i}deg"></div>`;
  }
  elem.innerHTML = points;

  const pointsMarked = elem.querySelectorAll(".points");
  for (let i = 0; i < marked; i++) {
    pointsMarked[i].classList.add('marked');
  }
});

//active menu///
let menuli = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');

function activeMenu(){
  let len = section.length;
  while(--len && window.scrollY + 97 < section[len].offsetTop){}
  menuli.forEach(sec => sec.classList.remove("active"));
  menuli[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll",activeMenu);

//sticky navbar//
const header = document.querySelector("header");
window.addEventListener("scroll",function(){
  header.classList.toggle("sticky",window.scrollY > 50)
});

//navlist open//
let menuicon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".nav-list");

menuicon.onclick = ()=>{
  menuicon.classList.toggle("bx-x");
  navlist.classList.toggle("open");
}

window.onscroll = ()=>{
  menuicon.classList.remove("bx-x");
  navlist.classList.remove("open");
}

//parallax//
const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show-items");
    }else{
      entry.target.classList.remove("show-items")
    }
  });
})

const scrollscale = document.querySelectorAll(".scroll-scale");
scrollscale.forEach((el)=>observer.observe(el));

const scrollbottom = document.querySelectorAll(".scroll-bottom");
scrollbottom.forEach((el)=>observer.observe(el));

const scrolltop = document.querySelectorAll(".scroll-top");
scrolltop.forEach((el)=>observer.observe(el));

//smtp connection//
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route for handling the form submission
app.post('/send', (req, res) => {
    const { name, email, phone, address, message } = req.body;

    // Set up Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tiyashaghorui15@2gmail.com',  // Replace with your email
            pass: 'Tiyasha@2002'    // Replace with your email password or use an app password
        }
    });

    // Email options
    let mailOptions = {
        from: email,  // The sender's email
        to: 'tiyashaghorui15@gmail.com',  // Replace with your own email to receive messages
        subject: `New Contact Form Message from ${name}`,
        text: `You have a new message from your contact form:

        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Address: ${address}

        Message:
        ${message}
        `
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending message.');
        }
        console.log('Message sent: %s', info.messageId);
        res.send('Message sent successfully!');
    });
});

// Serve the contact form (optional)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Assuming your HTML file is named index.html
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
