// chrome.runtime.sendMessage("haggjckdicilflogocjndcjllbdfmhal", {msg: "hello"}, function(response)
// {
//   console.log("This is content");
// });
//  window.addEventListener('message', function(event) {
//    chrome.runtime.sendMessage(message);
//    console.log("Hello");
//  });

window.addEventListener("getEmail", function(e)
{
  console.log(e.detail);
  chrome.runtime.sendMessage({email: e.detail}, function(response)
  {
    console.log(response.farewell);
  })
}, false);
