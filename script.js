var currentDay = document.getElementById("currentDay");
var timeBlock = document.getElementById("timeBlock");
var schedule = loadSchedule() || dummyData();

var m = moment();
//var timeNow = moment().format("h a");
//console.log(timeNow);


// clock in the jumbotron
function clock() {
  var dateString = moment().format('MMMM Do YYYY, h:mm:ss a');
  $('#currentDay').html(dateString);
}
// event listener for the save button
document.addEventListener("click", function (event) {
  console.log(event.target);
  if (event.target.classList.contains("nick")) {
    var i = event.target.dataset.saveindex;
    console.log(i);
    var textAreas = document.querySelectorAll("[data-textindex='" + i + "']");
    console.log('this is textarea', textAreas);
    var text = textAreas[0].value;
    console.log(text);
    schedule[i].text = text;
    saveSchedule();
  }
  console.log(schedule);
});



populateRows(schedule);
// gives the rows the right time and class
function dummyData() {
  //uses moment to know what time it is
  var presentHour = moment().hour();
  
  var dummy = [];
  
  console.log(presentHour);
  for (var i = 8; i < 17; i++) {
    var time = (i % 12) + 1;
    time += i > 11 ? " pm" : " am";
    
    //console.log(time);
    
    t = i;
    t++
    //console.log(t);
    // if statement to determine what class to use for each row
    if (t == presentHour) {
      //console.log("red")
      var timeClass = "present";
    } else if (t < presentHour){
      //console.log("grey");
      var timeClass = "past"
    } else {
      //console.log("green")
      var timeClass = "future";
    }  

    var o = {
      text: "",
      time: time,
      timeClass: timeClass
    };
    // console.log(o);
    
    dummy.push(o);
    
  } 
  return dummy;
}
console.log(schedule);

function createRow(o, i) {
  // my first attempt at trying to change the background colors
  
  // var timeClass;
  // // console.log(timeNow);
  // var m = moment(o.time, "haa").fromNow();
  // // console.log(m);
  // if (m.includes("ago")) {
  //   timeClass = "past";
  //   } else if (m.includes("an hour ago")) {
  //     timeClass = "present";
  //   } 
  //   else {
  //   timeClass = "future";
  // }

  // used a string litteral to create the rows
  var row = 
    `<div class = "time-block row">
      <div class="hour col-md-2" >${o.time}</div>
      <textarea data-textindex = "${i}" class = "${o.timeClass} col-md-8">${o.text}</textarea>
      <div data-saveIndex ="${i}" class = "saveBtn col-md-2"><i data-saveIndex ="${i}" class="nick far fa-save"></i></div>
    </div>`;
  return row;
}
//populating the rows
function populateRows(schedule) {
  for (var i = 0; i < schedule.length; i++) {
    var row = createRow(schedule[i], i);

    timeBlock.innerHTML += row;
  }
}

// saving the info you type
function saveSchedule() {
  var s = JSON.stringify(schedule);
  localStorage.setItem("schedule", s);
}
//pulling the data when page is refreshed
function loadSchedule() {
  var s = localStorage.getItem("schedule");
  return JSON.parse(s);
}
// intervals so that the page updates without refresh
setInterval(clock, 1000);
setInterval(dummyData, 10000);
  
