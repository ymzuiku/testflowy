const script = document.createElement("script");
window.testflowyURL = "https://testflowy.com";
script.src = "https://testflowy.com/sdk/index_fa2f8228e.js";
script.onload = function () {
  window.testflowySDK();
};

(document.head || document.body).appendChild(script);