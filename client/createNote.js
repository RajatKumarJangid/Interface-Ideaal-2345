
showDocs();

async function showDocs() {
  const card = document.getElementById("note-block");

  try {
    const response = await fetch("https://interface-ideaal-2345.onrender.com/docs");
    const data = await response.json();

    if (data.doc.length === 0) {
      card.innerHTML = `<h1>No Notes Yet!</h1>`;
      return;
    }

    let html = "";

    data.doc.forEach((note) => {
      const { _id, title, content } = note;
      html += `
    <div class="card" style="width: 18rem; display:flex">
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

// function deleteNote(index) {
//   if (
//     localStorage.getItem("title") == null &&
//     localStorage.getItem("text") == null
//   ) {
//     var titleArr = [];
//     var textArr = [];
//   } else if (
//     localStorage.getItem("title") == null &&
//     localStorage.getItem("text") != null
//   ) {
//     var titleArr = [];
//     var textArr = localStorage.getItem("text").split(",");
//   } else if (
//     localStorage.getItem("title") != null &&
//     localStorage.getItem("text") == null
//   ) {
//     var titleArr = localStorage.getItem("title").split(",");
//     var textArr = [];
//   } else {
//     var titleArr = localStorage.getItem("title").split(",");
//     var textArr = localStorage.getItem("text").split(",");
//   }

//   console.log("deleting note...");

//   titleArr.splice(index, 1);
//   textArr.splice(index, 1);

//   localStorage.setItem("title", titleArr);
//   localStorage.setItem("text", textArr);

//   showDocs();
// }

// async function openPage(noteId) {
//   try {
//     // Fetch the note data from the server
//     const response = await fetch(`https://interface-ideaal-2345.onrender.com/docs/${noteId}`, {
//       method : 'GET',
//       "Content-type": "application/json",
//     });
//     const data = await response.json();
//     console.log(response);
//     console.log(data);
//     // Save the note data in local storage
//     localStorage.setItem("noteId", data.noteId);
//     localStorage.setItem("title", data.title);
//     localStorage.setItem("text", data.text);

//     // Redirect to note.html
//     window.location.href = `./note.html`;
//   } catch (error) {
//     console.error("Error fetching note:", error);
//     // Handle error, e.g., show a message to the user
//   }
// }

async function deleteNote(noteID) {
  try {
    // Fetch the current notes from the server
    const response = await fetch('https://interface-ideaal-2345.onrender.com/docs');
    const notes = await response.json();

    // Delete the note at the specified index
    // const noteToDelete = notes[index];
    const deleteResponse = await fetch(`https://interface-ideaal-2345.onrender.com/docs/${noteID}`, {
      method: 'DELETE'
    });

    if (!deleteResponse.ok) {
      throw new Error("Failed to delete note");
    }

    console.log("Note deleted successfully.");

    // Re-fetch notes after deletion
    showDocs();
  } catch (error) {
    console.error("Error deleting note:", error);
    // Handle error, e.g., show a message to the user
  }
}

