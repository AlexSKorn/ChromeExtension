"use strict";

//runs in the background waiting for an email
//calls notify when you receive an email that is
//on your contacts List that is set in the options
//var _StopWatch = new StopWatch();
var starTime = null;
var endTime = null;
var totalTime = null;

function notify(email){
  //calls notify for really important if it exists in really important array
  if(emailReallyImportantArray.includes(email) == true){
    notifyReallyImportant(); //doesnt exist yet
  }
  //calls notify for important if it exsits in important array
  else if(emailReallyImportantArray.includes(email) == true){
    notifyImportant();//doesnt exist yet
  }
  //calls notify for not important if it exists in not important array
  else if(emailReallyImportantArray.includes(email) == true){
    notifyNonImportant();//doesnt exist yet
  }
  else{
    return;
  }
  //Date.now();
}

function getTime(){
  var day = new Date();
  return day.getTime();
}

function setEndTime(){
  endTime = getTime();
}

function getEndTime(){
  return endTime;
}

function setStartTime(){
  startTime = getTime();
}

function getStartTime(){
  return starTime
}

function calculateTime(){
  totalTime = startTime - endTime
  return totalTime;
}
