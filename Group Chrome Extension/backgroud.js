"use strict";

//runs in the background waiting for an email
//calls notify when you receive an email that is
//on your contacts List that is set in the options
//var _StopWatch = new StopWatch();
var starTime = null;
var endTime = null;
var totalTime = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  console.log(request.email);
  sendResponse({farewell: "Message Received!"});
});

function notify(email){
  //calls notify for really important if it exists in really important array
  if(emailReallyImportantArray.includes(email) == true){
    rNotification();
  }
  //calls notify for important if it exsits in important array
  else if(emailImportantArray.includes(email) == true){
    iNotification();
  }
  //calls notify for not important if it exists in not important array
  else if(nonImportantArray.includes(email) == true){
    nNotification();
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


function rNotification()
{
  var rNoti =
  {
    type: "basic",
    title: "Very Important Message Recieved",
    iconUrl: "NotificationStuff/exclamation-mark-red-hi.png",
    message: "Message"
  }
  chrome.notifications.clear("Very Important Notification", function() {
    chrome.notifications.create("Very Important Notification", rNoti);
  })

  var rSound = new Audio("NotificationStuff/rNotification.wav");
  rSound.play();
}

function iNotification()
{
  var iNoti =
  {
    type: "basic",
    title: "Important Message Recieved",
    iconUrl: "NotificationStuff/Important-information.png",
    message: "Message"
  }

  chrome.notifications.clear("Important Notification", function(){
    chrome.notifications.create("Important Notification", iNoti);
  })

  var iSound = new Audio("NotificationStuff/iNotification.wav");
  iSound.play();
}

function nNotification()
{
  var nNoti =
  {
    type: "basic",
    title: "Message Recieved",
    iconUrl: "NotificationStuff/email.png",
    message: "Message"
  }

  chrome.notifications.clear("Not Important Notification", function(){
    chrome.notifications.create("Not Important Notification", nNoti);
  })

  var nSound = new Audio("NotificationStuff/nNotification.wav");
  nSound.play();

}
