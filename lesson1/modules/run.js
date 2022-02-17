// ---------------------- module path
const path = require('path');

const pathJoin = path.join('user', 'nodejs', 'test', '123');
console.log(pathJoin);

const pathResolve = path.resolve('asdasd//asd///asd///asd///asd//test.js');
console.log(pathResolve);

const normalizePath = path.normalize('user///nabya/////sd/fsd/file.txt');
console.log(normalizePath);

// ---------------------- module os
const os = require('os');

// console.log(os.cpus());
// console.log(os.cpus().length);
console.log(os.freemem()); // показывает количество свободной оперативки
console.log(os.hostname());
console.log(os.arch());


// ----------------------- module fs

const fs = require('fs');
// console.log(fs);

// fs.writeFileSync(path.join(__dirname, 'data.js'), 'somedata');
// - sync write to file

// - async write to file and create file
// fs.writeFile(path.join(__dirname,'text.js'),'some DATA', (err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     console.log('The file has been saved!');
// })

// - read file
// fs.readFile(path.join(__dirname,'text.js'),'utf8',((err, data) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     // console.log(data.toString());
//     console.log(data);
// }))

// - add data to file
// fs.appendFile(path.join(__dirname,'text.js'),'\nnewData',err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// })
//
// for (let i = 0; i < 100; i++) {
//     fs.appendFile(path.join(__dirname,'text.js'),'\nnewData',err => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     })
//
// }

// flag : 'w' - при запуске функции стереть файл и записать один раза data
// fs.appendFile(path.join(__dirname,'text.js'),'\nnewData', {flag: 'w'},err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// })

// удаление всх данных с файла
// fs.truncate(path.join(__dirname,'text.js'),err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// })

// удаление файла
// fs.unlink(path.join(__dirname,'text.js'),err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// })

//создание папок
// fs.mkdir(path.join(__dirname,'public2'),err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// })

// рекурсивное создание папок
// fs.mkdir(path.join(__dirname,'public2','inner','inner2'), {recursive:true},err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// })

// удаление папки
// fs.rmdir(path.join(__dirname,'public2','inner'), err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// })

// чтение папки на наличие папок и фалов внутри
fs.readdir(path.join(__dirname,'public2'),(err,data) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log(data);
})

// переименование фалов, папок или их переремещение
fs.rename(path.join(__dirname, 'public2'), path.join(__dirname, 'public3'), err => {
    if (err) {
        console.log(err);
        throw err;
    }
});