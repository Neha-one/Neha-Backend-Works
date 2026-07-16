// 1.here width and height use before declare.
function calculateArea(width, height) {
  return width + height;
}
let width = 10;
//2. there is no datatype for height
height = 5;

//3. area doesn't define
if (area > 100) {
  console.log("the area is large.")
}
else {
  console.log("the area is small.")
}
//4. have to use area after define area and also define width and height.
if (width + height > 100) {
  console.log('area is greater than or equal to 100')
}

module.exports = calculateArea;