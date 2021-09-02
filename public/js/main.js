const chatForm = document.getElementById('chat-form');
const userEmail = document.getElementById('mail');
const msg = document.getElementById('texto');
const chatMessages = document.querySelector('.chat-messages');


const socketIo = io();

socketIo.on('message', (data) => {
  //add the message to the chat Window
  outputMessage(data);
});

//Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //Emit Message to the server
  socketIo.emit('chatMessage', msg.value, userEmail.value);
  //Clear submitted message
  msg.value = '';
});

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
  <p class="meta"><b><FONT COLOR="blue">${message.username}</FONT></b> <span> [<FONT COLOR="brown">${message.time}</FONT>]</span><span><I><FONT COLOR="green"> : ${message.text}</FONT></I></span></p>`;

  chatMessages.appendChild(div);
}