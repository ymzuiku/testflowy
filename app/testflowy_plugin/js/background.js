// chrome.runtime.onInstalled.addListener(() => {

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log(req);
  try {
    const info = req.info;
    // const dataType = req.dataType || "text";
    // if (info.kind === "version") {
    //   sendResponse(121);
    //   return;
    // }
    const { url, ...rest } = info;
    fetch(url, ...rest)
      .then((v) => v.text())
      .then((v) => sendResponse(v))
      .catch((v) => sendResponse(v));
  } catch (err) {
    sendResponse(
      JSON.stringify({
        err,
      }),
    );
  }
});
