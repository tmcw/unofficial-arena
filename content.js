chrome.runtime.sendMessage({
  from: "content",
  subject: "showPageAction",
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.log("got event", msg);
  if (msg.from === "popup" && msg.subject === "DOMInfo") {
    const images = [...document.querySelectorAll("img")].map((img) => {
      console.log(img.naturalWidth, img);
      return {
        src: img.src,
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      };
    });
    response({ images, title: document.title });
  }
});
