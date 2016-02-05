var picsArr = [];
var names = ["bag", "banana", "boots", "chair", "cthulhu", "dragon", "pen", "scissors", "shark", "sweep", "unicorn", "usb", "water_can", "wine_glass"];

//constructor function//
function Product(name) {
  this.path = "images/" + name + ".jpg";
  this.name = name;
  this.counter = 0;
  picsArr.push(this);//push to array
}
//making my objects from the array//
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
  allPics: document.getElementById('allImages'),
  randomImg: function() {
    return Math.floor(Math.random() * names.length);
  },

  displayPics: function(pic) { //add position - this will incorporate the PicOne, Two, Three above
    pic.src = picsArr[tracker.randomImg()].path;
    return pic.src;
  },

  displayThreePics: function() {
   var one = tracker.displayPics(tracker.picOne);
   var two = tracker.displayPics(tracker.picTwo);
   var three = tracker.displayPics(tracker.picThree);
 },

//imageClicked: function(event){
//var elId = event.target.id;
//var prod = tracker.findProduct(tracker.displayedProducts[elId]);

//prod.functiontoincreasecounter();
//code to update the 3 images
//code to tell the computer which round the user is on (stops at 15)
//function to check if the game is over
//}

//register event listeners function
//function to duren off the event listeners "remove Event Listener"

  userChoice: function() {
    tracker.allPics.addEventListener('click', function(event) {
      if (event.target.tagName === 'IMG') {
        for (x in picsArr) {
          if (event.target.src.indexOf(picsArr[x].path) !== -1) {
            picsArr[x].counter++;
            console.log(picsArr[x].counter);
          }
        }

        tracker.displayThreePics();
      }
    }, false);
  },
};

//for loop, if this.id = Product.name then Product.counter++
// this.id
//tracker.object.counter++;
window.onload = function() {
  tracker.displayThreePics();
  tracker.userChoice();
};
