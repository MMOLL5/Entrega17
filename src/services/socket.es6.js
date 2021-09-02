import socketIo from 'socket.io';
import { formatMessages } from '../utils/messages.es6.js';
import fs from 'fs';
import { Mensajes } from '../persistencia/mensajes';

const data = {
  username: undefined,
  text: undefined,
};

export const initWsServer = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Nueva Conexion establecida!');

    //Listen for chat messages
    socket.on('chatMessage', (msg, userName) => {
      data.username = userName;
      data.text = msg;
      /*fs.appendFileSync('historico.txt', JSON.stringify(formatMessages(data))+'\n', error =>{
          if(error)
            console.log('Error al guardar el mensaje');
      });*/

      Mensajes.add(data)
        .then((data) => console.log(data))
        .catch((err) => {
          console.log(err.message);
        });
      io.emit('message', formatMessages(data));
    });
  });

  return io;
};