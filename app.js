var picsArr = [];

function Product(name) {
  this.src = "images/" + name;
  this.name = name;
  this.counter = 0;
  picsArr.push(this);//push to array
};

var name = [];

var thing15 = new Product(name);

var tracker = {
  picOne: document.getElementById('id'),
  picTwo: document.getElementById('id'),
  picThree: document.getElementById('id'),
  pickPic: function() {
  return Math.floor(Math.random() * (16 - 1)) + 1;
  },

  returnPick: picsArr[pickPic()],
};
