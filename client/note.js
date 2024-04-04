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


let saveBtn = document.getElementById("save-btn");
let saveAs = document.getElementById("saveAs");
let editor = document.getElementById("editor");

async function saveCode() {
  try {
    const obj = {
      filename: saveAs.value,
      editor: editor.value
    };
    console.log(obj);
    
    const res = await fetch(
      "https://localhost:8000/docs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(obj),
      }
    );
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

saveBtn.addEventListener("click", saveCode);