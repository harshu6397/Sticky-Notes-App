console.log("Welcome to the my notes app");
displayNotes(); // display the notes on the page

// If user add any notes to our web app, then we add this to the local stroage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
  let noteTitle = document.getElementById("addTitle").value; // get the value of the title
  let note = document.getElementById("addTxt").value; // get the value of the input
  let notes = localStorage.getItem("notes"); // get the notes from the local storage
  let notesTitle = localStorage.getItem("notesTitle"); // get the notes title from the local storage

  // if there are no notes and note title in the local storage
  if (notes == null || notesTitle == null) {
    notesObj = [];
    notesTitleObj = [];
  } else {
    notesObj = JSON.parse(notes);
    notesTitleObj = JSON.parse(notesTitle);
  }

  notesObj.push(note); // add the note to the notesObj
  notesTitleObj.push(noteTitle); // add the note title to the notesTitleObj
  localStorage.setItem("notes", JSON.stringify(notesObj)); // set the notes to the local storage
  localStorage.setItem("notesTitle", JSON.stringify(notesTitleObj)); // set the notes title to the local storage
  document.getElementById("addTxt").value = "";
  document.getElementById("addTitle").value = "";

  // display the notes in the web app
  displayNotes();
});

// Function to Display the Notes on the page
function displayNotes() {
  let notes = localStorage.getItem("notes"); // get the notes from the local storage
  let notesTitle = localStorage.getItem("notesTitle"); // get the notes title from the local storage

  // if there are no notes and note title in the local storage
  if (notes == null || notesTitle == null) {
    notesObj = [];
    notesTitleObj = [];
  } else {
    notesObj = JSON.parse(notes);
    notesTitleObj = JSON.parse(notesTitle);
  }

  let card = "";
  for (let i = 0; i < notesObj.length; i++) {
    card += `<div class="noteCard card mx-3 my-2" style="width: 16rem;">
                <div class="card-body">
                        <h5 class="card-title">${notesTitleObj[i]}</h5>
                        <p class="card-text">${notesObj[i]}</p>
                        <button onclick="deleteNotes(this.id)" class="btn btn-primary" id="${i}" >Delete Note</button>  
                        <!-- Button trigger modal -->
                        <button onclick="editData(this.id)" type="button" class="btn btn-primary" id="${i}" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Edit
                        </button>
                    </div>
                </div>`;
  }
  let notesContainer = document.getElementById("notes"); // get the notes container
  if (notesObj.length != 0) {
    notesContainer.innerHTML = card;
  } else {
    notesContainer.innerHTML = `<h1 class="text-center my-3">No Notes Found :(</h1>
                                    <p class="text-center"><strong>Please use "Add Your Notes" section to add the notes.</strong></p>
                                    `;
  }
}

// Function to delete the Notes from the page and local storage and display the notes on the page again after deleting the note from the local storage
function deleteNotes(index) {
  let notes = localStorage.getItem("notes"); // get the notes from the local storage
  let notesTitle = localStorage.getItem("notesTitle"); // get the notes title from the local storage

  // if there are no notes and note title in the local storage
  if (notes == null || notesTitle == null) {
    notesObj = [];
    notesTitleObj = [];
  } else {
    notesObj = JSON.parse(notes);
    notesTitleObj = JSON.parse(notesTitle);
  }

  notesObj.splice(index, 1); // delete the note from the notesObj
  notesTitleObj.splice(index, 1); // delete the note title from the notesTitleObj
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("notesTitle", JSON.stringify(notesTitleObj));
  displayNotes(); // display the notes on the page
}

// Search Functionality for the notes
let search = document.getElementById("searchTxt"); // get the search input
search.addEventListener("input", () => {
  let inputText = search.value.toLowerCase(); // get the value of the search input
  let noteCards = document.getElementsByClassName("noteCard"); // get the note cards
  Array.from(noteCards).forEach((elt) => {
    let cardText = elt.getElementsByTagName("p")[0].innerText.toLowerCase();
    let cardTitle = elt.getElementsByTagName("h5")[0].innerText.toLowerCase();
    if (cardText.includes(inputText) || cardTitle.includes(inputText)) {
      elt.style.display = "block"; // display the note card if the note title or note text contains the search text
    } else {
      elt.style.display = "none"; // hide the note card if the note title or note text doesn't contain the search text
    }
  });
});

// Edit Data Function
const editData = (id) =>{
    let notes = localStorage.getItem('notes') // get the notes from the local storage
    let notesTitle = localStorage.getItem('notesTitle') // get the notes title from the local storage

    // if there are no notes and note title in the local storage
    if (notes == null || notesTitle == null) {
        notesObj = [];
        notesTitleObj = [];
    } else {
        notesObj = JSON.parse(notes);
        notesTitleObj = JSON.parse(notesTitle);
    }

    let name = document.getElementById('task-name');
    let description = document.getElementById('task-description');
    document.getElementById('update-btn').id= id;
    name.value = notesTitleObj[id]
    description.value = notesObj[id]
}

// Update Data Function
const handleUpdateAction = (self) =>{
    let notes = localStorage.getItem('notes') // get the notes from the local storage
    let title = localStorage.getItem('notesTitle') // get the notes title from the local storage

    // if there are no notes and note title in the local storage
    if (notes == null || title == null) {
        notesObj = [];
        titleObj = [];
    } else {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(title);
    }

    let taskName = document.getElementById('task-name');
    let taskDescription = document.getElementById('task-description');
    titleObj[Number(self.id)] = taskName.value
    notesObj[Number(self.id)] = taskDescription.value
    localStorage.setItem('notes', JSON.stringify(notesObj))
    localStorage.setItem('notesTitle', JSON.stringify(titleObj))
    displayNotes();
    
    // close the modal
    let close  = document.getElementById('close')
    close.click()

    // hidemodal
    let myModal = document.getElementById('exampleModal')
    let modal = bootstrap.Modal.getInstance(myModal)
    modal.hide()
}   