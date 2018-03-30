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
  //console.log(email);
  //document.getElementById("emailText").value = "";
}

function addNotImportantEmail(){
  email = document.getElementById("emailText").value;
  emailNonImportantArray.push(email);
  //document.getElementById("emailText").value = "";
}

function printReallyImportantArray(emailReallyImportantArray){
    //document.writeln(emailReallyImportantArray[i] + "/n");
    console.log(emailReallyImportantArray);
}

function printImportantArray(emailImportantArray){
    console.log(emailImportantArray);
}

function printNotImportantArray(emailNonImportantArray){
    //document.writeln(emailNonImportantArray[i] + "/n");
    console.log(emailNonImportantArray);
}

function clearEmailTextField(){
  document.getElementById("emailText").value = "";
}
