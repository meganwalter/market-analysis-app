function Product(imgId, src, name) {
  this.imgId = imgId;
  this.src = src;
  this.name = name;
  this.counter = 0;
  picsArr.push(this);//push to array
};
var picsArr = [];

var thing1 = new Product(imgId, src, name);
var thing2 = new Product(imgId, src, name);
var thing3 = new Product(imgId, src, name);
var thing4 = new Product(imgId, src, name);
var thing5 = new Product(imgId, src, name);
var thing6 = new Product(imgId, src, name);
var thing7 = new Product(imgId, src, name);
var thing8 = new Product(imgId, src, name);
var thing9 = new Product(imgId, src, name);
var thing10 = new Product(imgId, src, name);
var thing11 = new Product(imgId, src, name);
var thing12 = new Product(imgId, src, name);
var thing13 = new Product(imgId, src, name);
var thing14 = new Product(imgId, src, name);
var thing15 = new Product(imgId, src, name);

var picOne = document.getElementById('id');
var picTwo = document.getElementById('id');
var picThree = document.getElementById('id');

var pickPic = function getRandomInt(1, 16) {
  return Math.floor(Math.random() * (16 - 1)) + min;
}

var returnPick = picsArr[pickPic()];
