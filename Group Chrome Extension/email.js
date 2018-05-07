function Email(id, sender, receiveTime, openTime, totalTime){

  this.id = id;
  this.sender = sender;
  this.receiveTime = receiveTime;
  this.openTime = openTime;
  this.totalTime = totalTime;

get theId(){
  return this.id;
}

get theSender(){
  return this.sender;
}

get theReceiveTime(){
  return this.receiveTime;
}

get theOpenTime(){
  return this.openTime;
}

get theTotalTime(){
  return this.totalTime;
}

set theId(uniqueId){
  this.id = uniqueId;
}

set theSender(senderOfEmail){
  this.sender = senderOfEmail;
}

set theReceiveTime(timeReceived){
  this.receiveTime = timeReceived;
}

set theOpenTime(timeOpened){
  this.openTime = timeOpened;
}

set theTotalTime(calculatedTotalTime){
  this.openTime = calculatedTotalTime;
}

}
