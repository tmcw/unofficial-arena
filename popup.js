// Update the relevant fields with the new data.
const setDOMInfo = (info) => {
  const container = document.getElementById("images");

  document.querySelector("#title").value = info.title;

  for (let image of info.images) {
    const opt = container.appendChild(document.createElement("div"));
    opt.className = "image-option";
    const img = opt.appendChild(document.createElement("img"));
    img.src = image.src;
  }
};

// Once the DOM is ready...
window.addEventListener("DOMContentLoaded", () => {
  console.log("getting token");
  chrome.storage.local.get(["token"]).then((result) => {
    console.log(result);
    if (!result) {
      chrome.identity.launchWebAuthFlow(
        `http://dev.are.na/oauth/authorize?client_id=VErdsPW5re_lFKKyNg9lOErDpMQN-QggjU2B8bvzYnM&redirect_uri=${encodeURIComponent(
          "https://saver.chromiumapp.org/",
        )}&response_type=code`,
        (resp) => {
          console.log(resp);
        },
      );
    }
  });

  // ...query for the active tab...
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: "popup", subject: "DOMInfo" },
        setDOMInfo,
      );
    },
  );
});

console.log("in update");

window.addEventListener("load", () => {
  console.log("got load");
  chrome.storage.local.get(["token"]).then((result) => {
    console.log(result);
    if (!result) {
      chrome.identity.launchWebAuthFlow(
        `http://dev.are.na/oauth/authorize?client_id=VErdsPW5re_lFKKyNg9lOErDpMQN-QggjU2B8bvzYnM&redirect_uri=${encodeURIComponent(
          "https://saver.chromiumapp.org/",
        )}&response_type=code`,
        (resp) => {
          console.log(resp);
        },
      );
    }
  });
});
