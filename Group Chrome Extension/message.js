// chrome.runtime.sendMessage("haggjckdicilflogocjndcjllbdfmhal", {msg: "hello"}, function(response)
// {
//   console.log("This is content");
// });
//  window.addEventListener('message', function(event) {
//    chrome.runtime.sendMessage(message);
//    console.log("Hello");
//  });

//when an email is received send to background
window.addEventListener("getEmail", function(e)
{
  console.log(e.detail);
  chrome.runtime.sendMessage({email: e.detail}, function(response)
  {
    console.log(response.farewell);
  })
}, false);

//when an email is opened send to background
window.addEventListener("getId", function(e)
{
  console.log(e.detail);
  chrome.runtime.sendMessage({theId: e.detail}, function(response)
  {
    console.log(response.bye);
  })
}, false);
