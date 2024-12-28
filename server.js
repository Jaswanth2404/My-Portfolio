// Form Submission Handling
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent page reload

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
          alert("Please fill in all the fields.");
          return;
      }

      alert("Your message has been sent successfully!");

      form.reset();
  });
});

// Side Menu Handling
const sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}

function closemenu() {
  sidemenu.style.right = "-200px";
}

// Tab Switching Functionality
const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (let tablink of tablinks) {
      tablink.classList.remove("active-link");
  }
  for (let tabcontent of tabcontents) {
      tabcontent.classList.remove("active-tab");
  }
  document.querySelector(`.tab-links[data-tab="${tabname}"]`).classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// NodeMailer (Backend) Setup
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contact', (req, res) => {
  const { Name, Email, Message } = req.body;

  const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: process.env.EMAIL_USER, // Using environment variable for email
          pass: process.env.EMAIL_PASS  // Using environment variable for password
      }
  });

  const mailOptions = {
      from: Email,
      to: 'jaswanthchowdary2404@gmail.com',
      subject: `Contact Form Submission from ${Name}`,
      text: Message
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          res.status(500).send('Error sending message');
      } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send('Message sent successfully');
      }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
