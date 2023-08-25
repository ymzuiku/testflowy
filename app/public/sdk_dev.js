const script = document.createElement("script");
// window.testflowyURL = "https://testflowy.com";
script.src = "/sdk/index_d7de134f5.js";
script.onload = function () {
  window.testflowySDK({
    example: true,
  });
};

(document.head || document.body).appendChild(script);
