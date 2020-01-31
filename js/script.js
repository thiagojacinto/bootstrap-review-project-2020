// Javascript Main file
// Author: Thiago Jacinto e Cícero Oliveira @ 2020

// Localstorage usage:
// first save the saved items into this variable
var items = JSON.parse(localStorage.getItem('items')) || [];

// Get the buttons
const noActionButton = document.querySelector('#no-action') || undefined;
const callCalendarButton = document.querySelector('#call-calendar') || undefined;
const alertButton = document.querySelector('#alert-button') || undefined;
const ticketsButton = document.querySelector('#tickets-button') || undefined;

// Small alert to NO ACTION handling
const alertHandler = (event) => {
  event.preventDefault();   // Prevents reload of the page

  alert("Função indisponível. Tente novamente mais tarde");
  // change inner button text
  if (noActionButton) noActionButton.innerHTML = `<h1>Não disponível 🙁</h1>`;
  if (alertButton) alertButton.innerHTML = `<h1>Não disponível 🙁</h1>`;
  // revert that change in 4 seconds
  setTimeout( () => {
    if (noActionButton) noActionButton.innerHTML = 'Vem carnavalizar! 🎉';
    if (alertButton) alertButton.innerHTML = 'Vem carnavalizar! 🎉';
    }, 4000
  );
}
    
noActionButton && noActionButton.addEventListener('click', event => alertHandler(event)); 
alertButton && alertButton.addEventListener('click', event => alertHandler(event)); 

// calendar auxiliary data:
const calendarAux = () => {
  // change inner button text & its class to desable
  callCalendarButton.innerHTML = `<h2>Evento adicionado 🎉<h2>`;
  callCalendarButton.classList.add('disabled');
  callCalendarButton.setAttribute('aria-disabled', true);
  // console.log('calendar button updated.'); // Verify
  
};

// Adding into calendar
const calendarHandler = (event) => {
  event.preventDefault();

  alert('Evento adicionado, agora é só comparecer!');
  calendarAux();

  let item = {
    name: event.target.name,
    booked: true,
  }
  // Added into array
  items.push(item);
  // Saves into local storage:
  localStorage.setItem(
    'items',
    JSON.stringify(items)
  );
};

const verifyBooking = async items => {
  // event.preventDefault();
  // get name of the button
  // var whichGroup = event.target.name;
  var typeOfGroup = callCalendarButton.getAttribute('name');
  // console.log(typeOfGroup); // Verify
  
  // search the array for that name
  const carnivalGroup = await items.find(item => item.name === typeOfGroup);
  // console.log(carnivalGroup); // Verify
  if (carnivalGroup && carnivalGroup.booked) calendarAux();
}
// Verify if event was already booked.
verifyBooking(items);

callCalendarButton.addEventListener('click', 
  event => calendarHandler(event)
);

// Buy tickets button handling
const buyTickets = (event) => {
  event.preventDefault();

  ticketsButton.innerHTML = `Ingressos vendidos / Evento já acabou 🙁`;
  ticketsButton.classList.add('disabled');
  ticketsButton.setAttribute('aria-disabled', true);
};

ticketsButton && ticketsButton.addEventListener('click', 
  event => buyTickets(event)
);