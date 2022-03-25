const {greeting, test} = require('./test');

greeting('Kolya');
test();

console.log(__filename);
console.log(__dirname);
console.log(process.cwd()) // возвращает путь к папке с которого запускается node (cwd - current work direction)

global.date = new Date().getFullYear();
// console.log(date);
// console.log(global.date);

