import './js/AppBar.js';
import './js/NoteItem.js';
import './js/NoteList.js';  
import './data/notes.js';

// Form Validation
const inputTitle = document.querySelector("input[name='title']");
const inputContent = document.querySelector("textarea[name='content']");
const errorTitle = document.getElementById("title-error");
const errorContent = document.getElementById("content-error");

// Realtime validation for the title input
inputTitle.addEventListener("blur", validateTitle);
inputTitle.addEventListener("input", validateTitle);
function validateTitle() {
  errorTitle.innerText = inputTitle.value ? '' : 'Kolom wajib diisi!';
}

// Realtime validation for the content input
inputContent.addEventListener("blur", validateContent);
inputContent.addEventListener("input", validateContent);
function validateContent() {
  errorContent.innerText = inputTitle.value ? '' : 'Kolom wajib diisi!';
}

// Adding a New Note
const notes = [];
document.getElementById("note-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (title && content) {
    const newNote = {
      id: generateRandomId(),
      title,
      body: content,
      createdAt: new Date()
    };

    const noteList = document.querySelector("note-list");
    noteList.addNote(newNote);
    document.getElementById("note-form").reset();
  }
});

// Function to generate random ID for each new notes
function generateRandomId() {
  const prefix = "notes-";
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789-";
  
  function getRandomSegment(length) {
    let segment = '';
    for (let i = 0; i < length; i++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return segment;
  }

  const segment1 = getRandomSegment(5);   
  const segment2 = getRandomSegment(5);   

  return prefix + segment1 + segment2;
}

// Search bar for note list
const searchBar = document.getElementById('search-title');
searchBar.addEventListener('input', function () {
  const noteItems = document.querySelectorAll('note-item');
  const searchInput = searchBar.value.toLowerCase(); 
  
  noteItems.forEach(noteItem => {
    const title = noteItem.querySelector('h3').innerText.toLowerCase(); 
    const body = noteItem.querySelector('p').innerText.toLowerCase(); 
    
    if (title.includes(searchInput) || body.includes(searchInput)) {
      noteItem.style.display = ''; 
    } else {
      noteItem.style.display = 'none'; 
    }

  });
});