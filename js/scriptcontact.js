
/////   contact us 

const contactApi = "https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us";

// select Form
const contactUsForm = document.querySelector("#contact-form");

// add submit Event listener
contactUsForm.addEventListener("submit", (ev) => {
  // prevent default
  ev.preventDefault();
  // Get form data
  const name = document.querySelector("#name");
  const email =  document.querySelector("#email");
  const subject =  document.querySelector("#subject");
  const message =  document.querySelector("#message");


  const data = { 
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  };
  console.log(name.value);
  console.log(email.value);
  console.log(subject.value);
  console.log(message.value);

  // Send request
  const xhr = new XMLHttpRequest();
  xhr.open("POST", contactApi);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));

  // Recieve Response and reset the form
  xhr.onload = function () 
  {
    console.log(xhr.status);
    if (xhr.status == 201 || xhr.status == 200) 
    {
      name.value = email.value = subject.value = message.value = "";
      contactUsForm.reset();
    }
  };

  xhr.onerror = function () 
  {
    console.log("Request Error.");
  };

});



