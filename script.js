var currentDay = document.getElementById("currentDay");
var timeBlock = document.getElementById("timeBlock");
var schedule = loadSchedule() || dummyData();
var timeNow = moment().format("h a");


document.addEventListener("click", function (event) {
  console.log(event.target);
  if (event.target.classList.contains("saveBtn")) {
    var i = event.target.dataset.saveindex;
    var textAreas = document.querySelectorAll("[data-textindex='" + i + "']");

    var text = textAreas[0].value;
    console.log(text);
    schedule[i].text = text;
    saveSchedule();
  }
  console.log(schedule);
});


console.log(timeNow);

populateRows(schedule);

function dummyData() {
  var dummy = [];  
  for (var i = 8; i < 24; i++) {
    var time = (i % 12) + 1;
    time += i > 11 ? "pm" : "am";
    var o = {
      text: "",
      time: time,
    };
    // console.log(o);
    dummy.push(o);
  } 
  return dummy;
}
console.log(schedule);

function createRow(o, i) {
  var timeClass;
  var m = moment(o.time, "haa").fromNow();
  console.log(m);

  if (m.includes("ago")) {
    timeClass = "past";
  } else {
    timeClass = "future";
  }
  var row = `<div class = "row">
    <div class="time-block col-md-2" >
      ${o.time}
    </div>
    <textarea data-textindex = "${i}" class = "${timeClass} col-md-8">${o.text}</textarea>
    <div data-saveIndex ="${i}" class = "saveBtn col-md-2">save</div>
  </div>`;
  return row;
}
function populateRows(schedule) {
  for (var i = 0; i < schedule.length; i++) {
    var row = createRow(schedule[i], i);

    timeBlock.innerHTML += row;
  }
}


function saveSchedule() {
  var s = JSON.stringify(schedule);
  localStorage.setItem("schedule", s);
}

function loadSchedule() {
  var s = localStorage.getItem("schedule");
  return JSON.parse(s);
}
