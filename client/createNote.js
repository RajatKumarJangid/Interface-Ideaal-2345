
showDocs();

async function showDocs() {
  const card = document.getElementById("note-block");

  try {
    const response = await fetch("http://localhost:4500/docs");
    const data = await response.json();

    if (data.doc.length === 0) {
      card.innerHTML = `<h1>No Notes Yet!</h1>`;
      return;
    }

    let html = "";

    data.doc.forEach((note) => {
      const { _id, title, content } = note;
      html += `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${content}</p>
            <a href="#" onclick="openPage('${_id}')" class="card-link">Open ${title}</a>
            <button type="button" onclick="deleteNote('${_id}')" class="dltBtn btn btn-primary">Delete</button>
        </div>
    </div>
`;
    });

    card.innerHTML = html;
  } catch (err) {
    console.error(err);
    card.innerHTML = `<h1>Error loading notes</h1>`;
  }
}

// Call showDocs to display notes when the page loads
window.onload = showDocs;


function openPage(noteId) {
  // Save the _id of the note in local storage
  localStorage.setItem("noteId", noteId);

  // Redirect to notes.html
  window.location.href = "note.html";
}

function deleteNote(index) {
  if (
    localStorage.getItem("title") == null &&
    localStorage.getItem("text") == null
  ) {
    var titleArr = [];
    var textArr = [];
  } else if (
    localStorage.getItem("title") == null &&
    localStorage.getItem("text") != null
  ) {
    var titleArr = [];
    var textArr = localStorage.getItem("text").split(",");
  } else if (
    localStorage.getItem("title") != null &&
    localStorage.getItem("text") == null
  ) {
    var titleArr = localStorage.getItem("title").split(",");
    var textArr = [];
  } else {
    var titleArr = localStorage.getItem("title").split(",");
    var textArr = localStorage.getItem("text").split(",");
  }

  console.log("deleting note...");

  titleArr.splice(index, 1);
  textArr.splice(index, 1);

  localStorage.setItem("title", titleArr);
  localStorage.setItem("text", textArr);

  showDocs();
}

