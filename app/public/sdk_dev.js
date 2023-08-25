const script = document.createElement("script");
// window.testflowyURL = "https://testflowy.com";
script.src = "/sdk/index_fa2f8228e.js";
script.onload = function () {
  window.testflowySDK({
    example: true,
  });
};

(document.head || document.body).appendChild(script);
