var picsArr = [];
var names = ["bag", "banana", "boots", "chair", "cthulhu", "dragon", "pen", "scissors", "shark", "sweep", "unicorn", "usb", "water_can", "wine_glass"];
var rounds = 0;
var maxRounds = 15;

function Product(name) {
  this.path = "images/" + name + ".jpg";
  this.name = name;
  if (localStorage.getItem(this.name) === null) {
    this.counter = 0;
  }else {
    this.counter = parseInt(localStorage.getItem(this.name));
  }

  picsArr.push(this);
  this.saveVote = function() {
    localStorage.setItem(this.name, this.counter);
  };
}

function makePics() {
  for (var name in names) {
    new Product(names[name]);
  }
}

makePics();

function initLocalStorage() {
  for (var pics in picsArr) {
    picsArr[pics].saveVote();
  }
}

initLocalStorage();

var tracker = {
  picOne: document.getElementById('choiceOne'),
  picTwo: document.getElementById('choiceTwo'),
  picThree: document.getElementById('choiceThree'),
  allPics: document.getElementById('allImages'),
  votesChart: undefined,
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

   userChoice();
 },

  userChoice: function() {
    tracker.allPics.addEventListener('click', function playGame(event) {
      if (event.target.tagName === 'IMG') {
        for (x in picsArr) {
          if (event.target.src.indexOf(picsArr[x].path) !== -1) {
            picsArr[x].counter++;
            picsArr[x].saveVote();
            rounds++;
            tracker.updateProgress();
            console.log(picsArr[x].name);
            if (rounds === maxRounds) {
              tracker.allPics.removeEventListener('click', playGame);
              tracker.submitAnswers();
            }
          }
        }

        tracker.displayThreePics();
      }
    }, false);
  },

  submitAnswers: function() {
    var button = document.getElementById('doneButton');
    button.className = '';
    button.addEventListener('click', tracker.buildBarChart);
  },

  buildBarChart: function() {
    var data = {
    labels: ["bag", "banana", "boots", "chair", "cthulhu", "dragon", "pen", "scissors", "shark", "sweep", "unicorn", "usb", "water_can", "wine_glass"],
    datasets: [
      {
      label: "User Choices",
      fillColor: "rgba(231, 12, 12, 0.5)",
      strokeColor: "rgba(121, 5, 5, 0.8)",
      highlightFill: "rgba(113, 22, 102, 0.75)",
      highlightStroke: "rgba(189, 17, 17, 1)",
      data: [],
    },
  ],
  };
    for (var name in names) {
      var picData = localStorage.getItem(names[name]);
      var votesValue = parseInt(picData);
      data.datasets[0].data.push(votesValue);
    }

    var ctx = document.getElementById("myChart").getContext("2d");
    var myNewChart = new Chart(ctx).Bar(data);
    var chart = document.getElementById('myChart');
    tracker.votesChart = myNewChart;
    chart.className = '';
    tracker.populateReset();
  },

  populateReset: function() {
  var button = document.getElementById('doneButton').className = 'hideMe';
  var progressTracker = document.getElementById('userProgress').className = 'hideMe';
  var resetButton = document.getElementById('resetButton');
  resetButton.className = '';
  resetButton.addEventListener('click', tracker.restartGame);
},

  restartGame: function() {
  tracker.votesChart.destroy();
  var chart = document.getElementById('myChart').className = 'hideMe';
  var resetButton = document.getElementById('resetButton').className = 'hideMe';
  rounds = 0;
  tracker.displayThreePics();
  tracker.userChoice();
  tracker.updateProgress();
  var showProgress = document.getElementById('userProgress').className = '';
},

  updateProgress: function() {
    var bar = document.getElementById('progBar');
    bar.value = rounds;
  },

  startGame: function() {
    var startButton = document.getElementById('beginGame');
    var gameContent = document.getElementById('gameSec');
    var firstPage = document.getElementById('startPage');
    startButton.addEventListener('click', function(event) {
      firstPage.className = 'hideMe';
      gameContent.className = '';
      tracker.displayThreePics();
      tracker.userChoice();
    });
  },
};

window.onload = function() {
  tracker.startGame();
};
