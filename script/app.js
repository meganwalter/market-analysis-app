var picsArr = [];
var names = ["bag", "banana", "boots", "chair", "cthulhu", "dragon", "pen", "scissors", "shark", "sweep", "unicorn", "usb", "water_can", "wine_glass"];
var rounds = 0;
var maxRounds = 15;

function Product(name) {
  this.path = "images/" + name + ".jpg";
  this.name = name;
  this.counter = 0;
  picsArr.push(this);//push to array
}

function makePics() {
  for (var name in names) {
    new Product(names[name]);
  }
}

makePics();

var tracker = {
  picOne: document.getElementById('choiceOne'),
  picTwo: document.getElementById('choiceTwo'),
  picThree: document.getElementById('choiceThree'),
  allPics: document.getElementById('allImages'),
  randomImg: function() {
    return Math.floor(Math.random() * names.length);
  },

  displayPics: function(pic) { //add position - this will incorporate the PicOne, Two, Three above
    pic.src = picsArr[tracker.randomImg()].path;
    return pic.src;
  },

  displayThreePics: function() {
   while (true) {
     var one = tracker.displayPics(tracker.picOne);
     var two = tracker.displayPics(tracker.picTwo);
     var three = tracker.displayPics(tracker.picThree);
     if (one === two || two === three || one === three) {
       console.log('one', one, 'two', two, 'three', three);
     } else {
       return false;
     }
   }
 },

userChoice: function() {
    tracker.allPics.addEventListener('click', function playGame(event) {
      if (event.target.tagName === 'IMG') {
        for (x in picsArr) {
          if (event.target.src.indexOf(picsArr[x].path) !== -1) {
            picsArr[x].counter++;
            rounds++;
            console.log(rounds);
            if (rounds === maxRounds) {
              tracker.allPics.removeEventListener('click', playGame);
              //show button
              //run the chart function
            }
          }
        }

        tracker.displayThreePics();
      }
    }, false);
  },
};

window.onload = function() {
  tracker.displayThreePics();
  tracker.userChoice();
};
