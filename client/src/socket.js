const socket = require('socket.io-client')(process.env.NODE_ENV === 'production' ?
  'http://localhost:3000' : 'http://localhost:3001');

export default socket;

