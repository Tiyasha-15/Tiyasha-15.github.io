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
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form from submitting traditionally

  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  // Create the data object
  const formData = {
      name: name,
      email: email,
      address: address,
      phone: phone,
      message: message
  };

  try {
      // Send the form data to the backend using fetch API
      const response = await fetch('/send', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });

      // Handle the response from the server
      if (response.ok) {
          alert('Message sent successfully!');
          document.getElementById('contactForm').reset(); // Reset form
      } else {
          alert('Failed to send the message.');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the message.');
  }
});
