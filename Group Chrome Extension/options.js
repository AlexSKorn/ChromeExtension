"use strict";

var email;
var emailReallyImportantArray = [];
var emailImportantArray= [];
var emailNonImportantArray = [];

function addReallyImportantEmail(){
  email = document.getElementById("emailText").value;
  emailReallyImportantArray.push(email);
  localStorage.setItem('reallyImportantStorage', JSON.stringify(emailReallyImportantArray));
  //document.getElementById("emailText").value = "";
}

function addImportantEmail(){
  email = document.getElementById("emailText").value;
  emailImportantArray.push(email);
    localStorage.setItem('importantStorage', JSON.stringify(emailImportantArray));
  //document.getElementById("emailText").value = "";
}

function addNotImportantEmail(){
  email = document.getElementById("emailText").value;
  emailNonImportantArray.push(email);
  localStorage.setItem('notImportantStorage', JSON.stringify(emailNonImportantArray));
  //document.getElementById("emailText").value = "";
}

function save(whichArray){
  localStorage.setItem('theArray',JSON.stringify(whichArray));

}


$("#reallyImportant").click(function(){
  addReallyImportantEmail();
});

$("#Important").click(function(){
  addImportantEmail();
});

$("#notImportant").click(function(){
  addNotImportantEmail();
});

$("#reallyImportantPrintButton").click(function(){
  console.log(emailReallyImportantArray);
});

$("#importantPrintButton").click(function(){
  console.log(emailImportantArray);
});

$("#notImportantPrintButton").click(function(){
  console.log(emailNonImportantArray);
});
