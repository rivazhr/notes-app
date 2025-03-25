import './NoteItem.js';
import notesData from '../data/notes.js';

export class NoteList extends HTMLElement {
  constructor(){
    super();
    this.notes = notesData;
  }
  connectedCallback() {
    this.renderNotes(this.notes);
  }

  // Function to add a new note to the note list
  addNote(newNote) {
    this.notes.push(newNote);  
    this.renderNotes(); 
  }
  
  // Function to render all notes
  renderNotes() {
    this.notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 

    const noteList = document.querySelector("note-list");
    noteList.innerHTML = '';  

    this.notes.forEach(note => {
      const noteElement = document.createElement("note-item");
      noteElement.noteData = {
        id: note.id,
        title: note.title,
        body: note.body,
        createdAt: note.createdAt,
      };
      noteList.append(noteElement);  
    });

    noteList.scrollTo({ top: 0, behavior: "smooth" });
  }
}
customElements.define('note-list', NoteList);