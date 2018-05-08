"use strict";

var theReallyImportantEmails = new Array();
var theImportantEmails = new Array();
var theNotImportantEmails = new Array();
var emailReallyImportantArrayData = new Array();
var emailImportantArrayData = new Array();
var emailNotImportantArrayData = new Array();

//var theBullshitEmail = {id: 1234, sender: "blah", receiveTime: getTime(), openTime: null, totalTime: null};
//theReallyImportantEmails.push(theBullshitEmail);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  var emailSplitId = request.email.split(" ");
  var theNotifyEmail = emailSplitId[0];
  var theId = emailSplitId[1];
  var theEmail = {id: theId, sender: theNotifyEmail, receiveTime: getTime(), openTime: null, totalTime: null};
  pushInCorrectArray(theEmail);
  notify(theNotifyEmail);
  //rNotification();//get rid of this when working
  console.log(theEmail);
  console.log(theNotifyEmail);
  console.log(request.email);
  sendResponse({farewell: "Message Received!"});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  //access the array and specific email using the ID
  //updateOpenTimeAndCalculate(request.theId)
  console.log(request.theId);
  console.log(theReallyImportantEmails);
  sendResponse({time: "Message Received!"});
});

//gets the email addresses from the local storage and turns it into readable dating by parsing the JSON into an array
function getArrayEmailAddressFromLocal()
{
  emailReallyImportantArrayData = localStorage.getItem('reallyImportantStorage');
  emailImportantArrayData = localStorage.getItem('importantStorage');
  emailNotImportantArrayData = localStorage.getItem('notImportantStorage');
  console.log(emailReallyImportantArrayData);
}

//get the email objects if they have not been opened yet
function arrayEmailDataFromLocal()
{
  theReallyImportantEmails = localStorage.setItem('reallyImportantObjectStorage');
  theImportantEmails = localStorage.setItem('importantObjectStorage');
  theNotImportantEmails = localStorage.setItem('notImportantObjectStorage');
}

//notifies the user with the correct notification
function notify(email)
{
  getArrayEmailAddressFromLocal(); //gets all the email addresses needed

  //calls notify for really important if it exists in really important array
  if(emailReallyImportantArrayData.includes(email) == true){
    rNotification();
  }
  //calls notify for important if it exsits in important array
  else if(emailImportantArrayData.includes(email) == true){
    iNotification();
  }
  //calls notify for not important if it exists in not important array
  else if(emailNotImportantArrayData.includes(email) == true){
    nNotification();
  }
  else{
    return;
  }

}

//get the system time in MS
function getTime()
{
  var day = new Date();
  return day.getTime();
}

//used to save the times in local storage based on importance
//    localStorage.setItem('theReallyImportantEmailsTime', JSON.stringify(emailObject['totalTime']));
//    localStorage.setItem('theImportantEmailsTime', JSON.stringify(emailObject['totalTime']));
//    localStorage.setItem('theNotImportantEmailsTime', JSON.stringify(emailObject['totalTime']));

//pushes the email object into the correct array locally so we can access it cross session
function pushInCorrectArray(emailObject)
{
  arrayEmailDataFromLocal();//sets all the arrays needed

  if(emailReallyImportantArrayData.includes(emailObject['sender']) == true){
    theReallyImportantEmails.push(emailObject);
    localStorage.setItem('reallyImportantObjectStorage', JSON.stringify(theReallyImportantEmails));
  }
  else if(emailImportantArrayData.includes(emailObject['sender']) == true){
    theImportantEmails.push(emailObject);
    localStorage.setItem('importantObjectStorage', JSON.stringify(theImportantEmails));
  }
  else if(emailNotImportantArrayData.includes(emailObject['sender']) == true){
    theNotImportantEmails.push(emailObject);
    localStorage.setItem('notImportantObjectStorage', JSON.stringify(theNotImportantEmails));
  }
  else{
    return;
  }
}

//updates the open time of the object and calcualtes the total time is takes
function updateOpenTimeAndCalculate(theEmailId)
{
  var theReallyImportantObject = search(theReallyImportantEmails, theEmailId, "id");
  var theImportantObject = search(theImportantEmails, theEmailId, "id");
  var theNotImportantObject = search(theNotImportantEmails, theEmailId, "id");

  if(theReallyImportantObject != null){
    theReallyImportantObject['openTime'] = getTime();
    theReallyImportantObject['totalTime'] = calculateTotalTime(theReallyImportantObject['receiveTime'],
    theReallyImportantObject['openTime']);
    localStorage.setItem('theReallyImportantEmailsTime', JSON.stringify(theReallyImportantObject['totalTime']));
  }
  else if (theImportantObject != null){
    theImportantObject['openTime'] = getTime();
    theImportantObject['totalTime'] = calculateTotalTime(theImportantObject['receiveTime'],
    theImportantObject['openTime']);
    localStorage.setItem('theImportantEmailsTime', JSON.stringify(theImportantObject['totalTime']));
  }
  else if (theNotImportantObject != null){
    theNotImportantObject['openTime'] = getTime();
    theNotImportantObject['totalTime'] = calculateTotalTime(theNotImportantObject['receiveTime'],
    theNotImportantObject['openTime']);
    localStorage.setItem('theNotImportantEmailsTime', JSON.stringify(theNotImportantObject['totalTime']));
  }
  //search the arrays for email ID and set the openTime
}

function search(array, key, prop)
{
    // Optional, but fallback to key['name'] if not selected
    prop = (typeof prop === 'undefined') ? 'name' : prop;
    for (var i=0; i < array.length; i++) {
        if (array[i][prop] === key) {
            return array[i];
        }
    }
}

//calculates the total time for the object
function calculateTotalTime(anReceiveTime, aOpenTime)
{
  return(aOpenTime - anReceiveTime);
}

//a really important email notification
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

//an important email notification
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

//a non important email notification
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
