function notify(email){
  //calls notify for really important if it exists in really important array
  if(emailReallyImportantArray.indexOf(email) != -1){
    notifyReallyImportant(); //doesnt exist yet
  }
  //calls notify for important if it exsits in important array
  else if(emailReallyImportantArray.indexOf(email) != -1){
    notifyImportant(); //doesnt exist yet
  }
  //calls notify for not important if it exists in not important array
  else if(emailReallyImportantArray.indexOf(email) != -1){
    notifyNonImportant();//doesnt exist yet
  }
  else{
    return;
  }
}

function timer(){

}
  
