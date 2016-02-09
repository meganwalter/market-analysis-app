var picsArr = [];
var names = ["bag", "banana", "boots", "chair", "cthulhu", "dragon", "pen", "scissors", "shark", "sweep", "unicorn", "usb", "water_can", "wine_glass"];
var rounds = 0;
var maxRounds = 15;

function Product(name) {
  this.path = "images/" + name + ".jpg";
  this.name = name;
  this.counter = 0;
  picsArr.push(this);
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

  displayPics: function(pic) {
    pic.src = picsArr[tracker.randomImg()].path;
    return pic.src;
  },

  displayThreePics: function() {
   while (true) {
     var one = tracker.displayPics(tracker.picOne);
     var two = tracker.displayPics(tracker.picTwo);
     var three = tracker.displayPics(tracker.picThree);
     if (one === two || two === three || one === three) {
       console.log('re-run');
     } else {
       return false;
     }
   }
 },

  submitAnswers: function() {
    var button = document.getElementById('id');
  },

  userChoice: function() {
    tracker.allPics.addEventListener('click', function playGame(event) {
      if (event.target.tagName === 'IMG') {
        for (x in picsArr) {
          if (event.target.src.indexOf(picsArr[x].path) !== -1) {
            picsArr[x].counter++;
            console.log(picsArr[x].counter);
            rounds++;
            console.log(rounds);
            if (rounds === maxRounds) {
              tracker.allPics.removeEventListener('click', playGame);
              tracker.buildBarChart();
            }
          }
        }

        tracker.displayThreePics();
      }
    }, false);
  },

  buildBarChart: function() {
    var data = {
    labels: ["bag", "banana", "boots", "chair", "cthulhu", "dragon", "pen", "scissors", "shark", "sweep", "unicorn", "usb", "water_can", "wine_glass"],
    datasets: [
      {
      label: "User Choices",
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: [],
    },
  ],
  };
    for (var pics in picsArr) {
      var picData = picsArr[pics].counter;
      data.datasets[0].data.push(picData);
      console.log(data.datasets[0].data);
    }

    var ctx = document.getElementById("myChart").getContext("2d");
    var myNewChart = new Chart(ctx).Bar(data);
  },
};

window.onload = function() {
  tracker.displayThreePics();
  tracker.userChoice();
};
