"use strict";
//when appending to object array i keep overwriting not pushing
//need to set open time and total time in the object arrays
var theReallyImportantEmails = new Array();
var theImportantEmails = new Array();
var theNotImportantEmails = new Array();
var emailReallyImportantArrayData = new Array();
var emailImportantArrayData = new Array();
var emailNotImportantArrayData = new Array();

//arrays to not overwrite email objects
var emailReallyImportantObjectDataArray = new Array();
var emailImportantObjectDataArray = new Array();
var emailNotImportantObjectDataArray =  new Array();


//var theReallyImportantEmailsChecker = (SON.parse(localStorage.getItem('reallyImportantObjectStorage')));//returns an array of objects
var printTestReallyImportant =  JSON.parse((localStorage.getItem('reallyImportantStorage')));// prints an arrray of strings
//var theReallyImportantObject;

var theBullshitEmail = {id: 1234, sender: "alexkorn1122@gmail.com", receiveTime: getTime(), openTime: 0, totalTime: 0};
//theReallyImportantEmails.push(theBullshitEmail);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  var emailSplitId = request.email.split(" ");
  var theNotifyEmail = emailSplitId[0];
  var theId = emailSplitId[1];
  var theEmail = {id: theId, sender: theNotifyEmail, receiveTime: getTime(), openTime: 0, totalTime: 0};
  pushInCorrectArray(theEmail);//pushes the email object into the correct array locally so we can access it cross session
  notify(theNotifyEmail);//notifies the user with the correct notification
  //rNotification();//get rid of this when working
  console.log(theEmail);
  console.log(theNotifyEmail);
  console.log(request.email);
  sendResponse({farewell: "Message Received!"});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  //access the array and specific email using the ID
  updateOpenTimeAndCalculate(request.theId);
  console.log(request.theId);
  console.log(theReallyImportantEmails);
  sendResponse({time: "Message Received!"});
});

//gets the email addresses from the local storage does not maintain them as an array
function getArrayEmailAddressFromLocal()
{
  theReallyImportantEmails = JSON.parse(localStorage.getItem('reallyImportantStorage'));
  theImportantEmails = JSON.parse(localStorage.getItem('importantStorage'));
  theNotImportantEmails = JSON.parse(localStorage.getItem('notImportantStorage'));
  //console.log(emailReallyImportantArrayData);
}

//gets the email data from the locally set arrays, returns an array of objects
function getArrayEmailDataFromLocal(){
  emailReallyImportantArrayData = JSON.parse(localStorage.getItem('reallyImportantObjectStorage'));
  emailImportantArrayData = JSON.parse(localStorage.getItem('importantObjectStorage'));
  emailNotImportantArrayData = JSON.parse(localStorage.getItem('notImportantObjectStorage'));
}

//updates the local storage object data
function SetObjectArrayDataToLocal(){

}

//notifies the user with the correct notification
function notify(email)
{
  getArrayEmailAddressFromLocal(); //gets all the email addresses needed

  //calls notify for really important if it exists in really important array
  if(theReallyImportantEmails.includes(email) == true){
    rNotification();
  }
  //calls notify for important if it exsits in important array
  else if(theImportantEmails.includes(email) == true){
    iNotification();
  }
  //calls notify for not important if it exists in not important array
  else if(theNotImportantEmails.includes(email) == true){
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

//need to get the storage and add on to it for objects
//pushes the email object into the correct array locally so we can access it cross session
function pushInCorrectArray(emailObject)
{
  getArrayEmailDataFromLocal();//gets all the object arrays and parses them
  getArrayEmailAddressFromLocal();//get all the important email arrays

  if(theReallyImportantEmails.includes(emailObject['sender']) == true){
    emailReallyImportantObjectDataArray = JSON.parse(localStorage.getItem('reallyImportantObjectStorage'));
    emailReallyImportantObjectDataArray.push(emailObject);
    localStorage.setItem('reallyImportantObjectStorage', JSON.stringify(emailReallyImportantObjectDataArray));
  }
  else if(theImportantEmails.includes(emailObject['sender']) == true){
    //var theImportantEmailsTemp = new Array();
    emailImportantObjectDataArray = JSON.parse(localStorage.getItem('importantObjectStorage'));
    emailImportantObjectDataArray.push(emailObject);
    localStorage.setItem('importantObjectStorage', JSON.stringify(emailImportantObjectDataArray));
  }
  else if(theNotImportantEmails.includes(emailObject['sender']) == true){
    //var theNotImportantEmailsTemp = new Array();
    emailNotImportantObjectDataArray = JSON.parse(localStorage.getItem('notImportantObjectStorage'));
    emailNotImportantObjectDataArray.push(emailObject);
    localStorage.setItem('notImportantObjectStorage', JSON.stringify(emailNotImportantObjectDataArray));
  }
  else{
    return;
  }
}

//unstorage, access specific object, update openTime and totalTime, save back to the storage with the updates, and set the time to the select new storage
//only part that isnt working yet
//updates the open time of the object and calcualtes the total time is takes
function updateOpenTimeAndCalculate(theEmailId)
{
  getArrayEmailDataFromLocal();

  //set them
  var theReallyImportantObject = search(emailReallyImportantArrayData, theEmailId, "id");
  var theImportantObject = search(emailImportantArrayData, theEmailId, "id");//doesnt work because this is null an search doesnt allow it to be
  var theNotImportantObject = search(emailNotImportantArrayData, theEmailId, "id");//doesnt work because this is null and search doesnt allow it to be

  //should update the object right now it just calculates total time and add it to new storage
  if(theReallyImportantObject != null){
    if(theReallyImportantObject['openTime'] != 0 && theReallyImportantObject['totalTime'] != 0 ){
    theReallyImportantObject['openTime'] = getTime();
    theReallyImportantObject['totalTime'] = calculateTotalTime(theReallyImportantObject['receiveTime'],
    theReallyImportantObject['openTime']);
    localStorage.setItem('theReallyImportantEmailsTime', JSON.stringify(theReallyImportantObject['totalTime']));
  }
  else{
    return;
  }
    //console.log(theReallyImportantObject['totalTime'] + "this is a REALLY important object");
  }
  else if (theImportantObject != null){
    if(theImportantObject['openTime'] != 0 && theImportantObject['totalTime'] != 0 ){
    theImportantObject['openTime'] = getTime();
    theImportantObject['totalTime'] = calculateTotalTime(theImportantObject['receiveTime'],
    theImportantObject['openTime']);
    localStorage.setItem('theImportantEmailsTime', JSON.stringify(theImportantObject['totalTime']));
  }
  else{
    return;
  }
    //console.log(theImportantObject['totalTime'] + "this is a IMPORTANT object");
  }
  else if (theNotImportantObject != null){
    if(theNotImportantObject['openTime'] != 0 && theNotImportantObject['totalTime'] != 0 ){
    theNotImportantObject['openTime'] = getTime();
    theNotImportantObject['totalTime'] = calculateTotalTime(theNotImportantObject['receiveTime'],
    theNotImportantObject['openTime']);
    localStorage.setItem('theNotImportantEmailsTime', JSON.stringify(theNotImportantObject['totalTime']));
  }
  else {
    return;
  }
  //all of the objects are null
  }
  else{
    return;
  }
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

function initGenericFill(){
      var genericFillEmail = {id: 123, sender: "abcd", receiveTime: 0, openTime: 0, totalTime: 0};// so the arrays arent see as null when the users first starts using the program
      var genericFillArray =  new Array();
      genericFillArray.push(genericFillEmail);
      localStorage.setItem('reallyImportantObjectStorage', JSON.stringify(genericFillArray));
      localStorage.setItem('importantObjectStorage', JSON.stringify(genericFillArray));
      localStorage.setItem('notImportantObjectStorage', JSON.stringify(genericFillArray));
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
