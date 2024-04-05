const socket = io("https://interface-ideaal-2345.onrender.com", { transports: ["websocket"] });
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
  localStorage.setItem("note", JSON.stringify(oldDelta));
  socket.emit("send-changes", delta);
});

// socket.on("receive-changes", (delta) => {
//   quill.updateContents(delta);
// });

const cursor = document.getElementById("cursor");
cursor.style.display = "none";

quill.on("selection-change", (range, oldRange, source) => {
  if (range) {
    cursor.style.display = "block";
    const rect = quill.getBounds(range.index);
    cursor.style.left = rect.left + "px";
    cursor.style.top = rect.bottom + "px";
    socket.emit("send-cursor", {
      id: socket.id,
      top: rect.bottom,
      left: rect.left,
    });
  } else {
    cursor.style.display = "none";
    socket.emit("send-cursor", { id: socket.id, top: 0, left: 0 });
  }
});

socket.on("receive-cursor", (cursorData) => {
  const cursorElement = document.querySelector(`#${cursorData.id}`);
  if (cursorElement) {
    cursorElement.style.display = "block";
    cursorElement.style.top = cursorData.top + "px";
    cursorElement.style.left = cursorData.left + "px";
  } else {
    const newCursor = cursor.cloneNode();
    newCursor.id = cursorData.id;
    newCursor.style.position = "absolute";
    newCursor.style.marginTop = "110px";
    newCursor.style.marginLeft = "14px";
    newCursor.style.background = "red";
    newCursor.style.width = "2px";
    newCursor.style.height = "2%";
    newCursor.style.pointerEvents = "none";
    newCursor.style.top = cursorData.top + "px";
    newCursor.style.left = cursorData.left + "px";
    document.body.appendChild(newCursor);
  }
});

socket.on("remove-cursor", (cursorId) => {
  const cursorElement = document.querySelector(`#${cursorId}`);
  if (cursorElement) {
    cursorElement.remove();
  }
});

socket.on("receive-changes", (delta) => {
  quill.updateContents(delta);
});

const msgInput = document.getElementById("message");
const sendBtn = document.getElementById("button");

let saveBtn = document.getElementById("saveBtn");
let saveAs = document.getElementById("saveAs");
let editor = document.getElementById("editor");

// editor.innerText = localStorage.getItem("token");

sendBtn.addEventListener("click", () => {
  if (msgInput.value) {
    socket.emit("message", msgInput.value);
    msgInput.value = "";
  }
});

socket.on("message", (message) => {
  addMessage("User 1", message, true);
});

function addMessage(user, message, sent) {
  const node = document.createElement("p");
  const text = document.createTextNode(message);

  node.appendChild(text);
  node.classList.add("message");

  if (sent) {
    node.classList.add("sent");
  } else {
    node.classList.add("received");
  }

  document.getElementById("chat").appendChild(node);
}

document
  .getElementById("message")
  .addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();

      sendMessage();
    }
  });

// async function saveCode() {
//   try {
//     const obj = {
//       filename: saveAs.value,
//       editor: editor.value,
//     };
//     console.log(obj);

//     const res = await fetch("https://localhost:8000/docs", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify(obj),
//     });
//     const data = await res.json();
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

saveBtn.addEventListener("click", () => {
  saveCode(); // Call the saveCode function when the save button is clicked
});

async function saveCode() {
  try {
    const obj = {
      title: saveAs.value,
      content: quill.root.innerHTML, // Get Quill editor content
    };

    const res = await fetch("https://interface-ideaal-2345.onrender.com/docs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

const noteId = localStorage.getItem("noteId");

if (noteId) {
  fetch(`https://interface-ideaal-2345.onrender.com/docs/${noteId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const { doc } = data;
      if (!doc) {
        throw new Error('Document not found');
      }

      const { title, content } = doc;
      saveAs.value = title;
      quill.root.innerHTML = content;
    })
    .catch(error => {
      console.error('Error fetching document:', error);
    })
    .finally(() => {
      localStorage.removeItem("noteId");
    });
}
