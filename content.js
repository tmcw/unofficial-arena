chrome.runtime.sendMessage({
  from: "content",
  subject: "showPageAction",
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.log("got event", msg);
  if (msg.from === "popup" && msg.subject === "DOMInfo") {
    const images = [...document.querySelectorAll("img")].map((img) => {
      return {
        src: img.src,
        alt: img.alt,
      };
    });
    response({ images, title: document.title });
  }
});
