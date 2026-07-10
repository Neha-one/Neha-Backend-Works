const fs = require('fs')
console.log("Hello Backend Developer");

fs.writeFile("context.txt", "Hello i am added with creating context.txt file", (err) => {
  if (err) console.log(err)
  else
    console.log("finally added without error")
}
)