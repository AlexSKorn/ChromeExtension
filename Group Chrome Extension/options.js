"use strict";

var email;
var emailReallyImportantArray = [];
var emailImportantArray= [];
var emailNonImportantArray = [];

function addReallyImportantEmail(){
  email = document.getElementById("emailText").value;
  emailReallyImportantArray.push(email);
  //document.getElementById("emailText").value = "";
}

function addImportantEmail(){
  email = document.getElementById("emailText").value;
  emailImportantArray.push(email);
  //document.getElementById("emailText").value = "";
}

function addNotImportantEmail(){
  email = document.getElementById("emailText").value;
  emailNonImportantArray.push(email);
  //document.getElementById("emailText").value = "";
}

function printReallyImportantArray(emailReallyImportantArray){
  for (var i = 0; i<emailReallyImportantArray.length; i++){
    //document.writeln(emailReallyImportantArray[i] + "/n");
    console.log(emailReallyImportantArray[i]);
  }
}

function printImportantArray(emailImportantArray){
  for (var i = 0; i<emailImportantArray.length; i++){
    //document.writeln(emailImportantArray[i] + "/n");
    console.log(emailImportantArray[i]);
  }
}

function printNotImportantArray(emailNonImportantArray){
  for (var i = 0; i<emailNonImportantArray.length; i++){
    //document.writeln(emailNonImportantArray[i] + "/n");
    console.log(emailNotImportantArray[i]);
  }
}

function clearEmailTextField(){
  document.getElementById("emailText").value = "";
}

//document.getElementById("reallyImportant").addEventListener("click", addReallyImportantEmail());
//document.getElementById("Important").addEventListener("click", addImportantEmail());
//document.getElementById("notImportant").addEventListener("click", addNotImportantEmail());
//document.getElementById("reallyImportantPrintButton").addEventListener("click",printReallyImportantArray(emailReallyImportantArray));
//document.getElementById("importantPrintButton").addEventListener("click", printImportantArray(emailImportantArray));
//document.getElementById("notImportantPrintButton").addEventListener("click", printNotImportantArray(emailNonImportantArray));
