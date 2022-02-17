const eventEmitter = require('events');

const e = new eventEmitter();

e.on('Log', () => {
    console.log('Event \'Log\'');
})

// e.emit('Log');
// e.emit('Log');

e.once('Start', () => {
    console.log('Event \'Start\'');
})

// e.emit('Start');
// e.emit('Start');

console.log(e.eventNames()); // возвращает массив eventoв





