var picsArr = [];
var names = ["bag", "banana", "boots", "chair", "cthulhu", "dragon", "pen", "scissors", "shark", "sweep", "unicorn", "usb", "water_can", "wine_glass"];

function Product(name) {
  this.path = "images/" + name + ".jpg";
  this.name = name;
  this.counter = 0;
  picsArr.push(this);//push to array
}

function makePics() {
  for(var name in names) {
    new Product(names[name]);
  }
}

makePics();

var tracker = {
  picOne: document.getElementById('choiceOne'),
  picTwo: document.getElementById('choiceTwo'),
  picThree: document.getElementById('choiceThree'),
  randomImg: function() {
  return Math.floor(Math.random() * names.length);
  },

  displayPics: function(event) {
    tracker.picOne.src = picsArr[tracker.randomImg()].path;
    tracker.picTwo.src = picsArr[tracker.randomImg()].path;
    tracker.picThree.src = picsArr[tracker.randomImg()].path;
  },

  userChoice: function() {
    addEventListener('click', function(){
        tracker.displayPics();
    }, false);
  },
};

window.onload = function() {
  tracker.displayPics();
  tracker.userChoice();
};
