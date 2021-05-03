console.log("this is notes app");
//on page loads
showNotes();

// add text to the local storage when user clicks add note button
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let notesStorage = localStorage.getItem("notes");
    if (notesStorage == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notesStorage);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
        date: new Date().toLocaleString()
    }
    notesArr.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    addTxt.value = "";
    addTitle.value = "";
    addTitle.focus();
    showNotes();
})



// function for display notes from local Storage
function showNotes() {
    let notesStorage = localStorage.getItem("notes");
    if (notesStorage == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notesStorage);
    }
    let html = '';
    notesArr.forEach((element, index) => {
        html += `
        
        <div class="container">
            <article class="card card--rotated note-card">
                <span><strong>Added:</strong> ${element.date}</span>
                <h4>Note number ${index + 1}</h4>
                <h3 class="card__title">${(element.title)}</h3>
                <div class="note-content">
                    <p class="card_description">
                        ${(element.text)}
                    </p>
                </div>
                
                <button id="${index}" class="dltBtn" onclick="deleteNote(this.id)">Delete</button>
            </article>
        </div>
                `;
    });
    let notes = document.getElementById("notes");
    if (notesArr.length == 0) {
        notes.innerHTML = "Nothing to show... please add a note";
    }
    else {
        notes.innerHTML = html;
    }

    console.log(notesArr, notesStorage);

}


// to delete a note 
function deleteNote(index) {
    let notesStorage = localStorage.getItem("notes");
    if (notesStorage == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notesStorage);
    }
    notesArr.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    showNotes();
    // console.log("deleting note", index);
}

// search functionality
let searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
    let inputVal = searchInput.value;
    console.log("input event fired", inputVal);
    let noteCards = document.getElementsByClassName("note-card");
    Array.from(noteCards).forEach(element => {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    });
})

