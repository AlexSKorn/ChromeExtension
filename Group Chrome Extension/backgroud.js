"use strict";

var theReallyImportantEmails = new Array();
var theImportantEmails = new Array();
var theNotImportantEmails = new Array();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  var emailSplitId = request.email.split(" ");
  var theNotifyEmail = emailSplitId[0];
  var theId = emailSplitId[1];
  var theEmail = {id: theId, sender: theNotifyEmail, receiveTime: getTime(), openTime: null, totalTime: null};
  //pushInCorrectArray(theEmail);
  //notify(theNotifyEmail);
  rNotification();//get rid of this when options working
  console.log(theEmail);
  console.log(theNotifyEmail);
  console.log(request.email);
  sendResponse({farewell: "Message Received!"});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  //access the array and specific email using the ID
  //getTime();
  //updateOpenTimeAndCalculate()
  console.log(request.theId);
  sendResponse({time: "Message Received!"});
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

}
  //Date.now();

function getTime(){
  var day = new Date();
  return day.getTime();
}

function pushInCorrectArray(emailObject){
  //calls notify for really important if it exists in really important array
  if(emailReallyImportantArray.includes(emailObject['sender']) == true){
    theReallyImportantEmails.push(emailObject);
  }
  //calls notify for important if it exsits in important array
  else if(emailImportantArray.includes(emailObject['sender']) == true){
    theImportantEmails.push(emailObject);
  }
  //calls notify for not important if it exists in not important array
  else if(nonImportantArray.includes(emailObject['sender']) == true){
    theNotImportantEmails.push(emailObject);
  }
  else{
    return;
  }
}

function updateOpenTimeAndCalculate(theEmailId){
  var theReallyImportantObject = search(theReallyImportantEmails, theEmailId, "id");
  var theImportantObject = search(theImportantEmails, theEmailId, "id");
  var theNotImportantObject = search(theNotImportantEmails, theEmailId, "id");

  if(theReallyImportantObject != null){
    theReallyImportantObject['openTime'] = getTime();
    theReallyImportantObject['totalTime'] = calculateTotalTime(theReallyImportantObject['receiveTime'],
    theReallyImportantObject['openTime']);
  }
  else if (theImportantObject != null){
    theImportantObject['openTime'] = getTime();
    theImportantObject['totalTime'] = calculateTotalTime(theImportantObject['receiveTime'],
    theImportantObject['openTime']);

  }
  else if (theNotImportantObject != null){
    theNotImportantObject['openTime'] = getTime();
    theNotImportantObject['totalTime'] = calculateTotalTime(theNotImportantObject['receiveTime'],
    theNotImportantObject['openTime']);

  }
  //search the arrays for email ID and set the openTime
}

function search(array, key, prop){
    // Optional, but fallback to key['name'] if not selected
    prop = (typeof prop === 'undefined') ? 'name' : prop;

    for (var i=0; i < array.length; i++) {
        if (array[i][prop] === key) {
            return array[i];
        }
    }
}

// function getProperData(theRequest){
//   var emailIdSplit = theRequest.split(" ");
//   var theEmail = emailIdSplit[0];
//   var theId = emailIdSplit[1];
// }


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
