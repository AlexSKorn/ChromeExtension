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

function rNotification()
{
  var rNoti =
  {
    type: "basic",
    title: "Very Important Message Recieved",
    iconUrl: "exclamation-mark-red-hi.png",
    message: "Message"
  }
  chrome.notifications.create("Very Important Notification", rNoti);

  var vSound = new Audio("http://www.pacdv.com/sounds/interface_sound_effects/sound116.wav");
  vSound.play();
}

function iNotification()
{
  var iNoti =
  {
    type: "basic",
    title: "Important Message Recieved",
    iconUrl: "Important-information.png",
    message: "Message"
  }
    chrome.notifications.create("Important Notification", iNoti);

    var iSound = new Audio("https://audio.code.org/winpoint2.mp3");
    iSound.play();
}

function nNotification()
{
  var nNoti =
  {
    type: "basic",
    title: "Message Recieved",
    iconUrl: "email.png",
    message: "Message"
  }
    chrome.notifications.create("Not Important Notification", nNoti);
}
