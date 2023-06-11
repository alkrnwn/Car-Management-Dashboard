function setValue(x) {
  document.getElementById('modal-form').action = `/api/v1/delete/${x}`;
}

const myTimeout = setTimeout(myGreeting, 5000);

function myGreeting() {
  $('#alert-message').slideUp()
}

