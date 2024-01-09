// Update the relevant fields with the new data.
const setDOMInfo = (info) => {
  console.log("authing");
  const container = document.getElementById("images");

  const titleElement = document.querySelector("#title");
  if (!titleElement) return;
  titleElement.value = info.title;

  for (let i = 0; i < info.images.length; i++) {
    let image = info.images[i];
    const opt = container.appendChild(document.createElement("label"));
    opt.className = "image-option";
    const img = opt.appendChild(document.createElement("img"));
    const txt = opt.appendChild(document.createElement("div"));
    txt.className = "txt";
    txt.innerText = `${image.alt}\n${image.naturalWidth}x${image.naturalHeight}`;
    const radio = opt.appendChild(document.createElement("input"));
    radio.setAttribute("type", "radio");
    radio.value = i;
    radio.name = "image";
    img.src = image.src;

    if (i === 0) {
      console.log(i);
      radio.setAttribute("checked", "true");
    }
  }
};

// Once the DOM is ready...
window.addEventListener("DOMContentLoaded", () => {
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

  document.getElementById("auth-button").onclick = authWithArena;
});

function authWithArena() {
  console.log("authenticating with are.na");
  chrome.storage.local
    .get(["arenaToken"])
    .then((result) => {
      console.log({ result });
      if (!result.arenaToken) {
        chrome.identity.launchWebAuthFlow(
          {
            url: `http://dev.are.na/oauth/authorize?client_id=VErdsPW5re_lFKKyNg9lOErDpMQN-QggjU2B8bvzYnM&redirect_uri=${encodeURIComponent(
              "https://saver.chromiumapp.org/",
            )}&response_type=code`,
          },
          (resp) => {
            console.log(resp);
          },
        );
      }
    })
    .catch((e) => {
      console.error(e);
    });
}

window.addEventListener("load", () => {
  console.log("got load");
});

/*
  addEventListener("load", () => {
    setDOMInfo({
      title: "Development mode",
      images: Array.from({ length: 20 }, (_, id) => {
        const width = Math.floor(100 + Math.random() * 100);
        const height = Math.floor(100 + Math.random() * 100);
        return {
          alt: id % 3 ? `Image long`.repeat(20) : `Image ${id}`,
          naturalWidth: width,
          naturalHeight: height,
          src: `https://picsum.photos/id/${id}/${width}/${height}`,
        };
      }),
    });
  });
*/
