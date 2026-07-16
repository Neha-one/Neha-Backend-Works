console.log("1 start of script");

//Microtask queue (Promise)
Promise.resolve().then(() => console.log("3 Microtask Promise resolve"))

//Time queue
setTimeout(() => console.log("4 Timer"), 0);

//I/O
const fs = require('fs');
fs.readFile('user.txt', () => console.log('5 I/O operation'))

//Check queue
setImmediate(() => console.log('6 Immediate'))

//Close queue
process.on('exit', (code) => {
  console.log('7 Exit event');
 })

 console.log('2 End of script')