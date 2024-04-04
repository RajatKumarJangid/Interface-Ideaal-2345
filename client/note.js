const socket = io("http://localhost:4500", { transports: ["websocket"] });
const quill = new Quill("#editor", {
  modules: {
    syntax: true,
    toolbar: "#toolbar-container",
  },
  placeholder: "",
  theme: "snow",
});

quill.on("text-change", (delta, oldDelta, source) => {
  if (source !== "user") return;
  socket.emit("send-changes", delta);
});

socket.on("receive-changes", (delta) => {
  quill.updateContents(delta);
});
