function greeting(name) {
    console.log(`Hello. My name is ${name}`);
}

function test() {
    console.log('This is test');
}

module.exports = {
    greeting,
    test
};


// require global var
require('./run');
console.log('test.js');
console.log(global.date);