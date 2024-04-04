// var titleArr = JSON.parse(title)
// var textArr = JSON.parse(text)

// card.innerHTML = card.innerHTML +  `

// <div class="card" style="width: 18rem;">
//     <div class="card-body">
//         <h5 class="card-title" id="cardtitle">${title}</h5>
//         <p class="card-text" id="cardcontent">${text}</p>
//         <a href="#" class="card-link">Card link</a>
//     </div>
// </div>

// `

// let html

showDocs();

function showDocs() {
  var card = document.getElementById("card");

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

  let html = ``;

  titleArr.forEach((element1, index) => {
    let element2 = textArr[index];
    let new_element2 = element2.replaceAll(" ", "_");

    html += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title" id="cardtitle">${element1}</h5>
                <p class="card-text" id="cardcontent">${element2}</p>
                <a href="/newOpen.html" onclick="openPage(this.id)" target="_blank" id=${new_element2} class="card-link">Open ${element1}</a>
                <button type="button" onclick="deleteNote(this.id)" id=${index} class="dltBtn" class="btn-position btn btn-primary">Delete</button>
            </div>
        </div>
        `;
  });

  // if (titleArr.length!=0 && textArr.length!=0) {
  //     card.innerHTML = html
  // } else {
  //     card.innerHTML = `<h1>No Notes Yet</h1>`
  // }

  if (
    localStorage.getItem("title") != null &&
    localStorage.getItem("text") != null
  ) {
    card.innerHTML = html;
  } else if (
    localStorage.getItem("title") == null &&
    localStorage.getItem("text") == null
  ) {
    card.innerHTML = `<h1>No Notes Yet!</h1>`;
  }
}

function openPage(new_element2) {
  localStorage.setItem("element2", new_element2);
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
