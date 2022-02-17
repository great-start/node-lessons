const fs = require('fs');
const path = require('path');


const readStream = fs.createReadStream(path.join(__dirname, 'callback.mp4'));
const writeStream = fs.createWriteStream(path.join(__dirname, 'fileTo.txt'));

// readStream.on('data', chunk => {
//     // console.log(chunk.toString());
//     writeStream.write(chunk, error => {
//         if (error) {
//             throw error;
//         }
//     })
//     writeStream.end();
// })


readStream.pipe(writeStream);



